import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'errormessagehandler'
})

export class ErrorMessagePipe implements PipeTransform {
  transform(message: any, currentMessage: any, hasFocus: boolean, errors: any, small: boolean) {
    if (!message) {
      return null;
    }

    if (hasFocus) {
      return currentMessage ? currentMessage : errors ? this.setErrorMessage(errors, message, small) : message[Object.keys(message)[0]];
    }
    else {
      return this.setErrorMessage(errors, message, small);
    }
  }

  private setErrorMessage(errors: any, message: any, small: any): string {
    if (typeof (message) === 'object') {
      for (var key in errors) {
        if (key === 'required' && small && !message[key]) {
          return 'Obligatoriskt';
        }
        else if (key === 'required' && !small && !message[key]) {
          return 'Fältet är obligatoriskt';
        }
        else if (message) {
          return message[key];
        }
        else {
          return 'Det här ska inte hända'
        }
      }
    }
    else {
      return message;
    }
  }
}  
