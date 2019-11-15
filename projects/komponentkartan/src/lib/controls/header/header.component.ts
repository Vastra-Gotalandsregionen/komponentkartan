import { Component, Input, ViewChild, OnChanges, SimpleChanges, HostListener, ElementRef, ContentChild } from '@angular/core';
import { HeaderMenuComponent } from '../headerMenu/headerMenu.component';

@Component({
  selector: 'vgr-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  @Input() systemText: string;
  @Input() hideSwosh = false;
  @Input() logoClass: string;
  @ContentChild(HeaderMenuComponent, { static: false }) headerMenuComponent: HeaderMenuComponent;

  constructor() {}

}
