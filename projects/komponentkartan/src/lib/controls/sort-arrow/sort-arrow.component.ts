import { Component, Input, OnChanges, HostBinding } from '@angular/core';
import { GridSortDirection } from '../grid/grid-header-column.component';

@Component({
  selector: 'vgr-sort-arrow',
  templateUrl: './sort-arrow.component.html',
  styleUrls: ['./sort-arrow.component.scss']
})
export class SortArrowComponent implements  OnChanges {

  @Input() sortDirection: GridSortDirection;
  @HostBinding('class') className;

  constructor() { }

  ngOnChanges(changes) {
    const values = ['only-hover', 'permanent', 'permanent'];
    this.className = values[changes.sortDirection.currentValue];
  }

}
