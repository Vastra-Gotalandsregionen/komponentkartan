import { Component, HostBinding, ContentChildren, AfterViewInit, QueryList, Input } from '@angular/core';
import { ListItemComponent } from '../list-item/list-item.component';


@Component({
    templateUrl: './list.component.html',
    moduleId: module.id,
    selector: 'vgr-list'
})
export class ListComponent implements AfterViewInit {
    @HostBinding('class.list') hasClass = true;
    @Input() @HostBinding('class.list--actions-visible') actionsVisible: boolean;
    @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent> = new QueryList<ListItemComponent>();
    @Input() allowMultipleExpandedItems = false;
    constructor() {

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
