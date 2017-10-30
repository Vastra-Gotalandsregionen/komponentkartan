import { Component, HostBinding, ContentChildren, ContentChild, AfterViewInit, AfterContentInit, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { ListHeaderComponent, SortChangedArgs } from '../list/list-header.component';


@Component({
    templateUrl: './list.component.html',
    moduleId: module.id,
    selector: 'vgr-list'
})
export class ListComponent implements AfterViewInit, AfterContentInit {
    @HostBinding('class.list') hasClass = true;
    @Input() @HostBinding('class.list--inline') flexibleHeader: boolean;
    @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent> = new QueryList<ListItemComponent>();
    @Input() allowMultipleExpandedItems = false;
    @ContentChild(ListHeaderComponent) listHeader: ListHeaderComponent;
    @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();

    constructor() {

    }
    ngAfterContentInit() {
        this.listHeader.sortChanged.subscribe(args => this.sortChanged.emit(args));
    }
    ngAfterViewInit() {
        if (!this.allowMultipleExpandedItems) {
            this.items.forEach(changedContainer => {
                changedContainer.expandedChanged.subscribe((expanded: boolean) => {
                    if (expanded) {
                        this.items.filter(container => container !== changedContainer).forEach(otherContainer => otherContainer.expanded = false);
                    }
                });
            });
        }
    }

}
