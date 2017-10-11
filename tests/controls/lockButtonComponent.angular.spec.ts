
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockButtonComponent } from '../../component-package/controls/lockButton/lockButton.component';


describe('TextButtonComponent', () => {
    let component: LockButtonComponent;
    let fixture: ComponentFixture<LockButtonComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [LockButtonComponent],
            imports: [CommonModule, FormsModule]
        });

        TestBed.overrideComponent(LockButtonComponent, {
            set: {
                templateUrl: 'lockButton.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(LockButtonComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When component is initialized', () => {
        let lockButtonElement: DebugElement;
        beforeEach(() => {
            lockButtonElement = rootElement.query(By.css('.lock-button'));
            spyOn(component.lockChanged, 'emit');
            component.unlocked = false;
        });
        it('button is enabled', () => {
            expect(lockButtonElement.classes['button--disabled']).toBeFalsy();
        });
        it('button has tab stop', () => {
            expect(lockButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
        });
        it('button is locked', () => {
            expect(lockButtonElement.classes['button--unlocked']).toBeFalsy();
        });
        describe('and button is clicked', () => {
            it('a lockChanged Event is triggered', () => {
                lockButtonElement.triggerEventHandler('click', {});
                expect(component.lockChanged.emit).toHaveBeenCalledWith(false);
            });
            it('button is unlocked', () => {
                lockButtonElement.triggerEventHandler('click', {});
                expect(component.unlocked).toBe(true);
            });
        });
        describe('and space is pressed', () => {
            it('a lockChanged Event is triggered', () => {
                lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
                expect(component.lockChanged.emit).toHaveBeenCalledWith(false);
            });
            it('button is unlocked', () => {
                lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
                expect(component.unlocked).toBe(true);
            });
        });
        describe('and Enter is pressed', () => {
            it('a lockChanged Event is triggered', () => {
                lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
                expect(component.lockChanged.emit).toHaveBeenCalledWith(false);
            });
            it('button is unlocked', () => {
                lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
                expect(component.unlocked).toBe(true);
            });
        });

        describe('and a letter is pressed', () => {
            it('a lockChangedEvent is triggered', () => {
                lockButtonElement.triggerEventHandler('keydown', { keyCode: 162 } as KeyboardEvent);
                expect(component.lockChanged.emit).toHaveBeenCalledTimes(0);
            });
            it('button is not unlocked', () => {
                lockButtonElement.triggerEventHandler('keydown', { keyCode: 162 } as KeyboardEvent);
                expect(component.unlocked).toBe(false);
            });
        });

        describe('and button is unlocked', () => {
            beforeEach(() => {
                component.unlocked = true;
                fixture.detectChanges();
            });
            describe('and button is clicked', () => {
                it('a lockChanged event is triggered', () => {
                    lockButtonElement.triggerEventHandler('click', {});
                    expect(component.lockChanged.emit).toHaveBeenCalledWith(true);
                });
                it('button is locked', () => {
                    lockButtonElement.triggerEventHandler('click', {});
                    expect(component.unlocked).toBe(false);
                });
            });
            describe('and space is pressed', () => {
                it('a lockChanged event is triggered', () => {
                    lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
                    expect(component.lockChanged.emit).toHaveBeenCalledWith(true);
                });
                it('button is locked', () => {
                    lockButtonElement.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
                    expect(component.unlocked).toBe(false);
                });
            });
            describe('and Enter is pressed', () => {
                it('a lockChanged event is triggered', () => {
                    lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
                    expect(component.lockChanged.emit).toHaveBeenCalledWith(true);
                });
                it('button is locked', () => {
                    lockButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
                    expect(component.unlocked).toBe(false);
                });
            });
            describe('and a letter is pressed', () => {
                it('a lockChanged event is triggered', () => {
                    lockButtonElement.triggerEventHandler('keydown', { keyCode: 168 } as KeyboardEvent);
                    expect(component.lockChanged.emit).toHaveBeenCalledTimes(0);
                });
                it('button is not locked', () => {
                    lockButtonElement.triggerEventHandler('keydown', { keyCode: 168 } as KeyboardEvent);
                    expect(component.unlocked).toBe(true);
                });
            });
        });

        describe('and button is disabled', () => {
            beforeEach(() => {
                component.disabled = true;
                fixture.detectChanges();
            });
            it('button is displayed as disabled', () => {
                expect(lockButtonElement.classes['button--disabled']).toBeTruthy();
            });
            it('button has no tab stop', () => {
                expect(lockButtonElement.nativeElement.attributes.tabIndex.value).toBe('-1');
            });
            describe('and button is clicked', () => {
                it('no lockChanged event is triggered', () => {
                    lockButtonElement.triggerEventHandler('click', null);
                    expect(component.lockChanged.emit).toHaveBeenCalledTimes(0);
                });
            });
        });
    });
});
