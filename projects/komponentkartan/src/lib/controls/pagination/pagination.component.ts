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

  setTabFocusability() {
    this.pageItems.forEach((x, i) => {
      x.tabindex = x.label === this.focusedPageLabel ? 0 : -1;
    });
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'Left' || event.key === 'ArrowUp' || event.key === 'Up') {
      // this.previous.emit();
      event.preventDefault();
    } else if (event.key === 'ArrowRight' || event.key === 'Right' || event.key === 'ArrowDown' || event.key === 'Down') {
      // this.next.emit();
      event.preventDefault();
    }
  }

  private showPage(page: number) {
    this.setPageItems(page);
    this.pageChanged.emit(page);
  }

  private setPageItems(activePage: number) {
    this.pageItems = [];
    const previousPageItem = {
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
        this.pageItems.push({
          tabindex: this.activePage === item ? 0 : -1,
          label: item.toString(),
          active: item === activePage,
          action: () => { this.showPage(item); }
        });
      }
    } else if (this.pages === 8) {
      if (activePage <= 4) {

        for (let item = 1; item <= 5; item++) {
          this.pageItems.push({
            tabindex: this.activePage === item ? 0 : -1,
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
          tabindex: this.activePage === 8 ? 0 : -1,
          label: '8',
          active: activePage === 8,
          action: () => { this.showPage(8); }
        } as PageItem);

      } else {

        this.pageItems.push({
          tabindex: this.activePage === 1 ? 0 : -1,
          label: '1',
          active: activePage === 1,
          action: () => { this.showPage(1); }
        } as PageItem);

        this.pageItems.push({
          label: '...',
          action: () => { }
        } as PageItem);

        for (let item = 4; item <= 8; item++) {
          this.pageItems.push({
            tabindex: this.activePage === item ? 0 : -1,
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
            tabindex: this.activePage === item ? 0 : -1,
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
          tabindex: this.activePage === this.pages ? 0 : -1,
          label: this.pages.toString(),
          active: activePage === this.pages,
          action: () => { this.showPage(this.pages); }
        } as PageItem);

      } else if (activePage >= this.pages - 4) {

        this.pageItems.push({
          tabindex: this.activePage === 1 ? 0 : -1,
          label: '1',
          active: activePage === 1,
          action: () => { this.showPage(1); }
        } as PageItem);

        this.pageItems.push({
          label: '...',
          action: () => { }
        } as PageItem);

        for (let item = this.pages - 4; item <= this.pages; item++) {
          this.pageItems.push({
            tabindex: this.activePage === item ? 0 : -1,
            label: item.toString(),
            active: item === activePage,
            action: () => { this.showPage(item); }
          });
        }

      } else {

        this.pageItems.push({
          tabindex: this.activePage === 1 ? 0 : -1,
          label: '1',
          active: activePage === 1,
          action: () => { this.showPage(1); }
        } as PageItem);

        this.pageItems.push({
          label: '...',
          action: () => { }
        } as PageItem);

        for (let item = activePage - 1; item <= activePage + 1; item++) {
          this.pageItems.push({
            tabindex: this.activePage === item ? 0 : -1,
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
          tabindex: this.activePage === this.pages ? 0 : -1,
          label: this.pages.toString(),
          active: activePage === this.pages,
          action: () => { this.showPage(this.pages); }
        } as PageItem);
      }
    }

    const nextPageItem = {
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
}
