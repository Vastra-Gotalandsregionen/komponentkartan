import { Input, Component, DoCheck, ElementRef, HostBinding, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


@Component({
    selector: 'vgr-submenu',
    templateUrl: './submenu.component.html'
})
export class SubmenuComponent implements AfterViewInit {

    @Input() text: string;
    @Input() expanded: boolean;

    @HostBinding('class.submenu') hasClass = true;
    @HostBinding('class.submenu--expanded') get expandedClass() {
        return this.expanded;
    }
    @HostBinding('class.submenu--child-selected') private childSelected: boolean;

    constructor(public elementRef: ElementRef, private router: Router) { }

    setChildSelected() {
        this.childSelected = !!this.elementRef.nativeElement.querySelector('.menu__item--selected');
        if (this.childSelected) {
            this.expanded = true;
        }
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.setChildSelected();

        }, 10);

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                setTimeout(() => {
                    this.setChildSelected();
                }, 100);
            }
        });
    }
}
