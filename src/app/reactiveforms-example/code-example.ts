export class Examples {
  htmlOnChangeFormMarkup = `
    <h1>On Change</h1>
    <form [formGroup]="updateOnChangeForm">
      <vgr-title-value-layout>
        <vgr-title-value title="Förnamn">
          <vgr-input formControlName="firstname" [showValidation]="updateOnChangeForm.controls.firstname.dirty" [errorMessage]="validationMessages.firstname"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Efternamn">
          <vgr-input formControlName="lastname" [showValidation]="updateOnChangeForm.controls.lastname.dirty" [errorMessage]="validationMessages.lastname"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Ålder">
          <vgr-input formControlName="age" [showValidation]="updateOnChangeForm.controls.age.dirty" [textAlign]="right" [suffix]="'år'"
            [errorMessage]="validationMessages.age"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="E-post">
          <vgr-input formControlName="email" [showValidation]="updateOnChangeForm.controls.email.dirty" [errorMessage]="validationMessages.email"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Inkomst">
          <vgr-input formControlName="salary" [showValidation]="updateOnChangeForm.controls.salary.dirty" [errorMessage]="validationMessages.salary"
            ></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Favoritdjur">
          <vgr-dropdown formControlName="favourite_pet" [noItemSelectedLabel]="'Välj djur'" [showValidation]="updateOnChangeForm.controls.favourite_pet.dirty"
            [items]="dropdownItems"></vgr-dropdown>
        </vgr-title-value>
        <vgr-title-value title="Intressen">
          <vgr-dropdown-multiselect formControlName="interests" [items]="dropdownItemsMulti" [showValidation]="updateOnChangeForm.controls.interests.dirty"></vgr-dropdown-multiselect>
        </vgr-title-value>
        <vgr-title-value title="Du måste kryssa i mig!">
          <vgr-checkbox formControlName="check" [label]=" 'Ok!' "></vgr-checkbox>
        </vgr-title-value>
        <vgr-title-value title="Välj valfri">
          <vgr-radio-group formControlName="optional" [options]="radioOptions">
          </vgr-radio-group>
        </vgr-title-value>
        <vgr-title-value title="Välj Månad">
          <vgr-datepicker [minZoom]="'m'" formControlName="monthpicker" [showValidation]="updateOnChangeForm.controls.monthpicker.dirty" [minDate]="minDate"
            [maxDate]="maxDate"></vgr-datepicker>
        </vgr-title-value>
        <vgr-title-value title="Välj Dag">
          <vgr-datepicker formControlName="datepicker" [showValidation]="updateOnChangeForm.controls.datepicker.dirty"></vgr-datepicker>
        </vgr-title-value>
        <vgr-title-value title="Registreringsdatum">
          <vgr-datepicker formControlName="datepicker_preselected" [showValidation]="updateOnChangeForm.controls.datepicker_preselected.dirty"></vgr-datepicker>
        </vgr-title-value>
        <vgr-title-value title="Kommentar">
          <vgr-textarea formControlName="textarea" [showValidation]="updateOnChangeForm.controls.textarea.dirty"></vgr-textarea>
        </vgr-title-value>
      </vgr-title-value-layout>
      <vgr-button (click)="onResetUpdateOnChangeForm()">Reset form</vgr-button>
      <vgr-button [disabled]="false">Skapa användare</vgr-button>
    </form>`;
  htmlOnSubmitFormMarkup = ` <h1>On Submit</h1>
    <form [formGroup]="updateOnSubmitForm">
      <vgr-title-value-layout>
        <vgr-title-value title="Förnamn">
          <vgr-input formControlName="firstname" [showValidation]="formSubmitted" [errorMessage]="validationMessages.firstname"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Efternamn">
          <vgr-input formControlName="lastname" [showValidation]="formSubmitted" [errorMessage]="validationMessages.lastname"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Ålder">
          <vgr-input formControlName="age" [showValidation]="formSubmitted" [textAlign]="right" [suffix]="'år'" [errorMessage]="validationMessages.age"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="E-post">
          <vgr-input formControlName="email" [showValidation]="formSubmitted" [errorMessage]="validationMessages.email"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Inkomst">
          <vgr-input formControlName="salary" [showValidation]="formSubmitted" [errorMessage]="validationMessages.salary" [formatNumber]="true"
            [nrOfDecimals]="0"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Favoritdjur">
          <vgr-dropdown formControlName="favourite_pet" [noItemSelectedLabel]="'Välj djur'" [showValidation]="formSubmitted" [items]="dropdownItems"></vgr-dropdown>
        </vgr-title-value>
        <vgr-title-value title="Intressen">
          <vgr-dropdown-multiselect formControlName="interests" [items]="dropdownItemsMulti" [showValidation]="formSubmitted"></vgr-dropdown-multiselect>
        </vgr-title-value>
        <vgr-title-value title="Du måste kryssa i mig!">
          <vgr-checkbox formControlName="check" [label]=" 'Ok!' "></vgr-checkbox>
        </vgr-title-value>
        <vgr-title-value title="Välj valfri">
          <vgr-radio-group formControlName="optional" [options]="radioOptions">
          </vgr-radio-group>
        </vgr-title-value>
        <vgr-title-value title="Välj Månad">
          <vgr-datepicker formControlName="monthpicker" [showValidation]="formSubmitted" [minDate]="minDate" [maxDate]="maxDate"></vgr-datepicker>
        </vgr-title-value>
        <vgr-title-value title="Välj Dag">
          <vgr-datepicker formControlName="datepicker" [showValidation]="formSubmitted"></vgr-datepicker>
        </vgr-title-value>
        <vgr-title-value title="Registreringsdatum">
          <vgr-datepicker formControlName="datepicker_preselected" [showValidation]="formSubmitted"></vgr-datepicker>
        </vgr-title-value>
        <vgr-title-value title="Kommentar">
          <vgr-textarea formControlName="textarea" [showValidation]="formSubmitted"></vgr-textarea>
        </vgr-title-value>
      </vgr-title-value-layout>
      <vgr-button (click)="onResetUpdateOnSubmitForm()">Reset form</vgr-button>
      <button type="submit" (click)="onSubmit()">Submit</button>
    </form>`;

  htmlOnBlurFormMarkup = `
    <h1>On Blur</h1>
    <form [formGroup]="updateOnBlurForm">
      <vgr-title-value-layout>
        <vgr-title-value title="Förnamn">
          <vgr-input formControlName="firstname" [showValidation]="updateOnBlurForm.controls.firstname.touched" [errorMessage]="validationMessages.firstname"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Efternamn">
          <vgr-input formControlName="lastname" [showValidation]="updateOnBlurForm.controls.lastname.touched" [errorMessage]="validationMessages.lastname"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Ålder">
          <vgr-input formControlName="age" [showValidation]="updateOnBlurForm.controls.age.touched" [textAlign]="right" [suffix]="'år'"
            [errorMessage]="validationMessages.age"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="E-post">
          <vgr-input formControlName="email" [showValidation]="updateOnBlurForm.controls.email.touched" [errorMessage]="validationMessages.email"></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Inkomst">
          <vgr-input formControlName="salary" [showValidation]="updateOnBlurForm.controls.salary.touched" [errorMessage]="validationMessages.salary"
            ></vgr-input>
        </vgr-title-value>
        <vgr-title-value title="Favoritdjur">
          <vgr-dropdown formControlName="favourite_pet" [noItemSelectedLabel]="'Välj djur'" [showValidation]="updateOnBlurForm.controls.favourite_pet.touched"
            [items]="dropdownItems"></vgr-dropdown>
        </vgr-title-value>
        <vgr-title-value title="Intressen">
          <vgr-dropdown-multiselect formControlName="interests" [items]="dropdownItemsMulti" [showValidation]="updateOnBlurForm.controls.interests.touched"></vgr-dropdown-multiselect>
        </vgr-title-value>
        <vgr-title-value title="Du måste kryssa i mig!">
          <vgr-checkbox formControlName="check" [label]=" 'Ok!' "></vgr-checkbox>
        </vgr-title-value>
        <vgr-title-value title="Välj valfri">
          <vgr-radio-group formControlName="optional" [options]="radioOptions">
          </vgr-radio-group>
        </vgr-title-value>
        <vgr-title-value title="Välj Månad">
          <vgr-datepicker [minZoom]="'m'" formControlName="monthpicker" [showValidation]="updateOnBlurForm.controls.monthpicker.touched" [minDate]="minDate"
            [maxDate]="maxDate"></vgr-datepicker>
        </vgr-title-value>
        <vgr-title-value title="Välj Dag">
          <vgr-datepicker formControlName="datepicker" [showValidation]="updateOnBlurForm.controls.datepicker.touched"></vgr-datepicker>
        </vgr-title-value>
        <vgr-title-value title="Registreringsdatum">
          <vgr-datepicker formControlName="datepicker_preselected" [showValidation]="updateOnBlurForm.controls.datepicker_preselected.touched"></vgr-datepicker>
        </vgr-title-value>
        <vgr-title-value title="Kommentar">
          <vgr-textarea formControlName="textarea" [showValidation]="updateOnBlurForm.controls.textarea.touched"></vgr-textarea>
        </vgr-title-value>
      </vgr-title-value-layout>
      <vgr-button (click)="onResetUpdateOnBlurForm()">Reset form</vgr-button>
      <vgr-button [disabled]="false">Skapa användare</vgr-button>
    </form>`;

  typeScriptSimpleFormMarkup = `
    import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { SelectableItem, DropdownItem } from 'vgr-komponentkartan';
import { Examples } from './code-example';

@Component({
    selector: 'app-reactiveformscodeexample',
    templateUrl: './reactiveforms-example.component.html',
    styleUrls: ['./reactiveforms-example.component.scss']
})
export class ReactiveformsexampleComponent implements OnInit {
    radioOptions1: SelectableItem<number>[];
    radioOptions2: SelectableItem<number>[];
    radioOptions3: SelectableItem<number>[];
    dropdownItems: DropdownItem<string>[];
    dropdownItemsMulti: DropdownItem<string>[];

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

        this.dropdownItems = [
            { displayName: 'Hund', value: 'Hund' },
            { displayName: 'Katt', value: 'Katt' },
            { displayName: 'Guldfisk', value: 'Guldfisk' }
        ];

        this.dropdownItemsMulti = [
            { displayName: 'Koda', value: 'Koda' },
            { displayName: 'Äta', value: 'Äta' },
            { displayName: 'Sova', value: 'Soa' }
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
            interests: new FormControl(this.dropdownItemsMulti[0].value, { validators: [Validators.required] }),
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
            interests: new FormControl(this.dropdownItemsMulti[0].value, { validators: [Validators.required] }),
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
            interests: new FormControl(this.dropdownItemsMulti[0].value, { validators: [Validators.required] }),
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
}`;
}

