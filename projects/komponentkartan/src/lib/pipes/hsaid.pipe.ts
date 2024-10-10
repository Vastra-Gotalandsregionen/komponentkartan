import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hsaidPipe'
})
export class HsaidPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    const hsaid = value.split('-');

    return hsaid[1];
  }
}
