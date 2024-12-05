import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'errorMessage',
    standalone: false
})

export class ErrorMessagePipe implements PipeTransform {
  currentMessage: string;

  transform(message: any, errors: any, label: any, small = false) {
    if (!message) {
      return null;
    }

    this.currentMessage = this.setErrorMessage(errors, message, label, small);

    return this.currentMessage;
  }

  private setErrorMessage(errors: any, message: any, label: any, small: any): string {
    if (typeof (message) === 'object') {
      for (const key in errors) {
        if (key === 'required' && small && !message[key]) {
          return 'Obligatoriskt';
        } else if (key === 'required' && !small && !message[key]) {
          return label ? label.innerText + ' är obligatoriskt' : 'Fältet är obligatoriskt';
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
