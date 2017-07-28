

import { Component, Input, AfterViewInit, ElementRef, OnChanges, Output, EventEmitter, OnInit, ViewChild, SimpleChanges } from "@angular/core";
import { IDropdownItem } from "../../models/dropdownItem.model";
import { FilterPipe } from "../../pipes/filterpipe";
import { DropdownItemToSelectedTextPipe } from "../../pipes/dropdownItemToSelectedTextPipe";
import { FilterTextboxComponent } from "../filterTextbox/filterTextbox.component";
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';


//This is the style for the scrollbar. This was the only wa we could override the inline styles set by the component itself
var scrollbarStyle = `

:host /deep/ .ps {
    -ms-touch-action: auto;
    touch-action: auto;
    overflow: hidden !important;
    -ms-overflow-style: none;
    z-index:999;
}

:host /deep/ .ps.ps--active-y>.ps__scrollbar-y-rail {
    display: block;
    background-color: transparent;
}

:host /deep/ .ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail {
    background-color: transparent !important;
    opacity: .9;
}

:host /deep/ .ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail>.ps__scrollbar-y {
    background-color: transparent !important;
    width: 11px;
    min-height: 40px;
}



:host /deep/ .ps>.ps__scrollbar-y-rail {
    display: none;
    position: absolute;
    opacity: 0;
    -webkit-transition: background-color .2s linear, opacity .2s linear;
    -o-transition: background-color .2s linear, opacity .2s linear;
    -moz-transition: background-color .2s linear, opacity .2s linear;
    transition: background-color .2s linear, opacity .2s linear;
    right: 0;
    width: 11px;
}

:host /deep/ .ps>.ps__scrollbar-y-rail>.ps__scrollbar-y {
    position: absolute;
    background-color: #aaa;
    -webkit-border-radius: 6px;
    -moz-border-radius: 6px;
    border-radius: 6px;
    -webkit-transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;
    transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, -webkit-border-radius .2s ease-in-out;
    -o-transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;
    -moz-transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;
    transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out;
    transition: background-color .2s linear, height .2s linear, width .2s ease-in-out, border-radius .2s ease-in-out, -webkit-border-radius .2s ease-in-out, -moz-border-radius .2s ease-in-out;
    right: 2px;
    width: 8px;
    min-height: 40px;


}

:host /deep/ .ps>.ps__scrollbar-y-rail:hover>.ps__scrollbar-y,
:host /deep/ .ps>.ps__scrollbar-y-rail:active>.ps__scrollbar-y {
    width: 8px;
    min-height: 40px;

}

:host /deep/ .ps:hover.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail {
    background-color: transparent;
    opacity: .9;
}

:host /deep/ .ps:hover.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail>.ps__scrollbar-y {
    width: 8px;
}

:host /deep/ .ps:hover>.ps__scrollbar-y-rail {
    opacity: .6;
}


:host /deep/ .ps:hover>.ps__scrollbar-y-rail:hover {
    background-color: transparent;
    opacity: .9;
}

:host /deep/ .ps:hover>.ps__scrollbar-y-rail:hover>.ps__scrollbar-y {
    background-color: #999;
}

:host /deep/ .ps.ps--active-y>.ps__scrollbar-y-rail>.ps__scrollbar-y {
    background-color: #999;
}

:host /deep/ .ps.ps--in-scrolling.ps--y>.ps__scrollbar-y-rail>.ps__scrollbar-y {
    background-color: #999;
}


:host /deep/ .ps {
    position: relative;
    display: block;
}

:host /deep/ .ps[hidden] {
    display: none;
}

:host /deep/ .ps[fxlayout]>.ps-content {
    display: flex;
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
}

:host /deep/ .ps.ps-static {
    position: static;
}

:host /deep/ .ps.ps-static>.ps__scrollbar-y-rail {
    top: 0 !important;
}

:host /deep/ .ps.ps-outside.ps--active-y {
    padding-right: 24px;
    margin-right: -24px;
}

:host /deep/ .ps.ps-outside>.ps__scrollbar-x-rail {
    margin: 0 8px;
}

:host /deep/ .ps.ps-outside>.ps__scrollbar-y-rail {
    margin: 8px 0;
}`;

