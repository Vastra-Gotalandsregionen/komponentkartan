import { IValidationResult } from './validated.model';

export interface IValidatable {
    validate(): IValidationResult;
}