import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from 'rxjs';

@Component({
    selector: 'vgr-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent {
  @HostListener('window:load', ['$event'])
    onLoad() {
      const sidebarmenu = document.querySelector('.sidebar-menu') as HTMLElement;
      sidebarmenu.style.height = null;
      setTimeout(() => {
        sidebarmenu.style.height = 'calc(100vh - 80px)';
      }, 500);
    }
}
