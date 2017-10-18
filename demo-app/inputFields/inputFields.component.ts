import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { IValidationResult, ValidationErrorState, IValidation, ICustomValidator } from '../../component-package/models/validation.model';
import { CityService } from './cityService';
import { ISelectableItem } from '../../component-package/models/selectableItem.model';

@Component({
    moduleId: module.id,
    selector: 'vgr-input-fields',
    templateUrl: 'inputFields.component.html'
})
export class InputFieldsComponent {
    // Enum declarations
    cityName: string;
    amount1: number;
    amount2: number;
    numericValue: number;
    percentValue: number;
    kmValue: number;
    cityValidator: ICustomValidator;
    intValue: number;
    headerExpanded: boolean;
    isSmall: boolean;

    constructor(private cityService: CityService) {
        this.cityName = 'Houstons';
        this.cityValidator = {
            validate: (s: any) => this.validateCityName(s)
        }
        this.amount1 = 15000;
        this.amount2 = -25.5;
        this.percentValue = 0.02;
        this.kmValue = 11;
        this.intValue = 0;
        this.isSmall = false;

    }

    validateCityName(cityName: string): IValidationResult {
        const allCities = this.cityService.getCities();
        if (allCities.filter(x => x.city === cityName).length === 0) {
            return { validationError: 'Ange en av de 1000 största städerna i USA', isValid: false };
        }
        return { isValid: true, validationError: '' } as IValidationResult;
    }
    validateEmail(email: string): IValidationResult {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = regex.test(email);

        return { isValid: isValid, validationError: isValid ? '' : 'Ogiltig e-postadress' } as IValidationResult;
    }

    formatNumericValue(value: number) {
        return isNaN(value) ? 'Inget' : value;
    }
    toggleInputType(option: ISelectableItem) {
        console.log(this.isSmall);
        if (option.displayName === 'Stor')
            this.isSmall = false;
        else
            this.isSmall = true;
    }


}
