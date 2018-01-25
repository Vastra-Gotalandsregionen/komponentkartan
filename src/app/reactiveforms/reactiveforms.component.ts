import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core/src/metadata/view';
import { SelectableItem, DropdownItem } from '../../lib/index';

@Component({
  selector: 'app-reactiveforms',
  templateUrl: './reactiveforms.component.html',
  styleUrls: ['./reactiveforms.component.css']
})
export class ReactiveformsComponent implements OnInit {

  radioOptions: SelectableItem<number>[];
  dropdownItems: DropdownItem<string>[];
  dropdownItemsMulti: DropdownItem<string>[];

  minDate = new Date('2015');
  maxDate = new Date('2025');

  userForm: FormGroup;
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
  constructor() {
    this.radioOptions = [
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
    this.createForm();
    this.createUpdateOnBlurForm();
    this.createUpdateOnChangeForm();
    this.createUpdateOnSubmitForm();
  }

  createForm() {
    this.userForm = new FormGroup({
      firstname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
      lastname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
      age: new FormControl('', { validators: [Validators.required, Validators.min(18), Validators.max(120), validateNumber] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      salary: new FormControl('', { validators: [Validators.required, validateNumber] }),
      favourite_pet: new FormControl(null, { validators: [Validators.required] }),
      interests: new FormControl(this.dropdownItemsMulti[0].value, { validators: [Validators.required] }),
      check: new FormControl(true, { validators: [Validators.pattern('true')] }),
      optional: new FormControl(this.radioOptions[2].value),
      monthpicker: new FormControl('', { validators: [Validators.required] }),
      datepicker: new FormControl('', { validators: [Validators.required] }),
      datepicker_preselected: new FormControl(new Date(), { validators: [Validators.required] })
    }, { updateOn: 'blur' });
  }

  createUpdateOnBlurForm() {
    this.updateOnBlurForm = new FormGroup({
      firstname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
      salary: new FormControl('', { validators: [Validators.required, validateNumber] })
    }, { updateOn: 'blur' });
  }

  createUpdateOnSubmitForm() {
    this.updateOnSubmitForm = new FormGroup({
      firstname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
      salary: new FormControl('', { validators: [Validators.required, validateNumber] })
    }, { updateOn: 'submit' });
  }

  createUpdateOnChangeForm() {
    this.updateOnChangeForm = new FormGroup({
      firstname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
      salary: new FormControl('', { validators: [Validators.required, validateNumber] })
    }, { updateOn: 'change' });
  }

  onSubmit() {
    console.log('onSubmit');
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
}

function validateNumber(control: AbstractControl) {
  const pattern = '^[-,−]{0,1}(\\d{1,3}([,\\s.]\\d{3})*|\\d+)([.,]\\d+)?$';

  const regexp = new RegExp(pattern);
  if (regexp.test(control.value)) {
    return null;
  }
  return { invalidNumber: true };
}
