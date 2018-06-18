import { Component, OnChanges, Input, HostBinding, Output, EventEmitter, ElementRef } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'vgr-search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent implements OnChanges {

  @Input() description: string;
  @Input() noResultsText: string;
  @Input() items: any;
  @Input() maxItems = 25;
  displayItems: any;
  @Input() @HostBinding('class.search-results--open') visible = false;
  @Output() itemClick = new EventEmitter();
  scrollbarConfig: PerfectScrollbarConfig = new PerfectScrollbarConfig({ minScrollbarLength: 40 } as PerfectScrollbarConfigInterface);
  descriptionHeight: number;

  constructor(private elemRef: ElementRef) { }

  ngOnChanges() {
    if (this.items) {
      this.filterItems();
      setTimeout(() => {
        if (this.elemRef.nativeElement.querySelector('.search-results__description')) {
          this.descriptionHeight = this.elemRef.nativeElement.querySelector('.search-results__description').offsetHeight;
        } else {
          this.descriptionHeight = 0;
        }
      }, 20);
    }
  }

  getHeight() {
    // 264px Is the size of the viewport that's available.
    return 264 - this.descriptionHeight;
  }

  filterItems() {
    this.displayItems = this.items.slice(0, this.maxItems);
  }

  onItemClick (item) {
    this.itemClick.emit(item);
  }

}
