"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var button_component_1 = require("../../component-package/controls/button/button.component");
describe('[ButtonComponent - Angular]', function () {
    var component;
    var fixture;
    var rootElement;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [button_component_1.ButtonComponent],
            imports: [common_1.CommonModule, forms_1.FormsModule]
        });
        testing_1.TestBed.overrideComponent(button_component_1.ButtonComponent, {
            set: {
                templateUrl: 'button.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(button_component_1.ButtonComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('When button is initialized', function () {
        var textButtonElement;
        beforeEach(function () {
            textButtonElement = rootElement.query(platform_browser_1.By.css('.text-button'));
        });
        describe('And button is enabled', function () {
            beforeEach(function () {
                component.disabled = false;
                fixture.detectChanges();
            });
            it('button is enabled', function () {
                expect(textButtonElement.classes['button--disabled']).toBe(false);
            });
        });
        describe('When button is disabled', function () {
            beforeEach(function () {
                component.disabled = true;
                fixture.detectChanges();
                spyOn(component.click, 'emit');
            });
            it('button is displayed as disabled', function () {
                expect(textButtonElement.classes['button--disabled']).toBe(true);
            });
            describe('and button is clicked', function () {
                var mockEvent = { stopPropagation: function () { } };
                beforeEach(function () {
                    spyOn(mockEvent, 'stopPropagation');
                    textButtonElement.triggerEventHandler('click', mockEvent);
                });
                it('the click event is not propagated', function () {
                    expect(mockEvent.stopPropagation).toHaveBeenCalled();
                });
            });
            describe('and space is pressed', function () {
                it('no clicked event is triggered', function () {
                    textButtonElement.triggerEventHandler('keydown', { keyCode: 32 });
                    expect(component.click.emit).toHaveBeenCalledTimes(0);
                });
            });
            describe('and Enter is pressed', function () {
                it('no clicked event is triggered', function () {
                    textButtonElement.triggerEventHandler('keydown', { keyCode: 13 });
                    expect(component.click.emit).toHaveBeenCalledTimes(0);
                });
            });
        });
    });
    describe('WCAG Tests', function () {
        var textButtonElement;
        beforeEach(function () {
            textButtonElement = rootElement.query(platform_browser_1.By.css('.text-button'));
            spyOn(component.click, 'emit');
        });
        describe('When button is enabled', function () {
            it('button has tab stop', function () {
                expect(textButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
            });
            it('button has role "button"', function () {
                expect(textButtonElement.attributes['role']).toBe('button');
            });
            it('aria-disabled is false', function () {
                expect(textButtonElement.attributes['aria-disabled']).toBe('false');
            });
            describe('and space is pressed', function () {
                var spacePressedEvent = { preventDefault: function () { }, keyCode: 32 };
                beforeEach(function () {
                    spyOn(spacePressedEvent, 'preventDefault');
                    textButtonElement.triggerEventHandler('keydown', spacePressedEvent);
                });
                it('a clicked event is triggered', function () {
                    expect(component.click.emit).toHaveBeenCalled();
                });
                it('to prevent the default behaviour of SPACE, preventDefault is called', function () {
                    expect(spacePressedEvent.preventDefault).toHaveBeenCalled();
                });
            });
            describe('and Enter is pressed', function () {
                it('a clicked event is triggered', function () {
                    textButtonElement.triggerEventHandler('keydown', { keyCode: 13 });
                    expect(component.click.emit).toHaveBeenCalled();
                });
            });
            describe('and a letter is pressed', function () {
                it('no clicked event is triggered', function () {
                    textButtonElement.triggerEventHandler('keydown', { keyCode: 167 });
                    expect(component.click.emit).toHaveBeenCalledTimes(0);
                });
            });
        });
        describe('When button is disabled', function () {
            beforeEach(function () {
                component.disabled = true;
                fixture.detectChanges();
            });
            it('button has tab stop', function () {
                expect(textButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
            });
            it('aria-disabled is set to true', function () {
                expect(textButtonElement.attributes['aria-disabled']).toBe('true');
            });
        });
    });
});
//# sourceMappingURL=buttonComponent.angular.spec.js.map