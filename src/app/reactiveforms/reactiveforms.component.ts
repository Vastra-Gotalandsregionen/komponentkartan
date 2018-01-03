import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core/src/metadata/view';

@Component({
  selector: 'app-reactiveforms',
  templateUrl: './reactiveforms.component.html',
  styleUrls: ['./reactiveforms.component.css']
})
export class ReactiveformsComponent implements OnInit {
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
  constructor(private fb: FormBuilder) { }

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
      favourite_pet: ['', Validators.required],
      interests: [['Koda'], Validators.required],
      check: [true, Validators.pattern('true')],
      optional: ['Två'],
      monthpicker: ['', Validators.required],
      datepicker: ['', Validators.required],
      datepicker_preselected: [new Date(), Validators.required]
    });
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
