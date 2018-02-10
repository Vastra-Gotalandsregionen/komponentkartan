import { Input, Component, HostBinding, QueryList, DoCheck, ViewChild, ElementRef } from '@angular/core';
import { MenuItemComponent } from './menu-item.component';

@Component({
    selector: 'vgr-submenu',
    templateUrl: './submenu.component.html'
})
export class SubmenuComponent implements DoCheck {

    @Input() text: string;
    @Input() expanded = true;

    @HostBinding('class.submenu') hasClass = true;
    @HostBinding('class.submenu--expanded') get expandedClass() {
        return this.expanded;
    }
    @HostBinding('class.submenu--child-selected') private _childSelected = false;

    @ViewChild('submenu') submenuElement: ElementRef;


    constructor() { }

    ngDoCheck() {
        if (this.submenuElement.nativeElement.children) {
            const nrOfOtems = this.submenuElement.nativeElement.children.length;
            for (let i = 0; i < nrOfOtems; i++) {
                if (this.submenuElement.nativeElement.children[i].childNodes[1].classList && this.submenuElement.nativeElement.children[i].childNodes[1].classList.value.includes('menu-item--selected')) {
                    this._childSelected = true;
                }
            }
        }
    }
}
