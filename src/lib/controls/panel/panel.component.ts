import { Input, Component, HostBinding, ContentChild, ElementRef } from '@angular/core';

@Component({
    selector: 'vgr-panel',
    moduleId: module.id,
    templateUrl: './panel.component.html',
})
export class PanelComponent {
    @Input() width: number;
    @Input() color: string;

    @HostBinding('class', )
    get classes(): string {
        return 'panel ' + this.getColumnWidthClass() + ' ' + this.getColorClass();
    }

    private getColumnWidthClass(): string {
        return 'flex-width--' + (this.width ? this.width : 4);
    }

    private getColorClass(): string {
        return 'color--' + this.color;
    }

    constructor(private elementRef: ElementRef) { }
}

