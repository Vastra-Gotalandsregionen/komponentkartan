import { Component, HostBinding, ContentChildren, ContentChild, AfterContentInit, QueryList, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';
import { ListHeaderComponent, SortChangedArgs } from '../list/list-header.component';


@Component({
    templateUrl: './list.component.html',
    moduleId: module.id,
    selector: 'vgr-list'
})
export class ListComponent implements AfterContentInit {
    @HostBinding('class.list') hasClass = true;
    @Input() @HostBinding('class.list--inline') flexibleHeader: boolean;
    @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent> = new QueryList<ListItemComponent>();
    @Input() allowMultipleExpandedItems = false;
    @ContentChild(ListHeaderComponent) listHeader: ListHeaderComponent;
    @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();

    constructor() {

    }

    ngAfterContentInit() {
        this.listHeader.sortChanged.subscribe((args: SortChangedArgs) => this.sortChanged.emit(args));
        this.copyItemWidthsFromHeader();
        if (!this.allowMultipleExpandedItems) {
            this.items.forEach(changedContainer => {
                changedContainer.expandedChanged.subscribe((expanded: boolean) => {
                    if (expanded) {
                        this.items.filter(container => container !== changedContainer).forEach(otherContainer => otherContainer.expanded = false);
                    }
                });

            });
        }
        this.items.changes.subscribe(() => {
            this.copyItemWidthsFromHeader();
        });

        this.items.forEach(item => {
            item.setFocusOnFirstRow.subscribe(() => this.items.first.setFocusOnRow());
            item.setFocusOnLastRow.subscribe(() => this.items.last.setFocusOnRow());
        });




    }



    copyItemWidthsFromHeader() {
        this.items.forEach(item => {
            item.copyPropertiesFromHeader(this.listHeader)
        });

    }
}
