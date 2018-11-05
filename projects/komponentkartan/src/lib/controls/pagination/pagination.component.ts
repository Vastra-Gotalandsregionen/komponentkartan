import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, OnDestroy, AfterViewInit, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageItem } from './page-item';

// interface PageItem {
//   label: string;
//   active: boolean;
//   action: () => void;
// }

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

  private showPage(page: number) {
    this.setPageItems(page);
    this.pageChanged.emit(page);
  }

  private setPageItems(activePage: number) {
    this.pageItems = [];
    const previousPageItem = {
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
      label: 'Nästa sida'
    } as PageItem;

    nextPageItem.action = () => {
      if (activePage !== this.pages) {
        this.showPage(activePage + 1);
      }
    };
    this.pageItems.push(nextPageItem);
  }
}
