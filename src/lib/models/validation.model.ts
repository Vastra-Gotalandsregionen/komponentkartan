export interface IValidator {
    validate(value: any): IValidationResult;
}

export interface IValidationResult {
    validationError: string;
    isValid: boolean;
}

export interface IValidation {
    validate(): IValidationResult;
}
export interface ICustomValidator {
    validate(value: any): IValidationResult
}
export enum ValidationErrorState {
    NoError,
    Active,
    Editing,
    Fixed
}

