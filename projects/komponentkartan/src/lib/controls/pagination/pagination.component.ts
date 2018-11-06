import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, OnDestroy, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageItem } from './page-item';

@Component({
  selector: 'vgr-pagination',
  templateUrl: './pagination.component.html'
})
export class PaginationComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() pages: number;
  @Input() activePage: number;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @ViewChildren('pageButton') pageButtons: QueryList<ElementRef>;

  pageItems: PageItem[] = [];
  focusedPageLabel: string;
  nextPage = new EventEmitter();
  previousPage = new EventEmitter();

  private ngUnsubscribe = new Subject();

  ngOnChanges(changes: SimpleChanges) {
    const pagesChange = changes['pages'];
    const activePageChange = changes['activePage'];
    if (pagesChange || activePageChange) {
      this.setPageItems(this.activePage);
    }
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

  onKeydown(event: KeyboardEvent, index: number) {
    if (event.key === 'ArrowLeft' || event.key === 'Left') {
      this.focusPreviousPageItem(index);
      event.preventDefault();
    } else if (event.key === 'ArrowRight' || event.key === 'Right') {
      this.focusNextPageItem(index);
      event.preventDefault();
    }
  }

  private focusPreviousPageItem(itemIndex: number) {
    if (itemIndex > 0) {
      this.pageButtons.toArray()[itemIndex - 1].nativeElement.focus();
    }
  }

  private focusNextPageItem(itemIndex: number) {
    if (itemIndex < this.pageButtons.length - 1) {
      this.pageButtons.toArray()[itemIndex + 1].nativeElement.focus();
    }
  }

  private showPage(page: number) {
    this.setPageItems(page);
    this.pageChanged.emit(page);
  }

  private setPageItems(activePage: number) {
    this.pageItems = [];
    let index = 0;

    const previousPageItem = {
      buttonIndex: index,
      tabindex: -1,
      label: 'Föregående sida'
    } as PageItem;

    previousPageItem.action = () => {
      if (activePage !== 1) {
        this.showPage(activePage - 1);
      }
    };

    this.pageItems.push(previousPageItem);

    if (this.pages <= 7) {
      for (let item = 1; item <= this.pages; item++) {
        index++;
        this.addPageItem(index, item, activePage);
      }
    } else if (this.pages === 8) {
      if (activePage <= 4) {

        for (let item = 1; item <= 5; item++) {
          index++;
          this.addPageItem(index, item, activePage);
        }

        this.addDots();

        index++;
        this.addLastPageItem(index, activePage);

      } else {
        index++;
        this.addFirstPageItem(index, activePage);

        this.addDots();

        for (let item = 4; item <= 8; item++) {
          index++;
          this.addPageItem(index, item, activePage);
        }
      }
    } else {
      if (activePage <= 4) {

        for (let item = 1; item <= 5; item++) {
          index++;
          this.addPageItem(index, item, activePage);
        }

        this.addDots();

        index++;
        this.addLastPageItem(index, activePage);

      } else if (activePage >= this.pages - 3) {

        index++;
        this.addFirstPageItem(index, activePage);

        this.addDots();

        for (let item = this.pages - 4; item <= this.pages; item++) {
          index++;
          this.addPageItem(index, item, activePage);
        }

      } else {
        index++;
        this.addFirstPageItem(index, activePage);

        this.addDots();

        for (let item = activePage - 1; item <= activePage + 1; item++) {
          index++;
          this.addPageItem(index, item, activePage);
        }

        this.addDots();

        index++;
        this.addLastPageItem(index, activePage);
      }
    }

    index++;
    const nextPageItem = {
      buttonIndex: index,
      tabindex: -1,
      label: 'Nästa sida'
    } as PageItem;

    nextPageItem.action = () => {
      if (activePage !== this.pages) {
        this.showPage(activePage + 1);
      }
    };
    this.pageItems.push(nextPageItem);
  }

  private addFirstPageItem(index: number, activePage: number) {
    this.pageItems.push({
      buttonIndex: index,
      tabindex: this.activePage === 1 ? 0 : -1,
      label: '1',
      active: activePage === 1,
      action: () => { this.showPage(1); }
    } as PageItem);
  }

  private addLastPageItem(index: number, activePage: number) {
    this.pageItems.push({
      buttonIndex: index,
      tabindex: this.activePage === this.pages ? 0 : -1,
      label: this.pages.toString(),
      active: activePage === this.pages,
      action: () => { this.showPage(this.pages); }
    } as PageItem);
  }

  private addPageItem(index: number, item: number, activePage: number) {
    this.pageItems.push({
      buttonIndex: index,
      tabindex: this.activePage === item ? 0 : -1,
      label: item.toString(),
      active: item === activePage,
      action: () => { this.showPage(item); }
    });
  }

  private addDots() {
    this.pageItems.push({
      label: '...',
      action: () => { }
    } as PageItem);
  }
}
