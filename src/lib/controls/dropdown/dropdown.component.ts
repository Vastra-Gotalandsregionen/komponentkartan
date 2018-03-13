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
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropdownComponent),
        multi: true
    }]
})

export class DropdownComponent extends DropdownBaseComponent implements OnChanges, AfterViewInit, ControlValueAccessor {
    @Output() selectedChanged = new EventEmitter<DropdownItem<any>>();
    @Input() noItemSelectedLabel: string;

    selectedItem: DropdownItem<any>;
    focusableItems = [];

    private focusedItemIndex = -1;

    constructor( @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
        super(elementRef);
        this.noItemSelectedLabel = 'Välj';
    }

    ngOnChanges() {
        this.showAllItem = {
            displayName: this.showAllItemText
        } as DropdownItem<any>;

        if (this.formControlName && this.controlContainer) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
        this.filterVisible = this.items && this.items.length > this.filterLimit;

        this.setFocusableItems();
        this.updateScrolled();
    }

    ngAfterViewInit() {
        this.setFocusableItems();
    }

    setFocusableItems() {
        const nodes: NodeList = this.filterVisible ? this.elementRef.nativeElement.getElementsByTagName('input') : [];
        const nodes2: NodeList = this.elementRef.nativeElement.getElementsByTagName('li');
        this.focusableItems = [...Array.from(nodes), ...Array.from(nodes2)];
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

    openDropdownShowAllItemKeyEvent(event: KeyboardEvent, item: DropdownItem<any>) {
        // enter
        if (event.keyCode === 13) {
            this.showAllItems();
            event.preventDefault();
            event.cancelBubble = true;
        } else if (event.keyCode === 32) {// space
            event.preventDefault();
            event.cancelBubble = true;
        }
    }

    openDropdownItemKeyEvent(event: KeyboardEvent, item: DropdownItem<any>) {
        // enter, tab
        if (event.keyCode === 13 || event.keyCode === 9) {
            this.selectItem(item);
        } else if (event.keyCode === 32) {// space
            event.preventDefault();
            event.cancelBubble = true;
        }
    }

    showAllItems() {
        this.preventCollapse = true;
        this.filter = '';
        this.filterTextboxComponent.clear();

        this.setFocusableItems();
        this.focusedItemIndex = 1;
        this.focusableItems[this.focusedItemIndex].focus();
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


    openDropdownKeyEvent(event: KeyboardEvent): void {
        if (event.keyCode === 13 || event.keyCode === 32) {// space, enter
            this.onToggleDropdown(event);
            this.focusedItemIndex = -1;
            this.focusDropdown();
        } else if (event.altKey && event.keyCode === 40) {// alt + arrow dowm
            this.expanded = true;
            this.focusedItemIndex = -1;
            event.preventDefault();
        } else if (event.keyCode === 27 || // escape
            event.altKey && event.keyCode === 38) { // alt + arrow up
            this.expanded = false;
            this.focusDropdown();
            event.preventDefault();
        } else if (event.keyCode === 40) { // arrow dowm
            this.setFocusOnNextItem();
            event.preventDefault();
        } else if (event.keyCode === 38) { // arrow up
            this.setFocusOnPreviousItem();
            event.preventDefault();
        } else if (event.keyCode === 9) { // tab
            this.expanded = false;
        }
    }

    private focusDropdown() {
        this.elementRef.nativeElement.querySelector('.dropdown--edit').focus();
    }

    private setFocusOnNextItem() {
        this.focusedItemIndex = this.focusedItemIndex < this.focusableItems.length - 1 ? this.focusedItemIndex + 1 : 0;
        this.focusableItems[this.focusedItemIndex].focus();
    }

    private setFocusOnPreviousItem() {
        this.focusedItemIndex = this.focusedItemIndex > 0 ? this.focusedItemIndex - 1 : this.focusableItems.length - 1;
        this.focusableItems[this.focusedItemIndex].focus();
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
