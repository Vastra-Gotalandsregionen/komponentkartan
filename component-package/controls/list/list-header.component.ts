import { Component, HostBinding, ContentChildren, AfterContentInit, QueryList, Input, EventEmitter, Output } from '@angular/core';
import { ListColumnComponent, SortDirection } from './list-column.component';

@Component({
    templateUrl: './list-header.component.html',
    moduleId: module.id,
    selector: 'vgr-list-header'
})
export class ListHeaderComponent implements AfterContentInit {
    @HostBinding('class.list__header') listHeaderClass = true;
    @ContentChildren(ListColumnComponent) columns: QueryList<ListColumnComponent>;
    @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();
    ngAfterContentInit() {
        this.columns.forEach(column => column.sortChanged.subscribe((sort: SortDirection) => this.onColumnSortChanged(column, sort)));
    }

    onColumnSortChanged(column: ListColumnComponent, sort: SortDirection) {
        this.columns.filter(otherCol => otherCol !== column).forEach(otherCol => otherCol.sort = SortDirection.None);
        this.sortChanged.emit({ columnTitle: column.text, sortDirection: sort } as SortChangedArgs);
    }
}

export interface SortChangedArgs {
    columnTitle: string;
    sortDirection: SortDirection;
}
