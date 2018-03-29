import {
    Component, Input, EventEmitter, Output, OnChanges, HostBinding, OnInit, HostListener, ElementRef, forwardRef,
    ChangeDetectorRef, SkipSelf, Optional, Host, SimpleChanges, AfterViewInit
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ICalendarMonth } from '../../models/calendarMonth.model';
import { ICalendarYear } from '../../models/calendarYear.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'vgr-monthpicker',
    moduleId: module.id,
    templateUrl: './monthpicker.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => MonthpickerComponent),
            multi: true
        }]

})
export class MonthpickerComponent implements OnInit, OnChanges, ControlValueAccessor, AfterViewInit {

    @Input() showValidation = true;
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() selectedDateFormat = 'MMM yyyy';
    @Input() tooltipDateFormat = 'MMMM yyyy';
    @Input() formControlName?: string;
    @Input() selectedDate?: Date;

    @Output() selectedDateChanged = new EventEmitter<Date>();

    @Input() @HostBinding('class.disabled') disabled: boolean;
    @Input() @HostBinding('class.readonly') readonly: boolean;

    @HostBinding('class.validated-input') hasClass = true;
    @HostBinding('class.validation-error--active') get errorClass() {
        return this.showValidation && this.control && this.control.invalid && !this.hasFocus;
    }
    @HostBinding('class.validation-error--editing') get editingClass() {
        return this.showValidation && this.control && this.control.invalid && this.hasFocus;
    }

    hasFocus: boolean;

    focusableMonths = [];
    currentFocusedMonth = 0;

    expanded: boolean;
    control: AbstractControl;

    displayedYear: ICalendarYear = {} as ICalendarYear;
    previousYear: ICalendarYear;
    nextYear: ICalendarYear;
    today: Date = new Date();
    years: ICalendarYear[];

    validationErrorMessage = 'Obligatoriskt';

    constructor(protected elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef, @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
        this.expanded = false;
        this.years = [];
        this.minDate = new Date(this.today.getFullYear(), 0, 1);
        this.maxDate = new Date(this.today.getFullYear(), 11, 31);
    }

    ngOnInit() {
        this.years = [];
        if (this.selectedDate) {
            if (this.selectedDate.getFullYear() < this.today.getFullYear()) {
                this.minDate = new Date(this.selectedDate.getFullYear(), 0, 1);
            }

            if (this.selectedDate.getFullYear() > this.today.getFullYear()) {
                this.maxDate = new Date(this.selectedDate.getFullYear(), 11, 1);
            }

        }
        this.createYears();
        this.setDisplayedYear(this.selectedDate);
    }

    ngAfterViewInit() {
        this.setFocusableItems();
    }

    ngOnChanges(changes: SimpleChanges) {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
        this.setFocusableItems();
    }

    setFocusableItems() {
        this.focusableMonths = this.elementRef.nativeElement.getElementsByTagName('li');
        this.focusableMonths[0].focus();
    }

