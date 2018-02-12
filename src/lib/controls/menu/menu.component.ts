import { Input, Component, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-menu',
    templateUrl: './menu.component.html'
})
export class MenuComponent {

    @Input() title: string;

    @HostBinding('class.menu') hasClass = true;

    get smallerFont(): boolean {
        return this.title.length > 9;
    }

    constructor() { }

}
