import { Component, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'vgr-sidebar-menu',
    templateUrl: './sidebar-menu.component.html',
    styleUrls: ['./sidebar-menu.component.scss']
})
export class SidebarMenuComponent implements OnInit, OnChanges {
    height = '100px';

    ngOnInit() {
      this.height = this.getHeight();
    }

    ngAfterViewInit() {
        this.height = this.getHeight();
    }

    ngOnChanges() {
        this.height = this.getHeight();
        console.log('onchange')
    }

    getHeight() {

        // 264px Is the size of the viewport that's available.
        let _1vh = Math.round(window.innerHeight / 100);
        console.log((_1vh*100) + 80 + 'px');
        // return (Math.round(window.innerHeight) + 80 + 'px');
        return '1048px';
      }
}
