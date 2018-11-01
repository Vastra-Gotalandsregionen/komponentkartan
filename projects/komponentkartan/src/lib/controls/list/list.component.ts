import { Component, HostBinding, ContentChildren, ContentChild, AfterContentInit, QueryList, Input, Output, EventEmitter, ChangeDetectorRef, OnDestroy, OnChanges, SimpleChanges, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, style, transition, animate, group, state, query } from '@angular/animations';

import { ListItemComponent } from '../list-item/list-item.component';
import { ListHeaderComponent, SortChangedArgs } from '../list/list-header.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Button } from 'protractor';

interface PageItem {
  label: string;
  active: boolean;
  action: () => void;
}

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
export class ListComponent implements OnChanges, AfterContentInit, AfterViewInit, OnDestroy {
  @HostBinding('class.list') hasClass = true;
  @HostBinding('class.list--new-item-added') moveHeader = false;
  @HostBinding('class.animate') animate = false;
  @Input() @HostBinding('class.list--inline') flexibleHeader = false;
  @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent> = new QueryList<ListItemComponent>();
  @Input() allowMultipleExpandedItems = false;
  @Input() notification;
  @Input() pages = 0;
  @ContentChild(ListHeaderComponent) listHeader: ListHeaderComponent;
  @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @ViewChildren('pageButton') pageButtons: QueryList<ElementRef>;

  loaded = false;
  pageItems: PageItem[] = [];
  focusedPageLabel: string;
  private ngUnsubscribe = new Subject();

  private showPage(page: number, label?: string) {
    this.focusedPageLabel = label || page.toString();
    this.setPageItems(page);
    this.pageChanged.emit(page);
  }

  private setPageItems(activePage: number) {
    this.pageItems = [];
    const previousPageItem = {
      label: '< Föregående sida'
    } as PageItem;

    previousPageItem.action = () => {
      if (activePage !== 1) {
        this.showPage(activePage - 1, previousPageItem.label);
      }
    };

    this.pageItems.push(previousPageItem);

    if (this.pages <= 7) {
      for (let item = 1; item <= this.pages; item++) {
        this.pageItems.push({
          label: item.toString(),
          active: item === activePage,
          action: () => { this.showPage(item); }
        });
      }
    } else if (this.pages === 8) {
      if (activePage <= 4) {

        for (let item = 1; item <= 5; item++) {
          this.pageItems.push({
            label: item.toString(),
            active: item === activePage,
            action: () => { this.showPage(item); }
          });
        }

        this.pageItems.push({
          label: '...',
          action: () => { }
        } as PageItem);

        this.pageItems.push({
          label: '8',
          action: () => { this.showPage(8); }
        } as PageItem);

      } else {

        this.pageItems.push({
          label: '1',
          action: () => { this.showPage(1); }
        } as PageItem);

        this.pageItems.push({
          label: '...',
          action: () => { }
        } as PageItem);

        for (let item = 4; item <= 8; item++) {
          this.pageItems.push({
            label: item.toString(),
            active: item === activePage,
            action: () => { this.showPage(item); }
          });
        }
      }
    } else {
      if (activePage <= 4) {

        for (let item = 1; item <= 5; item++) {
          this.pageItems.push({
            label: item.toString(),
            active: item === activePage,
            action: () => { this.showPage(item); }
          });
        }

        this.pageItems.push({
          label: '...',
          action: () => { }
        } as PageItem);

        this.pageItems.push({
          label: this.pages.toString(),
          action: () => { this.showPage(this.pages); }
        } as PageItem);

      } else if (activePage >= this.pages - 4) {

        this.pageItems.push({
          label: '1',
          action: () => { this.showPage(1); }
        } as PageItem);

        this.pageItems.push({
          label: '...',
          action: () => { }
        } as PageItem);

        for (let item = this.pages - 4; item <= this.pages; item++) {
          this.pageItems.push({
            label: item.toString(),
            active: item === activePage,
            action: () => { this.showPage(item); }
          });
        }

      } else {

        this.pageItems.push({
          label: '1',
          action: () => { this.showPage(1); }
        } as PageItem);

        this.pageItems.push({
          label: '...',
          action: () => { }
        } as PageItem);

        for (let item = activePage - 1; item <= activePage + 1; item++) {
          this.pageItems.push({
            label: item.toString(),
            active: item === activePage,
            action: () => { this.showPage(item); }
          });
        }

        this.pageItems.push({
          label: '...',
          action: () => { }
        } as PageItem);

        this.pageItems.push({
          label: this.pages.toString(),
          action: () => { this.showPage(this.pages); }
        } as PageItem);
      }
    }

    const nextPageItem = {
      label: 'Nästa sida >'
    } as PageItem;

    nextPageItem.action = () => {
      if (activePage !== this.pages) {
        this.showPage(activePage + 1, nextPageItem.label);
      }
    };
    this.pageItems.push(nextPageItem);
  }

  ngOnChanges(changes: SimpleChanges) {
    const pagesChange = changes['pages'];
    if (pagesChange) {
      this.setPageItems(1);
    }
  }

  ngAfterContentInit() {
    if (this.listHeader) {
      this.listHeader.sortChanged.pipe(takeUntil(this.ngUnsubscribe)).subscribe((args: SortChangedArgs) => this.sortChanged.emit(args));
    }
    this.subscribeEvents();
    this.items.changes.pipe(takeUntil(this.ngUnsubscribe)).subscribe(_ => {
      this.subscribeEvents();
    });
  }

  ngAfterViewInit() {
    this.pageButtons.changes.pipe(takeUntil(this.ngUnsubscribe)).subscribe(_ => {
      const focusedPageButton = this.pageButtons.find(button => button.nativeElement.textContent.trim() === this.focusedPageLabel);
      if (focusedPageButton) {
        focusedPageButton.nativeElement.focus();
      }
    });
  }

  subscribeEvents() {
    if (!this.allowMultipleExpandedItems) {
      this.items.forEach(changedContainer => {
        changedContainer.expandedChanged.pipe(takeUntil(this.ngUnsubscribe)).subscribe((expanded: boolean) => {
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
      item.setFocusOnFirstRow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.items.first.setFocusOnRow());
      item.setFocusOnLastRow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.items.last.setFocusOnRow());
      item.setFocusOnPreviousRow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnPreviousRow(index));
      item.setFocusOnNextRow.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnNextRow(index));
      item.setFocusOnPreviousRowContent.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnPreviousRowContent(item));
      item.setFocusOnNextRowContent.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnNextRow(index));
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
    if (item.expanded) {
      item.setFocusOnRow();
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
