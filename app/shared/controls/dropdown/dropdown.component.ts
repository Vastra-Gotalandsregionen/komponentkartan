import { Component, Input, AfterViewInit, ElementRef, OnChanges, Output, EventEmitter, OnInit, ViewChild } from "@angular/core";
import { IDropdownItem } from "../../models/dropdownItem.model";
import { FilterPipe } from "../../pipes/filterpipe";
import { DropdownItemToSelectedTextPipe } from "../../pipes/dropdownItemToSelectedTextPipe";
import { FilterTextboxComponent } from "../filterTextbox/filterTextbox.component";

@Component({
    selector: "dropdown",
    templateUrl: "app/shared/controls/dropdown/dropdown.component.html",
    host: {
        '(document:click)': "onDocumentClick($event)"
    }
})
export class DropdownComponent implements OnChanges, AfterViewInit {
    @Input() items: IDropdownItem[];
    @Input() selectAllSelectedText: string;
    @Input() selectAllItemText: string;
    @Input() filterProperties: string[];
    @Output() selectedItemChanged = new EventEmitter<IDropdownItem>();
    @ViewChild(FilterTextboxComponent) filterTextboxComponent: FilterTextboxComponent;
    selectedItem: IDropdownItem;
    selectAllItem: IDropdownItem;
    expanded: boolean;
    filterVisible: boolean;
    scrollVisible: boolean;
    nameFilter: string;
    private filterLimit = 20;
    private scrollLimit = 8;
    private filterPipe: FilterPipe;
    private preventCollapse: boolean;

    constructor(private elementRef: ElementRef) {
        this.expanded = false;
        this.filterVisible = false;
        this.scrollVisible = false;
        this.filterPipe = new FilterPipe();
    }
    ngOnChanges() {
        if (this.selectAllItemText) {
            this.selectAllItem = { displayName: this.selectAllItemText, displayNameWhenSelected: this.selectAllSelectedText } as IDropdownItem;
            this.selectedItem = this.selectAllItem;
            this.selectedItem.selected = true;
        }
        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();
    }

    ngOnInit() {

    }

    ngAfterViewInit() {
        setTimeout(() => {
            $(".dropdown__menu__items").scrollbar({
                scrollStep: 1
            });
        }, 1000);
    }

    selectItem(item: IDropdownItem) {
        if (!item)
            return;

        this.items.forEach(x => x.selected = false);
        if (this.selectAllItem)
            this.selectAllItem.selected = false;

        item.selected = true;
        item.marked = true;
        this.selectedItem = item;
        this.selectedItemChanged.emit(item);


        if (item == this.selectAllItem) {
            this.preventCollapse = true;
            this.nameFilter = "";
            this.filterTextboxComponent.clear();
        }

    }

    selectAllItems() {
        this.selectItem(this.selectAllItem);
    }

    nameChange(name: string) {
        this.nameFilter = name;
        this.updateScrolled();
        //Scroll to top when filter is changed
        $(".dropdown__menu__items").scrollTop(0);
    }

    updateScrolled() {

        if (!this.items) {
            this.scrollVisible = false;
            return;
        }

        var visibleItemCount = this.filterPipe.transform(this.items, this.nameFilter, ["displayName"]).length;

        this.scrollVisible = visibleItemCount > this.scrollLimit;
    }

    toggleExpand(event: Event) {
        if (this.preventCollapse) {
            event.cancelBubble = true;
            event.returnValue = false;
            this.preventCollapse = false;
            return;
        }
        let target = event.target || event.srcElement || event.currentTarget;
        let element = $(target);
        if (!element.is("input") && !element.is(".scroll-bar")) {
            this.expanded = !this.expanded;
        }
    }

    onDocumentClick(event: any) {

        let target = event.target || event.srcElement || event.currentTarget;

        if (!this.elementRef.nativeElement.contains(target)) {
            this.expanded = false;
        }
    }

    onMouseEnter(item: IDropdownItem) {
        this.items.forEach(x => x.marked = false);

        if (this.selectAllItem)
            this.selectAllItem.marked = false;

        item.marked = true;
    }

    onMouseLeave(item: IDropdownItem) {
        item.marked = false;
        if (this.selectedItem)
            this.selectedItem.marked = true;
    }
}