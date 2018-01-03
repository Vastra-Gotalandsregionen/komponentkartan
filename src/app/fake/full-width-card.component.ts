import { Component, ViewChildren, QueryList, HostBinding } from '@angular/core';
import { IDropdownItem } from '../../lib/index';

@Component({
  moduleId: module.id,
  selector: 'vgr-full-width-card',
  templateUrl: 'full-width-card.component.html'
})
export class FullWidthCardComponent {

  readonly = true;
  constructor() { }

}
