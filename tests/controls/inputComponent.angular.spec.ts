
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
import { TruncatePipe } from '../../component-package/pipes/truncatePipe';

import 'npm:intl/locale-data/jsonp/se-SE.js';

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
                component.pattern = '.{1}';
                component.ngOnInit();
            });
            it('validationErrorMessage is Fältet är obligatoriskt', () => {
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

                    describe('and the user enters and leaves without editing', () => {
                        beforeEach(() => {
                            component.onFocus();
                            component.onLeave();
                        });
                        it('Validation error state is Fixed', () => {
                            expect(component.validationErrorState).toEqual(validationErrorStates.NoError);
                        });
                    });
                });
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
            it('23,00 is displayed', () => {
                expect(component.displayValue).toBe('23,50');
            });
            it('a value change event is emitted with an unchanged value', () => {
                expect(component.valueChanged.emit).toHaveBeenCalledWith(23.5);
            });
        });

    });

    describe('When initialized as a large amount', () => {
        beforeEach(() => {
            component.type = 'amount';
            component.value = 15000;
            component.ngOnInit();
            fixture.detectChanges();
            spyOn(component.valueChanged, 'emit');
        });
        it('display value is 15 000,00', () => {
            expect(component.displayValue).toEqual('15 000,00');
        });
        describe('and field is left without changes', () => {
            beforeEach(() => {
                component.onLeave();
                fixture.detectChanges();
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
                component.onFocus();
                fixture.detectChanges();
            });
            it('15000 is displayed', () => {
                expect(component.displayValue).toEqual(15000);
            });
        });

    });

});

