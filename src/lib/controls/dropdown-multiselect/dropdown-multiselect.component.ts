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
    selectAllItemsMarked: boolean;

    @Output() selectionChanged = new EventEmitter<DropdownItem<any>[]>();
    get filterActive(): boolean {
        return this.filterTextboxComponent && this.filterTextboxComponent.value && this.filterTextboxComponent.value !== '';
    }
    get selectedItems(): DropdownItem<any>[] {
        return this._items.filter(x => x.selected);
    }

    get selectAllItemsChecked() {
        return !this._items.find(x => !x.selected);
    }

    set selectedValues(values: any[]) {

        if (values) {
            const matchingItems = this.items.filter((x => values.indexOf(x.value) > -1));
            if (matchingItems.length > 0) {
                matchingItems.forEach(x => x.selected = true);
                this.handleInitiallySelectedItems(matchingItems);
            }
        } else {
            this.items.forEach(x => x.selected = false);
            this.handleInitiallySelectedItems([]);

        }
    }

    constructor( @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, elementRef: ElementRef) {
        super(elementRef);
        this.allItemsSelectedLabel = 'Alla';
        this.noItemSelectedLabel = 'Välj';
        this.showAllItemText = 'Visa alla';
        this.selectAllItemText = 'Välj alla';
    }

    ngOnChanges() {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }

        this.showAllItem.displayName = this.showAllItemText;

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
        } else {
            this.selectedValues = null;
            this.items.forEach(i => {
                i.selected = false;
                i.marked = false;
            });
        }
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

    selectAllItems(selected: boolean) {
        this.items.forEach(i => selected ? this.selectItem(i) : this.deselectItem(i));
    }

    selectItem(item: DropdownItem<any>) {
        if (!item) {
            return;
        }

        item.selected = true;

        this.selectionChanged.emit(this._items.map(x => x.value));
        this.onChange(this.selectedItems.map(x => x.value));

        this.updateDropdownLabel();
    }

    deselectItem(item: DropdownItem<any>) {
        if (!item) {
            return;
        }

        item.selected = false;

        this.selectionChanged.emit(this._items.filter(x => x.selected).map(x => x.value));
        this.onChange(this._items.filter(x => x.selected).map(x => x.displayName));
        this.updateDropdownLabel();
    }

    private updateDropdownLabel() {
        const selectedCount = this.items.filter(x => x.selected).length;
        if (selectedCount === 1) {
            this.dropdownLabel = '1 vald';
        } else if (selectedCount === 0) {
            this.dropdownLabel = this.noItemSelectedLabel;
        } else if (selectedCount === this.items.length) {
            this.dropdownLabel = this.allItemsSelectedLabel;
        } else {
            this.dropdownLabel = selectedCount + ' valda';
        }
    }

    onEnter() {
        this.hasFocus = true;
    }

    onLeave() {
        this.hasFocus = false;
        if (this.control) {
            this.control.markAsTouched();
            this.control.markAsDirty();
            if (this.control.updateOn === 'blur' && this.selectedItems) {
                this.control.setValue(this._items.filter(x => x.selected).map(x => x.displayName));
            }
        }
    }

    protected handleInitiallySelectedItems(selectedItems: DropdownItem<any>[]): void {
        this.selectionChanged.emit(selectedItems.map(x => x.value));
        this.updateDropdownLabel();
    }
}
