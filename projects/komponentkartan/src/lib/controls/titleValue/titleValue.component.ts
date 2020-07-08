import { Input, Output, Component, HostBinding, ContentChild } from '@angular/core';


@Component({
    selector: 'vgr-title-value',
    templateUrl: './titleValue.component.html',
    styleUrls: ['./titleValue.component.scss']
})
export class TitleValueComponent {
    @HostBinding('class.title-value') titleValueClass = true;
    @HostBinding('class.slim-row')
    public get isSlim(): boolean {
        return this.slim;
    }
    @Input() slim: boolean;
    constructor() {
    }

}
