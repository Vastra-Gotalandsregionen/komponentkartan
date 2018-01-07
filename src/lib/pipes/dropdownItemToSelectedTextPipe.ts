import { Pipe, PipeTransform } from '@angular/core';
import { IDropdownItem } from '../models/dropdownItem.model';

@Pipe({
    name: 'dropdownItemToSelectedText'
})

export class DropdownItemToSelectedTextPipe implements PipeTransform {
    transform(item: IDropdownItem): string {
        return item.displayNameWhenSelected ? item.displayNameWhenSelected : item.displayName ? item.displayName : '';
    }
}
