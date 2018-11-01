import { Component, HostBinding, ContentChildren, ContentChild, AfterContentInit, QueryList, Input, Output, EventEmitter, OnDestroy, OnChanges, SimpleChanges, ViewChildren, ElementRef, AfterViewInit } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

import { ListItemComponent } from '../list-item/list-item.component';
import { ListHeaderComponent, SortChangedArgs } from '../list/list-header.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  @Input() allowMultipleExpandedItems = false;
  @Input() notification;
  @Input() pages: number;
  @Input() activePage: number;
  @Input() @HostBinding('class.list--inline') flexibleHeader = false;

  @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();

  @HostBinding('class.list') hasClass = true;
  @HostBinding('class.list--new-item-added') moveHeader = false;
  @HostBinding('class.animate') animate = false;

  @ContentChild(ListHeaderComponent) listHeader: ListHeaderComponent;
  @ContentChildren(ListItemComponent) items: QueryList<ListItemComponent> = new QueryList<ListItemComponent>();
  @ViewChildren('pageButton') pageButtons: QueryList<ElementRef>;

  loaded = false;
  pageItems: PageItem[] = [];
  focusedPageLabel: string;

  private ngUnsubscribe = new Subject();

  ngOnChanges(changes: SimpleChanges) {
    const pagesChange = changes['pages'];
    const activePageChange = changes['activePage'];
    if (pagesChange || activePageChange) {
      this.setPageItems(this.activePage);
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
      const focusedPageButton = this.pageButtons.find(button => button.nativeElement.textContent === this.focusedPageLabel);
      if (focusedPageButton) {
        focusedPageButton.nativeElement.focus();
      }
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
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

  onPageButtonFocus(event: FocusEvent) {
    const buttonElement = event.target as HTMLElement;
    if (buttonElement) {
      this.focusedPageLabel = buttonElement.textContent;
    }
  }

  onPageButtonBlur(event: FocusEvent) {
    if (event.relatedTarget) {
      this.focusedPageLabel = '';
    }
  }

  private showPage(page: number) {
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
        this.showPage(activePage - 1);
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
        this.showPage(activePage + 1);
      }
    };
    this.pageItems.push(nextPageItem);
  }
}
