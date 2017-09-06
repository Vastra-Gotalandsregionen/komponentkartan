
import {
    ComponentFixture,
    TestBed,
    async
} from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import {
    By
} from '@angular/platform-browser';
import {
    FormsModule
} from '@angular/forms'
import {
    DebugElement
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';

import {
    InputComponent, ValidationErrorState
} from '../../component-package/controls/input/input.component';


describe('[InputComponent]', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;
    let rootElement: DebugElement;
    const validationErrorStates = ValidationErrorState;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [InputComponent],
            imports: [CommonModule, FormsModule]
        });

        TestBed.overrideComponent(InputComponent, {
            set: {
                templateUrl: 'input.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(InputComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When initialized with no settings', () => {
        beforeEach(() => {
            component.ngOnInit();
        });
        it('Validation error state is no error', () => {
            expect(component.validationErrorState).toEqual(validationErrorStates.NoError);
        });
        it('There is no validation error message', () => {
            expect(component.validationErrorMessage).toBeUndefined();
        });
    });

    ///Hej då
    // describe('When no invalidText is sen on the input that is required', () => {
    //   beforeEach (() => {
    //     component.required = true;
    //     component.invalidText = 'Value requried';
    //     component.ngOnInit();
    //   });

    //   it('The invalidText gets "Fältet är obligatoriskt"', () => {
    //     expect(component.validationErrorMessage).toBe('Fältet är obligatoriskt')
    //   });


    // });

    describe('When initialized as required', () => {
        beforeEach(() => {
            component.required = true;
            component.invalidText = 'Value requried';
            component.ngOnInit();
        });
        describe('and user leaves the input empty', () => {
            beforeEach(() => {
                component.value = '';
                component.onLeave();
            });
            it('Validation error state is Active', () => {
                expect(component.validationErrorState).toEqual(validationErrorStates.Active);
            });
            it('Validation error message is Incorrect country code', () => {
                expect(component.validationErrorMessage).toEqual('Value requried');
            });
        });
        describe('and user enters text and leaves the input', () => {
            beforeEach(() => {
                component.value = 'foo';
                component.onLeave();
            });
            it('Validation error state is NoError', () => {
                expect(component.validationErrorState).toEqual(validationErrorStates.NoError);
            });
        });
    });

    describe('When initialized with a pattern', () => {
        beforeEach(() => {
            component.pattern = '[A-Za-z]{3}';
            component.invalidText = 'Incorrect country code';
            component.ngOnInit();
        });
        describe('and value is invalid when user leaves the input', () => {
            beforeEach(() => {
                component.value = 'AB';
                component.onLeave();
            });
            it('Validation error state is Active', () => {
                expect(component.validationErrorState).toEqual(validationErrorStates.Active);
            });
            it('Validation error message is Incorrect country code', () => {
                expect(component.validationErrorMessage).toEqual('Incorrect country code');
            });

            describe('and the user goes back to the input', () => {
                beforeEach(() => {
                    const inputField = rootElement.query(By.css('input'));
                    inputField.triggerEventHandler('focus', null);
                });

                it('Validation errorstate is editing', () => {
                    expect(component.validationErrorState).toEqual(validationErrorStates.Editing);
                });

                describe('and the user enters an invalid value and leaves', () => {
                    beforeEach(() => {
                        component.value = 'a';
                        component.onLeave();
                    });
                    it('Validation error state is Active', () => {
                        expect(component.validationErrorState).toEqual(validationErrorStates.Active);
                    });
                });

                describe('and the user enters a valid value and leaves', () => {
                    beforeEach(() => {
                        component.value = 'ABC';
                        component.onLeave();
                    });
                    it('Validation error state is Fixed', () => {
                        expect(component.validationErrorState).toEqual(validationErrorStates.Fixed);
                    });
                });
            });
        });
    });
});

