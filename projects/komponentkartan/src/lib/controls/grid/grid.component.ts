import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, ContentChild, ContentChildren, QueryList, OnDestroy } from '@angular/core';
import { GridHeaderComponent, GridSortChangedArgs } from './grid-header.component';
import { GridRowComponent } from './grid-row.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PageHeaderHeightService } from '../../services/page-header-height.service';

@Component({
  selector: 'vgr-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input() stickyHeader = false;
  @Input() allowMultipleExpandedRows = false;
  @Input() pages = 0;
  @Input() activePage = 1;

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() sortChanged: EventEmitter<GridSortChangedArgs> = new EventEmitter<GridSortChangedArgs>();

  @ContentChild(GridHeaderComponent) gridHeader: GridHeaderComponent;
  @ContentChildren(GridRowComponent) rows: QueryList<GridRowComponent>;
  headerOffset: string;
  private headerHeight = 79;
  private ngUnsubscribe = new Subject();

  constructor(private pageHeaderHeightService: PageHeaderHeightService) { }

  ngOnInit() {
    this.headerOffset =  `${this.headerHeight}px`;
    this.pageHeaderHeightService.height
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(value => {
      console.log('value');
      this.headerOffset = `${this.headerHeight + value}px`;
    });
  }

  ngAfterContentInit() {
    if (this.gridHeader) {
      this.gridHeader.sortChanged
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((args: GridSortChangedArgs) => this.sortChanged.emit(args));
    }
    this.rows.forEach((item) => {
      item.expandedChanged
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((currentState) => {
          if (!this.allowMultipleExpandedRows) {
            this.rows.forEach(row => row.expanded = false);
          }
          item.expanded = !currentState;
        });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onPageChanged(event: number) {
    this.pageChanged.emit(event);
  }
}
