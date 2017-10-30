import { Component, Input, AfterViewInit, ElementRef, Output, EventEmitter, ViewChild, HostListener, HostBinding, forwardRef } from '@angular/core';
import { IDropdownItem } from '../../models/dropdownItem.model';
import { IValidationResult, ValidationErrorState, IValidation } from '../../models/validation.model';
import { ValidationComponent } from '../../controls/validation/validation.component';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent, PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({

})
export abstract class DropdownBaseComponent extends ValidationComponent {

    @ViewChild(FilterTextboxComponent) filterTextboxComponent: FilterTextboxComponent;
    @ViewChild(PerfectScrollbarComponent) scrollbarComponent: PerfectScrollbarComponent;

    @Input() noItemSelectedLabel: string;
    @Input() showAllItemText: string;
    @Input() required: boolean;
    @Input() readonly: boolean;
    showAllItem: IDropdownItem;

    expanded: boolean;
    filterVisible: boolean;
    scrollVisible: boolean;
    filter: string;
    scrollbarConfig: PerfectScrollbarConfig;


    protected filterLimit = 20;
    protected scrollLimit = 8;
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
            if(this.readonly === false) {
                this.scrollbarComponent.update();
                this.listenToScrollbarEvents();
             }
        }, 500);
    }
    get items(): IDropdownItem[] {

        return this._items;
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
            scrollbar.next('.dropdown__dimmer--bottom').hide();
        } else {
            scrollbar.next('.dropdown__dimmer--bottom').show();
        }
        if (scrollTop === 0) {
            scrollbar.prev('.dropdown__dimmer--top').hide();
        } else {
            scrollbar.prev('.dropdown__dimmer--top').show();
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
    }

    onDropdownMouseDown(event: Event) {
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

    onLeave() {
        this.validate();
    }

    private toggleExpand(event: Event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const element = $(target);
        if (!element.is('input') && !element.is('.scroll-bar')) {
            this.expanded = !this.expanded;
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
