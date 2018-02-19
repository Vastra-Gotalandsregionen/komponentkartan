import {
    Component, Input, AfterViewInit, ElementRef, OnChanges, Output, SimpleChange,
    EventEmitter, ViewChild, HostBinding, ChangeDetectorRef, forwardRef,
    SkipSelf, Optional, Host
} from '@angular/core';
import { DropdownItem } from '../../models/dropdownItem.model';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { DropdownBaseComponent } from '../dropdown-base/dropdown.base.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer } from '@angular/forms';

@Component({
    selector: 'vgr-dropdown',
    moduleId: module.id,
    templateUrl: './dropdown.component.html',
    styleUrls: ['../dropdown-base/dropdown.scrollbar.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropdownComponent),
        multi: true
    }]
})

export class DropdownComponent extends DropdownBaseComponent implements OnChanges, ControlValueAccessor {
    @Output() selectedChanged = new EventEmitter<DropdownItem<any>>();
    @Input() noItemSelectedLabel: string;

    selectedItem: DropdownItem<any>;

    constructor( @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
        super(elementRef);
        this.noItemSelectedLabel = '';
    }

    ngOnChanges() {
        this.showAllItem = {
            displayName: this.showAllItemText
        } as DropdownItem<any>;

        if (this.formControlName && this.controlContainer) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }

        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();
    }

    onLeave() {
        this.hasFocus = false;
        if (this.control) {
            this.control.markAsTouched();
            this.control.markAsDirty();
            if (this.control.updateOn === 'blur' && this.selectedItem && this.selectedItem.value) {
                this.control.setValue(this.selectedItem.value);
            }
        }
    }

    onEnter() {
        this.hasFocus = true;
    }

    writeValue(value: any): void {
        if (value && this.items) {
            const matchingItems = this.items.filter(x => x.value === value);
            if (matchingItems.length > 0) {
                this.handleInitiallySelectedItems(matchingItems);
            }
            this.onChange(value);
        }

        if (!value) {
            this.selectedItem = null;
            this.items.forEach(x => { x.selected = false; x.marked = false; });
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

    showAllItems() {
        this.preventCollapse = true;
        this.filter = '';
        this.filterTextboxComponent.clear();
    }

    selectItem(item: DropdownItem<any>) {
        if (!item) {
            return;
        }

        this.items.forEach(x => { x.selected = false; x.marked = false; });

        item.selected = true;
        item.marked = true;

        this.selectedChanged.emit(item.value);
        this.selectedItem = item;
        this.onChange(item.value);
    }

    onMouseEnter(item: DropdownItem<any>) {
        this.items.forEach(x => x.marked = false);

        if (this.showAllItem) {
            this.showAllItem.marked = false;
        }

        item.marked = true;
    }

    onMouseLeave(item: DropdownItem<any>) {
        item.marked = false;
        if (this.selectedItem) {
            this.selectedItem.marked = true;
        }
    }

    protected handleInitiallySelectedItems(selectedItems: DropdownItem<any>[]): void {
        this.selectItem(selectedItems[0]);
    }
}
