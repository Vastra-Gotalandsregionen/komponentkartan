import {
    Component, Input, AfterViewInit, ElementRef, OnChanges, Output, SimpleChange,
    EventEmitter, ViewChild, HostBinding, ChangeDetectorRef, forwardRef,
    SkipSelf, Optional, Host, Renderer2
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

export class DropdownComponent extends DropdownBaseComponent implements OnChanges, ControlValueAccessor {
    @Output() selectedChanged = new EventEmitter<DropdownItem<any>>();
    @Input() noItemSelectedLabel: string;

    selectedItem: DropdownItem<any>;

    private focusedItemIndex = -1;

    constructor( @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef, private renderer: Renderer2) {
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

    openDropdownItemKeyEvent(event: KeyboardEvent, item: DropdownItem<any>) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.selectItem(item);
            event.cancelBubble = true;
        }
    }

    openDropdownKeyEvent(event: KeyboardEvent): void {

        if (event.keyCode === 13 || event.keyCode === 32) {
            this.onToggleDropdown(event);
            this.focusedItemIndex = -1;
        }

        if (event.keyCode === 40) {
            this.setFocusOnNextItem();
        }
        if (event.keyCode === 38) {
            this.setFocusOnPreviousItem();
        }

        event.preventDefault();
        event.cancelBubble = true;
    }

    private setFocusOnNextItem() {
        this.focusedItemIndex = this.focusedItemIndex < this.items.length - 1 ? this.focusedItemIndex + 1 : 0;
        this.setFocusOnItem();
    }

    private setFocusOnPreviousItem() {
        this.focusedItemIndex = this.focusedItemIndex > 0 ? this.focusedItemIndex - 1 : this.items.length - 1;
        this.setFocusOnItem();
    }

    setFocusOnItem() {
        this.items.forEach(x => { x.marked = false; });
        this.items[this.focusedItemIndex].marked = true;
        this.elementRef.nativeElement.getElementsByTagName('li')[this.focusedItemIndex].focus();
    }

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
