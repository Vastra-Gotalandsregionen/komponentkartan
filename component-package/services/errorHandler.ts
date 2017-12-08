import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class ErrorHandler {

  constructor() {

  };

  getErrorMessages(formErrors?: any, validationMessages?: any): any {

  }


  getErrorMessagesReactiveForms(formErrors: any, validationMessages: any, form?: FormGroup, smallMode?: boolean): any {
    if (!form) { return; }

    for (const field in formErrors) {
      if (form.get(field)['controls']) {
        for (const subfield in form.get(field)['controls']) {
          formErrors[field][subfield] = '';
          const control = form.get(field)['controls'][subfield];
          if (control && control.dirty && !control.valid) {
            const messages = validationMessages[subfield];
            for (const key in control.errors) {
              formErrors[field][subfield] = messages[key] + ' ';
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
              if (smallMode) {
                formErrors[field] = messages[key] ? messages[key] + ' ' : ' Obligatoriskt ';
              }
              else formErrors[field] = messages[key] ? messages[key] + ' ' : ' Fältet är obligatoriskt ';
            }
            else {
              formErrors[field] = messages[key] + ' ';
            }

          }
        }
      }
    }

    return formErrors;
  }

}
