import { Component } from '@angular/core';
import { IStringValidator, IValidationResult } from '../../component-package/models/validated.model';
import { CityService } from './cityService';

@Component({
    moduleId: module.id,
    selector: 'vgr-input-fields',
    templateUrl: 'inputFields.component.html'
})
export class InputFieldsComponent {
    // Enum declarations
    cityName: string;

    cityValidator: IStringValidator;

    constructor(private cityService: CityService) {
        this.cityName = 'Houstons';
        this.cityValidator = {
            validate: (s) => this.validateCityName(s)
        }
    }

    validateCityName(cityName: string): IValidationResult {
        const allCities = this.cityService.getCities();
        if (allCities.filter(x => x.city === cityName).length === 0) {
            return { validationError: 'Detta är ett längre meddelande som visas när det går fel', isValid: false };
        }
        return { isValid: true, validationError: '' } as IValidationResult;
    }
    validateEmail(email: string): IValidationResult {
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const isValid = regex.test(email);

        return { isValid: isValid, validationError: isValid ? '' : 'Ogiltig e-postadress' } as IValidationResult;

    }



}
