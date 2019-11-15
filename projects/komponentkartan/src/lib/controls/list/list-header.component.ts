import { Component, HostBinding, ContentChildren, AfterContentInit, QueryList, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ListColumnHeaderComponent, SortDirection } from './list-column-header.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    templateUrl: './list-header.component.html',
    selector: 'vgr-list-header'
})
export class ListHeaderComponent implements AfterContentInit, OnDestroy {
    @HostBinding('class.list__header') listHeaderClass = true;
    @ContentChildren(ListColumnHeaderComponent) headerColumns: QueryList<ListColumnHeaderComponent>;
    @Output() sortChanged: EventEmitter<SortChangedArgs> = new EventEmitter<SortChangedArgs>();
    private contentInitialized: boolean;
    private ngUnsubscribe = new Subject();


    ngAfterContentInit() {
        console.warn('vgr-list-header soon to be deprecated');
        this.headerColumns.forEach(column => column.sortChanged.pipe(takeUntil(this.ngUnsubscribe)).subscribe((sort: SortDirection) => this.onColumnSortChanged(column, sort)));
    }

    ngOnDestroy() {
      this.ngUnsubscribe.next();
      this.ngUnsubscribe.complete();
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
