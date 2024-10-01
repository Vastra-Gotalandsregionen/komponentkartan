import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'postnummer'
})
export class PostnummerPipe implements PipeTransform {

    transform(value: string): string {
        if (!value) {
            return '';
        }
        let postnummer = value;

        if (postnummer.length === 5) {
            postnummer.split('', 5);
            postnummer = postnummer[0] + postnummer[1] + postnummer[2] + ' ' + postnummer[3] + postnummer[4];
        }

        return postnummer;
    }
}
