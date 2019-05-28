import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'errorMessage'
})

export class ErrorMessagePipe implements PipeTransform {
  currentMessage: string;

  transform(message: any, errors: any, small = false) {
    if (!message) {
      return null;
    }

    this.currentMessage = this.setErrorMessage(errors, message, small);

    return this.currentMessage;
  }

  private setErrorMessage(errors: any, message: any, small: any): string {
    if (typeof (message) === 'object') {
      for (const key in errors) {
        if (key === 'required' && small && !message[key]) {
          return 'Obligatoriskt';
        } else if (key === 'required' && !small && !message[key]) {
          return 'Fältet är obligatoriskt';
        } else if (message) {
          return message[key];
        } else {
          return 'Oväntat fel';
        }
      }
    } else {
      return message;
    }
  }
}
