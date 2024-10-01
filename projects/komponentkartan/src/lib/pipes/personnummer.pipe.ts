import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'personnummer'
})
export class PersonnummerPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    return `${value.slice(0, -4)}-${value.slice(-4)}`;
  }
}
