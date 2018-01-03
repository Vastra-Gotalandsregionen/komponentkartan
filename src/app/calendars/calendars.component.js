"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CalendarsComponent = (function () {
    function CalendarsComponent() {
        this.selectedDate = new Date(2015, 0, 13);
        this.minDate = new Date(2015, 0, 1);
        this.maxDate = new Date(2016, 11, 1);
        this.datepicker_Min = new Date(2018, 0, 15);
        this.datepicker_Max = new Date(2019, 11, 27);
        this.datepicker_selectedDate = new Date(2017, 9, 17);
        this.isReadonlyAndDisabled = true;
        this.isReadonlyAndDisabledDatepicker = true;
    }
    return CalendarsComponent;
}());
CalendarsComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'vgr-calendars',
        templateUrl: 'calendars.component.html'
    }),
    __metadata("design:paramtypes", [])
], CalendarsComponent);
exports.CalendarsComponent = CalendarsComponent;
//# sourceMappingURL=calendars.component.js.map