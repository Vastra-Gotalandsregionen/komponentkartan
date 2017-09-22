import { Input, Output, Component, HostBinding, ContentChild } from '@angular/core';


@Component({
    selector: 'vgr-title-value',
    moduleId: module.id,
    templateUrl: './titleValue.component.html'
})
export class TitleValueComponent {
    @HostBinding('class.title-value') private titleValueClass = true;
    @Input() title: string;
    constructor() {
    }

}
