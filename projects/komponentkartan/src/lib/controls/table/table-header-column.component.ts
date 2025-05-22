import { Component, Host, HostBinding, Input, Optional, SkipSelf } from '@angular/core';
import { TableComponent } from './table.component';

@Component({
    selector: 'vgr-table-header-column',
    template: `<ng-content></ng-content>`,
    standalone: false
})

export class TableHeaderColumnComponent {
  @Input() width: number;
  @Input() align: string;

  @HostBinding('class', )
  get classes(): string {
    return 'table__column flex-column ' + this.getColumnWidthClass() + ' ' + this.getAlignClass();
  }

  constructor(@Optional() @SkipSelf() @Host() private table: TableComponent) {
  }

  getColumnWidthClass(): string {
    if (this.table.percentLayout) {
      return 'flex-column-percent--' + (this.width ? this.width : 1);
    } else {
      return 'flex-column--' + (this.width ? this.width : 1);
    }
  }

  getAlignClass(): string {
    if (this.align !== 'right' &&
      this.align !== 'left' &&
      this.align !== 'center') {
      this.align = 'left';
    }

    return 'column--align-' + (this.align ? this.align : 'left');
  }
}
