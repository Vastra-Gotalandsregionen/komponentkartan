import { Input, Component, HostBinding, ContentChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-panel',
    templateUrl: './panel.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class PanelComponent {
    @Input() width: number;
    @Input() themecolor: string;
    @Input() noborder: boolean;
    @HostBinding('class')
    get classes(): string {
        return this.getColumnWidthClass() + this.getBorderClass() + this.getColorClass();
    }

    private getColumnWidthClass(): string {
        return 'flex-width--' + (this.width ? this.width : 4);
    }

    private getColorClass(): string {
        return this.themecolor && !this.noborder ? ' color--' + this.themecolor : '';
    }

    private getBorderClass(): string {
        return this.noborder ? '' : ' panel-with-border';
    }
    constructor(private elementRef: ElementRef) { }
}

