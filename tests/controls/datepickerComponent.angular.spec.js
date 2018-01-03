"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var datepicker_component_1 = require("../../component-package/controls/datepicker/datepicker.component");
var truncatePipe_1 = require("../../component-package/pipes/truncatePipe");
describe('[DatepickerComponent(Angular)]', function () {
    var component;
    var fixture;
    var rootElement;
    var datepicker;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [datepicker_component_1.DatepickerComponent, truncatePipe_1.TruncatePipe],
            imports: [common_1.CommonModule]
        });
        testing_1.TestBed.overrideComponent(datepicker_component_1.DatepickerComponent, {
            set: {
                templateUrl: './datepicker.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(datepicker_component_1.DatepickerComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            datepicker = rootElement.query(platform_browser_1.By.css('.datepicker'));
            fixture.detectChanges();
            done();
        });
    });
    describe('When initialized', function () {
        beforeEach(function () {
            component.ngOnInit();
        });
        describe('and the datepicker is clicked', function () {
            beforeEach(function () {
                component.onDatePickerClick({ cancelBubble: true });
            });
            it('the calendar is visible', function () {
                expect(component.isDatePickerVisible).toBe(true);
            });
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
            var selectedDateSpan = fixture.debugElement.query(platform_browser_1.By.css('.datepicker__calendar__selector'));
            var content = selectedDateSpan.nativeElement.textContent;
            expect(content.trim()).toBe('');
        });
    });
    describe('When initialized with existing Selected date and readonly-mode', function () {
        beforeEach(function () {
            component.selectedDate = new Date(2017, 1, 1);
            component.readonly = true;
            component.selectedDateFormat = 'yyyy-MM-dd';
            fixture.detectChanges();
        });
        it('has div class .readonly', function () {
            expect(fixture.debugElement.classes['readonly']).toBe(true);
        });
        it('selected date is new Date(2017,1,1) and displayed on format yyyy-MM-dd', function () {
            var selectedDateSpan = fixture.debugElement.query(platform_browser_1.By.css('.datepicker__calendar__selector'));
            var content = selectedDateSpan.nativeElement.textContent;
            expect(content.trim()).toBe('2017-02-01');
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
            component.selectedDateFormat = 'yyyy-MM-dd';
            fixture.detectChanges();
        });
        it('has div class .readonly', function () {
            expect(fixture.debugElement.classes['disabled']).toBe(true);
        });
        it('selected date is new Date(2017,1,1) and displayed on format yyyy-MM-dd', function () {
            var selectedDateSpan = fixture.debugElement.query(platform_browser_1.By.css('.datepicker__calendar__selector'));
            var content = selectedDateSpan.nativeElement.textContent;
            expect(content.trim()).toBe('2017-02-01');
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
            var selectedDateSpan = fixture.debugElement.query(platform_browser_1.By.css('.datepicker__calendar__selector'));
            var content = selectedDateSpan.nativeElement.textContent;
            expect(content.trim()).toBe('Välj datum');
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
//# sourceMappingURL=datepickerComponent.angular.spec.js.map