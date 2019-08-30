import { Component, OnInit, Input, Output, EventEmitter, HostBinding } from '@angular/core';

export enum GridSortDirection {
  None,
  Ascending,
  Descending
}
@Component({
  selector: 'vgr-grid-header-column',
  templateUrl: './grid-header-column.component.html'
})
export class GridHeaderColumnComponent implements OnInit {
  @Input() @HostBinding('style.flex') width = 1;
  @Input() align = 'left';
  @Input() sortKey: string;
  @Input() sortDirection = GridSortDirection.None;
  @Output() sortChanged: EventEmitter<GridSortDirection> = new EventEmitter<GridSortDirection>();
  preventSort = false;

  constructor() { }

  ngOnInit() {
  }

  changeSort() {
    if (!this.preventSort) {
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

}
