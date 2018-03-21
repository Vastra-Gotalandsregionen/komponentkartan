import { Component, Input, AfterViewInit, ElementRef, Output, EventEmitter, ViewChild, HostListener, HostBinding, forwardRef } from '@angular/core';
import { DropdownItem } from '../../models/dropdownItem.model';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent, PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AbstractControl } from '@angular/forms';
import { Guid } from '../../utils/guid';

export abstract class DropdownBaseComponent {

    @ViewChild(FilterTextboxComponent) filterTextboxComponent: FilterTextboxComponent;
    @ViewChild(PerfectScrollbarComponent) scrollbarComponent: PerfectScrollbarComponent;



    @Input() showValidation = true;
    @Input() formControlName?: string;
    @Input() noItemSelectedLabel: string;
    @Input() showAllItemText: string;
    @Input() @HostBinding('class.readonly') readonly: boolean = false;
    @Input() @HostBinding('class.disabled') disabled: boolean = false;
    @HostBinding('class.dropdown') dropdownClass = true;

    @HostBinding('class.validation-error--active') get errorClass() {
        return this.showValidation && this.control && this.control.invalid && !this.hasFocus;
    }
    @HostBinding('class.validation-error--editing') get editingClass() {
        return this.showValidation && this.control && this.control.invalid && this.hasFocus;
    }

    control: AbstractControl;
    hasFocus: boolean;
    expanded: boolean;
    validationErrorMessage: string;

    showAllItem: DropdownItem<any>;
    filterVisible: boolean;
    filter: string;
    scrollbarConfig: PerfectScrollbarConfig;
    dimmerTopVisible: boolean;
    dimmerBottomVisible: boolean;
    focusableItems = [];

    protected filterLimit = 20;
    protected filterPipe: FilterPipe;
    protected preventCollapse: boolean;
    public labelledbyid: string = Guid.newGuid();
    protected _items: DropdownItem<any>[];
    protected focusedItemIndex = -1;

    @Input() set items(value: DropdownItem<any>[]) {
        // The scrollbar component would not refresh when items were changed unless we added a timeout...
        // Ugly solution for sure, but until a better one comes along it will have to do :(
        this._items = JSON.parse(JSON.stringify(value));

        const selectedItems = this._items.filter(x => x.selected);
        if (selectedItems.length > 0) {
            this.handleInitiallySelectedItems(selectedItems);
        }
        setTimeout(() => {
            if (!this.readonly && !this.disabled) {
                this.listenToScrollbarEvents();
            }
        }, 500);
        this.dimmerTopVisible = false;
    }
    get items(): DropdownItem<any>[] {
        return this._items;
    }

    @Input() set values(values: string[]) {
        this.items = values.map(function (value: string) {
            return { displayName: value, value: value } as DropdownItem<any>;
        });
    }

    constructor(protected elementRef: ElementRef) {
        this.expanded = false;
        this.filterVisible = false;
        this.filterPipe = new FilterPipe();
        this.scrollbarConfig = new PerfectScrollbarConfig({ minScrollbarLength: 40 } as PerfectScrollbarConfigInterface);
        this.showAllItemText = 'Visa alla';
        this.validationErrorMessage = 'Obligatorisk';

        this.showAllItem = {
            displayName: this.showAllItemText,
        } as DropdownItem<any>;
    }


    protected abstract handleInitiallySelectedItems(selectedItems: DropdownItem<any>[]): void;

    private listenToScrollbarEvents() {
        $(this.scrollbarComponent.directiveRef.elementRef.nativeElement).scroll((e) => {
            this.hideDimmersIfScrollIsAtBottomOrTop(e.target);
        });
    }

    private hideDimmersIfScrollIsAtBottomOrTop(scrollElement: Element) {
        const scrollbar = $(scrollElement);
        const margintolerance = 20;

        const scrollHeight = scrollElement.scrollHeight - margintolerance;
        const clientHeight = scrollElement.clientHeight;
        const scrollTop = scrollElement.scrollTop;

        if (clientHeight + scrollTop >= scrollHeight) {
            this.dimmerBottomVisible = false;
        } else {
            this.dimmerBottomVisible = true;
        }
        if (scrollTop === 0) {
            this.dimmerTopVisible = false;
        } else {
            this.dimmerTopVisible = true;
        }
    }

    filterItems(filterValue: string) {
        this.filter = filterValue;
        this.updateScrolled();

        setTimeout(() => {
            this.setFocusableItems();
        }, 100);

        // Scroll to top when filter is changed
        $('.container.ps').scrollTop(0);
        this.dimmerBottomVisible = false;
    }



    updateScrolled() {
        if (!this.items) {
            return;
        }
        const visibleItemCount = this.filterPipe.transform(this.items, this.filter, ['displayName']).length;
    }


    setFocusableItems() {
        const nodes: NodeList = this.filterVisible ? this.elementRef.nativeElement.getElementsByTagName('input') : [];
        const nodes2: NodeList = this.elementRef.nativeElement.getElementsByTagName('li');
        this.focusableItems = [...Array.from(nodes), ...Array.from(nodes2)];


    }

    onToggleDropdown(event: Event) {
        if (this.readonly || this.disabled) {
            return;
        }
        if (this.preventCollapse) {
            event.returnValue = false;
            this.preventCollapse = false;
        } else {
            this.toggleExpand(event);
        }
    }

    openDropdownKeyEvent(event: KeyboardEvent): void {
        this.preventCollapse = false;
        if (event.keyCode === 13 || event.keyCode === 32) {// space, enter
            this.onToggleDropdown(event);
            this.focusedItemIndex = -1;
            this.focusDropdown();
            event.preventDefault();
        } else if (event.altKey && event.keyCode === 40) {// alt + arrow down
            this.expanded = true;
            this.focusedItemIndex = -1;
            event.preventDefault();
        } else if (event.keyCode === 27 || // escape
            event.altKey && event.keyCode === 38) { // alt + arrow up
            this.expanded = false;
            this.focusDropdown();
            event.preventDefault();
        } else if (event.keyCode === 40) { // arrow down
            this.setFocusOnNextItem();
            event.preventDefault();
        } else if (event.keyCode === 38) { // arrow up
            this.setFocusOnPreviousItem();
            event.preventDefault();
        } else if (event.keyCode === 9) { // tab
            this.expanded = false;
        }
    }

    filterTextKeyDown(event: KeyboardEvent): void {
        if (event.keyCode === 32) {
            event.cancelBubble = true;
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


    private toggleExpand(event: Event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const element = $(target);
        if (!element.is('input') && !element.is('.scroll-bar')) {
            this.expanded = !this.expanded;
            if (this.expanded) {
                setTimeout(() => {
                    this.hideDimmersIfScrollIsAtBottomOrTop(this.scrollbarComponent.directiveRef.elementRef.nativeElement);
                }, 10);
            }
        }
    }
    @HostListener('document:click', ['$event'])
    onDocumentClick(event: any) {
        const target = event.target || event.srcElement || event.currentTarget;

        if (!this.elementRef.nativeElement.contains(target)) {
            this.expanded = false;
        }
    }
}
