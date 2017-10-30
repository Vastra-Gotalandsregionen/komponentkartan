import { Component, HostBinding, ContentChildren, AfterViewInit, QueryList, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

import { ListColumnHeaderComponent } from './list-column-header.component';

@Component({
    templateUrl: './list-column.component.html',
    moduleId: module.id,
    selector: 'vgr-list-column'
})
export class ListColumnComponent {
    @HostBinding('class.list__column') listColumnClass = true;
    @Input() text: string;

    width: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';
    maxCharacters: number;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    getColumnWidthClass(): string {
        return 'flex-column--' + this.width;
    }

    copyPropertiesFromHeader(header: ListColumnHeaderComponent) {
        this.changeDetectorRef.detectChanges();
        this.width = header.width;
        this.maxCharacters = header.maxCharacters;
        this.changeDetectorRef.detectChanges();
    }
}

