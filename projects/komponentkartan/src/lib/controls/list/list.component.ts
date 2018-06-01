import { Component, HostBinding, ContentChildren, ContentChild, AfterContentInit, QueryList, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { trigger, style, transition, animate, group, state, query } from '@angular/animations';

import { ListItemComponent } from '../list-item/list-item.component';
import { ListHeaderComponent, SortChangedArgs } from '../list/list-header.component';

@Component({
    templateUrl: './list.component.html',
    selector: 'vgr-list',
    animations: [
        trigger('loadContent', [
            state('void', style({
                height: '35px'
            })),
            transition('* => true', [
                style({height: 0, overflow: 'hidden'}),
                  animate('0.4s ease-in', style({
                    height: '100vh',
                  }))
              ])
        ])
    ]
})
export class ListComponent implements AfterContentInit {
    @HostBinding('class.list') hasClass = true;
    @HostBinding('class.list--new-item-added') moveHeader = false;
    @HostBinding('class.animate')  animate = false;
    @Input() @HostBinding('class.list--inline') flexibleHeader: boolean;
    @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent> = new QueryList<ListItemComponent>();
    @Input() allowMultipleExpandedItems = false;
    @Input() notification;
    @ContentChild(ListHeaderComponent) listHeader: ListHeaderComponent;
    @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();

    loaded: boolean = false;

    constructor() {
    }

    ngAfterContentInit() {
        this.listHeader.sortChanged.subscribe((args: SortChangedArgs) => this.sortChanged.emit(args));
        this.subscribeEvents();
        this.items.changes.subscribe((changes) => {
            this.subscribeEvents();
        });
    }
    subscribeEvents() {

        if (!this.allowMultipleExpandedItems) {
            this.items.forEach(changedContainer => {
                changedContainer.expandedChanged.subscribe((expanded: boolean) => {
                    if (expanded) {
                        this.items.filter(container => container !== changedContainer).forEach(otherContainer => otherContainer.expanded = false);
                    }
                });

            });
        }
        if (this.items.length > 0) {
            this.loaded = true;
        }

        this.items.forEach((item, index) => {
            item.setFocusOnFirstRow.subscribe(() => this.items.first.setFocusOnRow());
            item.setFocusOnLastRow.subscribe(() => this.items.last.setFocusOnRow());
            item.setFocusOnPreviousRow.subscribe(() => this.setFocusOnPreviousRow(index));
            item.setFocusOnNextRow.subscribe(() => this.setFocusOnNextRow(index));
            item.setFocusOnPreviousRowContent.subscribe(() => this.setFocusOnPreviousRowContent(item));
            item.setFocusOnNextRowContent.subscribe(() => this.setFocusOnNextRow(index));
        });
    }

    animateHeader() {
        this.moveHeader = true;
        setTimeout(() => {
            this.moveHeader = false;
        }, 2600);
    }

    setFocusOnPreviousRow(index: number): any {
        if (index === 0) {
            this.items.toArray()[this.items.toArray().length - 1].setFocusOnRow();
        } else {
            this.items.toArray()[index - 1].setFocusOnRow();
        }
    }
    setFocusOnNextRow(index: number) {
        if (index + 1 === this.items.toArray().length) {
            this.items.toArray()[0].setFocusOnRow();
        } else {
            this.items.toArray()[index + 1].setFocusOnRow();
        }
    }

    setFocusOnPreviousRowContent(item: ListItemComponent) {
        if (!item.collapsed) {
            item.setFocusOnRow();
        }
    }
}
