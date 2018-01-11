import { Component, Input, AfterViewInit, ElementRef, OnChanges, Output, EventEmitter, ViewChild, forwardRef, Optional, SkipSelf, Host } from '@angular/core';
import { IDropdownItem } from '../../models/dropdownItem.model';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { DropdownBaseComponent } from '../dropdown-base/dropdown.base.component';
import { ValidationComponent } from '../validation/validation.component';
import { IValidationResult } from '../../models/validation.model';
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
    },
    {
        provide: ValidationComponent,
        useExisting: forwardRef(() => DropdownMultiselectComponent)
    }]
})

export class DropdownMultiselectComponent extends DropdownBaseComponent implements OnChanges, ControlValueAccessor {

    @Input() showAllItemText: string; // showAllItemText (skrivit ett filter och vill rensa filtret)
    @Input() allItemsSelectedLabel: string;
    @Input() selectAllItemText: string; // texten som visas å checkboxen för att välja alla
    dropdownLabel: string;
    selectAllItem: IDropdownItem;

    @Output() selectionChanged = new EventEmitter<IDropdownItem[]>();
    get filterActive(): boolean {
        return this.filterTextboxComponent && this.filterTextboxComponent.value && this.filterTextboxComponent.value !== '';
    }
    get selectedItems(): IDropdownItem[] {
        return this._items.filter(x => x.selected);
    }

    @Input() set selectedValues(values: string[]) {
        if (this.items) {
            const matchingItems = this.items.filter(x => values.find(val => val === x.id));
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
        } as IDropdownItem;
    }

    doValidate(): IValidationResult {
        const isValid = (!this.required || this.selectedItems && this.selectedItems.length > 0) && !this.controlHasErrors();
        return {
            isValid: isValid,
            validationError: isValid ? '' : 'Obligatoriskt'
        } as IValidationResult;
    }

    controlHasErrors() {
        return (this.control && this.control.errors ? this.control.errors['required'] : false);
    }

    ngOnChanges() {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }

        this.showAllItem.displayName = this.showAllItemText;

        this.selectAllItem.displayName = this.selectAllItemText;
        this.selectAllItem.displayNameWhenSelected = this.allItemsSelectedLabel;

        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();

        this.updateDropdownLabel();
    }

    writeValue(values: any): void {
        if (values) {
            this.selectedValues = values;
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

    onItemCheckChanged(item: IDropdownItem) {
        if (!item) {
            return;
        }
        if (item.selected) {
            this.deselectItem(item);
        } else {
            this.selectItem(item);
        }
    }

    onItemClicked(item: IDropdownItem) {
        this.preventCollapse = true;
    }

    selectAllItems() {
        this.selectItem(this.selectAllItem);
    }

    selectItem(item: IDropdownItem) {
        if (!item) {
            return;
        }

        item.selected = true;

        if (item === this.selectAllItem) {
            this.items.forEach(x => x.selected = true);
            this.selectionChanged.emit(this._items);
            this.onChange(this._items.map(x => x.displayName));
        } else {
            this.selectAllItem.selected = this._items.filter(x => !x.selected).length === 0;
            this.selectionChanged.emit(this.selectedItems);
            this.onChange(this.selectedItems.map(x => x.displayName));
        }
        this.updateDropdownLabel();

    }

    deselectItem(item: IDropdownItem) {
        if (!item) {
            return;
        }

        item.selected = false;

        if (item === this.selectAllItem) {
            this.items.forEach(x => x.selected = false);
        }
        this.selectionChanged.emit(this._items.filter(x => x.selected));
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

    onMouseEnter(item: IDropdownItem) {
        item.marked = true;
    }

    onMouseLeave(item: IDropdownItem) {
        item.marked = false;
    }

    protected handleInitiallySelectedItems(selectedItems: IDropdownItem[]): void {
        this.selectAllItem.selected = this.items.length === selectedItems.length;
        this.selectionChanged.emit(selectedItems);

        this.updateDropdownLabel();
    }
}
