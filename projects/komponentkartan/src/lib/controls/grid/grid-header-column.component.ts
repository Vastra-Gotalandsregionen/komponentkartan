import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef } from '@angular/core';
import { GridSortDirection } from '../sort-arrow/sort-arrow.component';


@Component({
  selector: 'vgr-grid-header-column',
  templateUrl: './grid-header-column.component.html'
})
export class GridHeaderColumnComponent {
  @Input() @HostBinding('style.flex') width = 1;
  @Input() align = 'left';
  @Input() sortKey: string;
  @Input() sortDirection = GridSortDirection.None;
  @Output() sortChanged: EventEmitter<GridSortDirection> = new EventEmitter<GridSortDirection>();
  @ViewChild('gridHeaderColumn', { read: ElementRef, static: false }) gridHeaderColumn: ElementRef;

  constructor() { }

  changeSort() {
    if (this.sortKey) {
      if (this.sortDirection === GridSortDirection.None) {
        this.sortDirection = GridSortDirection.Ascending;
      } else if (this.sortDirection === GridSortDirection.Ascending) {
        this.sortDirection = GridSortDirection.Descending;
      } else if (this.sortDirection === GridSortDirection.Descending) {
        this.sortDirection = GridSortDirection.Ascending;
      }
      this.sortChanged.emit(this.sortDirection);
    }
  }

  public focus() {
    if (this.sortKey) {
      this.gridHeaderColumn.nativeElement.focus();
    }
  }

}
