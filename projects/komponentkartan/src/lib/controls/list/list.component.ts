import { Component, HostBinding, ContentChildren, ContentChild, AfterContentInit, QueryList, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Notification } from '../../models/notification.model';
import { ListItemComponent } from '../list-item/list-item.component';
import { ListHeaderComponent, SortChangedArgs } from '../list/list-header.component';
import { ListService } from './list.service';

@Component({
  templateUrl: './list.component.html',
  selector: 'vgr-list',
  animations: [
    trigger('loadContent', [
      state('void', style({
        height: '35px'
      })),
      transition('* => true', [
        style({ height: 0, overflow: 'hidden' }),
        animate('0.4s ease-in', style({
          height: '100vh',
        }))
      ])
    ])
  ]
})
export class ListComponent implements AfterContentInit, OnDestroy {
  @Input() allowMultipleExpandedItems = false;
  @Input() notification: Notification;
  @Input() pages = 1;
  @Input() activePage = 1;
  @Input() @HostBinding('class.list--inline') flexibleHeader = false;

  @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  @HostBinding('class.list') hasClass = true;
  @HostBinding('class.list--new-item-added') moveHeader = false;
  @HostBinding('class.animate') animate = false;

  @ContentChild(ListHeaderComponent) listHeader: ListHeaderComponent;
  @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent> = new QueryList<ListItemComponent>();

  private ngUnsubscribe = new Subject();
  private ngUnsubscribeItems = new Subject();

  constructor(private listService: ListService) { }

  ngAfterContentInit() {
    if (this.listHeader) {
      this.listHeader.sortChanged
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((args: SortChangedArgs) => this.sortChanged.emit(args));
    }

    this.listService.expandListItemRequested
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((itemToExpand: ListItemComponent) => {
        if (this.allowMultipleExpandedItems) {
          itemToExpand.setExpanded(true);

        } else {
          const expandedItems = this.items.filter(x => x.isExpanded);

          if (expandedItems.length) {
            const preventedItems = expandedItems.filter(x => x.preventCollapse || x.notInteractable);

            if (preventedItems.length) {
              preventedItems.forEach(x => x.collapsePrevented.emit());
              itemToExpand.expandPrevented.emit();

            } else {
              expandedItems.forEach(x => x.setExpanded(false));
              itemToExpand.setExpanded(true);
            }

          } else {
            itemToExpand.setExpanded(true);
          }
        }
      });

    this.subscribeToItems();
    this.items.changes.pipe(takeUntil(this.ngUnsubscribe)).subscribe(_ => {
      this.subscribeToItems();
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
  }

  subscribeToItems() {
    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
    this.ngUnsubscribeItems = new Subject();

    this.items
      .forEach((item, index) => {
        item.setFocusOnFirstRow
          .pipe(takeUntil(this.ngUnsubscribeItems)).subscribe(() => this.items.first.setFocusOnRow());

        item.setFocusOnLastRow
          .pipe(takeUntil(this.ngUnsubscribeItems)).subscribe(() => this.items.last.setFocusOnRow());

        item.setFocusOnPreviousRow
          .pipe(takeUntil(this.ngUnsubscribeItems)).subscribe(() => this.setFocusOnPreviousRow(index));

        item.setFocusOnNextRow.
          pipe(takeUntil(this.ngUnsubscribeItems)).subscribe(() => this.setFocusOnNextRow(index));

        item.setFocusOnPreviousRowContent
          .pipe(takeUntil(this.ngUnsubscribeItems)).subscribe(() => this.setFocusOnPreviousRowContent(item));

        item.setFocusOnNextRowContent
          .pipe(takeUntil(this.ngUnsubscribeItems)).subscribe(() => this.setFocusOnNextRow(index));
      });
  }

  animateHeader() {
    this.moveHeader = true;
    setTimeout(() => {
      this.moveHeader = false;
    }, 2600);
  }

  setFocusOnPreviousRow(index: number) {
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
    if (item.isExpanded) {
      item.setFocusOnRow();
    }
  }

  onPageChanged(event: number) {
    this.pageChanged.emit(event);
  }
}
