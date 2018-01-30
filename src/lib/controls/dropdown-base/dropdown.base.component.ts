import { Component, Input, AfterViewInit, ElementRef, Output, EventEmitter, ViewChild, HostListener, HostBinding, forwardRef } from '@angular/core';
import { DropdownItem } from '../../models/dropdownItem.model';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent, PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AbstractControl } from '@angular/forms';

export abstract class DropdownBaseComponent {

    @ViewChild(FilterTextboxComponent) filterTextboxComponent: FilterTextboxComponent;
    @ViewChild(PerfectScrollbarComponent) scrollbarComponent: PerfectScrollbarComponent;

    @Input() showValidation = true;
    @Input() formControlName?: string;
    @Input() noItemSelectedLabel: string;
    @Input() showAllItemText: string;
    @Input() @HostBinding('class.readonly') readonly: boolean;
    @Input() @HostBinding('class.disabled') disabled: boolean;
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

    protected filterLimit = 20;
    protected filterPipe: FilterPipe;
    protected preventCollapse: boolean;

    protected _items: DropdownItem<any>[];
    @Input() set items(value: DropdownItem<any>[]) {
        // The scrollbar component would not refresh when items were changed unless we added a timeout...
        // Ugly solution for sure, but until a better one comes along it will have to do :(
        this._items = value;

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
        // super();
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

    onDropdownMouseDown(event: Event) {
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
