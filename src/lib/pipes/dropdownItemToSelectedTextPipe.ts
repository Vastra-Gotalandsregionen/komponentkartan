import { Pipe, PipeTransform } from '@angular/core';
import { DropdownItem } from '../models/dropdownItem.model';

@Pipe({
    name: 'dropdownItemToSelectedTextPipe'
})

export class DropdownItemToSelectedTextPipe implements PipeTransform {
    transform(item: DropdownItem<any>): string {
        return item.displayNameWhenSelected ? item.displayNameWhenSelected : item.displayName ? item.displayName : '';
    }
}
