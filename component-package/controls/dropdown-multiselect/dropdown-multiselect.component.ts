import { Component, Input, AfterViewInit, ElementRef, OnChanges, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { IDropdownItem } from '../../models/dropdownItem.model';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { DropdownBaseComponent } from '../dropdown-base/dropdown.base.component';
import { IValidationResult } from '../../models/validation.model';


@Component({
    selector: 'vgr-dropdown-multiselect',
    moduleId: module.id,
    templateUrl: './dropdown-multiselect.component.html',
    styleUrls: ['../dropdown-base/dropdown.scrollbar.css']
})

export class DropdownMultiselectComponent extends DropdownBaseComponent implements OnChanges {

    @Input() showAllItemText: string; // showAllItemText (skrivit ett filter och vill rensa filtret)
    @Input() allItemsSelectedLabel: string;
    @Input() selectAllItemText: string; // texten som visaspå checkboxen för att välja alla

    dropdownLabel: string;
    selectAllItem: IDropdownItem;

    @Output() selectionChanged = new EventEmitter<IDropdownItem[]>();
    get filterActive(): boolean {
        return this.filterTextboxComponent && this.filterTextboxComponent.value && this.filterTextboxComponent.value !== '';
    }
    get selectedItems(): IDropdownItem[] {
        return this._items.filter(x => x.selected);
    }

    constructor(elementRef: ElementRef) {
        super(elementRef);
        this.allItemsSelectedLabel = 'Alla';
        this.noItemSelectedLabel = 'Välj';

        this.showAllItemText = 'Visa alla';
        this.selectAllItemText = 'Välj alla'

        this.selectAllItem = {
            displayName: this.selectAllItemText,
            displayNameWhenSelected: this.allItemsSelectedLabel,
            selected: false
        } as IDropdownItem;


    }

    doValidate(): IValidationResult {
        const isValid = !this.required || (this.selectedItems && this.selectedItems.length > 0);
        return {
            isValid: isValid,
            validationError: isValid ? '' : 'Obligatoriskt'
        } as IValidationResult;
    }

    ngOnChanges() {
        this.showAllItem.displayName = this.showAllItemText;

        this.selectAllItem.displayName = this.selectAllItemText;
        this.selectAllItem.displayNameWhenSelected = this.allItemsSelectedLabel;

        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();

        this.updateDropdownLabel();

    }

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
        } else {
            this.selectAllItem.selected = this._items.filter(x => !x.selected).length === 0;
            this.selectionChanged.emit(this.selectedItems);
        }
        this.updateDropdownLabel();
        this.validate();
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

        this.selectAllItem.selected = false;
        this.updateDropdownLabel();
        this.validate();
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
