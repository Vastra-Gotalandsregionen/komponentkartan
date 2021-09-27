import { Component, Input, ContentChild } from '@angular/core';
import { HeaderMenuComponent } from '../headerMenu/headerMenu.component';

@Component({
  selector: 'vgr-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
  @Input() systemText: string;
  @Input() hideSwosh = false;
  @Input() logoClass: string;
  @ContentChild(HeaderMenuComponent) headerMenuComponent: HeaderMenuComponent;

  constructor() {}

}
