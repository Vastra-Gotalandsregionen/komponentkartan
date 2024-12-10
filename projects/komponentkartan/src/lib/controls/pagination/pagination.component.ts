import { Component, OnChanges, SimpleChanges, Input, Output, EventEmitter, OnDestroy, AfterViewInit, ViewChildren, QueryList, ElementRef, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageItem } from './page-item';
import { PaginationManagementService } from './pagination-management.service';

@Component({
    selector: 'vgr-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss'],
    standalone: false
})
export class PaginationComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
  @Input() pages = 1;
  @Input() activePage = 1;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @ViewChildren('pageButton') pageButtons: QueryList<ElementRef>;

  pageItems: PageItem[] = [];
  focusedPageLabel: string;
  nextPage = new EventEmitter();
  previousPage = new EventEmitter();

  private _activePage: number;
  private ngUnsubscribe: any = new Subject();

  previousActivePage: number;

  _navigationCancelled: boolean;
  get navigationCancelled() {
    return this._navigationCancelled;
  }

  constructor(private paginationManagementService: PaginationManagementService) {}

  ngOnInit() {
    this.setPageItems(this.activePage);
  }

  ngOnChanges(changes: SimpleChanges) {
    const pagesChange = changes['pages'];
    const activePageChange = changes['activePage'];

    if (pagesChange || activePageChange) {
      this.setPageItems(this.activePage);
      if (activePageChange && (this.activePage !== this._activePage)) {
        if (this.focusedPageLabel && (!this.focusedPageLabel.startsWith('Nästa sida') && !this.focusedPageLabel.endsWith('Föregående sida'))) {
          this.focusedPageLabel = this.activePage.toString();
        }
        this._activePage = this.activePage;
      }
    }
  }

  ngAfterViewInit() {
    this.pageButtons.changes.pipe(takeUntil(this.ngUnsubscribe)).subscribe(_ => {
      const focusedPageButton = this.pageButtons.find(button => button.nativeElement.textContent.trim() === this.focusedPageLabel);
      if (focusedPageButton && this._navigationCancelled === false) {
        setTimeout(() => focusedPageButton.nativeElement.focus());
      }
    });

    this.paginationManagementService.changeNavigation.subscribe(navigationCancelled => {
      if (this._navigationCancelled === navigationCancelled) {
        const focusedPageButton = this.pageButtons.filter(button => button.nativeElement.tabIndex === 0).find(btn => btn.nativeElement.textContent.trim() === this.activePage.toString());

        if (focusedPageButton && this._navigationCancelled === false) {
          setTimeout(() => focusedPageButton.nativeElement.focus());
        }
        return;
      }
      this._navigationCancelled = navigationCancelled;
      //Om vi har cancellerat, sätt active till previous
      if (navigationCancelled && this.pageButtons) {
        this.focusedPageLabel = this.previousActivePage.toString();
        this.showPage(this.previousActivePage);
      }
    })
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onPageButtonFocus(event: FocusEvent) {
    const buttonElement = event.target as HTMLElement;
    if (buttonElement) {
      this.focusedPageLabel = buttonElement.textContent.trim();
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
    } else if (event.key === 'Home') {
      this.focusPreviousButton();
      event.preventDefault();
    } else if (event.key === 'End') {
      this.focusNextButton();
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

  private focusPreviousButton() {
    this.pageButtons.toArray()[0].nativeElement.focus();
  }

  private focusNextButton() {
    this.pageButtons.toArray()[this.pageButtons.length - 1].nativeElement.focus();
  }

  private showPage(page: number) {
    this.setPageItems(page);
    this.previousActivePage = this.activePage;
    if (this.activePage !== page) {
      this.activePage = page;
      this._activePage = page;
      if (this._navigationCancelled === false) {
        this.pageChanged.emit(page);
      } else {
        // reset navigationCancelled
        this._navigationCancelled = false;
      }
    }
  }

  private setPageItems(activePage: number) {
    this.pageItems = [];
    let index = 0;

    const previousPageItem = {
      buttonIndex: index,
      tabindex: -1,
      label: 'Föregående sida',
      ariaLabel: activePage !== 1 ? `Gå till föregående sida, sida ${activePage - 1} av ${this.pages}` : 'Gå till föregående sida'
    } as PageItem;

    previousPageItem.action = () => {
      if (activePage > 1) {
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
      label: 'Nästa sida',
      ariaLabel: activePage !== this.pages ? `Gå till nästa sida, sida ${activePage + 1} av ${this.pages}` : 'Gå till nästa sida'
    } as PageItem;

    nextPageItem.action = () => {
      if (activePage < this.pages) {
        this.showPage(activePage + 1);
      }
    };
    this.pageItems.push(nextPageItem);
  }

  private addFirstPageItem(index: number, activePage: number) {
    this.pageItems.push({
      buttonIndex: index,
      tabindex: activePage === 1 ? 0 : -1,
      label: '1',
      ariaLabel: this.setAriaLabel(activePage, 1),
      active: activePage === 1,
      action: () => { this.showPage(1); }
    } as PageItem);
  }

  private addLastPageItem(index: number, activePage: number) {
    this.pageItems.push({
      buttonIndex: index,
      tabindex: activePage === this.pages ? 0 : -1,
      label: this.pages.toString(),
      ariaLabel: this.setAriaLabel(activePage, this.pages),
      active: activePage === this.pages,
      action: () => { this.showPage(this.pages); }
    } as PageItem);
  }

  private addPageItem(index: number, item: number, activePage: number) {
    this.pageItems.push({
      buttonIndex: index,
      tabindex: activePage === item ? 0 : -1,
      label: item.toString(),
      ariaLabel: this.setAriaLabel(activePage, item),
      active: item === activePage,
      action: () => { this.showPage(item); }
    });
  }

  private setAriaLabel(activePage: number, item: number): string {
    if (activePage === item) {
      return `Du är på sida ${item} av ${this.pages}`;
    } else if (item === 1) {
      return `Gå till första sidan, sida 1 av ${this.pages}`;
    } else if (item === this.pages) {
      return `Gå till sista sidan, sida ${this.pages} av ${this.pages}`;
    } else {
      return `Gå till sida ${item} av ${this.pages}`;
    }
  }

  private addDots() {
    this.pageItems.push({
      label: '...',
      action: () => { }
    } as PageItem);
  }
}
