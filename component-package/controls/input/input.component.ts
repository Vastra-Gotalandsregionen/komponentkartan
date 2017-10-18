import { Component, Input, EventEmitter, Output, HostBinding, OnInit, ElementRef, forwardRef } from '@angular/core'
import { DecimalPipe } from '@angular/common'
import { IValidationResult, ValidationErrorState, IValidation } from '../../models/validation.model';
import { ValidationComponent } from '../../controls/validation/validation.component';

@Component({
    selector: 'vgr-input',
    moduleId: module.id,
    templateUrl: './input.component.html',
    providers: [{ provide: ValidationComponent, useExisting: forwardRef(() => InputComponent) }]

})
export class InputComponent extends ValidationComponent implements OnInit, IValidation {
    // För att kunna använda enum i markup måste den definieras som en variabel här
    validationErrorStates = ValidationErrorState;
    @HostBinding('class.validated-input') hasClass = true;
    @Input() @HostBinding('class.readonly') readonly?: boolean;
    @Input() @HostBinding('class.input--small') small: boolean;
    @Input() @HostBinding('class.align-right') alignRight: boolean;

    @Input() validateOnInit: boolean;
    @Input() suffix: string;
    @Input() type: string;
    @Input() value: any;
    @Input() placeholder: string;
    @Input() title: string;
    @Input() maxlength?: number;
    @Input() required: boolean;
    @Input() pattern: string;
    @Input() invalidText: string;
    @Input() customValidator: Function;

    @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

    numericValue?: number;
    swedishDecimalPipe: DecimalPipe = new DecimalPipe('sv-se');
    decimalPipeConfiguration: string;
    displayValue: string;
    private maxNumberOfDecimals = 2;

    private get isAmount(): boolean {
        return this.type === 'amount';
    }
    private get isPercent(): boolean {
        return this.type === 'percent';
    }
    private get isKm(): boolean {
        return this.type === 'km';
    }
    private get isNumeric(): boolean {
        return this.type === 'numeric' || this.isAmount || this.isKm || this.isPercent;
    }

    private get invalidFormatText(): string {
        return this.small ? 'Formatfel' : 'Felaktigt format';
    }

    private get requiredFieldText(): string {
        return this.small ? 'Obligatoriskt' : 'Fältet är obligatoriskt';
    }

    private get invalidPatternValidationResult(): IValidationResult {
        return {
            isValid: false,
            validationError: this.invalidText && this.invalidText.length > 0 ? this.invalidText : this.invalidFormatText
        } as IValidationResult
    }

    private get emptyRequiredFieldValidationResult(): IValidationResult {

        return {
            isValid: false,
            validationError: this.invalidText && this.invalidText.length > 0 ? this.invalidText : this.requiredFieldText
        } as IValidationResult
    }
    private get successfulValidationResult(): IValidationResult {
        return { isValid: true, validationError: '' } as IValidationResult
    }

    constructor() {
        super();
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
            this.isContentValid();
        };
    }

    setupNumericFormat(suffix?: string, minIntegerDigits: number = 1, minFractionDigits: number = 0, maxFractionDigits: number = this.maxNumberOfDecimals) {
        if (!this.pattern) {
            this.pattern = '^[-,−]{0,1}(\\d{1,3}([,\\s.]\\d{3})*|\\d+)([.,]\\d+)?$';
        }
        if (!this.suffix && suffix) {
            this.suffix = suffix;
        }
        this.alignRight = true;
        this.decimalPipeConfiguration = minIntegerDigits + '.' + minFractionDigits + '-' + maxFractionDigits;
    }

    onFocus(event: FocusEvent): void {
        if (this.readonly) {
            return;
        }
        this.setValidationStateEditing();

        if (this.isNumeric) {
            if (this.value && !isNaN(this.value)) {
                this.displayValue = this.value % 1 !== 0 ?
                    this.swedishDecimalPipe.transform(this.value, this.decimalPipeConfiguration).replace(/\s/g, '') :
                    this.swedishDecimalPipe.transform(this.value, '1.0-2').replace(/\s/g, '');
            }
        }
    }

    onValueChange(input: any) {
        this.displayValue = input;
        if (!this.isNumeric) {
            this.value = input;
        }
    }

    doValidate(): IValidationResult {
        let result = this.successfulValidationResult;
        if (this.readonly) {
            result = this.successfulValidationResult;
        } else if (this.customValidator) {
            result = this.customValidator(this.displayValue);
        } else if (!this.displayValue || this.displayValue.length === 0) {
            if (this.required) {
                result = this.emptyRequiredFieldValidationResult;
            } else {
                result = this.successfulValidationResult;
            }
        } else if (this.pattern && this.pattern.length > 0) {
            const valueToMatch = this.displayValue !== undefined ? this.displayValue : '';
            const regexp = new RegExp(this.pattern);
            if (!regexp.test(valueToMatch)) {
                result = this.invalidPatternValidationResult;
            }
        }
        return result;
    }

    onLeave(): void {
        if (this.readonly) {
            return;
        }

        if (this.isContentValid()) {
            if (this.isNumeric) {
                this.value = this.convertStringToNumber(this.displayValue);
                this.displayValue = this.convertNumberToString(this.value);
            }
        } else {
            if (this.isNumeric) {
                this.value = NaN;
            }
        }

        this.valueChanged.emit(this.value);

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

    private isContentValid(): boolean {
        const validationResult = this.validate();
        return validationResult.isValid;
    }
}

