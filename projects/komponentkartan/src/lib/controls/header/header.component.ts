import { Component, Input, ViewChild, OnChanges, SimpleChanges, HostListener, ElementRef, ContentChild } from '@angular/core';
import { IHeaderMenu } from '../../models/headerMenu.model';
import { HeaderMenuComponent } from '../headerMenu/headerMenu.component';

@Component({
  selector: 'vgr-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  @Input() headerMenu: IHeaderMenu;
  @Input() systemText: string;
  @Input() hideSwosh = false;
  @Input() logoClass: string;
  @ContentChild(HeaderMenuComponent) headerMenuComponent: HeaderMenuComponent;
  internalInitials: string;

  constructor() {}

}
