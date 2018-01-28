import { Component, Input, AfterViewInit, ElementRef, OnChanges, Output, EventEmitter, ViewChild, forwardRef, Optional, SkipSelf, Host, HostBinding } from '@angular/core';
import { DropdownItem } from '../../models/dropdownItem.model';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { DropdownBaseComponent } from '../dropdown-base/dropdown.base.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';


@Component({
    selector: 'vgr-dropdown-multiselect',
    moduleId: module.id,
    templateUrl: './dropdown-multiselect.component.html',
    styleUrls: ['../dropdown-base/dropdown.scrollbar.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropdownMultiselectComponent),
        multi: true
    }]
})

export class DropdownMultiselectComponent extends DropdownBaseComponent implements OnChanges, ControlValueAccessor {

    @Input() showAllItemText: string;
    @Input() allItemsSelectedLabel: string;
    @Input() selectAllItemText: string;
    dropdownLabel: string;
    selectAllItem: DropdownItem<any>;

    @Output() selectionChanged = new EventEmitter<DropdownItem<any>[]>();
    get filterActive(): boolean {
        return this.filterTextboxComponent && this.filterTextboxComponent.value && this.filterTextboxComponent.value !== '';
    }
    get selectedItems(): DropdownItem<any>[] {
        return this._items.filter(x => x.selected);
    }

    @Input() set selectedValues(values: any[]) {
        if (this.items) {
            const matchingItems = this.items.filter((x => values.indexOf(x.value) > -1));
            if (matchingItems.length > 0) {
                matchingItems.forEach(x => x.selected = true);
                this.handleInitiallySelectedItems(matchingItems);
            }
        }
    }

    constructor( @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, elementRef: ElementRef) {
        super(elementRef);
        this.allItemsSelectedLabel = 'Alla';
        this.noItemSelectedLabel = 'Välj';
        this.showAllItemText = 'Visa alla';
        this.selectAllItemText = 'Välj alla';

        this.selectAllItem = {
            displayName: this.selectAllItemText,
            displayNameWhenSelected: this.allItemsSelectedLabel,
            selected: false
        } as DropdownItem<any>;
    }

    ngOnChanges() {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }

        this.showAllItem.displayName = this.showAllItemText;

        this.selectAllItem.displayName = this.selectAllItemText;
        this.selectAllItem.displayNameWhenSelected = this.allItemsSelectedLabel;

        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }

        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();

        this.updateDropdownLabel();
    }

    controlHasErrors() {
        return (this.control && this.control.errors ? this.control.errors['required'] : false);
    }

    writeValue(values: DropdownItem<any>[]): void {
        if (values) {
            this.selectedValues = values;
        }
        // if (!values) {
        //     this.selectedValues = null;
        // }
    }

    registerOnChange(func: any): void {
        this.onChange = func;
    }

    registerOnTouched(func: any): void {
        this.onTouched = func;
    }

    onChange(input: any) {
    }

    onTouched() { }

    clearFilter() {
        this.filter = '';
        this.filterTextboxComponent.clear();
        this.preventCollapse = true;
    }

    onItemCheckChanged(item: DropdownItem<any>) {
        if (!item) {
            return;
        }
        if (item.selected) {
            this.deselectItem(item);
        } else {
            this.selectItem(item);
        }
    }

    onItemClicked(item: DropdownItem<any>) {
        this.preventCollapse = true;
    }

    selectAllItems() {
        this.selectItem(this.selectAllItem);
    }

    selectItem(item: DropdownItem<any>) {
        if (!item) {
            return;
        }

        item.selected = true;

        if (item === this.selectAllItem) {
            this.items.forEach(x => x.selected = true);
            this.selectionChanged.emit(this._items.map(x => x.value));
            this.onChange(this._items.map(x => x.value));
        } else {
            this.selectAllItem.selected = this._items.filter(x => !x.selected).length === 0;
            this.selectionChanged.emit(this._items.map(x => x.value));
            this.onChange(this.selectedItems.map(x => x.value));
        }
        this.updateDropdownLabel();

    }

    deselectItem(item: DropdownItem<any>) {
        if (!item) {
            return;
        }

        item.selected = false;

        if (item === this.selectAllItem) {
            this.items.forEach(x => x.selected = false);
        }
        this.selectionChanged.emit(this._items.filter(x => x.selected).map(x => x.value));
        this.onChange(this._items.filter(x => x.selected).map(x => x.displayName));

        this.selectAllItem.selected = false;
        this.updateDropdownLabel();

    }

    private updateDropdownLabel() {
        if (this.selectAllItem.selected) {
            this.dropdownLabel = this.selectAllItem.displayNameWhenSelected;
        } else {
            const selectedCount = this.items.filter(x => x.selected).length;
            if (selectedCount === 1) {
                this.dropdownLabel = '1 vald';
            } else if (selectedCount === 0) {
                this.dropdownLabel = this.noItemSelectedLabel;
            } else {
                this.dropdownLabel = selectedCount + ' valda';
            }
        }
    }

    onMouseEnter(item: DropdownItem<any>) {
        item.marked = true;
    }

    onMouseLeave(item: DropdownItem<any>) {
        item.marked = false;
    }

    onEnter() {
        this.hasFocus = true;
    }

    onLeave() {
        this.hasFocus = false;
        if (this.control) {
            this.control.markAsTouched();
            if (this.control.updateOn === 'blur' && this.selectedItems) {
                this.control.setValue(this._items.filter(x => x.selected).map(x => x.displayName));
            }
        }
    }

    protected handleInitiallySelectedItems(selectedItems: DropdownItem<any>[]): void {
        this.selectAllItem.selected = this.items.length === selectedItems.length;
        this.selectionChanged.emit(selectedItems.map(x => x.value));

        this.updateDropdownLabel();
    }
}
