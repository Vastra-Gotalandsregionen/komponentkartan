import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Optional, Self, ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DatepickerItemComponent } from './datepicker-item.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vgr-datepicker-new',
  templateUrl: './datepicker-new.component.html'
})
export class DatepickerNewComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() selectedDate: Date;
  @Input() minZoom: string;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() allowText = true;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() showValidation = true;
  @Input() errorMessage = {};

  @Output() selectedDateChanged = new EventEmitter<Date>();

  @ViewChild('datepicker') datepicker: ElementRef;
  @ViewChild('headerLabel') headerLabel: ElementRef;
  @ViewChild('headerInput') headerInput: ElementRef;
  @ViewChild('calendar') calendar: ElementRef;
  @ViewChildren(DatepickerItemComponent) items: QueryList<DatepickerItemComponent>;

  label = '';
  labelDateFormat: string;
  parseError = false;
  parseErrorMessage: string;
  headerHasFocus = false;
  expanded = false;
  years: Calendar;
  months: Calendar;
  days: Calendar;
  zoomedToYears = false;
  zoomedToMonths = false;
  zoomedToDays = false;
  private minZoomLevel: DatepickerZoomLevel;
  private ngUnsubscribe = new Subject();
  private ngUnsubscribeItems = new Subject();

  get errorActive() {
    return (this.parseError || (this.showValidation && this.formControl && this.formControl.invalid)) && !this.headerHasFocus;
  }

  get errorEditing() {
    return (this.parseError || (this.showValidation && this.formControl && this.formControl.invalid)) && this.headerHasFocus;
  }

  constructor(@Optional() @Self() private formControl: NgControl, private renderer: Renderer2) {
    if (this.formControl != null) {
      this.formControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.setMinZoomLevel();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.minZoom) {
      this.setMinZoomLevel();
    }

    if (changes.disabled) {
      if (changes.disabled.firstChange) {
        setTimeout(() => {
          this.setDisabledState(changes.disabled.currentValue);
        });
      } else {
        this.setDisabledState(changes.disabled.currentValue);
      }
    }
  }

  ngAfterViewInit() {
    this.subscribeToItems();

    this.items.changes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(_ => this.subscribeToItems());
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
  }

  writeValue(value: any) {
    this.selectedDate = value;
    this.label = this.formatDate(value);
  }

  registerOnChange(func: (value: any) => any) {
    this.onChange = (value: any) => {
      this.selectedDateChanged.emit(value);
      func(value);
    };
  }

  registerOnTouched(func: (value: any) => any) {
    this.onTouched = func;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;

    this.renderer.setProperty(this.headerInput.nativeElement, 'disabled', isDisabled);

    if (isDisabled) {
      this.collapse(false);
    }
  }

  onChange(value: any) {
    this.selectedDateChanged.emit(value);
  }

  onTouched(value: any) { }

  toggleExpanded() {
    if (this.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  onHeaderFocus() {
    this.headerHasFocus = true;
  }

  onHeaderBlur() {
    this.headerHasFocus = false;
  }

  onBlur(event: FocusEvent) {
    const datepickerElement = this.datepicker.nativeElement as HTMLElement;
    const focusedNode = event.relatedTarget as Node;

    if (datepickerElement.contains(focusedNode)) {
      return;
    }

    this.onTouched(this.selectedDate);
    this.collapse(false);
  }

  onKeydown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (event.key === 'ArrowDown' || event.key === 'Down' ||
      event.key === 'ArrowUp' || event.key === 'Up' ||
      event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
    }

    if (event.key === 'Escape' || event.key === 'Esc') {
      this.collapse();
    } else if (event.key === 'Tab') {
      this.collapse();
    }
  }

  onHeaderClick() {
    if (this.disabled) {
      return;
    }

    this.toggleExpanded();
  }

  onHeaderKeydown(event: KeyboardEvent) {
    if (this.disabled) {
      return;
    }

    if (event.key === 'Enter') {
      this.toggleExpanded();
    } else if (
      event.key === 'ArrowUp' || event.key === 'Up' ||
      event.key === 'ArrowDown' || event.key === 'Down' ||
      event.key === 'ArrowLeft' || event.key === 'Left' ||
      event.key === 'ArrowRight' || event.key === 'Right') {
      if (this.expanded) {
        const itemToFocus = this.items.find(x => x.selected) || this.items.first;
        itemToFocus.focus();
      }
    }
  }

  onCalendarKeydown(event: KeyboardEvent) {
    if (event.target !== this.calendar.nativeElement) {
      return;
    }

    if (event.key === 'PageDown' && !event.altKey) {
      if (this.zoomedToDays) {
        this.days.previous();
      } else if (this.zoomedToMonths) {
        this.months.previous();
      } else if (this.zoomedToYears) {
        this.years.previous();
      }
    } else if (event.key === 'PageUp' && !event.altKey) {
      if (this.zoomedToDays) {
        this.days.next();
      } else if (this.zoomedToMonths) {
        this.months.next();
      } else if (this.zoomedToYears) {
        this.years.next();
      }
    } else if (event.key === 'PageDown' && event.altKey) {
      if (this.zoomedToDays) {
        // TODO: Change year?
      }
    } else if (event.key === 'PageUp' && event.altKey) {
      if (this.zoomedToDays) {
        // TODO: Change year?
      }
    } else if (
      event.key === 'ArrowUp' || event.key === 'Up' ||
      event.key === 'ArrowDown' || event.key === 'Down' ||
      event.key === 'ArrowLeft' || event.key === 'Left' ||
      event.key === 'ArrowRight' || event.key === 'Right') {
      const itemToFocus = this.items.find(x => x.selected) || this.items.first;
      itemToFocus.focus();
    }
  }

  parseSelectedDate(value: string) {
    if (!value) {
      this.setSelectedDate(null);
      this.collapse();
      return;
    }

    const matches = value.match(/^((\d\d)?\d\d)[ -]?(\d\d)[ -]?(\d\d)$/);

    if (!matches) {
      this.setSelectedDate(null, true);
      this.parseErrorMessage = 'Felaktigt format';
      return;
    }

    let year = +matches[1];
    if (year < 100) {
      year += 2000;
    }
    const month = +matches[3] - 1;
    const day = +matches[4];

    const date = new Date(year, month, day);
    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
      this.setSelectedDate(null, true);
      this.parseErrorMessage = 'Ogiltigt datum';
      return;
    }

    this.setSelectedDate(date);
    this.collapse();
  }

  private expand() {
    let referenceDate: Date;
    if (this.selectedDate) {
      referenceDate = this.selectedDate;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (this.minDate && today < this.minDate) {
        referenceDate = this.minDate;
      } else if (this.maxDate && today > this.maxDate) {
        referenceDate = this.maxDate;
      } else {
        referenceDate = today;
      }
    }

    switch (this.minZoomLevel) {
      case DatepickerZoomLevel.Days:
        this.zoomToDays(referenceDate);
        break;
      case DatepickerZoomLevel.Months:
        this.zoomToMonths(referenceDate);
        break;
      case DatepickerZoomLevel.Years:
        this.zoomToYears(referenceDate, referenceDate);
        break;
    }

    this.expanded = true;
  }

  private collapse(focusHeader = true) {
    this.expanded = false;

    if (focusHeader) {
      if (this.headerInput) {
        this.headerInput.nativeElement.focus();
      } else if (this.headerLabel) {
        this.headerLabel.nativeElement.focus();
      }
    }
  }

  private zoomToDays(referenceDate: Date, focus = false) {
    this.zoomedToYears = false;
    this.zoomedToMonths = false;
    this.zoomedToDays = true;

    const year = referenceDate.getFullYear();
    const month = referenceDate.getMonth();
    const firstDayWeekDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dayOffset = firstDayWeekDay ? firstDayWeekDay - 1 : 6; // Sunday is 0
    const weeks = Math.ceil((daysInMonth + dayOffset) / 7);
    const items: CalendarItem[][] = [];
    for (let week = 0; week < weeks; week++) {
      const weekDays: CalendarItem[] = [];
      for (let day = 1; day <= 7; day++) {
        const dayOfMonth = week * 7 + day - dayOffset;
        if (dayOfMonth < 1 || dayOfMonth > daysInMonth) {
          weekDays.push(null);
        } else {
          const date = new Date(year, month, dayOfMonth);
          const selectedYear = this.selectedDate ? this.selectedDate.getFullYear() : null;
          const selectedMonth = this.selectedDate ? this.selectedDate.getMonth() : null;
          const selectedDay = this.selectedDate ? this.selectedDate.getDate() : null;
          const selected = date.getFullYear() === selectedYear && date.getMonth() === selectedMonth && date.getDate() === selectedDay;
          const disabled = date < this.minDate || date > this.maxDate;
          weekDays.push({
            date: date,
            selected: selected,
            disabled: disabled,
            isMinZoom: true
          });
        }
      }
      items.push(weekDays);
    }

    this.days = {
      date: new Date(year, month),
      items: items,
      previous: () => {
        const focusedItem = this.items.find(x => x.focused);
        let dayToFocus = focusedItem ? focusedItem.date.getDate() : 1;
        if (dayToFocus > 28) {
          const previousMonthLastDay = new Date(year, month, 0).getDate();
          if (previousMonthLastDay < dayToFocus) {
            dayToFocus = previousMonthLastDay;
          }
        }
        this.zoomToDays(new Date(year, month - 1, dayToFocus), focusedItem ? true : false);
      },
      next: () => {
        const focusedItem = this.items.find(x => x.focused);
        let dayToFocus = focusedItem ? focusedItem.date.getDate() : 1;
        if (dayToFocus > 28) {
          const nextMonthLastDay = new Date(year, month + 1, 0).getDate();
          if (nextMonthLastDay < dayToFocus) {
            dayToFocus = nextMonthLastDay;
          }
        }
        this.zoomToDays(new Date(year, month + 1, dayToFocus), focusedItem ? true : false);
      },
      zoomOut: () => this.zoomToMonths(new Date(year, month))
    };

    if (focus) {
      this.calendar.nativeElement.focus();
      setTimeout(() => {
        this.items.find(x => x.date.getDate() === referenceDate.getDate()).focus();
      });
    }
  }

  private zoomToMonths(referenceDate: Date, focus = false) {
    this.zoomedToYears = false;
    this.zoomedToMonths = true;
    this.zoomedToDays = false;

    const year = referenceDate.getFullYear();

    const monthArray: Date[] = [
      new Date(year, 0),
      new Date(year, 1),
      new Date(year, 2),
      new Date(year, 3),
      new Date(year, 4),
      new Date(year, 5),
      new Date(year, 6),
      new Date(year, 7),
      new Date(year, 8),
      new Date(year, 9),
      new Date(year, 10),
      new Date(year, 11)
    ];

    const selectedYear = this.selectedDate ? this.selectedDate.getFullYear() : null;
    const selectedMonth = this.selectedDate ? this.selectedDate.getMonth() : null;
    const isMinZoom = this.minZoomLevel === DatepickerZoomLevel.Months;

    const items: CalendarItem[][] = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const row: CalendarItem[] = [];
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        const date = monthArray[4 * rowIndex + colIndex];
        const selected = date.getFullYear() === selectedYear && date.getMonth() === selectedMonth;
        // TODO: Fix for month
        const disabled = date < this.minDate || date > this.maxDate;
        row.push({
          date: date,
          selected: selected,
          disabled: disabled,
          isMinZoom: isMinZoom
        });
      }
      items.push(row);
    }

    this.months = {
      date: new Date(year, 0),
      items: items,
      previous: () => {
        const focusedItem = this.items.find(x => x.focused);
        const monthToFocus = focusedItem ? focusedItem.date.getMonth() : 0;
        this.zoomToMonths(new Date(year - 1, monthToFocus), focusedItem ? true : false);
      },
      next: () => {
        const focusedItem = this.items.find(x => x.focused);
        const monthToFocus = focusedItem ? focusedItem.date.getMonth() : 0;
        this.zoomToMonths(new Date(year + 1, monthToFocus), focusedItem ? true : false);
      },
      zoomOut: () => this.zoomToYears(new Date(year, 0), new Date(year, 0))
    };

    if (focus) {
      this.calendar.nativeElement.focus();
      setTimeout(() => {
        this.items.find(x => x.date.getMonth() === referenceDate.getMonth()).focus();
      });
    }
  }

  private zoomToYears(referenceDate: Date, focusDate: Date, focus = false) {
    this.zoomedToYears = true;
    this.zoomedToMonths = false;
    this.zoomedToDays = false;

    const year = referenceDate.getFullYear();

    const yearArray: Date[] = [
      new Date(year - 4, 0),
      new Date(year - 3, 0),
      new Date(year - 2, 0),
      new Date(year - 1, 0),
      new Date(year, 0),
      new Date(year + 1, 0),
      new Date(year + 2, 0),
      new Date(year + 3, 0),
      new Date(year + 4, 0)
    ];

    const selectedYear = this.selectedDate ? this.selectedDate.getFullYear() : null;
    const isMinZoom = this.minZoomLevel === DatepickerZoomLevel.Years;

    const items: CalendarItem[][] = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const row: CalendarItem[] = [];
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        const date = yearArray[3 * rowIndex + colIndex];
        const selected = date.getFullYear() === selectedYear;
        // TODO: Fix for year
        const disabled = date < this.minDate || date > this.maxDate;
        row.push({
          date: date,
          selected: selected,
          disabled: disabled,
          isMinZoom: isMinZoom
        });
      }
      items.push(row);
    }

    this.years = {
      date: null,
      items: items,
      previous: () => {
        const focusedItem = this.items.find(x => x.focused);
        const yearToFocus = focusedItem ? new Date(focusedItem.date.getFullYear() - 9, 0) : null;
        this.zoomToYears(new Date(year - 9, 0), yearToFocus, focusedItem ? true : false);
      },
      next: () => {
        const focusedItem = this.items.find(x => x.focused);
        const yearToFocus = focusedItem ? new Date(focusedItem.date.getFullYear() + 9, 0) : null;
        this.zoomToYears(new Date(year + 9, 0), yearToFocus, focusedItem ? true : false);
      },
      zoomOut: () => { }
    };

    if (focus) {
      this.calendar.nativeElement.focus();
      setTimeout(() => {
        this.items.find(x => x.date.getFullYear() === focusDate.getFullYear()).focus();
      });
    }
  }

  private setMinZoomLevel() {
    switch (this.minZoom) {
      case 'years':
      case 'year':
      case 'y':
        this.minZoomLevel = DatepickerZoomLevel.Years;
        this.zoomedToYears = true;
        this.zoomedToMonths = false;
        this.zoomedToDays = false;
        this.labelDateFormat = 'yyyy';
        break;
      case 'months':
      case 'month':
      case 'm':
        this.minZoomLevel = DatepickerZoomLevel.Months;
        this.zoomedToYears = false;
        this.zoomedToMonths = true;
        this.zoomedToDays = false;
        this.labelDateFormat = 'MMM yyyy';
        break;
      default:
        this.minZoomLevel = DatepickerZoomLevel.Days;
        this.zoomedToYears = false;
        this.zoomedToMonths = false;
        this.zoomedToDays = true;
        this.labelDateFormat = 'yyyy-MM-dd';
        break;
    }
  }

  private setSelectedDate(date: Date, parseError = false) {
    this.selectedDate = date;
    this.onChange(date);
    this.parseError = parseError;

    if (!parseError) {
      this.label = this.formatDate(date);
    }
  }

  private formatDate(date: Date): string {
    if (!date) {
      return '';
    }

    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const monthSpacer = month < 10 ? '0' : '';
    const day = date.getDate();
    const daySpacer = day < 10 ? '0' : '';

    return `${year}-${monthSpacer}${month}-${daySpacer}${day}`;
  }

  private subscribeToItems() {
    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
    this.ngUnsubscribeItems = new Subject();

    this.items.forEach(item => {
      item.select
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(date => {
          this.collapse();
          this.setSelectedDate(date);
        });

      item.zoomIn
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(date => {
          if (this.zoomedToYears) {
            this.zoomToMonths(date, true);
          } else if (this.zoomedToMonths) {
            this.zoomToDays(date, true);
          }
        });

      item.previousColumn
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(date => {
          if (this.zoomedToDays) {
            const dayToFocus = date.getDate() - 1;
            if (dayToFocus < 1) {
              this.zoomToDays(new Date(date.getFullYear(), date.getMonth(), 0), true);
            } else {
              this.items.find(x => x.date.getDate() === dayToFocus).focus();
            }
          } else if (this.zoomedToMonths) {
            const monthToFocus = date.getMonth() - 1;
            if (monthToFocus < 0) {
              this.zoomToMonths(new Date(date.getFullYear() - 1, 11), true);
            } else {
              this.items.find(x => x.date.getMonth() === monthToFocus).focus();
            }
          } else if (this.zoomedToYears) {
            const yearToFocus = date.getFullYear() - 1;
            if (yearToFocus < this.items.first.date.getFullYear()) {
              this.zoomToYears(new Date(this.items.first.date.getFullYear() - 5, 0), new Date(yearToFocus, 0), true);
            } else {
              this.items.find(x => x.date.getFullYear() === yearToFocus).focus();
            }
          }
        });

      item.nextColumn
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(date => {
          if (this.zoomedToDays) {
            const dayToFocus = date.getDate() + 1;
            if (dayToFocus > 28) {
              const dateToFocus = new Date(date.getFullYear(), date.getMonth(), dayToFocus);
              if (dateToFocus.getDate() !== dayToFocus) {
                this.zoomToDays(new Date(date.getFullYear(), date.getMonth() + 1, 1), true);
                return;
              }
            }
            this.items.find(x => x.date.getDate() === dayToFocus).focus();
          } else if (this.zoomedToMonths) {
            const monthToFocus = date.getMonth() + 1;
            if (monthToFocus > 11) {
              this.zoomToMonths(new Date(date.getFullYear() + 1, 0), true);
            } else {
              this.items.find(x => x.date.getMonth() === monthToFocus).focus();
            }
          } else if (this.zoomedToYears) {
            const yearToFocus = date.getFullYear() + 1;
            if (yearToFocus > this.items.last.date.getFullYear()) {
              this.zoomToYears(new Date(this.items.last.date.getFullYear() + 5, 0), new Date(yearToFocus, 0), true);
            } else {
              this.items.find(x => x.date.getFullYear() === yearToFocus).focus();
            }
          }
        });

      item.previousRow
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(date => {
          if (this.zoomedToDays) {
            const dayToFocus = date.getDate() - 7;
            if (dayToFocus < 1) {
              this.zoomToDays(new Date(date.getFullYear(), date.getMonth(), dayToFocus), true);
            } else {
              this.items.find(x => x.date.getDate() === dayToFocus).focus();
            }
          } else if (this.zoomedToMonths) {
            const monthToFocus = date.getMonth() - 4;
            if (monthToFocus < 0) {
              this.zoomToMonths(new Date(date.getFullYear(), monthToFocus), true);
            } else {
              this.items.find(x => x.date.getMonth() === monthToFocus).focus();
            }
          } else if (this.zoomedToYears) {
            const yearToFocus = date.getFullYear() - 3;
            if (yearToFocus < this.items.first.date.getFullYear()) {
              this.zoomToYears(new Date(this.items.first.date.getFullYear() - 5, 0), new Date(yearToFocus, 0), true);
            } else {
              this.items.find(x => x.date.getFullYear() === yearToFocus).focus();
            }
          }
        });

      item.nextRow
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(date => {
          if (this.zoomedToDays) {
            const dayToFocus = date.getDate() + 7;
            if (dayToFocus > 28) {
              const dateToFocus = new Date(date.getFullYear(), date.getMonth(), dayToFocus);
              if (dateToFocus.getDate() !== dayToFocus) {
                this.zoomToDays(dateToFocus, true);
                return;
              }
            }
            this.items.find(x => x.date.getDate() === dayToFocus).focus();
          } else if (this.zoomedToMonths) {
            const monthToFocus = date.getMonth() + 4;
            if (monthToFocus > 11) {
              this.zoomToMonths(new Date(date.getFullYear(), monthToFocus), true);
            } else {
              this.items.find(x => x.date.getMonth() === monthToFocus).focus();
            }
          } else if (this.zoomedToYears) {
            const yearToFocus = date.getFullYear() + 3;
            if (yearToFocus > this.items.last.date.getFullYear()) {
              this.zoomToYears(new Date(this.items.last.date.getFullYear() + 5, 0), new Date(yearToFocus, 0), true);
            } else {
              this.items.find(x => x.date.getFullYear() === yearToFocus).focus();
            }
          }
        });
    });
  }
}

interface Calendar {
  date: Date;
  items: CalendarItem[][];
  previous: () => void;
  next: () => void;
  zoomOut: () => void;
}

interface CalendarItem {
  date: Date;
  selected: boolean;
  disabled: boolean;
  isMinZoom: boolean;
}

const enum DatepickerZoomLevel {
  Days = 1,
  Months = 2,
  Years = 3
}
