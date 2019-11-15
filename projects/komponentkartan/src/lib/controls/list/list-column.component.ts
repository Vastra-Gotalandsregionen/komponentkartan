import { Component, HostBinding, Input, AfterViewInit } from '@angular/core';

@Component({
    templateUrl: './list-column.component.html',
    selector: 'vgr-list-column'
})
export class ListColumnComponent implements AfterViewInit {
    @HostBinding('class', )
    get classes(): string {
        return 'list__column flex-column ' + this.getColumnWidthClass() + ' ' + this.getAlignClass();
    }
    @Input() width: number;
    @Input() align: string;

    private getColumnWidthClass(): string {
        return 'flex-column--' + (this.width ? this.width : 1);
    }

    private getAlignClass(): string {
        if (this.align !== 'right' &&
            this.align !== 'left' &&
            this.align !== 'center') {
            this.align = 'left';
        }

        return 'column--align-' + (this.align ? this.align : 'left');
    }

    ngAfterViewInit() {
        console.warn('vgr-list soon to be deprecated');
    }
}

