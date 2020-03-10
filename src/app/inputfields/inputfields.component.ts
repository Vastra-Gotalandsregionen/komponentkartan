
import {map} from 'rxjs/operators';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { CityService } from './cityService';

import { Subject } from 'rxjs';
import { InputComponent } from '../../../projects/komponentkartan/src/lib';

@Component({
  selector: 'app-inputfields',
  templateUrl: './inputfields.component.html',
  styleUrls: ['./inputfields.component.scss']
})
export class InputfieldsComponent implements OnInit, OnDestroy {
  @ViewChild('myInput', { read: InputComponent, static: false}) myInput: InputComponent;
  form: FormGroup;
  isSmall: boolean;
  cityName: string;
  amount1: number;
  amount2: number;
  numericValue: number;
  percentValue: number;
  kmValue: number;
  intValue: number;
  changeValue: any;

  state: string;
  allCities: any;

  value: any = 81273128739;
  private ngUnsubscribe = new Subject();

  formErrors = {
    'control1': '',
    'control2': '',
    'control3': '',
    'control4': '',
    'control5': '',
    'control7': '',
    'control8': '',
    'control9': '',
    'control10': '',
    'control13': '',
    'control14': ''
  };

  validationMessages = {
    control1: {
      'invalidNumber': 'Ange ett nummer!',
    },
    control2: {
      'invalidNumber': 'Minst 3 siffror tack!',
      'minlength': 'Minst 3 siffror tack!'
    },
    control3: {
      'invalidNumber': 'Ange ett nummer!',
    },
    control4: {
      'invalidNumber': 'Ange ett nummer!',
    },
    control5: {
      'invalidNumber': 'Ange ett nummer!',
    },
    control7: {
      'pattern': 'Ange exakt tre VERSALER.',
    },
    control8: {
      'pattern': ' Ange mellan 2-6 tecken.'
    },
    control9: {
      'invalidNumber': 'Ange ett giltigt heltal.'
    },
    control10: {
      'required': 'Detta är ett längre meddelande som visas när något blir väldigt väldigt fel'
    },
    control13: {
      'invalidCity': 'Felaktig stad',
    },
    control14: {
      'email': 'Felaktig e-post'
    }
  };

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
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setFocus() {
    this.myInput.focus();
  }

  valueChange(value) {
    this.changeValue = value;
  }

  createForm() {
    this.form = this.fb.group({
      control1: [this.amount1, validateNumber],
      control2: [this.amount2, [validateNumber, Validators.required, Validators.minLength(3)]],
      control3: [this.percentValue, validateNumber],
      control4: [this.kmValue, validateNumber],
      control5: [this.numericValue, validateNumber],
      control6: [],
      control7: ['', [Validators.pattern('^[A-Z,Å,Ä,Ö]{3}$'), Validators.required]],
      control8: ['', [Validators.pattern('^.{2,6}$'), Validators.required]],
      control9: [this.intValue, validateNumber],
      control10: ['', Validators.required],
      control11: ['Visar värdet utan ram'],
      control12: [],
      control13: [this.cityName, Validators.required, validateAsyncCityName()],
      control14: ['', Validators.email]
    });
  }

  formatNumericValue(value) {
    const number = value !== null && value.toString().replace(/,/g, '.').replace(/ /g, '');
    return isNaN(number) ? 'Inget' : number;
  }

  toggleInputType(value: string) {
    if (value === 'Stor') {
      this.isSmall = false;
    } else {
      this.isSmall = true;
    }
  }

  validateNumberControl1(value: any): boolean {
    const pattern = '^[-,−]{0,1}(\\d{1,3}([,\\s.]\\d{3})*|\\d+)([.,]\\d+)?$';
    const regexp = new RegExp(pattern);
    if (regexp.test(value)) {
      return true;
    }
    return false;
  }
}




function validateAsyncCityName(): AsyncValidatorFn {
  const service = new CityService();

  return (control: AbstractControl) => {
    return service.getAsyncCities().pipe(map(cities => {
      return cities.filter(x => x.city === control.value).length > 0 ? null : { 'invalidCity': { value: control.value } };
    }));
  };
}

function validateCityName(control: AbstractControl) {
  const service = new CityService();
  const allCities = service.getCities();
  if (allCities.filter(x => x.city === control.value).length > 0) {
    return null;
  }
  return { invalidCity: true };
}

function validateNumber(control: AbstractControl) {
  const number = control.value !== null && control.value.toString().replace(/,/g, '.').replace(/ /g, '').replace(/−/g, '-');

  const pattern = '^[-,−]{0,1}(\\d{1,3}([,\\s.]\\d{3})*|\\d+)([.,]\\d+)?$';

  const regexp = new RegExp(pattern);
  if (regexp.test(number)) {
    return null;
  }

  return { invalidNumber: true };
}
