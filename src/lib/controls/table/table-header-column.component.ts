import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'vgr-table-header-column',
  moduleId: module.id,
  template: `<ng-content></ng-content>`
})

export class TableHeaderColumnComponent {
  constructor() {
  }
}
