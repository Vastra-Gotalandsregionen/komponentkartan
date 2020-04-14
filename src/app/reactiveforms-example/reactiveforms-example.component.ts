import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Examples } from './code-example';
import { SelectableItem } from 'projects/komponentkartan/src/lib';

@Component({
    selector: 'app-reactiveformscodeexample',
    templateUrl: './reactiveforms-example.component.html',
    styleUrls: ['./reactiveforms-example.component.scss']
})
export class ReactiveformsexampleComponent implements OnInit {
    radioOptions1: SelectableItem<number>[];
    radioOptions2: SelectableItem<number>[];
    radioOptions3: SelectableItem<number>[];

    minDate = new Date('2015');
    maxDate = new Date('2025');

    updateOnBlurForm: FormGroup;
    updateOnSubmitForm: FormGroup;
    updateOnChangeForm: FormGroup;

    formSubmitted: boolean;

    validationMessages = {
        firstname: {
            'minlength': 'Namnet måste vara minst 2 tecken',
        },
        lastname: {
            'minlength': 'Namnet måste vara minst 2 tecken',
        },
        age: {
            'invalidNumber': 'Ange en siffra',
            'min': 'Ange en ålder på minst 18 år',
            'max': 'Ange en ålder under 120',
        },
        email: {
            'email': 'Ange en giltig e-post',
        },
        salary: {
            'invalidNumber': 'Ange ett giltigt belopp',
            'required': 'Detta skriver över default meddelandet för obligatoriska fält'
        }
    };


    typeScriptSimpleListMarkup: string;
    htmlOnBlur: string;
    htmlOnSubmit: string;
    htmlOnChange: string;

    examples: Examples = new Examples();

    constructor(htmlEncoder: HtmlEncodeService) {
        this.typeScriptSimpleListMarkup =
            htmlEncoder.prepareHighlightedSection(this.examples.typeScriptSimpleFormMarkup, 'typescript');
        this.htmlOnBlur =
            htmlEncoder.prepareHighlightedSection(this.examples.htmlOnBlurFormMarkup);
        this.htmlOnSubmit =
            htmlEncoder.prepareHighlightedSection(this.examples.htmlOnSubmitFormMarkup);
        this.htmlOnChange =
            htmlEncoder.prepareHighlightedSection(this.examples.htmlOnChangeFormMarkup);


        this.radioOptions1 = [
            { displayName: 'Ett', value: 1 },
            { displayName: 'Två', value: 2 },
            { displayName: 'Tre', value: 3 }
        ];

        this.radioOptions2 = [
            { displayName: 'Ett', value: 1 },
            { displayName: 'Två', value: 2 },
            { displayName: 'Tre', value: 3 }
        ];

        this.radioOptions3 = [
            { displayName: 'Ett', value: 1 },
            { displayName: 'Två', value: 2 },
            { displayName: 'Tre', value: 3 }
        ];
    }

    ngOnInit() {
        this.createOnBlurForm();
        this.createOnSubmitForm();
        this.createUpdateOnChangeForm();
    }

    createOnBlurForm() {
        this.updateOnBlurForm = new FormGroup({
            firstname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
            lastname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
            age: new FormControl('', { validators: [Validators.required, Validators.min(18), Validators.max(120), validateNumber] }),
            email: new FormControl('', { validators: [Validators.required, Validators.email] }),
            salary: new FormControl('', { validators: [Validators.required, validateNumber] }),
            favourite_pet: new FormControl(null, { validators: [Validators.required] }),
            interests: new FormControl(null, { validators: [Validators.required, Validators.pattern('Koda')] }),
            check: new FormControl(true, { validators: [Validators.pattern('true')] }),
            optional: new FormControl(1),
            monthpicker: new FormControl('', { validators: [Validators.required] }),
            datepicker: new FormControl('', { validators: [Validators.required] }),
            datepicker_preselected: new FormControl(new Date(), { validators: [Validators.required] }),
            textarea: new FormControl('', { validators: [Validators.required] })
        }, { updateOn: 'blur' });
    }

    createOnSubmitForm() {
        this.updateOnSubmitForm = new FormGroup({
            firstname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
            lastname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
            age: new FormControl('', { validators: [Validators.required, Validators.min(18), Validators.max(120), validateNumber] }),
            email: new FormControl('', { validators: [Validators.required, Validators.email] }),
            salary: new FormControl('', { validators: [Validators.required, validateNumber] }),
            favourite_pet: new FormControl(null, { validators: [Validators.required] }),
            interests: new FormControl(null, { validators: [Validators.required, Validators.pattern('Koda')] }),
            check: new FormControl(true, { validators: [Validators.pattern('true')] }),
            optional: new FormControl(2),
            monthpicker: new FormControl('', { validators: [Validators.required] }),
            datepicker: new FormControl('', { validators: [Validators.required] }),
            datepicker_preselected: new FormControl(new Date(), { validators: [Validators.required] }),
            textarea: new FormControl('', { validators: [Validators.required] })
        }, { updateOn: 'submit' });
    }

    createUpdateOnChangeForm() {
        this.updateOnChangeForm = new FormGroup({
            firstname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
            lastname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
            age: new FormControl('', { validators: [Validators.required, Validators.min(18), Validators.max(120), validateNumber] }),
            email: new FormControl('', { validators: [Validators.required, Validators.email] }),
            salary: new FormControl('', { validators: [Validators.required, validateNumber] }),
            favourite_pet: new FormControl(null, { validators: [Validators.required] }),
            interests: new FormControl(null, { validators: [Validators.required, Validators.pattern('Koda')] }),
            check: new FormControl(true, { validators: [Validators.pattern('true')] }),
            optional: new FormControl(3),
            monthpicker: new FormControl('', { validators: [Validators.required] }),
            datepicker: new FormControl('', { validators: [Validators.required] }),
            datepicker_preselected: new FormControl(new Date(), { validators: [Validators.required] }),
            textarea: new FormControl('', { validators: [Validators.required] })
        }, { updateOn: 'change' });
    }

    onSubmit() {
        this.formSubmitted = true;
    }

    onResetUpdateOnBlurForm() {
        this.updateOnBlurForm.reset();
    }

    onResetUpdateOnSubmitForm() {
        this.updateOnSubmitForm.reset();
        this.formSubmitted = false;
    }

    onResetUpdateOnChangeForm() {
        this.updateOnChangeForm.reset();
    }

    onSubmitUpdateOnBlurForm() {
    }
}

// Custom validator
function validateNumber(control: AbstractControl) {
    const pattern = '^[-,−]{0,1}(\\d{1,3}([,\\s.]\\d{3})*|\\d+)([.,]\\d+)?$';

    const regexp = new RegExp(pattern);
    if (regexp.test(control.value)) {
        return null;
    }
    return { invalidNumber: true };
}

