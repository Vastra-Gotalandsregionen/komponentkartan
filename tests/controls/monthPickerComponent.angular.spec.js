"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var monthpicker_component_1 = require("../../component-package/controls/monthpicker/monthpicker.component");
var truncatePipe_1 = require("../../component-package/pipes/truncatePipe");
describe('[MonthpickerComponent(Angular)]', function () {
    var component;
    var fixture;
    var rootElement;
    var datepicker;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [monthpicker_component_1.MonthpickerComponent, truncatePipe_1.TruncatePipe],
            imports: [common_1.CommonModule]
        });
        testing_1.TestBed.overrideComponent(monthpicker_component_1.MonthpickerComponent, {
            set: {
                templateUrl: './monthpicker.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(monthpicker_component_1.MonthpickerComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            datepicker = rootElement.query(platform_browser_1.By.css('.monthpicker'));
            fixture.detectChanges();
            done();
        });
    });
    describe('When initialized with empty Selected date and readonly-mode', function () {
        beforeEach(function () {
            component.readonly = true;
            fixture.detectChanges();
        });
        it('has div class .readonly', function () {
            expect(fixture.debugElement.classes['readonly']).toBe(true);
        });
        it('selected date is empty', function () {
            var selectedMonthSpan = fixture.debugElement.query(platform_browser_1.By.css('.monthpicker__dropdown span'));
            var content = selectedMonthSpan.nativeElement.textContent;
            expect(content.trim()).toBe('');
        });
    });
    describe('When initialized with existing Selected date and readonly-mode', function () {
        beforeEach(function () {
            component.selectedDate = new Date(2017, 1, 1);
            component.readonly = true;
            component.selectedDateFormat = 'MM';
            fixture.detectChanges();
        });
        it('has div class .readonly', function () {
            expect(fixture.debugElement.classes['readonly']).toBe(true);
        });
        it('selected date is new Date(2017,1,1) and displayed on format MM', function () {
            var selectedMonthSpan = fixture.debugElement.query(platform_browser_1.By.css('.monthpicker__dropdown span'));
            var content = selectedMonthSpan.nativeElement.textContent;
            expect(content.trim()).toBe('02');
        });
    });
    describe('When initialized with readonly-mode set to false', function () {
        beforeEach(function () {
            component.readonly = false;
            fixture.detectChanges();
        });
        it('does not have div class .readonly', function () {
            expect(fixture.debugElement.classes['readonly']).toBe(false);
        });
    });
    describe('When initialized with existing Selected date and disabled-mode', function () {
        beforeEach(function () {
            component.selectedDate = new Date(2017, 1, 1);
            component.disabled = true;
            component.selectedDateFormat = 'MM';
            fixture.detectChanges();
        });
        it('has div class .readonly', function () {
            expect(fixture.debugElement.classes['disabled']).toBe(true);
        });
        it('selected date is new Date(2017,1,1) and displayed on format MM', function () {
            var selectedMonthSpan = fixture.debugElement.query(platform_browser_1.By.css('.monthpicker__dropdown span'));
            var content = selectedMonthSpan.nativeElement.textContent;
            expect(content.trim()).toBe('02');
        });
    });
    describe('When initialized with empty Selected date and disabled-mode', function () {
        beforeEach(function () {
            component.disabled = true;
            fixture.detectChanges();
        });
        it('has div class .readonly', function () {
            expect(fixture.debugElement.classes['disabled']).toBe(true);
        });
        it('selected date is empty', function () {
            var selectedMonthSpan = fixture.debugElement.query(platform_browser_1.By.css('.monthpicker__dropdown span'));
            var content = selectedMonthSpan.nativeElement.textContent;
            expect(content.trim()).toBe('Välj månad');
        });
    });
    describe('When initialized with disabled-mode set to false', function () {
        beforeEach(function () {
            component.disabled = false;
            fixture.detectChanges();
        });
        it('does not have div class .readonly', function () {
            expect(fixture.debugElement.classes['readonly']).toBe(false);
        });
    });
});
//# sourceMappingURL=monthPickerComponent.angular.spec.js.map