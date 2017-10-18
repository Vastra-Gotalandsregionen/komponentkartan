import { Component, HostBinding } from '@angular/core';
import { IValidation, IValidationResult, ValidationErrorState } from '../../models/validation.model';



@Component({
})
export abstract class ValidationComponent implements IValidation {

    private validationErrorState: ValidationErrorState;
    private validationErrorMessage: string;

    @HostBinding('class.validation-error--active') get validationErrorActive() {
        return this.validationErrorState === ValidationErrorState.Active;
    }
    @HostBinding('class.validation-error--editing') get validationErrorEditing() {
        return this.validationErrorState === ValidationErrorState.Editing;
    }
    @HostBinding('class.validation-error--fixed') get validationErrorFixed() {
        return this.validationErrorState === ValidationErrorState.Fixed;
    }

    constructor() {
        this.validationErrorState = ValidationErrorState.NoError;
    }

    abstract doValidate(): IValidationResult;

    validate(): IValidationResult {
        const result = this.doValidate();
        if (result.isValid) {
            this.setValidationStateNoError();
        } else {
            this.setValidationStateErrorActive(result.validationError);
        }
        return result;
    }

    protected setValidationStateEditing() {
        if (this.validationErrorState === ValidationErrorState.Active) {
            this.validationErrorState = ValidationErrorState.Editing;
        } else if (this.validationErrorState === ValidationErrorState.Fixed) {
            this.setValidationStateNoError();
        }
    }

    private setValidationStateErrorActive(message: string) {
        this.validationErrorMessage = message;
        this.validationErrorState = ValidationErrorState.Active;
    }

    private setValidationStateErrorFixed() {
        this.validationErrorMessage = '';
        this.validationErrorState = ValidationErrorState.Fixed;
    }
    private setValidationStateNoError() {
        if (this.validationErrorState === ValidationErrorState.Active || this.validationErrorState === ValidationErrorState.Editing) {
            this.setValidationStateErrorFixed();
        } else {
            this.validationErrorMessage = '';
            this.validationErrorState = ValidationErrorState.NoError;
        }
    }
}
