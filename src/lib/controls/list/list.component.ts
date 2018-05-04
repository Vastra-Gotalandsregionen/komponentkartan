import { Component, HostBinding, ContentChildren, ContentChild, AfterContentInit, QueryList, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { trigger, style, transition, animate, group, state, query } from '@angular/animations';

import { ListItemComponent } from '../list-item/list-item.component';
import { ListHeaderComponent, SortChangedArgs } from '../list/list-header.component';

@Component({
    templateUrl: './list.component.html',
    moduleId: module.id,
    selector: 'vgr-list',
    animations: [
         trigger('listAnimation', [
            state('void', style({
                height: '0'
            })),
            transition('* => small', [
                style({height: 0, overflow: 'hidden'}),
                  animate('600ms ease', style({
                    height: '*'
                  }))
              ]),
              transition('* => medium', [
                style({height: 0, overflow: 'hidden'}),
                  animate('400ms ease', style({
                    height: '*'
                  }))
              ]),
              transition('* => large', [
                style({height: 0, overflow: 'hidden'}),
                  animate('200ms ease', style({
                    height: '*'
                  }))
              ]),
            // transition('* => medium', [
            //     style({ overflow: 'hidden'}),
            //     animate('0.6s ease', style({
            //         height: '0'
            //     }))
            // ])
        ]),
        // trigger('mediumListAnimation', [
        //     state('void', style({
        //         height: '0'
        //     })),
        //     transition('* => true', [
        //         style({height: 0, overflow: 'hidden'}),
        //           animate('400ms ease', style({
        //             height: '*'
        //           }))
        //       ]),
        //     transition('* => false', [
        //         style({ overflow: 'hidden'}),
        //         animate('0.4s ease', style({
        //             height: '0'
        //         }))
        //     ])
        // ]),
        // trigger('largeListAnimation', [
        //     state('void', style({
        //         height: '0'
        //     })),
        //     transition('* => true', [
        //         style({height: 0, overflow: 'hidden'}),
        //           animate('200ms ease', style({
        //             height: '*'
        //           }))
        //       ]),
        //     transition('* => false', [
        //         style({ overflow: 'hidden'}),
        //         animate('0.2s ease', style({
        //             height: '0'
        //         }))
        //     ])
        // ])
    ]
})
export class ListComponent implements AfterContentInit {
    @HostBinding('class.list') hasClass = true;
    @Input() @HostBinding('class.list--inline') flexibleHeader: boolean;
    @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent> = new QueryList<ListItemComponent>();
    @Input() allowMultipleExpandedItems = false;
    @ContentChild(ListHeaderComponent) listHeader: ListHeaderComponent;
    @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();

    contentLoad: string;

    constructor() {
        if (this.items.length <= 10) {
            this.contentLoad = 'small';
        }
        if (this.items.length > 10 && this.items.length <= 100) {
            this.contentLoad = 'medium';
        }
        if (this.items.length > 100) {
            this.contentLoad = 'large';
        }
    }

    ngAfterContentInit() {
        this.listHeader.sortChanged.subscribe((args: SortChangedArgs) => this.sortChanged.emit(args));
        this.subscribeEvents();
        this.items.changes.subscribe(() => {
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

        this.items.forEach((item, index) => {
            item.setFocusOnFirstRow.subscribe(() => this.items.first.setFocusOnRow());
            item.setFocusOnLastRow.subscribe(() => this.items.last.setFocusOnRow());
            item.setFocusOnPreviousRow.subscribe(() => this.setFocusOnPreviousRow(index));
            item.setFocusOnNextRow.subscribe(() => this.setFocusOnNextRow(index));
            item.setFocusOnPreviousRowContent.subscribe(() => this.setFocusOnPreviousRowContent(item));
            item.setFocusOnNextRowContent.subscribe(() => this.setFocusOnNextRow(index));
        });
    }

    // TODO: skapa test
    setFocusOnPreviousRow(index: number): any {
        if (index === 0) {
            this.items.toArray()[this.items.toArray().length - 1].setFocusOnRow();
        } else {
            this.items.toArray()[index - 1].setFocusOnRow();
        }
    }

    // TODO: skapa test
    setFocusOnNextRow(index: number) {
        if (index + 1 === this.items.toArray().length) {
            this.items.toArray()[0].setFocusOnRow();
        } else {
            this.items.toArray()[index + 1].setFocusOnRow();
        }
    }

    // TODO: skapa test
    setFocusOnPreviousRowContent(item: ListItemComponent) {
        if (!item.collapsed) {
            item.setFocusOnRow();
        }
    }
}
