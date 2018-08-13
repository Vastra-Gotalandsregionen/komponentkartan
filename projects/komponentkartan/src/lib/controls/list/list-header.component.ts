import { Component, HostBinding, ContentChildren, AfterContentInit, QueryList, Input, EventEmitter, Output } from '@angular/core';
import { ListColumnHeaderComponent, SortDirection } from './list-column-header.component';
import { ListColumnComponent } from './list-column.component';

@Component({
    templateUrl: './list-header.component.html',
    selector: 'vgr-list-header'
})
export class ListHeaderComponent implements AfterContentInit {
    @HostBinding('class.list__header') listHeaderClass = true;
    @ContentChildren(ListColumnHeaderComponent) headerColumns: QueryList<ListColumnHeaderComponent>;
    @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();
    private contentInitialized: boolean;

    ngAfterContentInit() {
        this.headerColumns.forEach(column => column.sortChanged.subscribe((sort: SortDirection) => this.onColumnSortChanged(column, sort)));
    }

    onColumnSortChanged(column: ListColumnHeaderComponent, sort: SortDirection) {
        this.headerColumns.filter(otherCol => otherCol !== column).forEach(otherCol => otherCol.sortDirection = SortDirection.None);
        this.sortChanged.emit({ key: column.sortKey, direction: sort } as SortChangedArgs);
    }
}

export interface SortChangedArgs {
    key: string;
    direction: SortDirection;
}
