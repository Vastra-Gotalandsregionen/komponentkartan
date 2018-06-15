import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'vgr-search-result',
  templateUrl: './search-result.component.html'
})
export class SearchResultComponent implements OnInit {

  @Input() description: string;
  @Input() noResultsText: string;
  @Input() items: any;
  @Input() @HostBinding('class.search-results--open') visible = false;
  @Output() itemClick = new EventEmitter();
  scrollbarConfig: PerfectScrollbarConfig = new PerfectScrollbarConfig({ minScrollbarLength: 40 } as PerfectScrollbarConfigInterface);

  constructor() { }

  ngOnInit() {
  }

  onItemClick (item) {
    this.itemClick.emit(item);
  }

}
