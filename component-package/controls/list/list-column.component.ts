import { Component, HostBinding, Input, Output, EventEmitter } from '@angular/core';

import { ListColumnHeaderComponent } from './list-column-header.component';

@Component({
    templateUrl: './list-column.component.html',
    moduleId: module.id,
    selector: 'vgr-list-column'
})
export class ListColumnComponent {
    @HostBinding('class', )
    get classes(): string {
        return 'list__column flex-column ' + this.getColumnWidthClass() + ' ' + this.getAlignClass();
    }
    @Input() text: string;
    width: number;
    align: string;

    private getColumnWidthClass(): string {
        return 'flex-column--' + (this.width ? this.width : 1);
    }

    private getAlignClass(): string {
        return 'column--align-' + (this.align ? this.align : 'left');
    }

    setWidth(width: number) {
        this.width = width;

    }
    setAlignment(alignment: string) {
        this.align = alignment;
    }
}

