import { Component, HostBinding, ContentChildren, AfterViewInit, QueryList, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { ListColumnHeaderComponent } from './list-column-header.component';

@Component({
    templateUrl: './list-column.component.html',
    moduleId: module.id,
    selector: 'vgr-list-column'
})
export class ListColumnComponent {
    @HostBinding('class')
    get classes(): string {
        return '.list__column flex-column ' + this.getColumnWidthClass();
    }
    @Input() text: string;

    width: number;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    private getColumnWidthClass(): string {
        return 'flex-column--' + (this.width ? this.width : 1);
    }

    copyPropertiesFromHeader(header: ListColumnHeaderComponent) {
        this.changeDetectorRef.detectChanges();
        this.width = header.width;
        this.changeDetectorRef.detectChanges();
    }
}

