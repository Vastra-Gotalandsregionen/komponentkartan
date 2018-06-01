
import { Component, HostBinding } from '@angular/core';


@Component({
    selector: 'vgr-title-value-layout',
    template: `<ng-content></ng-content>`
})
export class TitleValueLayoutComponent {

    @HostBinding('class.title-value-layout') TitleValueLayoutClass = true;
    constructor() { }

}
