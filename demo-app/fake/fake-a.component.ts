import { Component, ViewChildren, QueryList, HostBinding, OnInit } from '@angular/core';
import { IDropdownItem } from '../../component-package/models/dropdownItem.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'vgr-fake-a',
    templateUrl: 'fake-a.component.html'
})
export class FakeAComponent implements OnInit {
    form: FormGroup;

    readonly = true;
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

    minDate: Date = new Date(2015, 0, 1)
    maxDate: Date = new Date(2016, 11, 31);

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        this.form = this.fb.group({
            foo: ['Bar']
        });
    }

}
