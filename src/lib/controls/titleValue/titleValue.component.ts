import { Input, Output, Component, HostBinding, ContentChild } from '@angular/core';


@Component({
    selector: 'vgr-title-value',
    moduleId: module.id,
    templateUrl: './titleValue.component.html'
})
export class TitleValueComponent {
    @HostBinding('class.title-value') private titleValueClass = true;
    @HostBinding('class.slim-row')
    public get isSlim(): boolean {
        return this.slim;
    }
    @Input() title: string;
    @Input() slim: boolean;
    constructor() {
    }

}