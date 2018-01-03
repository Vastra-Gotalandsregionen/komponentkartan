
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaveCancelComponent } from '../../controls/saveCancel/saveCancel.component';
import { ButtonComponent } from '../../controls/button/button.component';
import { LockButtonComponent } from '../../controls/lockButton/lockButton.component';

describe('SaveCancelComponent', () => {
    let component: SaveCancelComponent;
    let fixture: ComponentFixture<SaveCancelComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [SaveCancelComponent, ButtonComponent, LockButtonComponent],
            imports: [CommonModule, FormsModule]
        });

        TestBed.overrideComponent(SaveCancelComponent, {
            set: {
                templateUrl: 'saveCancel.component.html'
            }
        });
        TestBed.overrideComponent(ButtonComponent, {
            set: {
                templateUrl: '../button/button.component.html'
            }
        });
        TestBed.overrideComponent(LockButtonComponent, {
            set: {
                templateUrl: '../lockButton/lockButton.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(SaveCancelComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When initialized', () => {
        let lockButton: DebugElement;
        beforeEach(() => {
            spyOn(component.cancel, 'emit');
            spyOn(component.save, 'emit');
            spyOn(component.unlock, 'emit');
            lockButton = rootElement.query(By.css('vgr-lock-button'));
            fixture.detectChanges();
        });
        it('lock button is enabled', () => {
            expect(lockButton.attributes['ng-reflect-disabled']).toBeNull();
        });
        describe('When unlock button is clicked', () => {
            beforeEach(() => {
                lockButton.triggerEventHandler('lockChanged', false);
                fixture.detectChanges();
            });
            it('lock button is disabled', () => {
                expect(lockButton.attributes['ng-reflect-disabled']).toEqual('true');
            });
            it('component is unlocked', () => {
                expect(component.unlocked).toBe(true);
            });
            it('lock button is disabled', () => {
                expect(lockButton.attributes['ng-reflect-disabled']).toEqual('true');
            });

            describe('and save button is clicked', () => {
                beforeEach(() => {
                    const saveButton = rootElement.query(By.css('.button--save'));
                    saveButton.triggerEventHandler('click', {});
                });
                it('component is locked', () => {
                    expect(component.unlocked).toBeFalsy();
                });
                it('a save event is sent', () => {
                    expect(component.save.emit).toHaveBeenCalled();
                });

            });
            describe('and cancel button is clicked', () => {
                beforeEach(() => {
                    const cancelButton = rootElement.query(By.css('.button--cancel'));
                    cancelButton.triggerEventHandler('click', {});
                });
                it('lock button is locked', () => {
                    expect(component.unlocked).toBeFalsy();
                });
                it('a cancel event is sent', () => {
                    expect(component.cancel.emit).toHaveBeenCalled();
                });
            });

            describe('and lock button is clicked', () => {
                beforeEach(() => {
                    lockButton.triggerEventHandler('lockChanged', true);
                });
                it('a save event is sent', () => {
                    expect(component.save.emit).toHaveBeenCalled();
                });
                it('component is locked', () => {
                    expect(component.unlocked).toBe(false);
                });
            });
        });

    });
    describe('On initialized with no lock ', () => {
        beforeEach(() => {
            spyOn(component.cancel, 'emit');
            spyOn(component.save, 'emit');
            spyOn(component.unlock, 'emit');
            component.hideLock = true;
            component.ngOnInit();
            fixture.detectChanges();
        });
        it('lock button is hidden', () => {
            expect(rootElement.queryAll(By.css('vgr-lock-button')).length).toBe(0);
        });
        it('no unlock event is emitted', () => {
            expect(component.unlock.emit).toHaveBeenCalledTimes(0);
        });
        it('component is unlocked', () => {
            expect(component.unlocked).toBeTruthy();
        });
        describe('and save button is clicked', () => {
            beforeEach(() => {
                const saveButton = rootElement.query(By.css('.button--save'));
                saveButton.triggerEventHandler('click', {});
            });
            it('component remains unlocked', () => {
                expect(component.unlocked).toBeTruthy();
            });
            it('no unlock event is emitted', () => {
                expect(component.unlock.emit).toHaveBeenCalledTimes(0);
            });
            it('a save event is emitted', () => {
                expect(component.save.emit).toHaveBeenCalled();
            });
        });
        describe('and cancel button is clicked', () => {
            beforeEach(() => {
                const cancelButton = rootElement.query(By.css('.button--cancel'));
                cancelButton.triggerEventHandler('click', {});
            });

            it('component remains unlocked', () => {
                expect(component.unlocked).toBeTruthy();
            });
            it('no unlock event is emitted', () => {
                expect(component.unlock.emit).toHaveBeenCalledTimes(0);
            });
            it('a cancel event is sent', () => {
                expect(component.cancel.emit).toHaveBeenCalled();
            });
        });

    });
});
