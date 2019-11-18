import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';

export enum SortDirection {
  None,
  Ascending,
  Descending
}

@Component({
  templateUrl: './list-column-header.component.html',
  selector: 'vgr-list-column-header'
})
export class ListColumnHeaderComponent {
  @HostBinding('class')
  get classes(): string {
    return 'list__column-header flex-column ' + this.getColumnWidthClass() + ' ' + this.getAlignClass();
  }

  @Input() sortDirection: SortDirection;
  @Input() width: number;
  @Input() sortKey: string;
  @Input() align: string;

  @HostBinding('class.list__column-header--sorted-desc')
  get isSortDescending(): boolean {
    return this.sortDirection === SortDirection.Descending;
  }

  @HostBinding('class.list__column-header--sorted-asc')
  get isSortAscending(): boolean {
    return this.sortDirection === SortDirection.Ascending;
  }

  @Output() sortChanged: EventEmitter<SortDirection> = new EventEmitter<SortDirection>();

  constructor() {
    this.sortDirection = SortDirection.None;
  }

  getColumnWidthClass(): string {
    return 'flex-column--' + (this.width ? this.width : 1);
  }

  getAlignClass(): string {

    if (this.align !== 'right' &&
      this.align !== 'left' &&
      this.align !== 'center') {
      this.align = 'left';
    }

    return 'column--align-' + (this.align ? this.align : 'left');
  }

  changeSort() {
    if (this.sortDirection === SortDirection.None) {
      this.sortDirection = SortDirection.Ascending;
    } else if (this.sortDirection === SortDirection.Ascending) {
      this.sortDirection = SortDirection.Descending;
    } else if (this.sortDirection === SortDirection.Descending) {
      this.sortDirection = SortDirection.Ascending;
    }
    this.sortChanged.emit(this.sortDirection);
  }
}
