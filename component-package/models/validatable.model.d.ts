import { IValidationResult } from './validated.model';
import { ValidationErrorState } from '../controls/input/input.component'

export interface IValidatable {
    validate(): IValidationResult;
    validationErrorState: ValidationErrorState;
    validationErrorMessage: string;
}