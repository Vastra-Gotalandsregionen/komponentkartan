import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
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
  inputForm: FormGroup;

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
  constructor(private fb: FormBuilder) {
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
    this.createInputForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120), validateNumber]],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required, validateNumber]],
      favourite_pet: [null, Validators.required],
      interests: [[this.dropdownItemsMulti[0].value], Validators.required],
      check: [true, Validators.pattern('true')],
      optional: [this.radioOptions[2].value],
      monthpicker: ['', Validators.required],
      datepicker: ['', Validators.required],
      datepicker_preselected: [new Date(), Validators.required]
    });
  }

  createInputForm() {
    this.inputForm = new FormGroup({
      firstname: new FormControl('H', { validators: [Validators.required, Validators.minLength(2)] }),
      lastname: new FormControl('', { validators: [Validators.required, Validators.minLength(2)] }),
      age: new FormControl('', { validators: [Validators.required, Validators.min(18), Validators.max(120), validateNumber] }),
      email: new FormControl('', { validators: [Validators.required, Validators.email] }),
      salary: new FormControl('', { validators: [Validators.required, validateNumber] })
    }, { updateOn: 'blur' });
  }

  onSubmit() {
    console.log('values: ', this.inputForm.value);
    console.log('isValid: ', this.inputForm.valid);
  }

  onReset() {
    this.inputForm.reset();
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
