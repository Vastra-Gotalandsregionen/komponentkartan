import { ExampleUnit } from './unit.model';
import { ExpandableRow } from 'vgr-komponentkartan';
import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'unitfilter2',
    pure: false
})

export class UnitFilter2Pipe implements PipeTransform {
    transform(items: ExpandableRow<ExampleUnit, any>[], includeInactiveUnits: boolean): any {

        if (!items) {
            return items;
        }

        if (!includeInactiveUnits) {
            items = items.filter(x => x.previewObject.isActive);
        }

        return items;
    }
}
