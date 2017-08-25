import { Component, Output, EventEmitter, HostBinding } from '@angular/core';
import { ISelectableItem } from '../../component-package/models/selectableItem.model';


@Component({
    moduleId: module.id,
    selector: 'menu-selector',
    templateUrl: './menuSelector.component.html'
})
export class MenuSelectorComponent {
    menuOptions: ISelectableItem[];
    @HostBinding('class.menu-selector') hasClass = true;
    @Output() menuSelected: EventEmitter<number> = new EventEmitter<number>();
    constructor() {
        this.menuOptions = [
            { id: '1', displayName: 'En' } as ISelectableItem,
            { id: '3', displayName: 'Flera' } as ISelectableItem
        ] as ISelectableItem[];
    }

    onSelectedMenuChanged(selectedMenu: ISelectableItem) {
        this.menuSelected.emit(parseInt(selectedMenu.id));
    }
}
