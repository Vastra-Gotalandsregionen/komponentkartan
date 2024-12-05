import { AfterContentInit, Component, ContentChildren, EventEmitter, OnDestroy, Output, QueryList } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GridSortDirection, SortChangedArgs } from '../sort-arrow/sort-arrow.component';
import { EditableTableHeaderColumnComponent } from './editable-table-header-column.component';

@Component({
    selector: 'vgr-editable-table-header',
    template: '<ng-content select="vgr-editable-table-header-column"></ng-content>',
    standalone: false
})
export class EditableTableHeaderComponent implements AfterContentInit, OnDestroy{
  private ngUnsubscribe: any = new Subject();

  @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();
  @ContentChildren(EditableTableHeaderColumnComponent) headerColumns: QueryList<EditableTableHeaderColumnComponent>;
  constructor() { }

  ngAfterContentInit() {
    this.headerColumns.forEach(column => column.sortChanged.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (direction: GridSortDirection) => this.onColumnSortChanged(column, direction)));
  }

  onColumnSortChanged(column: EditableTableHeaderColumnComponent, direction: GridSortDirection) {
    this.headerColumns.filter(otherCol => otherCol !== column).forEach(otherCol => otherCol.sortDirection = GridSortDirection.None);
    this.sortChanged.emit({ key: column.sortKey, direction: direction } as SortChangedArgs);
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
