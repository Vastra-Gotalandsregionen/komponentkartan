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
    @Input() width: ColumnWidth;
    @Input() sortKey: string;

    get maxCharacters(): number {

        switch (this.width) {
            case ColumnWidth.xxs: {
                return 3;
            }
            case ColumnWidth.xs: {
                return 5;
            }
            case ColumnWidth.s: {
                return 7;
            }
            case ColumnWidth.m: {
                return 10;
            }
            case ColumnWidth.l: {
                return 20;
            }
            case ColumnWidth.xl: {
                return 35;
            }
            case ColumnWidth.xxl: {
                return 50;
            }
            case ColumnWidth.xxxl: {
                return 70;
            }
            default: {
                return 10;
            }
        }

    }
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

    getColumnWidthClass(): string {
        return 'flex-column--' + (ColumnWidth[this.width] ? ColumnWidth[this.width] : ColumnWidth[ColumnWidth.m]);
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

export enum ColumnWidth {
    xxs, xs, s, m, l, xl, xxl, xxxl
}
