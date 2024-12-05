import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'hsaidPipe',
    standalone: false
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
