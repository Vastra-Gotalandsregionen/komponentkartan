export interface IValidator {
    validate(value: any): IValidationResult;
}

export interface IValidationResult {
    validationError: string;
    isValid: boolean;
}