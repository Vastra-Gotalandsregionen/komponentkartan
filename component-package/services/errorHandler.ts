import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ErrorHandler {

  constructor() {

  };


  reactiveFormsDoValidate(formErrors: any, validationMessages: any, form: FormGroup, validateOnInit?: boolean, isSmall?: boolean) {
    if (validateOnInit) {
      this.reactiveFormsOnValueChanged(formErrors, validationMessages, form);
      console.log('this.formErrors', formErrors);
    }

    form.valueChanges
      .subscribe(data => {
        this.reactiveFormsOnValueChanged(formErrors, validationMessages, form);
        console.log('this.formErrors', formErrors);
      }
      );
  }

  private reactiveFormsOnValueChanged(formErrors: any, validationMessages: any, form?: FormGroup): any {
    if (!form) { return; }
    console.log('onValueChanged', form);

    for (const field in formErrors) {
      if (form.get(field)['controls']) {
        for (const subfield in form.get(field)['controls']) {
          formErrors[field][subfield] = '';
          const control = form.get(field)['controls'][subfield];
          if (control && control.dirty && !control.valid) {
            const messages = validationMessages[subfield];
            for (const key in control.errors) {
              formErrors[field][subfield] += messages[key] + ' ';
            }
          }
        }
      }
      else {
        const control = form.get(field);
        formErrors[field] = '';
        if (control && !control.valid) {
          const messages = validationMessages[field];
          for (const key in control.errors) {
            if (key === 'required') {
              formErrors[field] += messages[key] ? messages[key] + ' ' : ' Obligatoriskt! ';
            }
            else {
              formErrors[field] += messages[key] + ' ';
            }

          }
        }
      }
    }

    return formErrors;
  }

}
