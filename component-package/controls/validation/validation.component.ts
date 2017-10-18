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

    constructor() {
        this.validationErrorState = ValidationErrorState.NoError;
    }

    abstract doValidate(): IValidationResult;

    validate(): IValidationResult {
        var result = this.doValidate();
        if (result.isValid) {
            this.setValidationStateNoError();
        } else {
            this.setValidationStateErrorActive(result.validationError);
        }
        return result;
    }

    protected setValidationStateErrorActive(message: string) {
        this.validationErrorMessage = message;
        this.validationErrorState = ValidationErrorState.Active;
    }
    protected setValidationStateErrorEditing() {
        if (this.validationErrorState === ValidationErrorState.Active)
            this.validationErrorState = ValidationErrorState.Editing;
    }
    protected setValidationStateErrorFixed() {
        this.validationErrorMessage = '';
        this.validationErrorState = ValidationErrorState.Fixed;
    }
    protected setValidationStateNoError() {
        this.validationErrorMessage = '';
        this.validationErrorState = ValidationErrorState.NoError;
    }

    //Active
}
