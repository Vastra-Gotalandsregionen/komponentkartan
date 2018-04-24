import {
    Component, Input, EventEmitter, Output, OnChanges, HostBinding, OnInit, HostListener,
    ElementRef, forwardRef, SkipSelf, Optional, Host, ChangeDetectorRef, AfterViewInit
} from '@angular/core';
import { ICalendarYearMonth } from '../../models/calendarYearMonth.model';
import { ICalendarWeek } from '../../models/calendarWeek.model';
import { ICalendarDay } from '../../models/calendarDay.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { Guid } from '../../utils/guid';

@Component({
    selector: 'vgr-datepicker',
    moduleId: module.id,
    templateUrl: './datepicker.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DatepickerComponent),
        multi: true
    }]
})
export class DatepickerComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
    @Input() showValidation = true;

    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() selectedDate?: Date;
    @Input() @HostBinding('class.disabled') disabled = false;
    @Input() @HostBinding('class.readonly') readonly = false;
    @Input() noDateSelectedLabel = 'Välj datum';
    @Input() selectedDateFormat = 'yyyy-MM-dd';
    @Input() tooltipDateFormat = 'yyyy-MM-dd';
    @Output() selectedDateChanged = new EventEmitter<Date>();
    @Input() formControlName?: string;

    @HostBinding('class.validated-input') hasClass = true;
    @HostBinding('class.validation-error--active') get errorClass() {
        return this.showValidation && this.control && this.control.invalid && !this.hasFocus;
    }
    @HostBinding('class.validation-error--editing') get editingClass() {
        return this.showValidation && this.control && this.control.invalid && this.hasFocus;
    }

    labelledbyid: string = Guid.newGuid();


    expanded: boolean;
    hasFocus: boolean;
    control: AbstractControl;

    focusableDays = [];
    currentFocusedDayIndex = 0;


    today: Date;
    yearMonths: ICalendarYearMonth[] = [];
    nextMonth: boolean;
    previousMonth: boolean;
    currentYearMonthIndex = 0;
    currentYearMonthOutput: Date;
    selectedCalendarDay: ICalendarDay;

    validationErrorMessage = 'Obligatoriskt';


    constructor(protected elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef, @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
        this.expanded = false;
        this.today = new Date();
        this.nextMonth = true;
        this.previousMonth = true;
        this.minDate = new Date(this.today.getFullYear(), 0, 1);
        this.maxDate = new Date(this.today.getFullYear(), 11, 31);

    }


    ngOnInit() {
        this.yearMonths = this.createYearMonths(this.minDate, this.maxDate);
        this.updateYearMonths(this.minDate, this.maxDate, this.yearMonths);
        this.setCurrentYearMonthOutput();
        this.setPreviousAndNextMonthNavigation();
    }

    ngOnChanges() {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
        this.setFocusableItems();
    }

    ngAfterViewInit() {
        this.setFocusableItems();
    }

    setFocusableItems() {
        this.focusableDays = this.elementRef.nativeElement.getElementsByClassName('datepicker__calendar__day');
    }

    setFocusedElement() {
        if (!this.selectedDate) {
            this.currentFocusedDayIndex = this.today.getDate() - 1;
        } else {
            this.currentFocusedDayIndex = this.selectedDate.getDate() - 1;
        }
        this.focusableDays[this.currentFocusedDayIndex].focus();
    }

    writeValue(value: any): void {
        this.selectedDate = value;

        if (!value && this.selectedCalendarDay) {
            // control was resetted
            this.selectedCalendarDay.selected = false;
            this.updateYearMonths(this.minDate, this.maxDate, this.yearMonths);
            this.setCurrentYearMonthOutput();
            this.setPreviousAndNextMonthNavigation();
        }
    }

    registerOnChange(func: any): void {
        this.onChange = func;
    }

    registerOnTouched(func: any): void {
        this.onTouched = func;
    }

    onChange(input: any) {
    }

    onTouched() { }

    controlHasErrors() {
        return (this.control && this.control.errors ? this.control.errors['required'] : false);
    }

    onLeave() {
        this.hasFocus = false;
        if (this.control) {
            if (this.control.updateOn === 'blur') {
                this.control.setValue(this.selectedDate);
            }
            this.control.markAsTouched();
            this.control.markAsDirty();
        }
    }

    onEnter() {
        if (this.disabled || this.readonly) {
            return;
        }
        this.hasFocus = true;
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any) {
        const target = event.target || event.srcElement || event.currentTarget;
        if (!this.elementRef.nativeElement.contains(target)) {
            this.expanded = false;
        }
    }

    setCurrentYearMonthOutput() {
        this.currentYearMonthOutput = new Date(this.yearMonths[this.currentYearMonthIndex].year, this.yearMonths[this.currentYearMonthIndex].month - 1);
    }

    createYearMonths(minDate: Date, maxDate: Date): ICalendarYearMonth[] {

        const yearMonths: ICalendarYearMonth[] = [];
        let tmpMinDate = minDate;
        let tmpMaxDate = maxDate;


        if (tmpMinDate > this.today) {
            tmpMinDate = this.today;
        }
        if (tmpMaxDate < this.today) {
            tmpMaxDate = this.today;
        }

        for (let year = tmpMinDate.getFullYear(); year <= tmpMaxDate.getFullYear(); year++) {
            for (let month = 1; month <= 12; month++) {
                if (new Date(year, month - 1) >= new Date(tmpMinDate.getFullYear(), tmpMinDate.getMonth())
                    && (new Date(year, month - 1) <= new Date(tmpMaxDate.getFullYear(), tmpMaxDate.getMonth()))) {
                    yearMonths.push({ year: year, month: month, weeks: this.createWeeksAndDays(year, month) } as ICalendarYearMonth);
                }
            }
        }

        return yearMonths;
    }

    getFirstDayInMonth(year: number, month: number) { return new Date(year, month, 1); }

    getLastDayInMonth(year: number, month: number) { return new Date(year, month, 0); }

    getNumberOfWeeks(year: number, month: number): number {
        const firstDayOfWeek = 1;
        const firstDayOfMonth = this.getFirstDayInMonth(year, month - 1);
        const lastDayOfMonth = this.getLastDayInMonth(year, month);
        const numberOfDaysInMonth = lastDayOfMonth.getDate();
        const firstWeekDay = (firstDayOfMonth.getDay() - firstDayOfWeek + 7) % 7;
        const used = firstWeekDay + numberOfDaysInMonth;

        return Math.ceil(used / 7);
    }

    private createWeeks(year: number, month: number): ICalendarWeek[] {
        const weeks: ICalendarWeek[] = [];
        const numberOfWeeks = this.getNumberOfWeeks(year, month);

        for (let i = 1; i <= numberOfWeeks; i++) {
            weeks.push({} as ICalendarWeek);
        }
        return weeks;
    }

    private createWeeksAndDays(year: number, month: number): ICalendarWeek[] {
        const weeks: ICalendarWeek[] = this.createWeeks(year, month);
        const firstWeek: ICalendarWeek = this.createFirstWeek(year, month);
        const lastWeek: ICalendarWeek = this.createLastWeek(year, month);
        const secondWeekIndex = 1;
        const secondLastWeekIndex = weeks.length - 2;
        const lastWeekIndex = weeks.length - 1;

        let dayNumber = firstWeek.days[6].day.getDate() + 1;

        weeks[0] = firstWeek;

        for (let iWeekIndex = secondWeekIndex; iWeekIndex <= secondLastWeekIndex + 1; iWeekIndex++) {
            let weekContainer: ICalendarWeek;
            weekContainer = {} as ICalendarWeek;
            const daysContainer: ICalendarDay[] = [];
            weekContainer.days = [];
            for (let iDayIndex = 0; iDayIndex < 7; iDayIndex++) {
                weekContainer.days.push({ day: new Date(year, month - 1, dayNumber), disabled: false } as ICalendarDay);
                dayNumber++;
            }
            weeks[iWeekIndex] = weekContainer;
        }

        weeks[lastWeekIndex] = lastWeek;

        return weeks;
    }

    private createFirstWeek(year: number, month: number): ICalendarWeek {
        const firstDayOfMonth = this.getFirstDayInMonth(year, month - 1);
        const calendarWeek: ICalendarWeek = {} as ICalendarWeek;
        calendarWeek.days = [];

        let daynumber = 1;

        for (let i = 0; i < 7; i++) {
            if (i < (this.getSwedishDayNumbersInWeek(firstDayOfMonth.getDay()))) {
                calendarWeek.days.push(null);
            } else {
                calendarWeek.days.push({ day: new Date(year, month - 1, daynumber), disabled: false } as ICalendarDay);
                daynumber++;
            }
        }
        return calendarWeek;
    }

    private createLastWeek(year: number, month: number): ICalendarWeek {
        const lastDayOfMonth = this.getLastDayInMonth(year, month);
        const calendarWeek: ICalendarWeek = {} as ICalendarWeek;
        calendarWeek.days = [];

        let daynumber = lastDayOfMonth.getDate() - this.getSwedishDayNumbersInWeek(lastDayOfMonth.getDay());

        for (let i = 0; i < 7; i++) {
            if (i <= (this.getSwedishDayNumbersInWeek(lastDayOfMonth.getDay()))) {
                calendarWeek.days.push({ day: new Date(year, month - 1, daynumber), disabled: false } as ICalendarDay);
                daynumber++;
            } else { calendarWeek.days.push(null); }
        }

        return calendarWeek;
    }

    getSwedishDayNumbersInWeek(weekNumber: number): number {
        return weekNumber > 0 ? weekNumber - 1 : 6;
    }

    private updateYearMonths(minDate: Date, maxDate: Date, yearMonths: ICalendarYearMonth[]) {
        yearMonths.forEach((month, index) => {
            month.weeks.forEach((week, weekindex) => {
                week.days.forEach((calendarDay, dayindex) => {
                    if (calendarDay != null) {

                        const currentDatePosition = calendarDay.day.toDateString();
                        const currentselectedDate = this.selectedDate ? this.selectedDate.toDateString() : this.selectedDate;
                        const currentTodayDate = this.today.toDateString();

                        // Set disabled dates
                        if (calendarDay.day < minDate || calendarDay.day > maxDate) {
                            month.weeks[weekindex].days[dayindex].disabled = true;
                        }

                        // Set current selected date
                        if (currentselectedDate !== undefined && currentDatePosition === currentselectedDate) {
                            this.setSelectedDay(calendarDay);
                            this.currentYearMonthIndex = index;
                        }

                        // Set today's date
                        if (currentDatePosition === currentTodayDate) {
                            calendarDay.isCurrentDay = true;
                            if (this.selectedDate === null || this.selectedDate === undefined) {
                                this.currentYearMonthIndex = index;
                            }
                        }
                    }
                });
            });
        });
    }

    private setSelectedDay(calendarDay: ICalendarDay) {

        if (this.selectedCalendarDay) {
            this.selectedCalendarDay.selected = false;
        }
        calendarDay.selected = true;
        this.selectedCalendarDay = calendarDay;
        this.setPreviousAndNextMonthNavigation();
    }

    onCalendarMousedown(event: Event) {
        // används för att stoppa events från att bubbla ut
        event.cancelBubble = true;
    }

    toggleCalendar(event: Event) {

        if (this.disabled || this.readonly) {
            return;
        }
        this.expanded = !this.expanded;
        if (this.expanded) {
            setTimeout(() => {
                this.setFocusedElement();
            }, 50);
        } else {
            // set focus on component
            this.elementRef.nativeElement.querySelector('.datepicker').focus();
        }
    }

    onPreviousMonth(event: Event) {
        event.cancelBubble = true;
        if (this.previousMonth) {

            this.currentYearMonthIndex = this.currentYearMonthIndex - 1;
            this.setCurrentYearMonthOutput();
            this.setPreviousAndNextMonthNavigation();
        }
    }

    onNextMonth(event: Event) {
        event.cancelBubble = true;
        if (this.nextMonth) {
            this.currentYearMonthIndex = this.currentYearMonthIndex + 1;
            this.setCurrentYearMonthOutput();
            this.setPreviousAndNextMonthNavigation();
        }
    }

    onSelectedDate(event: Event, currentYearMonthIndex: number, weekIndex: number, dayIndex: number) {
        const clickedDate = this.yearMonths[currentYearMonthIndex].weeks[weekIndex].days[dayIndex];

        if (!clickedDate || clickedDate.disabled) {
            return;
        }
        event.cancelBubble = true;
        this.selectedDate = clickedDate.day;
        this.setSelectedDay(clickedDate);

        this.expanded = false;
        this.onChange(clickedDate.day);
        this.selectedDateChanged.emit(clickedDate.day);
        this.changeDetectorRef.detectChanges();

        if (this.control) {
            this.control.setValue(clickedDate.day);
        }
    }

    onDateKeyDown(event: KeyboardEvent, currentYearMonthIndex: number, weekIndex: number, dayIndex: number) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            const clickedDate = this.yearMonths[currentYearMonthIndex].weeks[weekIndex].days[dayIndex];

            if (!clickedDate || clickedDate.disabled) {
                return;
            }
            this.selectedDate = clickedDate.day;
            this.setSelectedDay(clickedDate);

            this.onChange(clickedDate.day);
            this.selectedDateChanged.emit(clickedDate.day);
            this.changeDetectorRef.detectChanges();

            if (this.control) {
                this.control.setValue(clickedDate.day);
            }
        }
    }

    checkDisabledDate(weekIndex: number, dayIndex: number): boolean {
        return this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex] === null || this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex].disabled;
    }

    checkTodayDate(weekIndex: number, dayIndex: number): boolean {
        return this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex] !== null && this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex].isCurrentDay;
    }

    checkSelectedDate(weekIndex: number, dayIndex: number): boolean {
        return this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex] !== null && !!this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex].selected;
    }

    setPreviousAndNextMonthNavigation() {
        let tmpMinDate = this.minDate;
        let tmpMaxDate = this.maxDate;
        if (tmpMinDate > this.today) {
            tmpMinDate = this.today;
        }
        if (tmpMaxDate < this.today) {
            tmpMaxDate = this.today;
        }

        const minMonth = tmpMinDate.getMonth() + 1;
        const maxMonth = tmpMaxDate.getMonth() + 1;
        const minYear = tmpMinDate.getFullYear();
        const maxYear = tmpMaxDate.getFullYear();

        const currentMonth = this.yearMonths[this.currentYearMonthIndex].month;
        const currentYear = this.yearMonths[this.currentYearMonthIndex].year;
        if ((currentYear === minYear && currentMonth === minMonth) && (currentYear === maxYear && currentMonth === maxMonth)) {
            this.previousMonth = false;
            this.nextMonth = false;
        } else if (currentYear <= minYear && currentMonth <= minMonth) {
            this.previousMonth = false;
            this.nextMonth = true;
        } else if (currentYear >= maxYear && currentMonth >= maxMonth) {
            this.nextMonth = false;
            this.previousMonth = true;
        } else {
            this.previousMonth = true;
            this.nextMonth = true;
        }
    }

    onKeyDown(event: KeyboardEvent) {
        switch (event.keyCode) {
            case 9: // tab
                {
                    this.expanded = false;
                    break;
                }
            case 13: // enter
            case 32: // space
                {
                    this.toggleCalendar(event);
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
            case 27: // escape
                {
                    if (this.expanded) {
                        this.toggleCalendar(event);
                    }
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
            case 33: // pageUp
                {
                    if (event.shiftKey && this.currentYearMonthIndex - 12 >= 0) {
                        this.currentYearMonthIndex = this.currentYearMonthIndex - 12;
                        this.setCurrentYearMonthOutput();
                        this.setPreviousAndNextMonthNavigation();
                        setTimeout(() => {
                            this.setFocusableItems();
                            this.focusableDays[this.currentFocusedDayIndex].focus();
                        }, 10);
                    } else if (!event.shiftKey && this.previousMonth) {
                        this.onPreviousMonth(event);
                        setTimeout(() => {
                            this.setFocusableItems();
                            if (this.currentFocusedDayIndex >= this.focusableDays.length) {
                                this.currentFocusedDayIndex = this.focusableDays.length - 1;
                            }
                            this.focusableDays[this.currentFocusedDayIndex].focus();
                        }, 10);
                    }
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
            case 34: // pageDown
                {
                    if (event.shiftKey && this.currentYearMonthIndex + 12 < this.yearMonths.length) {
                        this.currentYearMonthIndex = this.currentYearMonthIndex + 12;
                        this.setCurrentYearMonthOutput();
                        this.setPreviousAndNextMonthNavigation();
                        setTimeout(() => {
                            this.setFocusableItems();
                            this.focusableDays[this.currentFocusedDayIndex].focus();
                        }, 10);
                    } else if (!event.shiftKey && this.nextMonth) {
                        this.onNextMonth(event);
                        setTimeout(() => {
                            this.setFocusableItems();
                            if (this.currentFocusedDayIndex >= this.focusableDays.length) {
                                this.currentFocusedDayIndex = this.focusableDays.length - 1;
                            }
                            this.focusableDays[this.currentFocusedDayIndex].focus();

                        }, 10);
                    }
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
            case 35: // end
                {
                    if (event.ctrlKey) {
                        const currentMonth = this.yearMonths[this.currentYearMonthIndex].month;

                        this.currentYearMonthIndex = this.currentYearMonthIndex + (12 - currentMonth);
                        if (this.currentYearMonthIndex > this.yearMonths.length - 1) {
                            this.currentYearMonthIndex = this.yearMonths.length - 1;
                        }

                        this.setCurrentYearMonthOutput();
                        this.setPreviousAndNextMonthNavigation();
                        setTimeout(() => {
                            this.setFocusableItems();
                            this.currentFocusedDayIndex = this.focusableDays.length - 1;
                            this.focusableDays[this.currentFocusedDayIndex].focus();

                        }, 10);
                    } else {
                        this.currentFocusedDayIndex = this.focusableDays.length - 1;
                        this.focusableDays[this.currentFocusedDayIndex].focus();
                    }
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
            case 36: // home
                {
                    if (event.ctrlKey) {
                        const currentMonth = this.yearMonths[this.currentYearMonthIndex].month;

                        this.currentYearMonthIndex = this.currentYearMonthIndex - (currentMonth - 1);
                        if (this.currentYearMonthIndex < 0) {
                            this.currentYearMonthIndex = 0;
                        }
                        this.setCurrentYearMonthOutput();
                        this.setPreviousAndNextMonthNavigation();
                        setTimeout(() => {
                            this.setFocusableItems();
                            this.currentFocusedDayIndex = 0;
                            this.focusableDays[this.currentFocusedDayIndex].focus();
                        }, 10);
                    } else {
                        this.currentFocusedDayIndex = 0;
                        this.focusableDays[this.currentFocusedDayIndex].focus();
                    }
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
            case 37: // arrow left
                {
                    if (this.currentFocusedDayIndex > 0) {
                        this.currentFocusedDayIndex = this.currentFocusedDayIndex - 1;
                        this.focusableDays[this.currentFocusedDayIndex].focus();
                    } else if (this.previousMonth) {
                        this.onPreviousMonth(event);
                        setTimeout(() => {
                            this.setFocusableItems();
                            this.currentFocusedDayIndex = this.focusableDays.length - 1;
                            this.focusableDays[this.currentFocusedDayIndex].focus();
                        }, 10);
                    }
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
            case 38: // arrow up
                {
                    if (this.currentFocusedDayIndex < 7) {
                        if (this.previousMonth) {
                            this.onPreviousMonth(event);
                            setTimeout(() => {
                                this.setFocusableItems();
                                this.currentFocusedDayIndex = this.focusableDays.length - (7 - this.currentFocusedDayIndex);
                                this.focusableDays[this.currentFocusedDayIndex].focus();
                            }, 10);
                        }
                    } else {
                        this.currentFocusedDayIndex = this.currentFocusedDayIndex - 7;
                        this.focusableDays[this.currentFocusedDayIndex].focus();
                    }
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
            case 39: // arrow right
                {
                    if (this.currentFocusedDayIndex < this.focusableDays.length - 1) {
                        this.currentFocusedDayIndex = this.currentFocusedDayIndex + 1;
                        this.focusableDays[this.currentFocusedDayIndex].focus();
                    } else if (this.nextMonth) {
                        this.onNextMonth(event);
                        setTimeout(() => {
                            this.setFocusableItems();
                            this.currentFocusedDayIndex = 0;
                            this.focusableDays[this.currentFocusedDayIndex].focus();
                        }, 10);
                    }
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
            case 40: // arrow down
                {
                    if ((this.currentFocusedDayIndex + 7) > (this.focusableDays.length - 1)) {
                        const daysInCurrentMonth = this.focusableDays.length;
                        if (this.nextMonth) {
                            this.onNextMonth(event);
                            setTimeout(() => {
                                this.setFocusableItems();
                                this.currentFocusedDayIndex = this.currentFocusedDayIndex + 7 - daysInCurrentMonth;
                                this.focusableDays[this.currentFocusedDayIndex].focus();
                            }, 10);
                        }
                    } else {
                        this.currentFocusedDayIndex = this.currentFocusedDayIndex + 7;
                        this.focusableDays[this.currentFocusedDayIndex].focus();
                    }
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
        }
    }
}
