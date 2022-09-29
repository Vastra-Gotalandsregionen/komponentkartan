import {
  Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, Optional, Self,
  ViewChild, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy, LOCALE_ID, Inject, HostBinding, HostListener
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { DatepickerItemComponent } from './datepicker-item.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

import { Guid } from '../../utils/guid';
import { DatepickerZoomLevel, CalendarItem, Calendar } from './datepicker.interface';

@Component({
  selector: 'vgr-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
})
export class DatepickerComponent implements OnChanges, AfterViewInit, OnDestroy, ControlValueAccessor {
  @Input() @HostBinding('style.width') width; // = '142px';
  @Input() selectedDate: Date;
  @Input() minZoom: string;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() allowText = true;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() showValidation = true;
  @Input() errorMessage = {};
  @Input() labelId: string;
  @Input() transparent = false;

  @Output() selectedDateChanged = new EventEmitter<Date>();

  @ViewChild('datepicker', { static: true }) datepicker: ElementRef;
  @ViewChild('headerLabel') headerLabel: ElementRef;
  @ViewChild('headerInput') headerInput: ElementRef;
  @ViewChild('readOnlyHeader') readOnlyHeader: ElementRef;
  @ViewChild('headerInputDiv') headerInputDiv: ElementRef;
  @ViewChild('calendar') calendar: ElementRef;
  @ViewChildren(DatepickerItemComponent) items: QueryList<DatepickerItemComponent>;

  headerLabelId = Guid.newGuid();
  label = '';
  noSelectedDateLabel: string;
  labelDateFormat: string;
  inputPlaceholder: string;
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
  private actualMinDate: Date;
  private actualMaxDate: Date;
  private ngUnsubscribe: any = new Subject();
  private ngUnsubscribeItems: any = new Subject();
  elementId: string;
  mouseDown: any;

  @HostListener('window:resize', [])
  onWindowResize() {
    // only change if 'default' values
    if (window.innerWidth <= 1459) {
      if (this.width === '142px') {
        this.width = '130px';
      }
    } else {
      if (this.width === '130px') {
        this.width = '142px';
      }
    }
  }


  get errorActive() {
    if (!this.showValidation || this.disabled || this.readonly) {
      return false;
    }

    return (this.parseError || (this.formControl && this.formControl.invalid));
  }

  get errorEditing() {
    if (!this.showValidation || this.disabled || this.readonly) {
      return false;
    }

    return this.headerHasFocus && (this.parseError || (this.formControl && this.formControl.invalid));
  }

  constructor(@Inject(LOCALE_ID) private locale: string, @Optional() @Self() public formControl: NgControl) {
    this.elementId = Math.random().toString();
    this.setMinZoomLevel();

    if (this.formControl != null) {
      this.formControl.valueAccessor = this;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.minZoom || changes.minDate || changes.maxDate) {
      this.setMinZoomLevel();
    }

    if (changes.selectedDate) {
      if (changes.selectedDate.firstChange) {
        this.writeValue(changes.selectedDate.currentValue);
      } else {
        this.writeValue(changes.selectedDate.currentValue);
      }
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

  public focus() {
    if (this.readonly) {
      this.readOnlyHeader.nativeElement.focus();
    } else {
      if (this.allowText) {
        this.setFocusOnHeaderInput();
      } else {
        this.headerLabel.nativeElement.focus();
      }
    }
  }

  setFocusOnHeaderInput() {
    if (this.disabled)  {
      this.headerInputDiv.nativeElement.focus();
    } else {
      this.headerInput.nativeElement.focus();
    }

  }

  writeValue(value: Date) {
    this.setSelectedDate(value, false, false);
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

  onMouseDownClick() {
    this.mouseDown = true;
    this.headerHasFocus = false;
  }

  onHeaderFocus() {
    if (this.mouseDown) {
      this.mouseDown = false;
      return;
    }
    this.headerHasFocus = true;
    this.mouseDown = false;
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

  onHeaderInputKeydown(event: KeyboardEvent ) {
    // to be able to move backwards-tab, otherwise we will be stuck in an endless loop going to input in div 'allowtext'
    if (event.key === 'Tab' && event.shiftKey) {
      this.headerInputDiv.nativeElement.focus();
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    if (event.key === 'Escape' || event.key === 'Esc') {
      this.collapse();
    } else if (event.key === 'Tab' ) {
      if (event.shiftKey) {
        // to be able to move backwards-tab, otherwise we will be stuck in an endless loop going to input in div 'allowtext'
        this.collapse(false);
      } else {
        this.collapse();
      }
    } else if (event.key === 'Home') {
      event.preventDefault();
      this.items.first.focus();
    } else if (event.key === 'End') {
      event.preventDefault();
      this.items.last.focus();
    }
  }

  onHeaderClick() {
    if (this.disabled || this.readonly) {
      return;
    }

    if (this.allowText) {
      this.headerInput.nativeElement.focus();
    } else {
      this.mouseDown = true;
      this.headerLabel.nativeElement.focus();
    }

    this.toggleExpanded();
  }

  onHeaderKeydown(event: KeyboardEvent) {
    if (this.disabled || this.readonly) {
      return;
    }

    if (event.key === 'Enter') {
      this.toggleExpanded();
      if (!this.allowText) {
        setTimeout(() => {
          const itemToFocus = this.items.find(x => x.selected) || this.items.first;
          itemToFocus.focus();
        });
      }
    } else if (
      event.key === 'ArrowUp' || event.key === 'Up' ||
      event.key === 'ArrowDown' || event.key === 'Down') {
      if (this.expanded) {
        event.preventDefault();
        const itemToFocus = this.items.find(x => x.selected) || this.items.first;
        itemToFocus.focus();
      }
    }
  }

  onCalendarKeydown(event: KeyboardEvent) {
    if (event.key === 'Home') {
      this.items.first.focus();
    } else if (event.key === 'End') {
      this.items.last.focus();
    } else if (event.key === 'PageUp' && !event.altKey) {
      event.preventDefault();
      if (this.zoomedToDays) {
        this.days.previous();
      } else if (this.zoomedToMonths) {
        this.months.previous();
      } else if (this.zoomedToYears) {
        this.years.previous();
      }
    } else if (event.key === 'PageDown' && !event.altKey) {
      event.preventDefault();
      if (this.zoomedToDays) {
        this.days.next();
      } else if (this.zoomedToMonths) {
        this.months.next();
      } else if (this.zoomedToYears) {
        this.years.next();
      }
    } else if (event.key === 'PageUp' && event.altKey) {
      event.preventDefault();
      if (this.zoomedToDays) {
        this.days.farPrevious();
      }
    } else if (event.key === 'PageDown' && event.altKey) {
      event.preventDefault();
      if (this.zoomedToDays) {
        this.days.farNext();
      }
    } else if (
      event.key === 'ArrowUp' || event.key === 'Up' ||
      event.key === 'ArrowDown' || event.key === 'Down' ||
      event.key === 'ArrowLeft' || event.key === 'Left' ||
      event.key === 'ArrowRight' || event.key === 'Right') {
      if (event.target !== this.calendar.nativeElement) {
        return;
      }
      event.preventDefault();
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

    let date: Date;
    let year: number;
    let month = 0;
    let day = 1;
    let invalidFormat = false;

    if (this.minZoomLevel === DatepickerZoomLevel.Days) {
      const matches = value.match(/^((\d\d)?\d\d)[ -]?(\d\d)[ -]?(\d\d)$/);

      if (!matches) {
        invalidFormat = true;
      } else {
        year = +matches[1];
        if (year < 100) {
          year += 2000;
        }
        month = +matches[3] - 1;
        day = +matches[4];
        date = new Date(year, month, day);
      }
    } else if (this.minZoomLevel === DatepickerZoomLevel.Months) {
      const numericMatches = value.match(/^((\d\d)?\d\d)[ -]?(\d\d)$/);
      const textMatches = value.match(/^(\w+)\.? ((\d\d)?\d\d)$/);

      if (numericMatches) {
        year = +numericMatches[1];
        if (year < 100) {
          year += 2000;
        }
        month = +numericMatches[3] - 1;
        date = new Date(year, month, 1);
      } else if (textMatches) {
        year = +textMatches[2];
        if (year < 100) {
          year += 2000;
        }
        switch (textMatches[1].toLowerCase()) {
          case 'jan':
          case 'januari':
            month = 0;
            break;
          case 'feb':
          case 'februari':
            month = 1;
            break;
          case 'mars':
            month = 2;
            break;
          case 'apr':
          case 'april':
            month = 3;
            break;
          case 'maj':
            month = 4;
            break;
          case 'juni':
            month = 5;
            break;
          case 'juli':
            month = 6;
            break;
          case 'aug':
          case 'augusti':
            month = 7;
            break;
          case 'sep':
          case 'september':
            month = 8;
            break;
          case 'okt':
          case 'oktober':
            month = 9;
            break;
          case 'nov':
          case 'november':
            month = 10;
            break;
          case 'dec':
          case 'december':
            month = 11;
            break;
          default:
            month = -1;
            break;
        }
        date = new Date(year, month, 1);
      } else {
        invalidFormat = true;
      }
    } else if (this.minZoomLevel === DatepickerZoomLevel.Years) {
      const matches = value.match(/^((\d\d)?\d\d)$/);

      if (!matches) {
        invalidFormat = true;
      } else {
        year = +matches[1];
        if (year < 100) {
          year += 2000;
        }
        date = new Date(year, 0, 1);
      }
    }

    if (invalidFormat) {
      this.setSelectedDate(null, true);
      this.parseErrorMessage = 'Felaktigt format';
      return;
    }

    if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
      this.setSelectedDate(null, true);
      this.parseErrorMessage = 'Datumet finns inte.';
      return;
    }

    if (this.actualMinDate && date < this.actualMinDate) {
      this.setSelectedDate(null, true);
      this.parseErrorMessage = 'Datumet är tidigare än tillåtet.';
      return;
    }

    if (this.actualMaxDate && date > this.actualMaxDate) {
      this.setSelectedDate(null, true);
      this.parseErrorMessage = 'Datumet är senare än tillåtet.';
      return;
    }

    this.setSelectedDate(date);
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
    if (this.disabled) {
      return;
    }

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

    const minDateDay = this.minDate ? new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate()) : null;
    const maxDateDay = this.maxDate ? new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate()) : null;
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
          const disabled = (minDateDay && date < minDateDay) || (maxDateDay && date > maxDateDay);
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
          const nextMonthLastDay = new Date(year, month + 2, 0).getDate();
          if (nextMonthLastDay < dayToFocus) {
            dayToFocus = nextMonthLastDay;
          }
        }
        this.zoomToDays(new Date(year, month + 1, dayToFocus), focusedItem ? true : false);
      },
      farPrevious: () => {
        const focusedItem = this.items.find(x => x.focused);
        let dayToFocus = focusedItem ? focusedItem.date.getDate() : 1;
        if (month === 1 && dayToFocus === 29) {
          dayToFocus = 28;
        }
        this.zoomToDays(new Date(year - 1, month, dayToFocus), focusedItem ? true : false);
      },
      farNext: () => {
        const focusedItem = this.items.find(x => x.focused);
        let dayToFocus = focusedItem ? focusedItem.date.getDate() : 1;
        if (month === 1 && dayToFocus === 29) {
          dayToFocus = 28;
        }
        this.zoomToDays(new Date(year + 1, month, dayToFocus), focusedItem ? true : false);
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
    const minDateMonth = this.minDate ? new Date(this.minDate.getFullYear(), this.minDate.getMonth()) : null;
    const maxDateMonth = this.maxDate ? new Date(this.maxDate.getFullYear(), this.maxDate.getMonth()) : null;
    const isMinZoom = this.minZoomLevel === DatepickerZoomLevel.Months;

    const items: CalendarItem[][] = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const row: CalendarItem[] = [];
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        const date = monthArray[4 * rowIndex + colIndex];
        const selected = date.getFullYear() === selectedYear && date.getMonth() === selectedMonth;
        const disabled = (minDateMonth && date < minDateMonth) || (maxDateMonth && date > maxDateMonth);
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
      farPrevious: () => { },
      farNext: () => { },
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
    const minDateYear = this.minDate ? new Date(this.minDate.getFullYear(), 0) : null;
    const maxDateYear = this.maxDate ? new Date(this.maxDate.getFullYear(), 0) : null;
    const isMinZoom = this.minZoomLevel === DatepickerZoomLevel.Years;

    const items: CalendarItem[][] = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const row: CalendarItem[] = [];
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        const date = yearArray[3 * rowIndex + colIndex];
        const selected = date.getFullYear() === selectedYear;
        const disabled = (minDateYear && date < minDateYear) || (maxDateYear && date > maxDateYear);
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
      farPrevious: () => { },
      farNext: () => { },
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
        this.noSelectedDateLabel = 'Välj år';
        this.labelDateFormat = 'yyyy';
        this.inputPlaceholder = 'ÅÅ';
        this.actualMinDate = this.minDate ? new Date(this.minDate.getFullYear(), 0) : null;
        this.actualMaxDate = this.maxDate ? new Date(this.maxDate.getFullYear(), 0) : null;
        break;
      case 'months':
      case 'month':
      case 'm':
        this.minZoomLevel = DatepickerZoomLevel.Months;
        this.zoomedToYears = false;
        this.zoomedToMonths = true;
        this.zoomedToDays = false;
        this.noSelectedDateLabel = 'Välj månad';
        this.labelDateFormat = 'MMM yyyy';
        this.inputPlaceholder = 'ÅÅMM';
        this.actualMinDate = this.minDate ? new Date(this.minDate.getFullYear(), this.minDate.getMonth()) : null;
        this.actualMaxDate = this.maxDate ? new Date(this.maxDate.getFullYear(), this.maxDate.getMonth()) : null;
        break;
      default:
        this.minZoomLevel = DatepickerZoomLevel.Days;
        this.zoomedToYears = false;
        this.zoomedToMonths = false;
        this.zoomedToDays = true;
        this.noSelectedDateLabel = 'Välj datum';
        this.labelDateFormat = 'yyyy-MM-dd';
        this.inputPlaceholder = 'ÅÅMMDD';
        this.actualMinDate = this.minDate ? new Date(this.minDate.getFullYear(), this.minDate.getMonth(), this.minDate.getDate()) : null;
        this.actualMaxDate = this.maxDate ? new Date(this.maxDate.getFullYear(), this.maxDate.getMonth(), this.maxDate.getDate()) : null;
        break;
    }
  }

  private setSelectedDate(date: Date, parseError = false, emit = true) {
    if (emit) {
      this.onChange(date);
    }

    this.selectedDate = date;
    this.parseError = parseError;

    if (!parseError) {
      const newLabel = this.formatDate(date);
      if (this.label !== newLabel) {
        this.label = newLabel;
      } else {
        // this.label = '';
        // setTimeout(() => {
        this.label = newLabel;
        // });
      }
    }
  }

  private formatDate(date: Date): string {
    return new DatePipe(this.locale).transform(date, this.labelDateFormat);
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

  getLabelFromId() {
    // return window.document.getElementById(this.idForLabel)
    let labels = document.getElementsByTagName('label');
    for( var i = 0; i < labels.length; i++ ) {
      if (labels[i].htmlFor == this.labelId)
           return labels[i];
   }
  }
}

