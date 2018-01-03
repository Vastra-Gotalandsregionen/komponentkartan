"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var lockButton_component_1 = require("../../component-package/controls/lockButton/lockButton.component");
describe('TextButtonComponent', function () {
    var component;
    var fixture;
    var rootElement;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [lockButton_component_1.LockButtonComponent],
            imports: [common_1.CommonModule, forms_1.FormsModule]
        });
        testing_1.TestBed.overrideComponent(lockButton_component_1.LockButtonComponent, {
            set: {
                templateUrl: 'lockButton.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(lockButton_component_1.LockButtonComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('When component is initialized', function () {
        var lockButtonElement;
        beforeEach(function () {
            lockButtonElement = rootElement.query(platform_browser_1.By.css('.lock-button'));
            spyOn(component.lockChanged, 'emit');
            component.unlocked = false;
        });
        it('button is enabled', function () {
            expect(lockButtonElement.classes['button--disabled']).toBeFalsy();
        });
        it('button is locked', function () {
            expect(lockButtonElement.classes['button--unlocked']).toBeFalsy();
        });
        describe('and button is clicked', function () {
            it('a lockChanged Event is triggered', function () {
                lockButtonElement.triggerEventHandler('click', {});
                expect(component.lockChanged.emit).toHaveBeenCalledWith(false);
            });
            it('button is unlocked', function () {
                lockButtonElement.triggerEventHandler('click', {});
                expect(component.unlocked).toBe(true);
            });
        });
        describe('and button is unlocked', function () {
            beforeEach(function () {
                component.unlocked = true;
                fixture.detectChanges();
            });
            describe('and button is clicked', function () {
                it('a lockChanged event is triggered', function () {
                    lockButtonElement.triggerEventHandler('click', {});
                    expect(component.lockChanged.emit).toHaveBeenCalledWith(true);
                });
                it('button is locked', function () {
                    lockButtonElement.triggerEventHandler('click', {});
                    expect(component.unlocked).toBe(false);
                });
            });
        });
        describe('and button is disabled', function () {
            beforeEach(function () {
                component.disabled = true;
                fixture.detectChanges();
            });
            it('button is displayed as disabled', function () {
                expect(lockButtonElement.classes['button--disabled']).toBeTruthy();
            });
            describe('and button is clicked', function () {
                it('no lockChanged event is triggered', function () {
                    lockButtonElement.triggerEventHandler('click', null);
                    expect(component.lockChanged.emit).toHaveBeenCalledTimes(0);
                });
            });
        });
    });
    describe('WCAG Tests', function () {
        var lockButtonElement;
        beforeEach(function () {
            lockButtonElement = rootElement.query(platform_browser_1.By.css('.lock-button'));
            spyOn(component.lockChanged, 'emit');
        });
        describe('When button is enabled', function () {
            it('button has tab stop', function () {
                expect(lockButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
            });
            it('button aria-label is set to lås', function () {
                expect(lockButtonElement.attributes['aria-label']).toBe('lås upp');
            });
            it('the aria-disabled is set to false', function () {
                expect(lockButtonElement.attributes['aria-disabled']).toBe('false');
            });
            describe('and unlocked', function () {
                beforeEach(function () {
                    component.unlocked = true;
                    fixture.detectChanges();
                });
                it('button aria-label is set to lås', function () {
                    expect(lockButtonElement.attributes['aria-label']).toBe('lås');
                });
                describe('and space is pressed', function () {
                    it('a lockChanged event is triggered', function () {
                        lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 });
                        expect(component.lockChanged.emit).toHaveBeenCalledWith(true);
                    });
                    it('button is locked', function () {
                        lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 });
                        expect(component.unlocked).toBe(false);
                    });
                });
                describe('and Enter is pressed', function () {
                    it('a lockChanged event is triggered', function () {
                        lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 });
                        expect(component.lockChanged.emit).toHaveBeenCalledWith(true);
                    });
                    it('button is locked', function () {
                        lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 });
                        expect(component.unlocked).toBe(false);
                    });
                });
                describe('and a letter is pressed', function () {
                    it('a lockChanged event is triggered', function () {
                        lockButtonElement.triggerEventHandler('keydown', { keyCode: 168 });
                        expect(component.lockChanged.emit).toHaveBeenCalledTimes(0);
                    });
                    it('button is not locked', function () {
                        lockButtonElement.triggerEventHandler('keydown', { keyCode: 168 });
                        expect(component.unlocked).toBe(true);
                    });
                });
            });
            describe('and button is locked', function () {
                beforeEach(function () {
                    component.unlocked = false;
                    fixture.detectChanges();
                });
                describe('and space is pressed', function () {
                    it('a lockChanged Event is triggered', function () {
                        lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 });
                        expect(component.lockChanged.emit).toHaveBeenCalledWith(false);
                    });
                    it('button is unlocked', function () {
                        lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 });
                        expect(component.unlocked).toBe(true);
                    });
                    describe('and Enter is pressed', function () {
                        it('a lockChanged Event is triggered', function () {
                            lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 });
                            expect(component.lockChanged.emit).toHaveBeenCalledWith(false);
                        });
                        it('button is unlocked', function () {
                            lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 });
                            expect(component.unlocked).toBe(true);
                        });
                    });
                    describe('and a letter is pressed', function () {
                        it('a lockChangedEvent is not triggered', function () {
                            lockButtonElement.triggerEventHandler('keydown', { keyCode: 162 });
                            expect(component.lockChanged.emit).toHaveBeenCalledTimes(0);
                        });
                        it('button is still locked', function () {
                            lockButtonElement.triggerEventHandler('keydown', { keyCode: 162 });
                            expect(component.unlocked).toBe(false);
                        });
                    });
                });
            });
        });
        describe('and button is disabled', function () {
            beforeEach(function () {
                component.disabled = true;
                fixture.detectChanges();
            });
            it('the aria-disabled is set to true', function () {
                expect(lockButtonElement.attributes['aria-disabled']).toBeTruthy();
            });
            it('button has no tab stop', function () {
                expect(lockButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
            });
        });
    });
});
//# sourceMappingURL=lockButtonComponent.angular.spec.js.map