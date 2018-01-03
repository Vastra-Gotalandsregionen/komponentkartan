"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var saveCancel_component_1 = require("../../component-package/controls/saveCancel/saveCancel.component");
var button_component_1 = require("../../component-package/controls/button/button.component");
var lockButton_component_1 = require("../../component-package/controls/lockButton/lockButton.component");
describe('SaveCancelComponent', function () {
    var component;
    var fixture;
    var rootElement;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [saveCancel_component_1.SaveCancelComponent, button_component_1.ButtonComponent, lockButton_component_1.LockButtonComponent],
            imports: [common_1.CommonModule, forms_1.FormsModule]
        });
        testing_1.TestBed.overrideComponent(saveCancel_component_1.SaveCancelComponent, {
            set: {
                templateUrl: 'saveCancel.component.html'
            }
        });
        testing_1.TestBed.overrideComponent(button_component_1.ButtonComponent, {
            set: {
                templateUrl: '../button/button.component.html'
            }
        });
        testing_1.TestBed.overrideComponent(lockButton_component_1.LockButtonComponent, {
            set: {
                templateUrl: '../lockButton/lockButton.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(saveCancel_component_1.SaveCancelComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('When initialized', function () {
        var lockButton;
        beforeEach(function () {
            spyOn(component.cancel, 'emit');
            spyOn(component.save, 'emit');
            spyOn(component.unlock, 'emit');
            lockButton = rootElement.query(platform_browser_1.By.css('vgr-lock-button'));
            fixture.detectChanges();
        });
        it('lock button is enabled', function () {
            expect(lockButton.attributes['ng-reflect-disabled']).toBeNull();
        });
        describe('When unlock button is clicked', function () {
            beforeEach(function () {
                lockButton.triggerEventHandler('lockChanged', false);
                fixture.detectChanges();
            });
            it('lock button is disabled', function () {
                expect(lockButton.attributes['ng-reflect-disabled']).toEqual('true');
            });
            it('component is unlocked', function () {
                expect(component.unlocked).toBe(true);
            });
            it('lock button is disabled', function () {
                expect(lockButton.attributes['ng-reflect-disabled']).toEqual('true');
            });
            describe('and save button is clicked', function () {
                beforeEach(function () {
                    var saveButton = rootElement.query(platform_browser_1.By.css('.button--save'));
                    saveButton.triggerEventHandler('click', {});
                });
                it('component is locked', function () {
                    expect(component.unlocked).toBeFalsy();
                });
                it('a save event is sent', function () {
                    expect(component.save.emit).toHaveBeenCalled();
                });
            });
            describe('and cancel button is clicked', function () {
                beforeEach(function () {
                    var cancelButton = rootElement.query(platform_browser_1.By.css('.button--cancel'));
                    cancelButton.triggerEventHandler('click', {});
                });
                it('lock button is locked', function () {
                    expect(component.unlocked).toBeFalsy();
                });
                it('a cancel event is sent', function () {
                    expect(component.cancel.emit).toHaveBeenCalled();
                });
            });
            describe('and lock button is clicked', function () {
                beforeEach(function () {
                    lockButton.triggerEventHandler('lockChanged', true);
                });
                it('a save event is sent', function () {
                    expect(component.save.emit).toHaveBeenCalled();
                });
                it('component is locked', function () {
                    expect(component.unlocked).toBe(false);
                });
            });
        });
    });
    describe('On initialized with no lock ', function () {
        beforeEach(function () {
            spyOn(component.cancel, 'emit');
            spyOn(component.save, 'emit');
            spyOn(component.unlock, 'emit');
            component.hideLock = true;
            component.ngOnInit();
            fixture.detectChanges();
        });
        it('lock button is hidden', function () {
            expect(rootElement.queryAll(platform_browser_1.By.css('vgr-lock-button')).length).toBe(0);
        });
        it('no unlock event is emitted', function () {
            expect(component.unlock.emit).toHaveBeenCalledTimes(0);
        });
        it('component is unlocked', function () {
            expect(component.unlocked).toBeTruthy();
        });
        describe('and save button is clicked', function () {
            beforeEach(function () {
                var saveButton = rootElement.query(platform_browser_1.By.css('.button--save'));
                saveButton.triggerEventHandler('click', {});
            });
            it('component remains unlocked', function () {
                expect(component.unlocked).toBeTruthy();
            });
            it('no unlock event is emitted', function () {
                expect(component.unlock.emit).toHaveBeenCalledTimes(0);
            });
            it('a save event is emitted', function () {
                expect(component.save.emit).toHaveBeenCalled();
            });
        });
        describe('and cancel button is clicked', function () {
            beforeEach(function () {
                var cancelButton = rootElement.query(platform_browser_1.By.css('.button--cancel'));
                cancelButton.triggerEventHandler('click', {});
            });
            it('component remains unlocked', function () {
                expect(component.unlocked).toBeTruthy();
            });
            it('no unlock event is emitted', function () {
                expect(component.unlock.emit).toHaveBeenCalledTimes(0);
            });
            it('a cancel event is sent', function () {
                expect(component.cancel.emit).toHaveBeenCalled();
            });
        });
    });
});
//# sourceMappingURL=saveCancelComponent.angular.spec.js.map