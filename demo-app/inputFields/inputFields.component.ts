import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { IValidationResult, ValidationErrorState, IValidation, ICustomValidator } from '../../component-package/models/validation.model';
import { CityService } from './cityService';
import { ISelectableItem } from '../../component-package/models/selectableItem.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';

@Component({
    moduleId: module.id,
    selector: 'vgr-input-fields',
    templateUrl: 'inputFields.component.html',

})

export class InputFieldsComponent {
    // Reactive form
    form: FormGroup;

    // Enum declarations
    cityName: string;
    amount1: number;
    amount2: number;
    numericValue: number;
    percentValue: number;
    kmValue: number;
    intValue: number;
    headerExpanded: boolean;
    isSmall: boolean;

    validationMessage: string;
    formErrors: any;

    state: string;
    allCities: any;

    constructor(private fb: FormBuilder) {
        this.cityName = 'Houstons';
        this.amount1 = 15000;
        this.amount2 = -25.5;
        this.percentValue = 0.02;
        this.kmValue = 11;
        this.intValue = 0;
        this.isSmall = false;
    }

    ngOnInit() {
        this.createForm();
        this.validationMessage = 'aj då';
    }

    createForm() {
        this.form = this.fb.group({
            control1: [this.amount1],
            control2: [this.amount2, Validators.required],
            control3: [this.percentValue],
            control4: [this.kmValue],
            control5: [this.numericValue],
            control6: [],
            control7: ['abc', Validators.pattern('^[A-Z,Å,Ä,Ö]{3}$')],
            control8: ['', Validators.pattern('^.{2,6}$')],
            control9: [this.intValue, Validators.pattern('^[0-9]+$')],
            control10: ['', Validators.required],
            control11: ['Visar värdet utan ram'],
            control12: [],
            control13: [this.cityName, validateCityName],
            control14: ['', Validators.email]
        });
    }

    formatNumericValue(value: number) {
        return isNaN(value) ? 'Inget' : value;
    }

    toggleInputType(option: ISelectableItem) {
        if (option.displayName === 'Stor')
            this.isSmall = false;
        else
            this.isSmall = true;
    }
}

function validateCityName(control: AbstractControl) {
    const service = new CityService();
    const allCities = service.getCities();
    if (allCities.filter(x => x.city === control.value).length > 0) {
        return null
    }
    return { invalidCity: true };
}