"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var radioGroup_component_1 = require("../../component-package/controls/radioGroup/radioGroup.component");
describe('SaveCancelComponent', function () {
    var component;
    var fixture;
    var rootElement;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [radioGroup_component_1.RadioGroupComponent],
            imports: [common_1.CommonModule]
        });
        testing_1.TestBed.overrideComponent(radioGroup_component_1.RadioGroupComponent, {
            set: {
                templateUrl: 'radioGroup.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(radioGroup_component_1.RadioGroupComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('When initialized with options', function () {
        var selectedChangedSpy;
        beforeEach(function () {
            selectedChangedSpy = spyOn(component.selectedChanged, 'emit');
            component.options = [
                { id: 'PÅ', displayName: 'Per Åkerberg' },
                { id: 'SH', displayName: 'Sofia Hejdenberg' },
                { id: 'CB', displayName: 'Caroline Bornsjö' },
            ];
            component.ngOnChanges();
            fixture.detectChanges();
        });
        it('options are displayed', function () {
            var visibleOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button'));
            expect(visibleOptions.map(function (x) { return x.properties['title']; })).toEqual(['Per Åkerberg', 'Sofia Hejdenberg', 'Caroline Bornsjö']);
        });
        it('only the first option is selected', function () {
            var selectedOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button--checked'));
            expect(selectedOptions.map(function (x) { return x.properties['title']; })).toEqual(['Per Åkerberg']);
        });
        it('an selectedChanged event is emitted', function () {
            expect(component.selectedChanged.emit).toHaveBeenCalledWith(component.options[0]);
        });
        describe('and an option is clicked', function () {
            beforeEach(function () {
                selectedChangedSpy.calls.reset();
                var optionToSelect = rootElement.queryAll(platform_browser_1.By.css('.radio-button')).filter(function (x) { return x.properties['title'] === 'Caroline Bornsjö'; })[0];
                optionToSelect.triggerEventHandler('click', null);
                fixture.detectChanges();
            });
            it('the option is selected', function () {
                var selectedOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button--checked'));
                expect(selectedOptions.map(function (x) { return x.properties['title']; })).toEqual(['Caroline Bornsjö']);
            });
            it('an selectedChanged event is emitted', function () {
                expect(component.selectedChanged.emit).toHaveBeenCalledWith(component.options[2]);
            });
            describe('and the already selected option is clicked again', function () {
                beforeEach(function () {
                    selectedChangedSpy.calls.reset();
                    var optionToSelect = rootElement.queryAll(platform_browser_1.By.css('.radio-button')).filter(function (x) { return x.properties['title'] === 'Caroline Bornsjö'; })[0];
                    optionToSelect.triggerEventHandler('click', null);
                    fixture.detectChanges();
                });
                it('the option is still selected', function () {
                    var selectedOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button--checked'));
                    expect(selectedOptions.map(function (x) { return x.properties['title']; })).toEqual(['Caroline Bornsjö']);
                });
                it('no selectedChanged event is emitted', function () {
                    expect(component.selectedChanged.emit).toHaveBeenCalledTimes(0);
                });
            });
        });
        describe('and an option is selected by pressing the Space key', function () {
            beforeEach(function () {
                selectedChangedSpy.calls.reset();
                var optionToSelect = rootElement.queryAll(platform_browser_1.By.css('.radio-button')).filter(function (x) { return x.properties['title'] === 'Caroline Bornsjö'; })[0];
                optionToSelect.triggerEventHandler('keydown', { keyCode: 32, preventDefault: function () { } });
                fixture.detectChanges();
            });
            it('the option is selected', function () {
                var selectedOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button--checked'));
                expect(selectedOptions.map(function (x) { return x.properties['title']; })).toEqual(['Caroline Bornsjö']);
            });
            it('an selectedChanged event is emitted', function () {
                expect(component.selectedChanged.emit).toHaveBeenCalledWith(component.options[2]);
            });
        });
        describe('and an option is selected by pressing the Enter key', function () {
            beforeEach(function () {
                selectedChangedSpy.calls.reset();
                var optionToSelect = rootElement.queryAll(platform_browser_1.By.css('.radio-button')).filter(function (x) { return x.properties['title'] === 'Caroline Bornsjö'; })[0];
                optionToSelect.triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } });
                fixture.detectChanges();
            });
            it('the option is selected', function () {
                var selectedOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button--checked'));
                expect(selectedOptions.map(function (x) { return x.properties['title']; })).toEqual(['Caroline Bornsjö']);
            });
            it('an selectedChanged event is emitted', function () {
                expect(component.selectedChanged.emit).toHaveBeenCalledWith(component.options[2]);
            });
        });
    });
    describe('When initialized with one selected option', function () {
        beforeEach(function () {
            spyOn(component.selectedChanged, 'emit');
            component.options = [
                { id: 'PÅ', displayName: 'Per Åkerberg' },
                { id: 'SH', displayName: 'Sofia Hejdenberg', selected: true },
                { id: 'CB', displayName: 'Caroline Bornsjö' },
            ];
            component.ngOnChanges();
            fixture.detectChanges();
        });
        it('options are displayed', function () {
            var visibleOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button'));
            expect(visibleOptions.map(function (x) { return x.properties['title']; })).toEqual(['Per Åkerberg', 'Sofia Hejdenberg', 'Caroline Bornsjö']);
        });
        it('the pre-selected option is selected', function () {
            var selectedOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button--checked'));
            expect(selectedOptions.map(function (x) { return x.properties['title']; })).toEqual(['Sofia Hejdenberg']);
        });
        it('an selectedChanged event is emitted', function () {
            expect(component.selectedChanged.emit).toHaveBeenCalledWith(component.options[1]);
        });
    });
    describe('When initialized with two selected options', function () {
        beforeEach(function () {
            spyOn(component.selectedChanged, 'emit');
            component.options = [
                { id: 'PÅ', displayName: 'Per Åkerberg' },
                { id: 'SH', displayName: 'Sofia Hejdenberg', selected: true },
                { id: 'CB', displayName: 'Caroline Bornsjö', selected: true },
            ];
            component.ngOnChanges();
            fixture.detectChanges();
        });
        it('options are displayed', function () {
            var visibleOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button'));
            expect(visibleOptions.map(function (x) { return x.properties['title']; })).toEqual(['Per Åkerberg', 'Sofia Hejdenberg', 'Caroline Bornsjö']);
        });
        it('the first pre-selected option is selected', function () {
            var selectedOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button--checked'));
            expect(selectedOptions.map(function (x) { return x.properties['title']; })).toEqual(['Sofia Hejdenberg']);
        });
        it('an selectedChanged event is emitted', function () {
            expect(component.selectedChanged.emit).toHaveBeenCalledWith(component.options[1]);
        });
    });
    describe('When initialized with a disabled option', function () {
        beforeEach(function () {
            spyOn(component.selectedChanged, 'emit');
            component.options = [
                { id: 'PÅ', displayName: 'Per Åkerberg', disabled: true },
                { id: 'SH', displayName: 'Sofia Hejdenberg' },
                { id: 'CB', displayName: 'Caroline Bornsjö' },
            ];
            component.ngOnChanges();
            fixture.detectChanges();
        });
        it('options are displayed', function () {
            var visibleOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button'));
            expect(visibleOptions.map(function (x) { return x.properties['title']; })).toEqual(['Per Åkerberg', 'Sofia Hejdenberg', 'Caroline Bornsjö']);
        });
        it('the disabled option is displayed as disabled', function () {
            var disabledOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button--disabled'));
            expect(disabledOptions.map(function (x) { return x.properties['title']; })).toEqual(['Per Åkerberg']);
        });
        it('the first enabled option is selected', function () {
            var selectedOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button--checked'));
            expect(selectedOptions.map(function (x) { return x.properties['title']; })).toEqual(['Sofia Hejdenberg']);
        });
        it('an selectedChanged event is emitted', function () {
            expect(component.selectedChanged.emit).toHaveBeenCalledWith(component.options[1]);
        });
        describe('and the disabled option is clicked', function () {
            beforeEach(function () {
                var optionToSelect = rootElement.queryAll(platform_browser_1.By.css('.radio-button')).filter(function (x) { return x.properties['title'] === 'Per Åkerberg'; })[0];
                optionToSelect.triggerEventHandler('click', null);
                fixture.detectChanges();
            });
            it('the option is not selected', function () {
                var selectedOptions = rootElement.queryAll(platform_browser_1.By.css('.radio-button--checked'));
                expect(selectedOptions.map(function (x) { return x.properties['title']; })).toEqual(['Sofia Hejdenberg']);
            });
        });
    });
});
//# sourceMappingURL=radioGroupComponent.angular.spec.js.map