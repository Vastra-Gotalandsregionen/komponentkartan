import { Component, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'vgr-selectablelist-column',
  template: '<ng-content></ng-content>'
})
export class SelectablelistColumnComponent {

  @HostBinding('class.right') @Input() alignRight = false;

  constructor() { }

}
