import { Component, ViewChildren, QueryList, HostBinding, OnInit } from '@angular/core';
import { DropdownItem } from '../../lib/index';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
    moduleId: module.id,
    selector: 'vgr-fake-a',
    templateUrl: 'fake-a.component.html'
})
export class FakeAComponent implements OnInit {
    form: FormGroup;
    notification: any;
    readonly = false;
    options123_1 = [{ value: 'Option 1 - Meat', displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
    { value: 'Option 2 - Fish', displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
    { value: 'Option 3 - Vegetarian', displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian' }] as DropdownItem<string>[];

    options123Multi_1 = [{ value: 'Option 1 - Meat', displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
    { value: 'Option 2 - Fish', displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
    { value: 'Option 3 - Vegetarian', displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian', selected: true }] as DropdownItem<string>[];

    options123_2 = [{ value: 'Option 1 - Meat', displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
    { value: 'Option 2 - Fish', displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
    { value: 'Option 3 - Vegetarian', displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian' }] as DropdownItem<string>[];

    options123Multi_2 = [{ value: 'Option 1 - Meat', displayName: 'Option 1 - Meat', displayNameWhenSelected: 'Meat' },
    { value: 'Option 2 - Fish', displayName: 'Option 2 - Fish', displayNameWhenSelected: 'Fish', selected: true },
    { value: 'Option 3 - Vegetarian', displayName: 'Option 3 - Vegetarian', displayNameWhenSelected: 'Vegetarian', selected: true }] as DropdownItem<string>[];

    minDate: Date = new Date(2015, 0, 1);
    maxDate: Date = new Date(2016, 11, 31);

    constructor(private fb: FormBuilder) { }

    ngOnInit() {
        this.createForm();
    }

    createForm() {
        const date: Date = new Date(2017, 11, 24);
        this.form = this.fb.group({
            control1: ['', Validators.required],
            control2: [null, Validators.required],
            control3: [true],
            control4: ['Två'],
            control5: ['', Validators.required],
            control6: ['', Validators.required]
        });
    }

}
