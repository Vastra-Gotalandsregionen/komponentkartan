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

  radioOptions: SelectableItem<MyObject>[];
  radioOptions2: SelectableItem<MyObject>[];

  dropdownItems: DropdownItem<MyObject2>[];

  userForm: FormGroup;
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
      { displayName: 'Ett', value: { id: '1', number: 1 } },
      { displayName: 'Två', value: { id: '2', number: 2 } },
      { displayName: 'Tre', value: { id: '3', number: 3 } }
    ];

    this.dropdownItems = [
      { displayName: 'Hund', value: { id: '1', name: 'Hund' } },
      { displayName: 'Katt', value: { id: '2', name: 'Katt' } },
      { displayName: 'Guldfisk', value: { id: '3', name: 'Guldfisk' } }
    ];
  }

  ngOnInit() {
    this.createForm();
  }

  createForm() {

    this.userForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2)]],
      lastname: ['', [Validators.required, Validators.minLength(2)]],
      age: ['', [Validators.required, Validators.min(18), Validators.max(120), validateNumber]],
      email: ['', [Validators.required, Validators.email]],
      salary: ['', [Validators.required, validateNumber]],
      favourite_pet: [this.dropdownItems[1].value, Validators.required],
      interests: [['Koda'], Validators.required],
      check: [true, Validators.pattern('true')],
      optional: [this.radioOptions[2].value],
      monthpicker: ['', Validators.required],
      datepicker: ['', Validators.required],
      datepicker_preselected: [new Date(), Validators.required]
    });
  }

  onSelectedChanged(event: any) {
    console.log(event);
  }

  onSubmit() {
    console.log(this.userForm.controls.favourite_pet.value);
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

declare interface MyObject {
  id: string;
  number: number;
}

declare interface MyObject2 {
  id: string;
  name: string;
}
