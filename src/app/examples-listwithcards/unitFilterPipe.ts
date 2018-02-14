import { ExampleUnit } from './unit.model';
import { ExpandableRow } from '@komponentkartan';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'unitfilter',
    pure: false
})

export class UnitFilterPipe implements PipeTransform {
    transform(items: ExpandableRow<ExampleUnit, any>[], searchword: string, includeInactiveUnits: boolean): any {


        if (!items) {
            return items;
        }


        if (!includeInactiveUnits) {
            items = items.filter(x => x.previewObject.isActive);
        }

        return items.filter(item => (item.previewObject.enhet.toLowerCase().indexOf(searchword.toLowerCase()) !== -1) ||
            (item.previewObject.hsaid.toLowerCase().indexOf(searchword.toLowerCase()) !== -1) ||
            (item.previewObject.agare.toLowerCase().indexOf(searchword.toLowerCase()) !== -1) ||
            (item.previewObject.enhetskod.toString().indexOf(searchword.toLowerCase()) !== -1) ||
            (item.previewObject.namnd.toLowerCase().indexOf(searchword.toLowerCase()) !== -1));

    }
}
