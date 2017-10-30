import { Component, HostBinding, ContentChildren, AfterViewInit, QueryList, Input, Output, EventEmitter } from '@angular/core';


@Component({
    templateUrl: './list-column.component.html',
    moduleId: module.id,
    selector: 'vgr-list-column'
})
export class ListColumnComponent {
    @HostBinding('class.list__column') listColumnClass = true;
    @Input() text: string;
    @Input() sort: SortDirection;
    @Input() width: 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl';

    get maxCharacters(): number {
        return 10;
    }
    @HostBinding('class.list__column--sorted-desc') get isSortDescending(): boolean {
        return this.sort === SortDirection.Descending;
    };

    @HostBinding('class.list__column--sorted-asc') get isSortAscending(): boolean {
        return this.sort === SortDirection.Ascending;
    };

    @Output() sortChanged: EventEmitter<SortDirection> = new EventEmitter<SortDirection>();

    constructor() {
        this.sort = SortDirection.None;
    }

    getColumnWidthClass(): string {
        return 'flex-column--' + this.width;
    }

    onClick() {
        if (this.sort === SortDirection.None) {
            this.sort = SortDirection.Ascending;
        } else if (this.sort === SortDirection.Ascending) {
            this.sort = SortDirection.Descending;
        } else if (this.sort === SortDirection.Descending) {
            this.sort = SortDirection.Ascending;
        }
        this.sortChanged.emit(this.sort);
    }
}

export enum SortDirection {
    None,
    Ascending,
    Descending
}

