import {
    Component, Input, EventEmitter, Output, OnChanges, HostBinding, OnInit, HostListener, ElementRef, forwardRef,
    ChangeDetectorRef, SkipSelf, Optional, Host
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
export class MonthpickerComponent implements OnInit, OnChanges, ControlValueAccessor {

    today: Date = new Date();
    @Input() showValidation = true;
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() selectedDate?: Date;
    @Input() required: boolean;
    @Input() @HostBinding('class.disabled') disabled: boolean;
    @Input() @HostBinding('class.readonly') readonly: boolean;
    @Input() selectedDateFormat = 'MMM yyyy';
    @Input() tooltipDateFormat = 'MMMM yyyy';
    @Input() formControlName?: string;

    @Output() selectedDateChanged = new EventEmitter<Date>();

    @HostBinding('class.validated-input') hasClass = true;
    @HostBinding('class.validation-error--active') get errorClass() {
        return this.showValidation && this.control.invalid && !this.hasFocus;
    }
    @HostBinding('class.validation-error--editing') get editingClass() {
        return this.showValidation && this.control.invalid && this.hasFocus;
    }

    invalidOnFocus = false;
    hasFocus = false;

    displayedYear: ICalendarYear = {} as ICalendarYear;
    previousYear: ICalendarYear;
    nextYear: ICalendarYear;

    years: ICalendarYear[];
    expanded: boolean;
    control: AbstractControl;
    protected preventCollapse: boolean;

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

    ngOnChanges() {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
    }
    writeValue(value: any): void {
        this.selectedDate = value;
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

        if (this.control.updateOn === 'blur') {
            this.control.setValue(this.selectedDate);
        }
    }

    onEnter() {
        if (this.disabled || this.readonly) {
            return;
        }
        this.hasFocus = true;
        this.invalidOnFocus = this.control.invalid && this.control.touched;
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
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.toggleCalendar(event);
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
        if (this.preventCollapse) {
            event.cancelBubble = true;
            event.returnValue = false;
            this.preventCollapse = false;
        } else {
            this.toggleExpand(event);
        }

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
        this.selectedDate = selectedMonth.date;
        this.changeDetectorRef.detectChanges();
        this.onChange(selectedMonth.date);
    }
}
