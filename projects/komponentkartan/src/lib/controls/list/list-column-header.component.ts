import { Component, HostBinding, ContentChildren, AfterViewInit, QueryList, Input, Output, EventEmitter } from '@angular/core';


@Component({
  templateUrl: './list-column-header.component.html',
  moduleId: module.id,
  selector: 'vgr-list-column-header'
})
export class ListColumnHeaderComponent {
  @HostBinding('class')
  get classes(): string {
    return 'list__column-header flex-column ' + this.getColumnWidthClass() + ' ' + this.getAlignClass();
  }

  @Input() text: string;
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

  onClick() {
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

export enum SortDirection {
  None,
  Ascending,
  Descending
}
