import {
    Component, Input, EventEmitter, Output, OnChanges, HostBinding, OnInit, HostListener, ElementRef, forwardRef,
    ChangeDetectorRef
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { ICalendarMonth } from '../../models/calendarMonth.model';
import { ICalendarYear } from '../../models/calendarYear.model';
import { IValidationResult } from '../../models/validation.model';
import { ValidationComponent } from '../../controls/validation/validation.component';


@Component({
    selector: 'vgr-monthpicker',
    moduleId: module.id,
    templateUrl: './monthpicker.component.html',
    providers: [{ provide: ValidationComponent, useExisting: forwardRef(() => MonthpickerComponent) }]

})
export class MonthpickerComponent extends ValidationComponent implements OnInit {

    today: Date = new Date();
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() selectedDate?: Date;
    @Input() required: boolean;
    @Input() @HostBinding('class.disabled') disabled: boolean;
    @Input() @HostBinding('class.readonly') readonly: boolean;
    @Input() selectedDateFormat = 'MMM yyyy';
    @Input() tooltipDateFormat = 'MMMM yyyy';

    @Output() selectedDateChanged = new EventEmitter<Date>();

    displayedYear: ICalendarYear = {} as ICalendarYear;
    previousYear: ICalendarYear;
    nextYear: ICalendarYear;

    years: ICalendarYear[];
    expanded: boolean;
    protected preventCollapse: boolean;

    constructor(protected elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
        super();
        this.expanded = false;
        this.years = [];
        this.minDate = new Date(this.today.getFullYear(), 0, 1);
        this.maxDate = new Date(this.today.getFullYear(), 11, 31);
    };

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

    setDisplayedYear(chosenDate: Date) {
        if (chosenDate) {
            this.displayedYear = this.years.filter(y => y.year === chosenDate.getFullYear())[0];
        } else {
            this.displayedYear = this.years.filter(y => y.year === this.today.getFullYear())[0];
        }

        let index: number;
        if (this.years.length > 1) {
            index = this.years.indexOf(this.displayedYear)

            if (this.years[index - 1]) {
                this.previousYear = this.years[index - 1]
            } else {
                this.previousYear = undefined;
            }
            if (this.years[index + 1]) {
                this.nextYear = this.years[index + 1]
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
        };
        if (tmpMaxDate < this.today) {
            tmpMaxDate = this.today;
        };

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

    doValidate(): IValidationResult {
        if (this.required && !this.selectedDate) {
            return { isValid: false, validationError: 'Obligatoriskt' } as IValidationResult;
        } else {
            return { isValid: true, validationError: '' } as IValidationResult;
        }
    }

    onLeave() {
        this.validate();
    }

    onEnter() {

        if (this.disabled || this.readonly) {
            return;
        }

        this.setValidationStateEditing();
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
        this.selectDate(selectedMonth)
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

        this.validate();
    }


}
