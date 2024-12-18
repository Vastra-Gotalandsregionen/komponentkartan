import { Component, ContentChildren, Output, EventEmitter, QueryList, AfterContentInit, OnDestroy, Input, HostBinding, HostListener, ElementRef } from '@angular/core';
import { GridHeaderColumnComponent } from './grid-header-column.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridSortDirection } from '../sort-arrow/sort-arrow.component';


export interface GridSortChangedArgs {
  key: string;
  direction: GridSortDirection;
}
@Component({
    selector: 'vgr-grid-header',
    templateUrl: './grid-header.component.html',
    standalone: false
})
export class GridHeaderComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(GridHeaderColumnComponent) gridHeaderColumns: QueryList<GridHeaderColumnComponent>;
  @Output() sortChanged: EventEmitter<GridSortChangedArgs> = new EventEmitter<GridSortChangedArgs>();
  @Output() focusChanged: EventEmitter<number> = new EventEmitter<number>();
  private ngUnsubscribe: any = new Subject();

  previousSortableColumn(startIndex: number): number {
    if (startIndex === -1) {
      return;
    }
    for (let index = startIndex; index < this.gridHeaderColumns.length; index--) {
      if (index === -1) {
        // gå till sista
        index = this.gridHeaderColumns.length-1;
      }
      if (this.gridHeaderColumns.get(index).sortKey !== undefined) {
      return index;
      }
    }
    return startIndex;

  }
  nextSortableColumn(startIndex: number): number {
    if (startIndex === -1) {
      return;
    }
    for (let index = startIndex; index < this.gridHeaderColumns.length; index++) {
      if (this.gridHeaderColumns.get(index).sortKey !== undefined) {
      return index;
      }
    }
    return startIndex;
  }

  constructor(public el: ElementRef) { }


  ngAfterContentInit() {
    this.gridHeaderColumns.forEach(column => column.sortChanged.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (direction: GridSortDirection) => this.onColumnSortChanged(column, direction)));
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


