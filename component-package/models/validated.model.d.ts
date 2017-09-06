export interface IStringValidator {
    validate(value: string): IValidationResult;
}

export interface IValidationResult {
    validationError: string;
    isValid: boolean;
}