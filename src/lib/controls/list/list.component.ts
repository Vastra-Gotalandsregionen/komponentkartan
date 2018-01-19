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

        this.items.forEach((item, index) => {
            item.setFocusOnFirstRow.subscribe(() => this.items.first.setFocusOnRow());
            item.setFocusOnLastRow.subscribe(() => this.items.last.setFocusOnRow());
            item.setFocusOnPreviousRow.subscribe(() => this.setFocusOnPreviousRow(item, index));
            item.setFocusOnNextRow.subscribe(() => this.setFocusOnNextRow(item, index));
            item.setFocusOnPreviousRowContent.subscribe(() => this.setFocusOnPreviousRowContent(item, index));
            item.setFocusOnNextRowContent.subscribe(() => this.setFocusOnNextRow(item, index));
        });
    }

    // TODO: skapa test
    setFocusOnPreviousRow(item: ListItemComponent, index: number): any {
        if (index === 0) {
            this.items.toArray()[this.items.length - 1].setFocusOnRow();
        } else {
            this.items.toArray()[index - 1].setFocusOnRow();
        }
    }

    // TODO: skapa test
    setFocusOnNextRow(item: ListItemComponent, index: number) {
        if (index + 1 === this.items.length) {
            this.items.toArray()[0].setFocusOnRow();
        } else {
            this.items.toArray()[index + 1].setFocusOnRow();
        }
    }

    // TODO: skapa test
    setFocusOnPreviousRowContent(item: ListItemComponent, index: number) {
        if (!item.collapsed) {
            item.setFocusOnRow();
        }
    }

    copyItemWidthsFromHeader() {
        this.items.forEach(item => {
            item.copyPropertiesFromHeader(this.listHeader);
        });

    }
}