    writeValue(value: any): void {
        this.selectedDate = value;
        if (!value) {
            this.years.forEach(y => y.months.forEach(m => m.selected = false));
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

    setDisplayedYear(chosenDate: Date) {
        if (chosenDate) {
            this.displayedYear = this.years.filter(y => y.year === chosenDate.getFullYear())[0];
        } else {
            this.displayedYear = this.years.filter(y => y.year === this.today.getFullYear())[0];
        }

        let index: number;
        if (this.years.length > 1) {
            index = this.years.indexOf(this.displayedYear);

            if (this.years[index - 1]) {
                this.previousYear = this.years[index - 1];
            } else {
                this.previousYear = undefined;
            }
            if (this.years[index + 1]) {
                this.nextYear = this.years[index + 1];
            } else {
                this.nextYear = undefined;
            }
        }
    }

    createYears() {

        let tmpMinDate = this.minDate;
        let tmpMaxDate = this.maxDate;
        if (tmpMinDate > this.today) {
            tmpMinDate = this.today;
        }
        if (tmpMaxDate < this.today) {
            tmpMaxDate = this.today;
        }

        for (let yearNumber = tmpMinDate.getFullYear(); yearNumber <= tmpMaxDate.getFullYear(); yearNumber++) {
            const newYear = { year: yearNumber, months: [] } as ICalendarYear;
            for (let monthnumber = 0; monthnumber < 12; monthnumber++) {
                const dateForMonth = new Date(newYear.year, monthnumber, 1);

                const newMonth = {
                    displayName: this.getMonthName(monthnumber), date: dateForMonth,
                    isCurrentMonth: dateForMonth.getFullYear() === this.today.getFullYear() && dateForMonth.getMonth() === this.today.getMonth(),
                    disabled: dateForMonth < this.minDate || dateForMonth > this.maxDate,
                    selected: this.selectedDate === undefined ? false : dateForMonth.getFullYear() === this.selectedDate.getFullYear() && dateForMonth.getMonth() === this.selectedDate.getMonth()
                } as ICalendarMonth;
                newYear.months.push(newMonth);
            }
            this.years.push(newYear);
        }
    }

    getMonthName(monthNumber: number) {
        return monthNumber === 0 ? 'Jan' :
            monthNumber === 1 ? 'Feb' :
                monthNumber === 2 ? 'Mar' :
                    monthNumber === 3 ? 'Apr' :
                        monthNumber === 4 ? 'Maj' :
                            monthNumber === 5 ? 'Jun' :
                                monthNumber === 6 ? 'Jul' :
                                    monthNumber === 7 ? 'Aug' :
                                        monthNumber === 8 ? 'Sep' :
                                            monthNumber === 9 ? 'Okt' :
                                                monthNumber === 10 ? 'Nov' :
                                                    monthNumber === 11 ? 'Dec' : '?';
    }

    controlHasErrors() {
        return (this.control && this.control.errors ? this.control.errors['required'] : false);
    }

    onLeave() {
        this.hasFocus = false;
        if (this.control) {
            this.control.markAsTouched();
            this.control.markAsDirty();
            if (this.control.updateOn === 'blur') {
                this.control.setValue(this.selectedDate);
            }
        }

    }

    onEnter() {
        if (this.disabled || this.readonly) {
            return;
        }
        this.hasFocus = true;
    }

    onNextMouseDown(event: Event) {
        event.cancelBubble = true;

        if (this.nextYear) {
            this.setDisplayedYear(new Date(this.nextYear.year, 0, 1));
        }
    }

    onPreviousMouseDown(event: Event) {
        event.cancelBubble = true;
        if (this.previousYear) {
            this.setDisplayedYear(new Date(this.previousYear.year, 0, 1));
        }
    }

    onMouseDown(event: Event) {
        this.toggleCalendar(event);
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
                    break;
                }
            case 27: // escape
                {
                    this.expanded = false;
                    // this.focusDropdown();
                    event.preventDefault();
                    break;
                }
            case 33: // pageUp
                {
                    this.onPreviousMouseDown(event);
                    this.focusableMonths[this.currentFocusedMonth].focus();
                    break;
                }
            case 34: // pageDown
                {
                    this.onNextMouseDown(event);
                    this.focusableMonths[this.currentFocusedMonth].focus();
                    break;
                }
            case 35: // end
                {
                    this.currentFocusedMonth = 11;
                    this.focusableMonths[this.currentFocusedMonth].focus();
                    break;
                }
            case 36: // home
                {
                    this.currentFocusedMonth = 0;
                    this.focusableMonths[this.currentFocusedMonth].focus();
                    break;
                }
            case 37: // arrow left
                {
                    if (event.shiftKey) {
                        this.onPreviousMouseDown(event);
                    } else {
                        if (this.currentFocusedMonth > 0) {
                            this.currentFocusedMonth = this.currentFocusedMonth - 1;
                        } else if (this.previousYear) {
                            this.onPreviousMouseDown(event);
                            this.currentFocusedMonth = 11;
                        }
                    }
                    this.focusableMonths[this.currentFocusedMonth].focus();
                    break;
                }

            case 38: // arrow up
                {
                    if (this.currentFocusedMonth > 3) {
                        this.currentFocusedMonth = this.currentFocusedMonth - 4;
                    } else if (this.previousYear) {
                        this.onPreviousMouseDown(event);
                        this.currentFocusedMonth = this.currentFocusedMonth + 8;
                    }
                    this.focusableMonths[this.currentFocusedMonth].focus();
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
            case 39: // arrow right
                {
                    if (event.shiftKey) {
                        this.onNextMouseDown(event);
                    } else {
                        if (this.currentFocusedMonth < 11) {
                            this.currentFocusedMonth = this.currentFocusedMonth + 1;
                        } else if (this.nextYear) {
                            this.onNextMouseDown(event);
                            this.currentFocusedMonth = 0;
                        }

                    }
                    this.focusableMonths[this.currentFocusedMonth].focus();
                    break;
                }
            case 40: // arrow dowm
                {
                    if (this.currentFocusedMonth < 8) {
                        this.currentFocusedMonth = this.currentFocusedMonth + 4;
                    } else if (this.nextYear) {
                        this.onNextMouseDown(event);
                        this.currentFocusedMonth = this.currentFocusedMonth - 8;
                    }
                    this.focusableMonths[this.currentFocusedMonth].focus();
                    event.preventDefault();
                    event.cancelBubble = true;
                    break;
                }
        }
    }

    onSelectMonthMouseDown(selectedMonth: ICalendarMonth) {
        this.selectDate(selectedMonth);
    }

    onSelectMonthKeyDown(event: KeyboardEvent) {
        if (event.keyCode === 13 || event.keyCode === 32) {

        }
    }

    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any) {

        const target = event.target || event.srcElement || event.currentTarget;

        if (!this.elementRef.nativeElement.contains(target)) {
            this.expanded = false;
        }
    }

    private toggleCalendar(event: Event) {
        this.toggleExpand(event);

    }

    private toggleExpand(event: Event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const element = $(target);

        if (this.disabled || this.readonly) {
            return;
        }

        if ((element.hasClass('monthpicker__calendar__month') && !element.hasClass('disabled')) ||
            element.hasClass('monthpicker__dropdown') ||
            element.parent().hasClass('monthpicker__dropdown')
        ) {
            this.setDisplayedYear(this.selectedDate);
            this.expanded = !this.expanded;
        }
    }

    private selectDate(selectedMonth: ICalendarMonth) {
        if (!selectedMonth) {
            return;
        }

        if (selectedMonth.disabled) {
            return;
        }


        this.years.forEach(y => y.months.forEach(m => m.selected = false));

        selectedMonth.selected = true;
        this.setDisplayedYear(selectedMonth.date);

        this.selectedDateChanged.emit(selectedMonth.date);
        // Utan detectchanges får man "Value was changed after is was checked" i browser console.
        this.changeDetectorRef.detectChanges();
        this.selectedDate = selectedMonth.date;
        this.onChange(selectedMonth.date);
    }
}
