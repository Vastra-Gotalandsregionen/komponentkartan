import { Component, HostBinding, ContentChildren, AfterViewInit, QueryList, Input, Output, EventEmitter } from '@angular/core';


@Component({
    templateUrl: './list-column-header.component.html',
    moduleId: module.id,
    selector: 'vgr-list-column-header'
})
export class ListColumnHeaderComponent {
    @HostBinding('class.list__column-header') listColumnHeaderClass = true;
    @Input() text: string;
    @Input() sortDirection: SortDirection;
    @Input() width: number;
    @Input() sortKey: string;

    @HostBinding('class.list__column-header--sorted-desc') get isSortDescending(): boolean {
        return this.sortDirection === SortDirection.Descending;
    };

    @HostBinding('class.list__column-header--sorted-asc') get isSortAscending(): boolean {
        return this.sortDirection === SortDirection.Ascending;
    };

    @Output() sortChanged: EventEmitter<SortDirection> = new EventEmitter<SortDirection>();

    constructor() {
        this.sortDirection = SortDirection.None;
    }

    onClick() {
        if (this.sortDirection === SortDirection.None) {
            this.sortDirection = SortDirection.Ascending;
        } else if (this.sortDirection === SortDirection.Ascending) {
            this.sortDirection = SortDirection.Descending;
        } else if (this.sortDirection === SortDirection.Descending) {
            this.sortDirection = SortDirection.Ascending;
        }
        this.sortChanged.emit(this.sortDirection);
    }
}

export enum SortDirection {
    None,
    Ascending,
    Descending
}
