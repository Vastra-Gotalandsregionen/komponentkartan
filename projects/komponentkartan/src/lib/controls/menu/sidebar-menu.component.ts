import { AfterContentInit, Component, ContentChild, HostListener } from '@angular/core';
import { SubmenuComponent } from './submenu.component';

@Component({
    selector: 'vgr-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss'],
    standalone: false
})
export class SidebarMenuComponent implements AfterContentInit {
  @ContentChild(SubmenuComponent) subMenu: SubmenuComponent;

    constructor() {}

    addHeight() {
      const sidebarmenu = document.querySelector('.sidebar-menu') as HTMLElement;
      sidebarmenu.style.height = '1500px';
      setTimeout(() => {
        sidebarmenu.style.height = 'calc(100vh - 80px)';
      }, 700);
    }
    ngAfterContentInit() {
      const sidebarmenu = document.querySelector('.sidebar-menu') as HTMLElement;
      if (this.subMenu) {
        this.addHeight();
        this.subMenu.ToggleChanged.subscribe(() =>
        {
          // Detta är en hack-lösning för att scrollbaren skall räkna om sig och visa scrollbar eller inte.
          // 80px är hårdkodad header-height
          sidebarmenu.style.height = '1500px';
          setTimeout(() => {
            sidebarmenu.style.height = 'calc(100vh - 80px)';
          }, 500);
        });
      } else {
        sidebarmenu.style.height = 'calc(100vh - 80px)';
      }
    }
}
