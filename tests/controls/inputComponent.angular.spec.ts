
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
    CommonModule, DecimalPipe
} from '@angular/common';

import {
    InputComponent, ValidationErrorState
} from '../../component-package/controls/input/input.component';

import {
    IValidationResult
} from '../../component-package/models/validated.model';
import { TruncatePipe } from '../../component-package/pipes/truncatePipe';

import 'intl/locale-data/jsonp/se-SE.js';


describe('[InputComponent]', () => {
    let component: InputComponent;
    let fixture: ComponentFixture<InputComponent>;
    let rootElement: DebugElement;
    const validationErrorStates = ValidationErrorState;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [InputComponent, TruncatePipe],
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


    describe('When no invalidText is set and validate on init is set', () => {
        beforeEach(() => {
            component.validateOnInit = true;
        });

        describe('and a required field is left empty', () => {
            beforeEach(() => {
                component.required = true;
                component.ngOnInit();
            });
            it('validationErrorMessage is Fältet är obligatoriskt', () => {
                expect(component.validationErrorMessage).toBe('Fältet är obligatoriskt')
            });
        });
        describe('and the value does not match the pattern', () => {
            beforeEach(() => {
                component.value = 'dasds';
                component.pattern = '^.{1}$';
                component.ngOnInit();
            });
            it('validationErrorMessage is Felaktigt format', () => {
                expect(component.validationErrorMessage).toBe('Felaktigt format')
            });
        });
    });


    describe('When initialized as required', () => {
        beforeEach(() => {
            component.required = true;
            component.invalidText = 'Value requried';
            component.ngOnInit();
        });
        describe('and user leaves the input empty', () => {
            beforeEach(() => {
                component.onValueChange('');
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
                component.onValueChange('foo');
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
                component.onValueChange('AB');
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
                        component.onValueChange('a');
                        component.onLeave();
                    });
                    it('Validation error state is Active', () => {
                        expect(component.validationErrorState).toEqual(validationErrorStates.Active);
                    });
                });

                describe('and the user enters a valid value and leaves', () => {
                    beforeEach(() => {
                        component.onValueChange('ABC');
                        component.onLeave();
                    });
                    it('Validation error state is Fixed', () => {
                        expect(component.validationErrorState).toEqual(validationErrorStates.Fixed);
                    });

                    describe('and the user enters and leaves without editing', () => {
                        beforeEach(() => {
                            component.onFocus(null);
                            component.onLeave();
                        });
                        it('Validation error state is No error', () => {
                            expect(component.validationErrorState).toEqual(validationErrorStates.NoError);
                        });
                    });
                });
            });
        });
    });

    describe('when initialized as an amount with no value', () => {
        beforeEach(() => {
            component.type = 'amount';
            component.required = false;
            spyOn(component.valueChanged, 'emit');
            component.ngOnInit();
        });
        describe('and the user leaves the field empty', () => {
            beforeEach(() => {
                component.onLeave();
            });
            it('there is no validation error', () => {
                expect(component.validationErrorState).toBe(validationErrorStates.NoError);
            });
            it('a valuechange event is emitted with NaN', () => {
                expect(component.valueChanged.emit).toHaveBeenCalledWith(NaN);
            });
        });
    });

    describe('When initialized as a small amount', () => {
        beforeEach(() => {
            component.type = 'amount';
            component.value = 22;
            component.ngOnInit();
            fixture.detectChanges();
            spyOn(component.valueChanged, 'emit');
        });
        it('display value is 22,00', () => {
            expect(component.displayValue).toEqual('22,00');
        });
        describe('and field is left without changes', () => {
            beforeEach(() => {
                component.onLeave();
                fixture.detectChanges();
            });
            it('22,00 is displayed', () => {
                expect(component.displayValue).toBe('22,00');
            });
            it('a value change event is emitted with an unchanged value', () => {
                expect(component.valueChanged.emit).toHaveBeenCalledWith(22);
            });
        });
        describe('and field is left with a new valid value', () => {
            beforeEach(() => {
                component.onValueChange('23');
                component.onLeave();
                fixture.detectChanges();
            });
            it('23,00 is displayed', () => {
                expect(component.displayValue).toBe('23,00');
            });
            it('a value change event is emitted with an unchanged value', () => {
                expect(component.valueChanged.emit).toHaveBeenCalledWith(23);
            });
        });
        describe('and field is left with a new valid decimal value', () => {
            beforeEach(() => {
                component.onValueChange('23,50');
                component.onLeave();
                fixture.detectChanges();
            });
            it('23,50 is displayed', () => {
                expect(component.displayValue).toBe('23,50');
            });
            it('a value change event is emitted with an unchanged value', () => {
                expect(component.valueChanged.emit).toHaveBeenCalledWith(23.5);
            });
            it('no validation error exists', () => {
                expect(component.validationErrorState).toEqual(validationErrorStates.NoError);
            })

            describe('and field is focused', () => {
                beforeEach(() => {
                    component.onFocus(null);
                });
                it('23,50 is displayed', () => {
                    expect(component.displayValue).toBe('23,50');
                });
            });
        });
        describe('and field is left empty', () => {
            beforeEach(() => {
                component.onValueChange('');
                component.onLeave();
                fixture.detectChanges();
            });
            it('nothing is displayed', () => {
                expect(component.displayValue).toBe('');
            });
            it('a value change event is emitted with NaN', () => {
                expect(component.valueChanged.emit).toHaveBeenCalledWith(NaN);
            });
            it('no validation error exists', () => {
                expect(component.validationErrorState).toEqual(validationErrorStates.NoError);
            })
        });
    });

    describe('When initialized with a negative amount', () => {
        beforeEach(() => {
            component.type = 'amount';
            component.value = -32.5;
            component.ngOnInit();
            fixture.detectChanges();
            spyOn(component.valueChanged, 'emit');
        });
        it('display value is -32,50', () => {
            expect(component.displayValue).toEqual('−32,50');
        });
        describe('and field is left without changes', () => {
            beforeEach(() => {
                component.onLeave();
                fixture.detectChanges();
            });
            it('32,50 is displayed', () => {
                expect(component.displayValue).toBe('−32,50');
            });
            it('a value change event is emitted with an unchanged value', () => {
                expect(component.valueChanged.emit).toHaveBeenCalledWith(-32.5);
            });
            it('and field is valid', () => {
                expect(component.validationErrorState).toBe(validationErrorStates.NoError);
            });
        });
    });

    describe('When zero is entered', () => {
        beforeEach(() => {
            component.type = 'amount';
            component.ngOnInit();
            component.onValueChange('0');
        });
        describe('and field is left', () => {
            beforeEach(() => {
                spyOn(component.valueChanged, 'emit');
                component.onLeave();
                fixture.detectChanges();
            });
            it('0,00 is displayed', () => {
                expect(component.displayValue).toBe('0,00');
            });
            it('a value change event is emitted with an unchanged value', () => {
                expect(component.valueChanged.emit).toHaveBeenCalledWith(0);
            });
            it('and field is valid', () => {
                expect(component.validationErrorState).toBe(validationErrorStates.NoError);
            });
        });
    });

    describe('When initialized as a large amount', () => {
        beforeEach(() => {
            component.type = 'amount';
            component.value = 15000;
            component.ngOnInit();
            spyOn(component.valueChanged, 'emit');
        });
        it('display value is 15 000,00', () => {
            expect(component.displayValue).toEqual('15 000,00');
        });
        describe('and field is left without changes', () => {
            beforeEach(() => {
                component.onLeave();
            });
            it('15 000,00 is displayed', () => {
                expect(component.displayValue).toEqual('15 000,00');
            });
            it('a value change event is emitted with an unchanged value', () => {
                expect(component.valueChanged.emit).toHaveBeenCalledWith(15000);
            });
        });
        describe('and field is re-entered', () => {
            beforeEach(() => {
                component.onFocus(null);
            });
            it('15000 is displayed', () => {
                expect(component.displayValue).toEqual('15000');
            });
        });
    });


    describe('When amount with three digits is entered', () => {
        beforeEach(() => {
            component.type = 'amount';
            component.ngOnInit();
            component.onValueChange('125,106');
        });
        describe('and field is left', () => {
            beforeEach(() => {
                spyOn(component.valueChanged, 'emit');
                component.onLeave();
                fixture.detectChanges();
            });
            it('125,11 is displayed', () => {
                expect(component.displayValue).toBe('125,11');
            });
            it('value is 125,11', () => {
                expect(component.value).toBe(125.11);
            });
            it('a value change event is emitted with formatted value', () => {
                expect(component.valueChanged.emit).toHaveBeenCalledWith(125.11);
            });
            it('and field is valid', () => {
                expect(component.validationErrorState).toBe(validationErrorStates.NoError);
            });
        });
    });


    describe('When initialized with a valid amount', () => {
        beforeEach(() => {
            component.type = 'amount';
            component.value = 225200.5;
            component.ngOnInit();
            spyOn(component.valueChanged, 'emit');
        });
        it('display value is 225 200,50', () => {
            expect(component.displayValue).toEqual('225 200,50');
        });
        describe('and field is left with an invalid value', () => {
            beforeEach(() => {
                component.onValueChange('Not a number');
                component.onLeave();
            });
            it('Not a number is displayed', () => {
                expect(component.displayValue).toEqual('Not a number');
            });
            it('value is set to null', () => {
                expect(component.value).toBeNaN();
            });
            it('no value change event is emitted with an unchanged value', () => {
                expect(component.valueChanged.emit).toHaveBeenCalledWith(NaN);
            });
            it('display value is Not a number', () => {
                expect(component.displayValue).toEqual('Not a number');
            });
            it('validation error state is active', () => {
                expect(component.validationErrorState).toBe(validationErrorStates.Active);
            });
        });
    });

    describe('when initialized with a custom validator', () => {
        describe('and the field is left invalid', () => {
            beforeEach(() => {
                component.customValidator = (s: any) => {
                    return { isValid: false, validationError: 'Validation failed' } as IValidationResult;
                };
                component.ngOnInit();
                component.onLeave();
            });
            it('validation error state is active', () => {
                expect(component.validationErrorState).toEqual(validationErrorStates.Active);
            });
            it('validation error message is fetched from the validator', () => {
                expect(component.validationErrorMessage).toEqual('Validation failed');
            });
        });
        describe('and the field is left valid', () => {
            beforeEach(() => {
                component.customValidator = (s: any) => {
                    return { isValid: true, validationError: '' } as IValidationResult;
                };
                component.ngOnInit();
                component.onLeave();
            });
            it('validation error state is none', () => {
                expect(component.validationErrorState).toEqual(validationErrorStates.NoError);
            });
            it('validation error message is undefined', () => {
                expect(component.validationErrorMessage).toBeUndefined();
            });
        });
    });
});

