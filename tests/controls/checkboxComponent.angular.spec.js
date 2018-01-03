"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var common_1 = require("@angular/common");
var checkbox_component_1 = require("../../component-package/controls/checkbox/checkbox.component");
describe('SaveCancelComponent', function () {
    var component;
    var fixture;
    var rootElement;
    var checkbox;
    var checkedChangedSpy;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [checkbox_component_1.CheckboxComponent],
            imports: [common_1.CommonModule]
        });
        testing_1.TestBed.overrideComponent(checkbox_component_1.CheckboxComponent, {
            set: {
                templateUrl: './checkbox.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(checkbox_component_1.CheckboxComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            checkbox = rootElement.query(platform_browser_1.By.css('.checkbox'));
            checkedChangedSpy = spyOn(component.checkedChanged, 'emit');
            fixture.detectChanges();
            done();
        });
    });
    describe('When initialized', function () {
        it('checkbox is not checked', function () {
            expect(checkbox.classes['checkbox--checked']).toBe(false);
        });
        it('checkbox is enabled', function () {
            expect(checkbox.classes['checkbox--disabled']).toBe(false);
        });
    });
    describe('When initialized as checked', function () {
        beforeEach(function () {
            component.checked = true;
            fixture.detectChanges();
        });
        it('checkbox is not checked', function () {
            expect(checkbox.classes['checkbox--checked']).toBe(true);
        });
        it('checkbox is enabled', function () {
            expect(checkbox.classes['checkbox--disabled']).toBe(false);
        });
    });
    describe('When initialized as disabled', function () {
        beforeEach(function () {
            component.disabled = true;
            fixture.detectChanges();
        });
        it('checkbox is not checked', function () {
            expect(checkbox.classes['checkbox--checked']).toBe(false);
        });
        it('checkbox is disabled', function () {
            expect(checkbox.classes['checkbox--disabled']).toBe(true);
        });
        describe('and checked', function () {
            beforeEach(function () {
                component.checked = true;
                fixture.detectChanges();
            });
            it('checkbox is checked', function () {
                expect(checkbox.classes['checkbox--checked']).toBe(true);
            });
            it('checkbox is disabled', function () {
                expect(checkbox.classes['checkbox--disabled']).toBe(true);
            });
        });
    });
    describe('When checkbox is clicked ', function () {
        beforeEach(function () {
            checkbox.triggerEventHandler('click', null);
            fixture.detectChanges();
        });
        it('checkbox is checked', function () {
            expect(component.checked).toBe(true);
            expect(checkbox.classes['checkbox--checked']).toBe(true);
        });
        it('checked event is emitted', function () {
            expect(component.checkedChanged.emit).toHaveBeenCalledWith(true);
        });
        describe('And checkbox is clicked again', function () {
            beforeEach(function () {
                checkedChangedSpy.calls.reset();
                checkbox.triggerEventHandler('click', null);
                fixture.detectChanges();
            });
            it('checkbox is unchecked', function () {
                expect(component.checked).toBe(false);
                expect(checkbox.classes['checkbox--checked']).toBe(false);
            });
            it('checked event is emitted', function () {
                expect(component.checkedChanged.emit).toHaveBeenCalledWith(false);
            });
        });
    });
    describe('When checkbox is triggered with the SPACE key ', function () {
        beforeEach(function () {
            checkbox.triggerEventHandler('keydown', { keyCode: 32 });
            fixture.detectChanges();
        });
        it('checkbox is checked', function () {
            expect(component.checked).toBe(true);
            expect(checkbox.classes['checkbox--checked']).toBe(true);
        });
        it('checked event is emitted', function () {
            expect(component.checkedChanged.emit).toHaveBeenCalledWith(true);
        });
    });
    describe('When checkbox is triggered with the ENTER key ', function () {
        beforeEach(function () {
            checkbox.triggerEventHandler('keydown', { keyCode: 13 });
            fixture.detectChanges();
        });
        it('checkbox is checked', function () {
            expect(component.checked).toBe(true);
            expect(checkbox.classes['checkbox--checked']).toBe(true);
        });
        it('checked event is emitted', function () {
            expect(component.checkedChanged.emit).toHaveBeenCalledWith(true);
        });
    });
    describe('WCAG compatibility', function () {
        var checkboximage;
        beforeEach(function () {
            checkboximage = rootElement.query(platform_browser_1.By.css('.checkbox__image'));
            fixture.detectChanges();
        });
        it('The checkbox has role checkbox.', function () {
            expect(checkboximage.attributes['role']).toBe('checkbox');
        });
        describe('The checkbox has an accessible label, preferably provided by a visible label associated using aria-labelledby', function () {
            it('checkbox has a label with an id', function () {
                var labelElement = rootElement.query(platform_browser_1.By.css('.checkbox__label'));
                expect(labelElement.nativeElement.id).toBe('checkbox-label');
            });
            it('checkbox is associated with the label', function () {
                expect(checkboximage.attributes['aria-labelledby']).toBe('checkbox-label');
            });
        });
        it('When checked, the checkbox element has state aria-checked set to true', function () {
            component.checked = true;
            fixture.detectChanges();
            expect(checkboximage.attributes['aria-checked']).toBe('true');
        });
        it('When not checked, it has state aria-checked set to false', function () {
            component.checked = false;
            fixture.detectChanges();
            expect(checkboximage.attributes['aria-checked']).toBe('false');
        });
    });
});
//# sourceMappingURL=checkboxComponent.angular.spec.js.map