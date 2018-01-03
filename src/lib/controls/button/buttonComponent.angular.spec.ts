
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

describe('[ButtonComponent - Angular]', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [ButtonComponent],
            imports: [CommonModule, FormsModule]
        });

        TestBed.overrideComponent(ButtonComponent, {
            set: {
                templateUrl: 'button.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ButtonComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When button is initialized', () => {
        let textButtonElement: DebugElement;
        beforeEach(() => {
            textButtonElement = rootElement.query(By.css('.text-button'));

        });

        describe('And button is enabled', () => {
            beforeEach(() => {
                component.disabled = false;
                fixture.detectChanges();
            });
            it('button is enabled', () => {
                expect(textButtonElement.classes['button--disabled']).toBe(false);
            });
        });
        describe('When button is disabled', () => {
            beforeEach(() => {
                component.disabled = true;
                fixture.detectChanges();
                spyOn(component.click, 'emit');
            });
            it('button is displayed as disabled', () => {
                expect(textButtonElement.classes['button--disabled']).toBe(true);
            });

            describe('and button is clicked', () => {
                const mockEvent = { stopPropagation: () => { } };
                beforeEach(() => {
                    spyOn(mockEvent, 'stopPropagation');
                    textButtonElement.triggerEventHandler('click', mockEvent);
                });
                it('the click event is not propagated', () => {
                    expect(mockEvent.stopPropagation).toHaveBeenCalled();
                });
            });
            describe('and space is pressed', () => {
                it('no clicked event is triggered', () => {
                    textButtonElement.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
                    expect(component.click.emit).toHaveBeenCalledTimes(0);
                });
            });
            describe('and Enter is pressed', () => {
                it('no clicked event is triggered', () => {
                    textButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
                    expect(component.click.emit).toHaveBeenCalledTimes(0);
                });
            });
        });
    });

    describe('WCAG Tests', () => {
        let textButtonElement: DebugElement;
        beforeEach(() => {
            textButtonElement = rootElement.query(By.css('.text-button'));
            spyOn(component.click, 'emit');
        });
        describe('When button is enabled', () => {
            it('button has tab stop', () => {
                expect(textButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
            });

            it('button has role "button"', () => {
                expect(textButtonElement.attributes['role']).toBe('button');
            });

            it('aria-disabled is false', () => {
                expect(textButtonElement.attributes['aria-disabled']).toBe('false');
            });

            describe('and space is pressed', () => {
                const spacePressedEvent = { preventDefault: () => { }, keyCode: 32 };
                beforeEach(() => {
                    spyOn(spacePressedEvent, 'preventDefault');
                    textButtonElement.triggerEventHandler('keydown', spacePressedEvent);

                });
                it('a clicked event is triggered', () => {
                    expect(component.click.emit).toHaveBeenCalled();
                });
                it('to prevent the default behaviour of SPACE, preventDefault is called', () => {
                    expect(spacePressedEvent.preventDefault).toHaveBeenCalled();
                });
            });
            describe('and Enter is pressed', () => {
                it('a clicked event is triggered', () => {
                    textButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
                    expect(component.click.emit).toHaveBeenCalled();
                });
            });
            describe('and a letter is pressed', () => {
                it('no clicked event is triggered', () => {
                    textButtonElement.triggerEventHandler('keydown', { keyCode: 167 } as KeyboardEvent);
                    expect(component.click.emit).toHaveBeenCalledTimes(0);
                });
            });
        });
        describe('When button is disabled', () => {
            beforeEach(() => {
                component.disabled = true;
                fixture.detectChanges();
            });
            it('button has tab stop', () => {
                expect(textButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
            });
            it('aria-disabled is set to true', () => {
                expect(textButtonElement.attributes['aria-disabled']).toBe('true');
            });
        });
    });
});

