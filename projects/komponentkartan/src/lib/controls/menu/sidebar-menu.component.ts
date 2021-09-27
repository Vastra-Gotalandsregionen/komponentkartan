import { AfterContentInit, Component, ContentChild, HostListener } from '@angular/core';
import { SubmenuComponent } from './submenu.component';

@Component({
    selector: 'vgr-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements AfterContentInit {
  @ContentChild(SubmenuComponent) subMenu: SubmenuComponent;

  @HostListener('window:load', ['$event'])
    onLoad() {
      const sidebarmenu = document.querySelector('.sidebar-menu') as HTMLElement;
      sidebarmenu.style.height = '1500px';
      setTimeout(() => {
        sidebarmenu.style.height = 'calc(100vh - 80px)';
      }, 500);
    }

    constructor() {}

    ngAfterContentInit() {
      this.subMenu.ToggleChanged.subscribe(() =>
      {
        const sidebarmenu = document.querySelector('.sidebar-menu') as HTMLElement;
        sidebarmenu.style.height = '1500px';
        setTimeout(() => {
          sidebarmenu.style.height = 'calc(100vh - 80px)';
        }, 500);
      });
    }
}
