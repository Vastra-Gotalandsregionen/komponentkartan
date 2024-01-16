import { AfterContentInit, Component, ContentChild, HostListener } from '@angular/core';
import { SubmenuComponent } from './submenu.component';

@Component({
    selector: 'vgr-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements AfterContentInit {
  @ContentChild(SubmenuComponent) subMenu: SubmenuComponent;

  // @HostListener('window:load', ['$event'])
  //   onLoad() {
  //     // Detta är en hack-lösning för att scrollbaren skall räkna om sig och visa scrollbar eller inte.
  //     // 80px är hårdkodad header-height
  //     console.log('sidebarmenu, onload')
  //     const sidebarmenu = document.querySelector('.sidebar-menu') as HTMLElement;
  //     sidebarmenu.style.height = '1500px';
  //     console.log('innan timeout onload', sidebarmenu.style.height)
  //     setTimeout(() => {
  //       sidebarmenu.style.height = 'calc(100vh - 80px)';
  //       console.log('i timeout onload', sidebarmenu.style.height)
  //     }, 100);
  //   }

    constructor() {}

    addHeight() {
      const sidebarmenu = document.querySelector('.sidebar-menu') as HTMLElement;
      sidebarmenu.style.height = '1500px';
      console.log('innan timeout onload', sidebarmenu.style.height)
      setTimeout(() => {
        sidebarmenu.style.height = 'calc(100vh - 80px)';
        console.log('i timeout onload', sidebarmenu.style.height)
      }, 100);
    }
    ngAfterContentInit() {
      const sidebarmenu = document.querySelector('.sidebar-menu') as HTMLElement;
      console.log('sidebarmenu, aftercontentInit', sidebarmenu, this.subMenu)
      if (this.subMenu) {
        this.addHeight();
        this.subMenu.ToggleChanged.subscribe(() =>
        {
          // Detta är en hack-lösning för att scrollbaren skall räkna om sig och visa scrollbar eller inte.
          // 80px är hårdkodad header-height
          sidebarmenu.style.height = '1500px';
          console.log('innan timeout aftercontentinit', sidebarmenu.style.height)
          setTimeout(() => {
            sidebarmenu.style.height = 'calc(100vh - 80px)';
            console.log('i timeout aftercontentinit', sidebarmenu.style.height)
          }, 100);
        });
      } else {
        sidebarmenu.style.height = 'calc(100vh - 80px)';
        console.log('i else aftercontentinit', sidebarmenu.style.height)
      }
    }
}
