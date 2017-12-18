import { Component, Input, AfterViewInit, ElementRef, Output, EventEmitter, ViewChild, HostListener, HostBinding, forwardRef } from '@angular/core';
import { IDropdownItem } from '../../models/dropdownItem.model';
import { IValidationResult, ValidationErrorState, IValidation } from '../../models/validation.model';
import { ValidationComponent } from '../../controls/validation/validation.component';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent, PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AbstractControl } from '@angular/forms';

export abstract class DropdownBaseComponent extends ValidationComponent {

    @ViewChild(FilterTextboxComponent) filterTextboxComponent: FilterTextboxComponent;
    @ViewChild(PerfectScrollbarComponent) scrollbarComponent: PerfectScrollbarComponent;

    @Input() formControlName?: string;
    @Input() noItemSelectedLabel: string;
    @Input() showAllItemText: string;
    @Input() required: boolean;
    @Input() @HostBinding('class.readonly') readonly: boolean;
    @Input() @HostBinding('class.disabled') disabled: boolean;
    @HostBinding('class.dropdown') dropdownClass = true;

    showAllItem: IDropdownItem;

    expanded: boolean;
    filterVisible: boolean;
    scrollVisible: boolean;
    filter: string;
    scrollbarConfig: PerfectScrollbarConfig;
    dimmerTopVisible: boolean;
    dimmerBottomVisible: boolean;
    control: AbstractControl;

    protected filterLimit = 20;
    abstract get scrollLimit(): number;
    protected filterPipe: FilterPipe;
    protected preventCollapse: boolean;

    protected _items: IDropdownItem[];
    @Input() set items(value: IDropdownItem[]) {
        // The scrollbar component would not refresh when items were changed unless we added a timeout...
        // Ugly solution for sure, but until a better one comes along it will have to do :(
        this._items = value;

        const selectedItems = this._items.filter(x => x.selected);
        if (selectedItems.length > 0) {
            this.handleInitiallySelectedItems(selectedItems);
        }
        setTimeout(() => {
            if (!this.readonly && !this.disabled) {
                this.scrollbarComponent.update();
                this.listenToScrollbarEvents();
            }
        }, 500);
        this.dimmerTopVisible = false;
        this.dimmerBottomVisible = this._items.length > this.scrollLimit;
    }
    get items(): IDropdownItem[] {
        return this._items;
    }

    @Input() set values(values: string[]) {
        this.items = values.map(function (value: string) {
            return { displayName: value, id: value } as IDropdownItem
        });
    }

    constructor(protected elementRef: ElementRef) {
        super();
        this.expanded = false;
        this.filterVisible = false;
        this.scrollVisible = false;
        this.filterPipe = new FilterPipe();
        this.scrollbarConfig = new PerfectScrollbarConfig({ minScrollbarLength: 40 } as PerfectScrollbarConfigInterface);
        this.showAllItemText = 'Visa alla';

        this.showAllItem = {
            displayName: this.showAllItemText,
        } as IDropdownItem;
    }
    protected abstract handleInitiallySelectedItems(selectedItems: IDropdownItem[]): void;

    private listenToScrollbarEvents() {
        $(this.scrollbarComponent.elementRef.nativeElement).scroll((e) => {
            this.hideDimmersIfScrollIsAtBottomOrTop(e);
        });
    }

    private hideDimmersIfScrollIsAtBottomOrTop(scrollEvent: JQueryEventObject) {
        const scrollbar = $(scrollEvent.target);
        const margintolerance = 20;

        const scrollHeight = scrollEvent.target.scrollHeight - margintolerance;
        const clientHeight = scrollEvent.target.clientHeight;
        const scrollTop = scrollEvent.target.scrollTop;

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
        $('.dropdown__menu__items').scrollTop(0);
    }

    updateScrolled() {

        if (!this.items) {
            this.scrollVisible = false;
            return;
        }

        const visibleItemCount = this.filterPipe.transform(this.items, this.filter, ['displayName']).length;
        this.scrollVisible = visibleItemCount > this.scrollLimit;
        if (!this.scrollVisible) {
            this.dimmerBottomVisible = false;
            this.dimmerTopVisible = false;
        }

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

    onEnter() {
        this.setValidationStateEditing();
    }

    onLeave(event: FocusEvent) {

        if (!event) {
            this.validate();
            return;
        }

        const focusedElement = event.relatedTarget;
        if (focusedElement === null || !this.elementRef.nativeElement.contains(focusedElement)) {
            //validera endast om vi är påväg från komponenten
            this.validate();
        }

    }

    private toggleExpand(event: Event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const element = $(target);
        if (!element.is('input') && !element.is('.scroll-bar')) {
            this.expanded = !this.expanded;
            if (!this.expanded) {
                this.validate();
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
