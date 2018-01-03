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
var MonthpickerComponent = MonthpickerComponent_1 = (function (_super) {
    __extends(MonthpickerComponent, _super);
    function MonthpickerComponent(elementRef, changeDetectorRef, controlContainer) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.changeDetectorRef = changeDetectorRef;
        _this.controlContainer = controlContainer;
        _this.today = new Date();
        _this.selectedDateFormat = 'MMM yyyy';
        _this.tooltipDateFormat = 'MMMM yyyy';
        _this.selectedDateChanged = new core_1.EventEmitter();
        _this.displayedYear = {};
        _this.expanded = false;
        _this.years = [];
        _this.minDate = new Date(_this.today.getFullYear(), 0, 1);
        _this.maxDate = new Date(_this.today.getFullYear(), 11, 31);
        return _this;
    }
    ;
    MonthpickerComponent.prototype.ngOnInit = function () {
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
    };
    MonthpickerComponent.prototype.ngOnChanges = function () {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
    };
    MonthpickerComponent.prototype.writeValue = function (value) {
        this.selectedDate = value;
    };
    MonthpickerComponent.prototype.registerOnChange = function (func) {
        this.onChange = func;
    };
    MonthpickerComponent.prototype.registerOnTouched = function (func) {
        this.onTouched = func;
    };
    MonthpickerComponent.prototype.onChange = function (input) {
    };
    MonthpickerComponent.prototype.onTouched = function () { };
    MonthpickerComponent.prototype.setDisplayedYear = function (chosenDate) {
        var _this = this;
        if (chosenDate) {
            this.displayedYear = this.years.filter(function (y) { return y.year === chosenDate.getFullYear(); })[0];
        }
        else {
            this.displayedYear = this.years.filter(function (y) { return y.year === _this.today.getFullYear(); })[0];
        }
        var index;
        if (this.years.length > 1) {
            index = this.years.indexOf(this.displayedYear);
            if (this.years[index - 1]) {
                this.previousYear = this.years[index - 1];
            }
            else {
                this.previousYear = undefined;
            }
            if (this.years[index + 1]) {
                this.nextYear = this.years[index + 1];
            }
            else {
                this.nextYear = undefined;
            }
        }
    };
    MonthpickerComponent.prototype.createYears = function () {
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
        for (var yearNumber = tmpMinDate.getFullYear(); yearNumber <= tmpMaxDate.getFullYear(); yearNumber++) {
            var newYear = { year: yearNumber, months: [] };
            for (var monthnumber = 0; monthnumber < 12; monthnumber++) {
                var dateForMonth = new Date(newYear.year, monthnumber, 1);
                var newMonth = {
                    displayName: this.getMonthName(monthnumber), date: dateForMonth,
                    isCurrentMonth: dateForMonth.getFullYear() === this.today.getFullYear() && dateForMonth.getMonth() === this.today.getMonth(),
                    disabled: dateForMonth < this.minDate || dateForMonth > this.maxDate,
                    selected: this.selectedDate === undefined ? false : dateForMonth.getFullYear() === this.selectedDate.getFullYear() && dateForMonth.getMonth() === this.selectedDate.getMonth()
                };
                newYear.months.push(newMonth);
            }
            this.years.push(newYear);
        }
    };
    MonthpickerComponent.prototype.getMonthName = function (monthNumber) {
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
    };
    MonthpickerComponent.prototype.doValidate = function () {
        var isValid = (!this.required || this.selectedDate) && !this.controlHasErrors();
        return {
            isValid: isValid,
            validationError: isValid ? '' : 'Obligatoriskt'
        };
    };
    MonthpickerComponent.prototype.controlHasErrors = function () {
        return (this.control && this.control.errors ? this.control.errors['required'] : false);
    };
    MonthpickerComponent.prototype.onLeave = function () {
        this.validate();
    };
    MonthpickerComponent.prototype.onEnter = function () {
        if (this.disabled || this.readonly) {
            return;
        }
        this.setValidationStateEditing();
    };
    MonthpickerComponent.prototype.onNextMouseDown = function (event) {
        event.cancelBubble = true;
        if (this.nextYear) {
            this.setDisplayedYear(new Date(this.nextYear.year, 0, 1));
        }
    };
    MonthpickerComponent.prototype.onPreviousMouseDown = function (event) {
        event.cancelBubble = true;
        if (this.previousYear) {
            this.setDisplayedYear(new Date(this.previousYear.year, 0, 1));
        }
    };
    MonthpickerComponent.prototype.onMouseDown = function (event) {
        this.toggleCalendar(event);
    };
    MonthpickerComponent.prototype.onKeyDown = function (event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.toggleCalendar(event);
        }
    };
    MonthpickerComponent.prototype.onSelectMonthMouseDown = function (selectedMonth) {
        this.selectDate(selectedMonth);
    };
    MonthpickerComponent.prototype.onSelectMonthKeyDown = function (event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
        }
    };
    MonthpickerComponent.prototype.onDocumentClick = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        if (!this.elementRef.nativeElement.contains(target)) {
            this.expanded = false;
        }
    };
    MonthpickerComponent.prototype.toggleCalendar = function (event) {
        if (this.preventCollapse) {
            event.cancelBubble = true;
            event.returnValue = false;
            this.preventCollapse = false;
        }
        else {
            this.toggleExpand(event);
        }
    };
    MonthpickerComponent.prototype.toggleExpand = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var element = $(target);
        if (this.disabled || this.readonly) {
            return;
        }
        if ((element.hasClass('monthpicker__calendar__month') && !element.hasClass('disabled')) ||
            element.hasClass('monthpicker__dropdown') ||
            element.parent().hasClass('monthpicker__dropdown')) {
            this.setDisplayedYear(this.selectedDate);
            this.expanded = !this.expanded;
        }
    };
    MonthpickerComponent.prototype.selectDate = function (selectedMonth) {
        if (!selectedMonth) {
            return;
        }
        if (selectedMonth.disabled) {
            return;
        }
        this.years.forEach(function (y) { return y.months.forEach(function (m) { return m.selected = false; }); });
        selectedMonth.selected = true;
        this.setDisplayedYear(selectedMonth.date);
        this.selectedDateChanged.emit(selectedMonth.date);
        // Utan detectchanges får man "Value was changed after is was checked" i browser console.
        this.selectedDate = selectedMonth.date;
        this.onChange(selectedMonth.date);
        this.changeDetectorRef.detectChanges();
        this.validate();
    };
    return MonthpickerComponent;
}(validation_component_1.ValidationComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], MonthpickerComponent.prototype, "minDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], MonthpickerComponent.prototype, "maxDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Date)
], MonthpickerComponent.prototype, "selectedDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], MonthpickerComponent.prototype, "required", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.disabled'),
    __metadata("design:type", Boolean)
], MonthpickerComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.readonly'),
    __metadata("design:type", Boolean)
], MonthpickerComponent.prototype, "readonly", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MonthpickerComponent.prototype, "selectedDateFormat", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], MonthpickerComponent.prototype, "tooltipDateFormat", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], MonthpickerComponent.prototype, "formControlName", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], MonthpickerComponent.prototype, "selectedDateChanged", void 0);
__decorate([
    core_1.HostListener('document:click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], MonthpickerComponent.prototype, "onDocumentClick", null);
MonthpickerComponent = MonthpickerComponent_1 = __decorate([
    core_1.Component({
        selector: 'vgr-monthpicker',
        moduleId: module.id,
        templateUrl: './monthpicker.component.html',
        providers: [
            {
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return MonthpickerComponent_1; }),
                multi: true
            },
            { provide: validation_component_1.ValidationComponent, useExisting: core_1.forwardRef(function () { return MonthpickerComponent_1; }) }
        ]
    }),
    __param(2, core_1.Optional()), __param(2, core_1.Host()), __param(2, core_1.SkipSelf()),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.ChangeDetectorRef, forms_1.ControlContainer])
], MonthpickerComponent);
exports.MonthpickerComponent = MonthpickerComponent;
var MonthpickerComponent_1;
//# sourceMappingURL=monthpicker.component.js.map