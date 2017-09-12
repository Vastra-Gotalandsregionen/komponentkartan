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
        if (this.isAmount) {
            this.setupNumericFormat('kr', 1, 2, 2);
            this.displayValue = this.convertNumberToString(this.value);
        } else if (this.isKm) {
            this.setupNumericFormat('km');
        } else if (this.isPercent) {
            this.setupNumericFormat('%');
        } else if (this.isNumeric) {
            this.setupNumericFormat();
        }
        if (this.validateOnInit) {
            this.updateValidation();
        };
    }

    setupNumericFormat(suffix?: string, minIntegerDigits: number = 1, minFractionDigits: number = 0, maxFractionDigits: number = 3) {
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
        // Behöver sätta en timeout för att kunna selectera allt innehåll i textboxen...
        setTimeout(() => {
            if (event && event.target) {
                (event.target as HTMLInputElement).select();
            }
        }, 200);

    }

    onValueChange(value: any) {
        this.displayValue = value;
        if (!this.isNumeric) {
            this.value = value;
        }
    }

    validateInput(): IValidationResult {
        if (this.required && (!this.value || this.value.length === 0)) {
            return this.emptyRequiredFieldValidationResult;
        }

        if (this.pattern && this.pattern.length > 0) {
            const valueToMatch = this.value ? this.value : '';
            const regexp = new RegExp(this.pattern);
            if (!regexp.test(valueToMatch)) {
                return this.invalidPatternValidationResult;
            }
        }

        if (!this.customValidator) {
            return this.successfulValidationResult;
        }
        return this.customValidator(this.value);
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
            return parseFloat(value.replace(/\s/g, '').replace(',', '.'));
        }
        return NaN;
    }

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
