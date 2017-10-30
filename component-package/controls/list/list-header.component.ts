import { Component, HostBinding, ContentChildren, AfterContentInit, QueryList, Input, EventEmitter, Output } from '@angular/core';
import { ListColumnHeaderComponent, SortDirection } from './list-column-header.component';
import { ListColumnComponent } from './list-column.component';

@Component({
    templateUrl: './list-header.component.html',
    moduleId: module.id,
    selector: 'vgr-list-header'
})
export class ListHeaderComponent implements AfterContentInit {
    @HostBinding('class.list__header') listHeaderClass = true;
    @ContentChildren(ListColumnHeaderComponent) headerColumns: QueryList<ListColumnHeaderComponent>;
    @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();
    ngAfterContentInit() {
        this.headerColumns.forEach(column => column.sortChanged.subscribe((sort: SortDirection) => this.onColumnSortChanged(column, sort)));
    }

    onColumnSortChanged(column: ListColumnHeaderComponent, sort: SortDirection) {
        this.headerColumns.filter(otherCol => otherCol !== column).forEach(otherCol => otherCol.sort = SortDirection.None);
        this.sortChanged.emit({ columnTitle: column.text, sortDirection: sort } as SortChangedArgs);
    }

    applyToColumn(column: ListColumnComponent, index: number) {
        const headerColumn = this.headerColumns.toArray()[index];
        column.copyPropertiesFromHeader(headerColumn);
    }
}

export interface SortChangedArgs {
    columnTitle: string;
    sortDirection: SortDirection;
}
