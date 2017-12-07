import { Component } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { IValidationResult, ValidationErrorState, IValidation, ICustomValidator } from '../../component-package/models/validation.model';
import { CityService } from './cityService';
import { ISelectableItem } from '../../component-package/models/selectableItem.model';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { ErrorHandler } from '../../component-package/services/errorhandler';

@Component({
    moduleId: module.id,
    selector: 'vgr-input-fields',
    templateUrl: 'inputFields.component.html',
    providers: [ErrorHandler]
})

export class InputFieldsComponent implements OnInit {
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

    state: string;
    allCities: any;

    formErrors = {
        'control2': '',
        'control7': '',
        'control8': '',
        'control9': '',
        'control10': '',
        'control13': '',
        'control14': ''
    };

    validationMessages = {
        'control2': {
        },
        'control7': {
            'pattern': 'Ange exakt tre VERSALER.',
        },
        'control8': {
            'pattern': ' Ange mellan 2-6 tecken.'
        },
        'control9': {
            'pattern': 'Ange ett giltigt heltal.'
        },
        'control10': {
            'required': 'Detta är ett längre meddelande som visas när något blir väldigt väldigt fel'
        },
        'control13': {
            'invalidCity': 'Felaktig stad',
        },
        'control14': {
            'email': 'Felaktig e-post'
        }
    };

    constructor(private fb: FormBuilder, private errorHandler: ErrorHandler) {
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
        this.errorHandler.reactiveFormsDoValidate(this.formErrors, this.validationMessages, this.form, true, true);
    }

    createForm() {
        this.form = this.fb.group({
            control1: [this.amount1],
            control2: [this.amount2, Validators.required],
            control3: [this.percentValue],
            control4: [this.kmValue],
            control5: [this.numericValue],
            control6: [],
            control7: ['abc', [Validators.pattern('^[A-Z,Å,Ä,Ö]{3}$'), Validators.required]],
            control8: ['', [Validators.pattern('^.{2,6}$'), Validators.required]],
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