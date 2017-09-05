import { Component, Input, EventEmitter, Output, OnChanges, HostBinding, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ICalendarMonth } from '../../models/calendarMonth.model';
import { ICalendarYear } from '../../models/calendarYear.model';

@Component({
    selector: 'vgr-monthpicker',
    moduleId: module.id,
    templateUrl: './monthpicker.component.html'
})
export class MonthpickerComponent implements OnInit {
    today: Date = new Date();

    @Output() selectedDateChanged = new EventEmitter<Date>();
    @Input() selectedDateFormat: string = 'MMM yyyy';
    @Input() minDate: Date;
    @Input() maxDate: Date;
    @Input() preselectedDate?: Date;

    @Input() displayedYear: ICalendarYear;
    @Input() previousYear: ICalendarYear;
    @Input() nextYear: ICalendarYear;

    selectedDate?: Date;
    years: ICalendarYear[];
    expanded: boolean;
    protected preventCollapse: boolean;

    constructor() {
        this.expanded = false;
        this.years = [];
        this.minDate = new Date(this.today.getFullYear(), 0, 1);
        this.maxDate = new Date(this.today.getFullYear(), 11, 31);
    };

    ngOnInit() {

        this.years = [];

        if (this.preselectedDate) {
            this.selectedDate = this.preselectedDate;

            if (this.selectedDate.getFullYear() < this.today.getFullYear())
                this.minDate = new Date(this.selectedDate.getFullYear(), 0, 1);


            if (this.selectedDate.getFullYear() > this.today.getFullYear())
                this.maxDate = new Date(this.selectedDate.getFullYear(), 11, 1);
        }

        this.createYears();

        this.setDisplayedYear(this.selectedDate);
    }

    setDisplayedYear(chosenDate: Date) {

        if (chosenDate)
            this.displayedYear = this.years.filter(y => y.year === chosenDate.getFullYear())[0];
        else
            this.displayedYear = this.years.filter(y => y.year === this.today.getFullYear())[0];

        let index: number;
        if (this.years.length > 1)
            index = this.years.indexOf(this.displayedYear)
        {
            if (this.years[index - 1])
                this.previousYear = this.years[index - 1]
            else
                this.previousYear = undefined;

            if (this.years[index + 1])
                this.nextYear = this.years[index + 1]
            else
                this.nextYear = undefined;
        }
    }

    createYears() {
        for (let yearNumber = this.minDate.getFullYear(); yearNumber <= this.maxDate.getFullYear(); yearNumber++) {

            let newYear = { year: yearNumber, months: [] } as ICalendarYear;

            for (let monthnumber = 0; monthnumber < 12; monthnumber++) {
                let dateForMonth = new Date(newYear.year, monthnumber, 1);

                let newMonth = {
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

    onNextMouseDown(event: Event) {
        event.cancelBubble = true;

        this.setDisplayedYear(new Date(this.nextYear.year, 0, 1));
    }

    onPreviousMouseDown(event: Event) {
        event.cancelBubble = true;

        this.setDisplayedYear(new Date(this.previousYear.year, 0, 1));
    }

    onMouseDown(event: Event) {
        this.toggleCalendar(event);
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.toggleCalendar(event);
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
        if (!element.is('input')) {
            this.expanded = !this.expanded;
        }
    }

    selectDate(item: Date) {
        if (!item) {
            return;
        }

        /*   this.items.forEach(x => x.selected = false);
  
  
          item.selected = true;
          item.marked = true;
          this.selectedItem = item;
          this.selectedDateChanged.emit(item); */




    }


}
