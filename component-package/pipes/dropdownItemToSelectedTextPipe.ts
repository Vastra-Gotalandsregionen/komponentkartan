import { Pipe, PipeTransform } from '@angular/core'
import { IDropdownItem } from '../models/dropdownItem.model';

@Pipe({
    name: 'dropdownItemToSelectedText'
})

export class DropdownItemToSelectedTextPipe implements PipeTransform {
    transform(item: IDropdownItem, isReadonly?: boolean): string {
        return isReadonly ? item.displayName : item.displayNameWhenSelected ? item.displayNameWhenSelected : item.displayName ? item.displayName : '';
    }
}