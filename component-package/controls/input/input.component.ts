import { Component, Input, EventEmitter, Output, HostBinding, OnInit } from '@angular/core'
import { IValidationResult, IStringValidator } from '../../models/validated.model';

@Component({
    selector: 'vgr-input',
    moduleId: module.id,
    templateUrl: './input.component.html'
})
export class InputComponent implements OnInit {
    // För att kunna använda enum i markup måste den definieras som en variabel här
    validationErrorStates = ValidationErrorState;
    @HostBinding('class.validated-input') hasClass = true;
    @HostBinding('class.disabled') @Input() disabled: boolean;
    @Input() value: string;

    @Input() validateOnInit: boolean;
    @Output() valueChanged: EventEmitter<string> = new EventEmitter<string>();

    validationErrorState: ValidationErrorState;
    validationErrorMessage: string;



    // Standardvalidering
    @Input() maxlength?: number;
    @Input() minlength?: number;
    @Input() required: boolean;
    @Input() integer: boolean;
    @Input() decimal: boolean;

    @Input() pattern: string;
    @Input() invalidText: string;

    // Egen validering
    @Input() customValidator: Function;

    constructor() {
        this.validationErrorState = ValidationErrorState.NoError;
    }

    get failedValidationResult(): IValidationResult {
        return { isValid: false, validationError: this.invalidText } as IValidationResult
    }
    get successfulValidationResult(): IValidationResult {
        return { isValid: true, validationError: '' } as IValidationResult
    }

    ngOnInit() {
        if (this.validateOnInit) {
            this.updateValidation();
        };
    }

    onFocus(): void {
        if (this.validationErrorState === ValidationErrorState.Active) {
            this.setValidationState(ValidationErrorState.Editing);
        }
    }

    validateInput(): IValidationResult {
        if (this.required && (!this.value || this.value.length === 0)) {
            return this.failedValidationResult;
        }

        if (this.pattern && this.pattern.length > 0) {
            if (!this.value.match(this.pattern)) {
                return this.failedValidationResult;
            }
        }

        if (!this.customValidator) {
            return this.successfulValidationResult;
        }
        return this.customValidator(this.value);
    }


    onLeave(): void {
        this.valueChanged.emit(this.value);
        this.updateValidation();
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
            this.setValidationState(ValidationErrorState.NoError);
        }

        this.setValidationState(ValidationErrorState.Active);
        this.validationErrorMessage = validationResult.validationError;
    }

    setValidationState(newValidationErrorState: ValidationErrorState) {
        this.validationErrorState = newValidationErrorState;
    }

    /* Validering av datatyper, bryta ut till egen service */
    isInt(value: any) {
        if (isNaN(value)) {
            return false;
        }
        const x = parseFloat(value);
        return (x | 0) === x;
    }

    isNumber(value: any) {
        return !isNaN(value);

    }
}

export enum ValidationErrorState {
    NoError,
    Active,
    Editing,
    Fixed
}
