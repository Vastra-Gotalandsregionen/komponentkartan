
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
  @ViewChild('myInput', { read: InputComponent }) myInput: InputComponent;
  form: FormGroup;
  disabled = false;
  readonly = false;
  showErrors = true;

  private ngUnsubscribe = new Subject();


  ngModelValues = ['', 125, '', 22];

  validationMessages = {
    rf1: {
      pattern: 'Ange exakt tre VERSALER.',
    },
    rf2: {
      email: 'Felaktig e-post'
    },
    rf3: {
      invalidCity: 'Felaktig stad',
    },
    rf4: {
      min: 'Numret är för lågt',
      max: 'Numret är för högt'
    }
  };

  constructor(private fb: FormBuilder) {  }

  ngOnInit() {
    this.createForm();
  }

  logga(val) {
    console.log(val);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  createForm() {
    this.form = this.fb.group({
      rf1: ['', [Validators.pattern('^[A-Z,Å,Ä,Ö]{3}$'), Validators.required]],
      rf2: ['namn@email.com', Validators.email],
      rf3: ['Houstons', Validators.required, validateAsyncCityName()],
      rf4: [32, [Validators.min(40), Validators.max(50)]]
    });
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


