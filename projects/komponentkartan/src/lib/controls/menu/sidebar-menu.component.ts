import { AfterContentInit, AfterViewInit, ChangeDetectorRef, Component, ContentChild, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { SubmenuComponent } from './submenu.component';



@Component({
    selector: 'vgr-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements AfterContentInit {
  @HostListener('window:load', ['$event'])
    onLoad() {
      const sidebarmenu = document.querySelector('.sidebar-menu') as HTMLElement;
      
      sidebarmenu.style.height = '1500px'
      setTimeout(() => {
        sidebarmenu.style.height = 'calc(100vh - 80px)';
      }, 500);
    }

    @ContentChild(SubmenuComponent) subMenu: SubmenuComponent;

    constructor(private elementRef: ElementRef){
      
    }

    ngAfterContentInit() {
     // this.elementRef.nativeElement.focus();
     this.subMenu.ToggleChanged.subscribe(() => { const sidebarmenu = document.querySelector('.sidebar-menu') as HTMLElement;   sidebarmenu.style.height = '1500px';
     setTimeout(() => {
       sidebarmenu.style.height = 'calc(100vh - 80px)';
     }, 500);});
     
    }
}