@Component({
    selector: "vgr-dropdown-multiselect",
    moduleId: module.id,
    templateUrl: "./dropdown-multiselect.component.html",
    host: { '(document:click)': "onDocumentClick($event)" },
    styles: [scrollbarStyle]
})
export class DropdownMultiselectComponent implements OnChanges {
    @Input() selectAllSelectedText: string;
    @Input() selectAllItemText: string;
    @Input() displayAllItemsText: string;
    @Input() filterProperties: string[];
    @Output() selectionChanged = new EventEmitter<IDropdownItem[]>();
    @ViewChild(FilterTextboxComponent) filterTextboxComponent: FilterTextboxComponent;
    @ViewChild(PerfectScrollbarComponent) scrollbarComponent: PerfectScrollbarComponent;
    selectAllItem: IDropdownItem;
    expanded: boolean;
    filterVisible: boolean;
    scrollVisible: boolean;
    nameFilter: string;
    private filterLimit = 20;
    private scrollLimit = 8;
    private filterPipe: FilterPipe;
    private preventCollapse: boolean;
    private _items: IDropdownItem[];
    private selectedItemsCountText: string;
    @Input() set items(value: IDropdownItem[]) {
        //The scrollbar component would not refresh when items were changed unless we added a timeout...
        //Ugly solution for sure, but until a better one comes along it will have to do :(
        this._items = value;
        setTimeout(() => {
            this.scrollbarComponent.update();
        }, 500);
    }
    get items(): IDropdownItem[] {

        return this._items;
    }
    get filterActive(): boolean {
        return this.filterTextboxComponent && this.filterTextboxComponent.filterValue && this.filterTextboxComponent.filterValue != "";
    }


    constructor(private elementRef: ElementRef) {
        this.expanded = false;
        this.filterVisible = false;
        this.scrollVisible = false;
        this.filterPipe = new FilterPipe();
        this.displayAllItemsText = "Visa alla";
        this.selectAllItemText = "Välj alla";
        this.selectAllSelectedText = "Alla";
        this.selectedItemsCountText = "Välj";
    }
    ngOnChanges() {
        if (this.selectAllItemText) {
            this.selectAllItem = { displayName: this.selectAllItemText, displayNameWhenSelected: this.selectAllSelectedText } as IDropdownItem;
        }
        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();

    }

    clearFilter() {
        this.nameFilter = "";
        this.filterTextboxComponent.clear();
        this.preventCollapse = true;
    }

    ngOnInit() {

    }

    onItemCheckChanged(item: IDropdownItem) {
        if (!item)
            return;
        if (item.selected)
            this.deselectItem(item);
        else
            this.selectItem(item);
    }

    onItemClicked(item: IDropdownItem) {
        if (item !== this.selectAllItem || this.selectAllItem.selected)
            this.preventCollapse = true;
        else {

            this.onItemCheckChanged(this.selectAllItem);
        }
    }
    selectItem(item: IDropdownItem) {
        if (!item)
            return;

        item.selected = true;

        if (item == this.selectAllItem) {
            this.items.forEach(x => x.selected = false);
            this.selectionChanged.emit(this._items);
        }
        else {
            this.selectAllItem.selected = false;
            this.selectionChanged.emit(this._items.filter(x => x.selected));

        }


        this.updateSelectedItemsCountText();

    }
    deselectItem(item: IDropdownItem) {
        if (!item)
            return;

        item.selected = false;

        this.selectionChanged.emit(this._items.filter(x => x.selected));

        this.selectAllItem.selected = false;
        this.updateSelectedItemsCountText();

    }

    private updateSelectedItemsCountText() {
        if (this.selectAllItem.selected)
            this.selectedItemsCountText = "Alla";
        else {
            var selectedCount = this.items.filter(x => x.selected).length;
            if (selectedCount == 1)
                this.selectedItemsCountText = "1 vald";
            else if (selectedCount == 0)
                this.selectedItemsCountText = "Välj";
            else
                this.selectedItemsCountText = selectedCount + " valda";

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
        item.marked = true;
    }

    onMouseLeave(item: IDropdownItem) {
        item.marked = false;

    }
}