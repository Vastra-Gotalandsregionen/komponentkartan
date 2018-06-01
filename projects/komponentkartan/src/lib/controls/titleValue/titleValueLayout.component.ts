
import { Component, HostBinding } from '@angular/core';


@Component({
    selector: 'vgr-title-value-layout',
    moduleId: module.id,
    template: `<ng-content></ng-content>`
})
export class TitleValueLayoutComponent {

    @HostBinding('class.title-value-layout') private TitleValueLayoutClass = true;
    constructor() { }

}
