import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'vgr-table-row-column',
  moduleId: module.id,
  template: `<ng-content></ng-content>`
})

export class TableRowColumnComponent {
  constructor() {
  }
}
