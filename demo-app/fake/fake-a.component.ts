import { Component, ViewChildren, QueryList, HostBinding } from '@angular/core';
import { IDropdownItem } from '../../component-package/models/dropdownItem.model';

@Component({
    moduleId: module.id,
    selector: 'vgr-fake-a',
    templateUrl: 'fake-a.component.html'
})
export class FakeAComponent {

    readonly: boolean;
    options123_1 = [{ displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
    { displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
    { displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian' }] as IDropdownItem[];

    options123Multi_1 = [{ displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
    { displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
    { displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian', selected: true }] as IDropdownItem[];

    options123_2 = [{ displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
    { displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
    { displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian' }] as IDropdownItem[];

    options123Multi_2 = [{ displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
    { displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
    { displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian', selected: true }] as IDropdownItem[];

    constructor() { }

}
