import { Component, Input, AfterViewInit, ElementRef, OnChanges, Output, EventEmitter, ViewChild, SimpleChanges } from '@angular/core';
import { IDropdownItem } from '../../models/dropdownItem.model';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { DropdownBaseComponent } from '../dropdown-base/dropdown.base.component';

@Component({
    selector: 'vgr-dropdown-multiselect',
    moduleId: module.id,
    templateUrl: './dropdown-multiselect.component.html',
    styleUrls: ['../dropdown-base/dropdown.scrollbar.css']
})

export class DropdownMultiselectComponent extends DropdownBaseComponent implements OnChanges {
    @Input() displayAllItemsText: string;
    @Output() selectionChanged = new EventEmitter<IDropdownItem[]>();
    dropdownText: string;

    get filterActive(): boolean {
        return this.filterTextboxComponent && this.filterTextboxComponent.filterValue && this.filterTextboxComponent.filterValue !== '';
    }

    constructor(elementRef: ElementRef) {
        super(elementRef);

        this.displayAllItemsText = 'Visa alla';
        this.selectAllItemText = 'Välj alla';
        this.selectAllSelectedText = 'Alla';
        this.dropdownText = 'Välj';
    }

    ngOnChanges() {
        if (this.selectAllItemText) {
            this.selectAllItem = {
                displayName: this.selectAllItemText,
                displayNameWhenSelected: this.selectAllSelectedText,
                selected: false
            } as IDropdownItem;
        }
        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();

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
            this.selectionChanged.emit(this._items.filter(x => x.selected));
        }
        this.updateSelectedItemsCountText();
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
        this.updateSelectedItemsCountText();
    }

    private updateSelectedItemsCountText() {
        if (this.selectAllItem.selected) {
            this.dropdownText = 'Alla';
        } else {
            const selectedCount = this.items.filter(x => x.selected).length;
            if (selectedCount === 1) {
                this.dropdownText = '1 vald';
            } else if (selectedCount === 0) {
                this.dropdownText = 'Välj';
            } else {
                this.dropdownText = selectedCount + ' valda';
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
    }
}
