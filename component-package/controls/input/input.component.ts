import { Component, Input, EventEmitter, Output, HostBinding, OnInit, ElementRef } from '@angular/core'
import { DecimalPipe } from '@angular/common'
import { IValidationResult } from '../../models/validated.model';



@Component({
    selector: 'vgr-input',
    moduleId: module.id,
    templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {
    // För att kunna använda enum i markup måste den definieras som en variabel här
    validationErrorStates = ValidationErrorState;
    @HostBinding('class.validated-input') hasClass = true;
    @Input() @HostBinding('class.readonly') readonly?: boolean;
    @Input() value: any;
    numericValue?: number;
    @Input() validateOnInit: boolean;
    @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

    validationErrorState: ValidationErrorState;
    validationErrorMessage: string;

    swedishDecimalPipe: DecimalPipe = new DecimalPipe('sv-se');
    decimalPipeConfiguration: string;
    @Input() placeholder: string;
    @Input() title: string;

    // Standardvalidering
    @Input() maxlength?: number;
    @Input() required: boolean;
    @Input() pattern: string;
    @Input() invalidText: string;

    @Input() suffix: string;
    @Input() @HostBinding('class.align-right') alignRight: boolean;

    @Input() type: string;

    displayValue: string;

    get isAmount(): boolean {
        return this.type === 'amount';
    }
    get isPercent(): boolean {
        return this.type === 'percent';
    }
    get isKm(): boolean {
        return this.type === 'km';
    }
    get isNumeric(): boolean {
        return this.type === 'numeric' || this.isAmount || this.isKm || this.isPercent;
    }
    // Egen validering
    @Input() customValidator: Function;

    private maxNumberOfDecimals = 2;

    constructor() {
        this.validationErrorState = ValidationErrorState.NoError;
    }

    get invalidPatternValidationResult(): IValidationResult {
        return {
            isValid: false,
            validationError: this.invalidText && this.invalidText.length > 0 ? this.invalidText : 'Felaktigt format'
        } as IValidationResult
    }
    get emptyRequiredFieldValidationResult(): IValidationResult {
        return {
            isValid: false,
            validationError: this.invalidText && this.invalidText.length > 0 ? this.invalidText : 'Fältet är obligatoriskt'
        } as IValidationResult
    }
    get successfulValidationResult(): IValidationResult {
        return { isValid: true, validationError: '' } as IValidationResult
    }

    ngOnInit() {
        if (this.pattern && this.pattern.length > 0) {
            this.required = true;
        }
        if (this.isNumeric) {
            if (this.isAmount) {
                this.setupNumericFormat('kr', 1, 2, this.maxNumberOfDecimals);
            } else if (this.isKm) {
                this.setupNumericFormat('km');
            } else if (this.isPercent) {
                this.setupNumericFormat('%');
            } else if (this.isNumeric) {
                this.setupNumericFormat();
            }
            this.displayValue = this.convertNumberToString(this.value);
        } else {
            this.displayValue = this.value;
        }
        if (this.validateOnInit) {
            this.updateValidation();
        };
    }

    setupNumericFormat(suffix?: string, minIntegerDigits: number = 1, minFractionDigits: number = 0, maxFractionDigits: number = this.maxNumberOfDecimals) {
        if (!this.pattern) {
            this.pattern = '^[-]{0,1}(\\d{1,3}([,\\s.]\\d{3})*|\\d+)([.,]\\d+)?$';
        }
        if (!this.suffix && suffix) {
            this.suffix = suffix;
        }
        this.alignRight = true;
        this.decimalPipeConfiguration = minIntegerDigits + '.' + minFractionDigits + '-' + maxFractionDigits;
    }

    onFocus(event: FocusEvent): void {

        if (this.validationErrorState === ValidationErrorState.Active) {
            this.setValidationState(ValidationErrorState.Editing);
        } else if (this.validationErrorState === ValidationErrorState.Fixed) {
            this.setValidationState(ValidationErrorState.NoError);
        }

        if (this.isNumeric) {
            if (this.value && !isNaN(this.value)) {
                this.displayValue = this.value % 1 !== 0 ?
                    this.swedishDecimalPipe.transform(this.value, this.decimalPipeConfiguration).replace(/\s/g, '') :
                    this.swedishDecimalPipe.transform(this.value, '1.0-2').replace(/\s/g, '');
            }
        }

    }

    onValueChange(value: any) {
        this.displayValue = value;
        if (!this.isNumeric) {
            this.value = value;
        }
    }

    validateInput(): IValidationResult {
        if (this.customValidator) {
            return this.customValidator(this.displayValue);
        }

        if (!this.displayValue || this.displayValue.length === 0) {
            if (this.required) {
                return this.emptyRequiredFieldValidationResult;
            } else {
                return this.successfulValidationResult;
            }
        }

        if (this.pattern && this.pattern.length > 0) {
            const valueToMatch = this.value !== undefined ? this.value : '';
            const regexp = new RegExp(this.pattern);
            if (!regexp.test(valueToMatch)) {
                return this.invalidPatternValidationResult;
            }
        }

        return this.successfulValidationResult;
    }

    onLeave(): void {
        if (this.isNumeric) {
            this.value = this.convertStringToNumber(this.displayValue);

            if (!isNaN(this.value)) {
                this.displayValue = this.convertNumberToString(this.value);
            }
        }

        this.valueChanged.emit(this.value);
        this.updateValidation();
    }

    convertNumberToString(value: number): string {
        if (!isNaN(this.value)) {
            return this.swedishDecimalPipe.transform(this.value, this.decimalPipeConfiguration);
        }
        return null;
    }

    convertStringToNumber(value: string): number {
        if (value) {
            const normalized = value.toString().trim().replace(/\s/g, '').replace(',', '.').replace('−', '-');
            const floatVal = this.roundNumber(parseFloat(normalized));
            return floatVal;
        }
        return NaN;
    }

    roundNumber(number: number, numberOfDecimals = this.maxNumberOfDecimals) {
        if (isNaN(number)) {
            return number;
        }

        const factor = Math.pow(10, numberOfDecimals);
        const tempNumber = number * factor;
        const roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };

    updateValidation(): void {
        const validationResult = this.validateInput();

        if (validationResult.isValid) {
            if (this.validationErrorState === ValidationErrorState.NoError) {
                return;
            }

            this.validationErrorMessage = '';

            if (this.validationErrorState === ValidationErrorState.Active || this.validationErrorState === ValidationErrorState.Editing) {
                this.setValidationState(ValidationErrorState.Fixed);
                return;
            }
            if (this.validationErrorState === ValidationErrorState.Fixed) {
                this.setValidationState(ValidationErrorState.NoError);
                return;
            }
        }

        this.setValidationState(ValidationErrorState.Active);
        this.validationErrorMessage = validationResult.validationError;
    }

    setValidationState(newValidationErrorState: ValidationErrorState) {
        this.validationErrorState = newValidationErrorState;
    }
}

export enum ValidationErrorState {
    NoError,
    Active,
    Editing,
    Fixed
}
