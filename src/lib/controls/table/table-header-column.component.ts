import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'vgr-table-header-column',
  moduleId: module.id,
  template: `<ng-content></ng-content>`
})

export class TableHeaderColumnComponent {
  @Input() width: number;
  @Input() align: string;

  @HostBinding('class', )
  get classes(): string {
    return 'table__column flex-column ' + this.getColumnWidthClass() + ' ' + this.getAlignClass();
  }

  constructor() {
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
}
