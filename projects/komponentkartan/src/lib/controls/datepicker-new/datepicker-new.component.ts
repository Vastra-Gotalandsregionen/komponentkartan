import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, Optional, Host, SkipSelf, Self, ViewChild, ElementRef } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';

@Component({
  selector: 'vgr-datepicker-new',
  templateUrl: './datepicker-new.component.html'
})
export class DatepickerNewComponent implements OnInit, OnChanges, ControlValueAccessor {
  @Input() selectedDate: Date;
  @Input() minZoom: string;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  @Input() allowText = true;
  @Input() disabled = false;
  @Input() readonly = false;
  @Input() showValidation = true;

  @Output() selectedDateChanged = new EventEmitter<Date>();

  @ViewChild('datepicker') datepicker: ElementRef;
  @ViewChild('headerInput') headerInput: ElementRef;

  label = '';
  headerHasFocus = false;
  expanded = false;
  years: Calendar;
  months: Calendar;
  days: Calendar;
  zoomedToYears = false;
  zoomedToMonths = false;
  zoomedToDays = false;
  private minZoomLevel: DatepickerZoomLevel;

  constructor(@Optional() @Self() private formControl: NgControl) {
    if (this.formControl != null) {
      this.formControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    this.setMinZoomLevel();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['minZoom']) {
      this.setMinZoomLevel();
    }
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

  setDisabledState?(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onChange(value: any) {
    this.selectedDateChanged.emit(value);
  }

  onTouched(value: any) { }

  focusHeaderInput() {
    this.headerInput.nativeElement.focus();
  }

  toggleExpanded() {
    if (this.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  expand() {
    this.setZoomLevel(this.minZoomLevel, this.selectedDate);
    this.expanded = true;
  }

  collapse() {
    this.expanded = false;
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
      console.log('inner blur');
      return;
    }

    console.log('outer blur');
    this.headerHasFocus = false;
    this.onTouched(this.selectedDate);
    this.collapse();
  }

  onHeaderKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.toggleExpanded();
    }
  }

  parseSelectedDate(value: string) {
    const matches = value.match(/^((\d\d)?\d\d)[ -]?(\d\d)[ -]?(\d\d)$/);

    if (!matches) {
      this.setSelectedDate(null);
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
      this.setSelectedDate(null);
      return;
    }

    this.setSelectedDate(date);
    this.collapse();
  }

  setZoomLevel(zoomLevel: DatepickerZoomLevel, focusDate: Date) {
    if (!focusDate) {
      focusDate = new Date();
    }

    switch (zoomLevel) {
      case DatepickerZoomLevel.Days:
        this.zoomToDays(focusDate);
        break;
      case DatepickerZoomLevel.Months:
        this.zoomToMonths(focusDate);
        break;
      case DatepickerZoomLevel.Years:
        this.zoomToYears(focusDate);
        break;
    }
  }

  zoomToDays(focusDate: Date) {
    this.zoomedToYears = false;
    this.zoomedToMonths = false;
    this.zoomedToDays = true;

    const today = new Date();
    const year = focusDate.getFullYear();
    const month = focusDate.getMonth();
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
          const current = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth() && date.getDate() === today.getDate();
          weekDays.push({
            date: date,
            selected: selected,
            current: current,
            onClick: () => {
              // this.collapse();
              this.setSelectedDate(date);
            }
          });
        }
      }
      items.push(weekDays);
    }
    this.days = {
      date: new Date(year, month),
      items: items,
      previous: () => this.setZoomLevel(DatepickerZoomLevel.Days, new Date(year, month - 1)),
      next: () => this.setZoomLevel(DatepickerZoomLevel.Days, new Date(year, month + 1)),
      zoomOut: () => this.setZoomLevel(DatepickerZoomLevel.Months, new Date(year, month))
    };
  }

  zoomToMonths(focusDate: Date) {
    this.zoomedToYears = false;
    this.zoomedToMonths = true;
    this.zoomedToDays = false;

    const year = focusDate.getFullYear();

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

    let fn: (value: Date) => void;
    if (this.minZoomLevel === DatepickerZoomLevel.Years) {
      fn = (value: Date) => {
        this.collapse();
        this.setSelectedDate(value);
      };
    } else {
      fn = (value: Date) => this.setZoomLevel(DatepickerZoomLevel.Days, value);
    }

    const today = new Date();
    const selectedYear = this.selectedDate ? this.selectedDate.getFullYear() : null;
    const selectedMonth = this.selectedDate ? this.selectedDate.getMonth() : null;

    const items: CalendarItem[][] = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const row: CalendarItem[] = [];
      for (let colIndex = 0; colIndex < 4; colIndex++) {
        const date = monthArray[4 * rowIndex + colIndex];
        const selected = date.getFullYear() === selectedYear && date.getMonth() === selectedMonth;
        const current = date.getFullYear() === today.getFullYear() && date.getMonth() === today.getMonth();
        row.push({
          date: date,
          selected: selected,
          current: current,
          onClick: () => fn(date)
        });
      }
      items.push(row);
    }

    this.months = {
      date: new Date(year, 0),
      items: items,
      previous: () => this.setZoomLevel(DatepickerZoomLevel.Months, new Date(year - 1, 0)),
      next: () => this.setZoomLevel(DatepickerZoomLevel.Months, new Date(year + 1, 0)),
      zoomOut: () => this.setZoomLevel(DatepickerZoomLevel.Years, new Date(year, 0))
    };
  }

  zoomToYears(focusDate: Date) {
    this.zoomedToYears = true;
    this.zoomedToMonths = false;
    this.zoomedToDays = false;

    const today = new Date();
    const year = focusDate.getFullYear();

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

    let fn: (value: Date) => void;
    if (this.minZoomLevel === DatepickerZoomLevel.Years) {
      fn = (value: Date) => {
        this.collapse();
        this.setSelectedDate(value);
      };
    } else {
      fn = (value: Date) => this.setZoomLevel(DatepickerZoomLevel.Months, value);
    }

    const selectedYear = this.selectedDate ? this.selectedDate.getFullYear() : null;

    const items: CalendarItem[][] = [];
    for (let rowIndex = 0; rowIndex < 3; rowIndex++) {
      const row: CalendarItem[] = [];
      for (let colIndex = 0; colIndex < 3; colIndex++) {
        const date = yearArray[3 * rowIndex + colIndex];
        const selected = date.getFullYear() === selectedYear;
        const current = date.getFullYear() === today.getFullYear();
        row.push({
          date: date,
          selected: selected,
          current: current,
          onClick: () => fn(date)
        });
      }
      items.push(row);
    }

    this.years = {
      date: null,
      items: items,
      previous: () => this.setZoomLevel(DatepickerZoomLevel.Years, new Date(year - 9, 0)),
      next: () => this.setZoomLevel(DatepickerZoomLevel.Years, new Date(year + 9, 0)),
      zoomOut: () => { }
    };
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
        break;
      case 'months':
      case 'month':
      case 'm':
        this.minZoomLevel = DatepickerZoomLevel.Months;
        this.zoomedToYears = false;
        this.zoomedToMonths = true;
        this.zoomedToDays = false;
        break;
      default:
        this.minZoomLevel = DatepickerZoomLevel.Days;
        this.zoomedToYears = false;
        this.zoomedToMonths = false;
        this.zoomedToDays = true;
        break;
    }
  }

  private setSelectedDate(date: Date) {
    this.selectedDate = date;
    this.label = this.formatDate(date);
    this.onChange(date);
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
  current: boolean;
  onClick: () => void;
}

export const enum DatepickerZoomLevel {
  Days = 1,
  Months = 2,
  Years = 3
}
