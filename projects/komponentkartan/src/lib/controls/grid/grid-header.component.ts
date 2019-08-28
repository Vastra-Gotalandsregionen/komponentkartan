import { Component, ContentChildren, Output, EventEmitter, QueryList, AfterContentInit, OnDestroy, Input } from '@angular/core';
import { GridSortDirection, GridHeaderColumnComponent } from './grid-header-column.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

export interface GridSortChangedArgs {
  key: string;
  direction: GridSortDirection;
}
@Component({
  selector: 'vgr-grid-header',
  templateUrl: './grid-header.component.html'
})
export class GridHeaderComponent implements AfterContentInit, OnDestroy {
  @Input() allowSort = true;
  @ContentChildren(GridHeaderColumnComponent) gridHeaderColumns: QueryList<GridHeaderColumnComponent>;
  @Output() sortChanged: EventEmitter<GridSortChangedArgs> = new EventEmitter<GridSortChangedArgs>();
  private ngUnsubscribe = new Subject();

  ngAfterContentInit() {
    if (this.allowSort) {
      this.gridHeaderColumns.forEach(column => column.sortChanged.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
        (direction: GridSortDirection) => this.onColumnSortChanged(column, direction)));
    } else {
      this.gridHeaderColumns.forEach(column => column.preventSort = true);
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onColumnSortChanged(column: GridHeaderColumnComponent, direction: GridSortDirection) {
    this.gridHeaderColumns.filter(otherCol => otherCol !== column).forEach(otherCol => otherCol.sortDirection = GridSortDirection.None);
    this.sortChanged.emit({ key: column.sortKey, direction: direction } as GridSortChangedArgs);
  }

}
