import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency'
})
export class CurrencyPipe implements PipeTransform {

  transform(value: number, fractions: number = 2): string {
    if (!value && value !== 0) {
      return '';
    }
    return value.toLocaleString('sv-SE', { minimumFractionDigits: fractions, maximumFractionDigits: fractions });
  }
}
