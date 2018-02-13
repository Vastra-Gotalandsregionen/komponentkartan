import { Input, Component, DoCheck, ElementRef, HostBinding, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'vgr-submenu',
    templateUrl: './submenu.component.html'
})
export class SubmenuComponent implements DoCheck {

    @Input() text: string;
    @Input() expanded: boolean;

    @HostBinding('class.submenu') hasClass = true;
    @HostBinding('class.submenu--expanded') get expandedClass() {
        return this.expanded;
    }
    @HostBinding('class.submenu--child-selected') private _childSelected: boolean;



    constructor(public elementRef: ElementRef, private changeDetecor: ChangeDetectorRef) { }

    ngDoCheck() {
        this._childSelected = !!this.elementRef.nativeElement.querySelector('.menu__item--selected');
    }
}
