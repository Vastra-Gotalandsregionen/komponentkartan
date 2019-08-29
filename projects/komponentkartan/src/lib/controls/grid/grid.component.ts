import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, ContentChild, ContentChildren, QueryList, OnDestroy } from '@angular/core';
import { GridHeaderComponent, GridSortChangedArgs } from './grid-header.component';
import { GridRowComponent } from './grid-row.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PageHeaderHeightService } from '../../services/page-header-height.service';
import { GridService } from '../../grid/grid.service';

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

  constructor(private pageHeaderHeightService: PageHeaderHeightService, private gridService: GridService) { }

  ngOnInit() {
    this.headerOffset = `${this.headerHeight}px`;
    this.pageHeaderHeightService.height
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        setTimeout(() => {
          this.headerOffset = `${this.headerHeight + value}px`;
        });
      });
  }

  ngAfterContentInit() {
    if (this.gridHeader) {
      this.gridHeader.sortChanged
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((args: GridSortChangedArgs) => this.sortChanged.emit(args));
    }

    this.gridService.expandRowRequested
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((rowToExpand: GridRowComponent) => {
        if (this.allowMultipleExpandedRows) {
          rowToExpand.setExpanded(true);
        } else {
          const expandedRows = this.rows.filter(x => x.isExpanded);

          if (expandedRows.length) {
            const preventedRows = expandedRows.filter(x => x.preventCollapse);

            if (preventedRows.length) {
              preventedRows.forEach(x => x.collapsePrevented.emit());
              rowToExpand.expandPrevented.emit();

            } else {
              expandedRows.forEach(x => x.setExpanded(false));
              rowToExpand.setExpanded(true);
            }

          } else {
            rowToExpand.setExpanded(true);
          }
        }
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