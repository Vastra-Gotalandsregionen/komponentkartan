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

    width: number;
    maxCharacters: number;

    constructor(private changeDetectorRef: ChangeDetectorRef) {
    }

    copyPropertiesFromHeader(header: ListColumnHeaderComponent) {
        this.changeDetectorRef.detectChanges();
        this.width = header.width;
        this.changeDetectorRef.detectChanges();
    }
}

