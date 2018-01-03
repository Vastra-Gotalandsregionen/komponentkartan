"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var validation_component_1 = require("../../controls/validation/validation.component");
var forms_1 = require("@angular/forms");
var DatepickerComponent = DatepickerComponent_1 = (function (_super) {
    __extends(DatepickerComponent, _super);
    function DatepickerComponent(elementRef, changeDetectorRef, controlContainer) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.controlContainer = controlContainer;
        _this.selectedDateFormat = 'yyyy-MM-dd';
        _this.tooltipDateFormat = 'yyyy-MM-dd';
        _this.selectedDateChanged = new core_1.EventEmitter();
        _this.yearMonths = [];
        _this.currentYearMonthIndex = 0;
        _this.today = new Date();
        _this.isDatePickerVisible = false;
        _this.nextMonth = true;
        _this.previousMonth = true;
        _this.minDate = new Date(_this.today.getFullYear(), 0, 1);
        _this.maxDate = new Date(_this.today.getFullYear(), 11, 31);
        return _this;
    }
    ;
    DatepickerComponent.prototype.ngOnChanges = function () {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
    };
    DatepickerComponent.prototype.writeValue = function (value) {
        this.selectedDate = value;
    };
    DatepickerComponent.prototype.registerOnChange = function (func) {
        this.onChange = func;
    };
    DatepickerComponent.prototype.registerOnTouched = function (func) {
        this.onTouched = func;
    };
    DatepickerComponent.prototype.onChange = function (input) {
    };
    DatepickerComponent.prototype.onTouched = function () { };
    DatepickerComponent.prototype.doValidate = function () {
        var isValid = (!this.required || this.selectedDate) && !this.controlHasErrors();
        return {
            isValid: isValid,
            validationError: isValid ? '' : 'Obligatoriskt'
        };
    };
    DatepickerComponent.prototype.controlHasErrors = function () {
        return (this.control && this.control.errors ? this.control.errors['required'] : false);
    };
    DatepickerComponent.prototype.onLeave = function (event) {
        if (!event) {
            this.validate();
            this.isDatePickerVisible = false;
            return;
        }
        var focusedElement = event.relatedTarget;
        if (focusedElement === null || !this.elementRef.nativeElement.contains(focusedElement)) {
            //validera endast om vi är påväg från komponenten
            this.validate();
            this.isDatePickerVisible = false;
        }
    };
    DatepickerComponent.prototype.onEnter = function () {
        if (this.disabled || this.readonly) {
            return;
        }
        this.setValidationStateEditing();
    };
    DatepickerComponent.prototype.ngOnInit = function () {
        this.yearMonths = this.createYearMonths(this.minDate, this.maxDate);
        this.updateYearMonths(this.minDate, this.maxDate, this.yearMonths);
        this.setCurrentYearMonthOutput();
        this.setPreviousAndNextMonthNavigation();
    };
    DatepickerComponent.prototype.setCurrentYearMonthOutput = function () {
        this.currentYearMonthOutput = new Date(this.yearMonths[this.currentYearMonthIndex].year, this.yearMonths[this.currentYearMonthIndex].month - 1);
    };
    DatepickerComponent.prototype.createYearMonths = function (minDate, maxDate) {
        var yearMonths = [];
        var tmpMinDate = minDate;
        var tmpMaxDate = maxDate;
        if (tmpMinDate > this.today) {
            tmpMinDate = this.today;
        }
        ;
        if (tmpMaxDate < this.today) {
            tmpMaxDate = this.today;
        }
        ;
        for (var year = tmpMinDate.getFullYear(); year <= tmpMaxDate.getFullYear(); year++) {
            for (var month = 1; month <= 12; month++) {
                if (new Date(year, month - 1) >= new Date(tmpMinDate.getFullYear(), tmpMinDate.getMonth())
                    && (new Date(year, month - 1) <= new Date(tmpMaxDate.getFullYear(), tmpMaxDate.getMonth()))) {
                    yearMonths.push({ year: year, month: month, weeks: this.createWeeksAndDays(year, month) });
                }
            }
        }
        return yearMonths;
    };
    DatepickerComponent.prototype.getFirstDayInMonth = function (year, month) { return new Date(year, month, 1); };
    DatepickerComponent.prototype.getLastDayInMonth = function (year, month) { return new Date(year, month, 0); };
    DatepickerComponent.prototype.getNumberOfWeeks = function (year, month) {
        var firstDayOfWeek = 1;
        var firstDayOfMonth = this.getFirstDayInMonth(year, month - 1);
        var lastDayOfMonth = this.getLastDayInMonth(year, month);
        var numberOfDaysInMonth = lastDayOfMonth.getDate();
        var firstWeekDay = (firstDayOfMonth.getDay() - firstDayOfWeek + 7) % 7;
        var used = firstWeekDay + numberOfDaysInMonth;
        return Math.ceil(used / 7);
    };
    DatepickerComponent.prototype.createWeeks = function (year, month) {
        var weeks = [];
        var numberOfWeeks = this.getNumberOfWeeks(year, month);
        for (var i = 1; i <= numberOfWeeks; i++) {
            weeks.push({});
        }
        return weeks;
    };
    DatepickerComponent.prototype.createWeeksAndDays = function (year, month) {
        var weeks = this.createWeeks(year, month);
        var firstWeek = this.createFirstWeek(year, month);
        var lastWeek = this.createLastWeek(year, month);
        var secondWeekIndex = 1;
        var secondLastWeekIndex = weeks.length - 2;
        var lastWeekIndex = weeks.length - 1;
        var dayNumber = firstWeek.days[6].day.getDate() + 1;
        weeks[0] = firstWeek;
        for (var iWeekIndex = secondWeekIndex; iWeekIndex <= secondLastWeekIndex + 1; iWeekIndex++) {
            var weekContainer = void 0;
            weekContainer = {};
            var daysContainer = [];
            weekContainer.days = [];
            for (var iDayIndex = 0; iDayIndex < 7; iDayIndex++) {
                weekContainer.days.push({ day: new Date(year, month - 1, dayNumber), disabled: false });
                dayNumber++;
            }
            weeks[iWeekIndex] = weekContainer;
        }
        weeks[lastWeekIndex] = lastWeek;
        return weeks;
    };
    DatepickerComponent.prototype.createFirstWeek = function (year, month) {
        var firstDayOfMonth = this.getFirstDayInMonth(year, month - 1);
        var calendarWeek = {};
        calendarWeek.days = [];
        var daynumber = 1;
        for (var i = 0; i < 7; i++) {
            if (i < (this.getSwedishDayNumbersInWeek(firstDayOfMonth.getDay()))) {
                calendarWeek.days.push(null);
            }
            else {
                calendarWeek.days.push({ day: new Date(year, month - 1, daynumber), disabled: false });
                daynumber++;
            }
        }
        return calendarWeek;
    };
    DatepickerComponent.prototype.createLastWeek = function (year, month) {
        var lastDayOfMonth = this.getLastDayInMonth(year, month);
        var calendarWeek = {};
        calendarWeek.days = [];
        var daynumber = lastDayOfMonth.getDate() - this.getSwedishDayNumbersInWeek(lastDayOfMonth.getDay());
        for (var i = 0; i < 7; i++) {
            if (i <= (this.getSwedishDayNumbersInWeek(lastDayOfMonth.getDay()))) {
                calendarWeek.days.push({ day: new Date(year, month - 1, daynumber), disabled: false });
                daynumber++;
            }
            else {
                calendarWeek.days.push(null);
            }
            ;
        }
        return calendarWeek;
    };
    DatepickerComponent.prototype.getSwedishDayNumbersInWeek = function (weekNumber) {
        switch (weekNumber) {
            case 0: {
                return 6;
            }
            case 1: {
                return 0;
            }
            case 2: {
                return 1;
            }
            case 3: {
                return 2;
            }
            case 4: {
                return 3;
            }
            case 5: {
                return 4;
            }
            case 6: {
                return 5;
            }
        }
    };
    DatepickerComponent.prototype.updateYearMonths = function (minDate, maxDate, yearMonths) {
        var _this = this;
        yearMonths.forEach(function (month, index) {
            month.weeks.forEach(function (week, weekindex) {
                week.days.forEach(function (calendarDay, dayindex) {
                    if (calendarDay != null) {
                        var currentDatePosition = calendarDay.day.toDateString();
                        var currentselectedDate = _this.selectedDate !== undefined ? _this.selectedDate.toDateString() : _this.selectedDate;
                        var currentTodayDate = _this.today.toDateString();
                        // Set disabled dates
                        if (calendarDay.day < minDate || calendarDay.day > maxDate) {
                            month.weeks[weekindex].days[dayindex].disabled = true;
                        }
                        // Set current selected date
                        if (currentselectedDate !== undefined && currentDatePosition === currentselectedDate) {
                            _this.setSelectedDay(calendarDay);
                            _this.currentYearMonthIndex = index;
                        }
                        // Set today's date
                        if (currentDatePosition === currentTodayDate) {
                            calendarDay.isCurrentDay = true;
                            if (_this.selectedDate === null || _this.selectedDate === undefined) {
                                _this.currentYearMonthIndex = index;
                            }
                        }
                    }
                });
            });
        });
    };
    DatepickerComponent.prototype.setSelectedDay = function (calendarDay) {
        if (this.selectedCalendarDay) {
            this.selectedCalendarDay.selected = false;
        }
        calendarDay.selected = true;
        this.selectedCalendarDay = calendarDay;
        this.setPreviousAndNextMonthNavigation();
    };
    DatepickerComponent.prototype.onCalendarClick = function (event) {
        //används för att stoppa events från att bubbla ut
        event.cancelBubble = true;
    };
    DatepickerComponent.prototype.onDatePickerClick = function (event) {
        if (this.disabled || this.readonly) {
            return;
        }
        this.isDatePickerVisible = !this.isDatePickerVisible;
    };
    DatepickerComponent.prototype.onPreviousMonth = function (event) {
        event.cancelBubble = true;
        if (this.previousMonth) {
            this.currentYearMonthIndex = this.currentYearMonthIndex - 1;
            this.setCurrentYearMonthOutput();
            this.setPreviousAndNextMonthNavigation();
        }
    };
    DatepickerComponent.prototype.onNextMonth = function (event) {
        event.cancelBubble = true;
        if (this.nextMonth) {
            this.currentYearMonthIndex = this.currentYearMonthIndex + 1;
            this.setCurrentYearMonthOutput();
            this.setPreviousAndNextMonthNavigation();
        }
    };
    DatepickerComponent.prototype.onSelectedDate = function (event, currentYearMonthIndex, weekIndex, dayIndex) {
        var clickedDate = this.yearMonths[currentYearMonthIndex].weeks[weekIndex].days[dayIndex];
        if (!clickedDate || clickedDate.disabled) {
            return;
        }
        event.cancelBubble = true;
        this.selectedDate = clickedDate.day;
        this.setSelectedDay(clickedDate);
        this.isDatePickerVisible = false;
        this.onChange(clickedDate.day);
        this.validate();
        this.selectedDateChanged.emit(clickedDate.day);
        this.changeDetectorRef.detectChanges();
    };
    DatepickerComponent.prototype.checkDisabledDate = function (weekIndex, dayIndex) {
        return this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex] === null || this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex].disabled;
    };
    DatepickerComponent.prototype.checkTodayDate = function (weekIndex, dayIndex) {
        return this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex] !== null && this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex].isCurrentDay;
    };
    DatepickerComponent.prototype.checkSelectedDate = function (weekIndex, dayIndex) {
        return this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex] !== null && this.yearMonths[this.currentYearMonthIndex].weeks[weekIndex].days[dayIndex].selected;
    };
    DatepickerComponent.prototype.setPreviousAndNextMonthNavigation = function () {
        var tmpMinDate = this.minDate;
        var tmpMaxDate = this.maxDate;
        if (tmpMinDate > this.today) {
            tmpMinDate = this.today;
        }
        ;
        if (tmpMaxDate < this.today) {
            tmpMaxDate = this.today;
        }
        ;
        var minMonth = tmpMinDate.getMonth() + 1;
        var maxMonth = tmpMaxDate.getMonth() + 1;
        var minYear = tmpMinDate.getFullYear();
        var maxYear = tmpMaxDate.getFullYear();
        var currentMonth = this.yearMonths[this.currentYearMonthIndex].month;
        var currentYear = this.yearMonths[this.currentYearMonthIndex].year;
        if ((currentYear === minYear && currentMonth === minMonth) && (currentYear === maxYear && currentMonth === maxMonth)) {
            this.previousMonth = false;
            this.nextMonth = false;
        }
        else if (currentYear <= minYear && currentMonth <= minMonth) {
            this.previousMonth = false;
        }
        else if (currentYear >= maxYear && currentMonth >= maxMonth) {
            this.nextMonth = false;
        }
        else if ((currentYear >= minYear && currentYear <= maxYear) && (currentMonth >= minMonth && currentMonth <= maxMonth)) {
            this.previousMonth = true;
            this.nextMonth = true;
        }
    };
    return DatepickerComponent;
}(validation_component_1.ValidationComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DatepickerComponent.prototype, "minDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DatepickerComponent.prototype, "maxDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], DatepickerComponent.prototype, "selectedDate", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.disabled'),
    __metadata("design:type", Boolean)
], DatepickerComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.readonly'),
    __metadata("design:type", Boolean)
], DatepickerComponent.prototype, "readonly", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatepickerComponent.prototype, "selectedDateFormat", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], DatepickerComponent.prototype, "tooltipDateFormat", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DatepickerComponent.prototype, "required", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DatepickerComponent.prototype, "selectedDateChanged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DatepickerComponent.prototype, "formControlName", void 0);
DatepickerComponent = DatepickerComponent_1 = __decorate([
    core_1.Component({
        selector: 'vgr-datepicker',
        moduleId: module.id,
        templateUrl: './datepicker.component.html',
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return DatepickerComponent_1; }),
                multi: true
            }, { provide: validation_component_1.ValidationComponent, useExisting: core_1.forwardRef(function () { return DatepickerComponent_1; }) }]
    }),
    __param(2, core_1.Optional()), __param(2, core_1.Host()), __param(2, core_1.SkipSelf()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.ChangeDetectorRef, forms_1.ControlContainer])
], DatepickerComponent);
exports.DatepickerComponent = DatepickerComponent;
var DatepickerComponent_1;
//# sourceMappingURL=datepicker.component.js.map