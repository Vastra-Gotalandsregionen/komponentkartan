import { Component, HostBinding, ContentChildren, AfterViewInit, QueryList, Input, Output, EventEmitter } from '@angular/core';


@Component({
  templateUrl: './list-column-header-checkbox.component.html',
  moduleId: module.id,
  selector: 'vgr-list-column-header-checkbox'
})
export class ListColumnHeaderCheckboxComponent {
  @HostBinding('class')
  get classes(): string {
    return 'list__column-header flex-column ' + this.getColumnWidthClass() + ' ' + this.getAlignClass();
  }

  @Input() label: string;
  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Input() width: number;
  @Input() align: string;

  @Output() checkedChanged = new EventEmitter<boolean>();

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

  onItemCheckChanged(event: boolean) {
    this.checked = event;
    this.checkedChanged.emit(this.checked);
  }
}
