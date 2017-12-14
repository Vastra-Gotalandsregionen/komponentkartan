import { Pipe, PipeTransform } from '@angular/core'
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'errormessagehandler'
})

export class ErrorMessagePipe implements PipeTransform {
  transform(message: any, errors?: any, small?: boolean) {
    console.log('message', message);
    console.log('message', message);

    if (!message) {
      return null;
    }

    if (errors) {
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
}
