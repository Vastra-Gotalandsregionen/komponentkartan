import {
    Component, Input, AfterViewInit, ElementRef, OnInit, OnChanges, Output, EventEmitter, ViewChild, HostBinding, ChangeDetectorRef
} from '@angular/core';
import { IDropdownItem } from '../../models/dropdownItem.model';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { DropdownBaseComponent } from '../dropdown-base/dropdown.base.component';
import { IValidationResult } from '../../models/validation.model';
import { ValidationComponent } from '../validation/validation.component';

@Component({
    selector: 'vgr-dropdown',
    moduleId: module.id,
    templateUrl: './dropdown.component.html',
    styleUrls: ['../dropdown-base/dropdown.scrollbar.css']
})

export class DropdownComponent extends DropdownBaseComponent implements OnInit, OnChanges {
    @Output() selectedItemChanged = new EventEmitter<IDropdownItem>();

    @Input() noItemSelectedLabel: string; // visas i dropdownboxen då man inte valt något
    @Input() @HostBinding('class.disabled') disabled: boolean;
    selectedItem: IDropdownItem;

    constructor(elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
        super(elementRef);
        this.noItemSelectedLabel = ''
    };

    ngOnChanges() {
        this.showAllItem = {
            displayName: this.showAllItemText
        } as IDropdownItem;

        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();
    }
    ngOnInit() {

    }

    doValidate(): IValidationResult {
        const isValid = !this.required || this.selectedItem;
        return {
            isValid: isValid,
            validationError: isValid ? '' : 'Obligatoriskt'
        } as IValidationResult;
    }

    showAllItems() {

        this.preventCollapse = true;
        this.filter = '';
        this.filterTextboxComponent.clear();

    }


    selectItem(item: IDropdownItem) {
        if (!item) {
            return;
        }


        this.items.forEach(x => x.selected = false);
        item.selected = true;
        item.marked = true;
        this.validate();
        this.selectedItemChanged.emit(item);

        // Utan detectchanges får man "Value was changed after is was checked" i browser console.
        this.selectedItem = item;
        this.changeDetectorRef.detectChanges();
    }

    onMouseEnter(item: IDropdownItem) {
        this.items.forEach(x => x.marked = false);

        if (this.showAllItem) {
            this.showAllItem.marked = false;
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
