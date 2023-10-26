import { Component } from '@angular/core';

@Component({
  selector: 'vgr-selectablelist-header',
  template: '<ng-content select="vgr-selectablelist-header-column"></ng-content>'
})
export class SelectablelistHeaderComponent {

  constructor() { }

}
