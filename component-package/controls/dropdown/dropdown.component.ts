import { Component, Input, AfterViewInit, ElementRef, OnChanges, Output, EventEmitter, ViewChild, HostBinding } from '@angular/core';
import { IDropdownItem } from '../../models/dropdownItem.model';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { DropdownBaseComponent } from '../dropdown-base/dropdown.base.component';

@Component({
    selector: 'vgr-dropdown',
    moduleId: module.id,
    templateUrl: './dropdown.component.html',
    styleUrls: ['../dropdown-base/dropdown.scrollbar.css']
})

export class DropdownComponent extends DropdownBaseComponent implements OnChanges {
    @Output() selectedItemChanged = new EventEmitter<IDropdownItem>();
    @Input() @HostBinding('class.disabled') disabled;
    selectedItem: IDropdownItem;

    constructor(elementRef: ElementRef) {
        super(elementRef);
    };

    ngOnChanges() {
        if (this.selectAllItemText) {
            this.selectAllItem = {
                displayName: this.selectAllItemText, displayNameWhenSelected: this.selectAllSelectedText
            } as IDropdownItem;
            this.selectedItem = this.selectAllItem;
            this.selectedItem.selected = true;
        }
        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();

    }

    selectAllItems() {
        this.selectItem(this.selectAllItem);
    }


    selectItem(item: IDropdownItem) {
        if (!item) {
            return;
        }

        this.items.forEach(x => x.selected = false);
        if (this.selectAllItem) {
            this.selectAllItem.selected = false;
        }

        item.selected = true;
        item.marked = true;
        this.selectedItem = item;
        this.selectedItemChanged.emit(item);


        if (item === this.selectAllItem) {
            this.preventCollapse = true;
            this.filter = '';
            this.filterTextboxComponent.clear();
        }

    }

    onMouseEnter(item: IDropdownItem) {
        this.items.forEach(x => x.marked = false);

        if (this.selectAllItem) {
            this.selectAllItem.marked = false;
        }

        item.marked = true;
    }

    onMouseLeave(item: IDropdownItem) {
        item.marked = false;
        if (this.selectedItem) {
            this.selectedItem.marked = true;
        }
    }

    protected handleInitiallySelectedItems(selectedItems: IDropdownItem[]): void {
        this.selectItem(selectedItems[0]);
    }
}
