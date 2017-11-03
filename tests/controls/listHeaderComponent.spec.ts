import { ListHeaderComponent, ListColumnHeaderComponent, ListColumnComponent, SortChangedArgs, SortDirection, ListItemComponent, ListItemJqeuryHelper } from '../../component-package/controls/index';
import { QueryList, EventEmitter, ChangeDetectorRef } from '@angular/core';

describe('[ListHeaderComponent]', () => {
    let listHeaderComponent: ListHeaderComponent;
    let columnHeader1: ListColumnHeaderComponent;
    let columnHeader2: ListColumnHeaderComponent;
    let columnHeader3: ListColumnHeaderComponent;
    beforeEach(() => {
        columnHeader1 = new ListColumnHeaderComponent();
        columnHeader1.sortKey = 'column1.key';
        columnHeader2 = new ListColumnHeaderComponent();
        columnHeader2.text = 'column2.text';
        columnHeader3 = new ListColumnHeaderComponent();
        columnHeader3.sortKey = 'column3.key';
        listHeaderComponent = new ListHeaderComponent();
        listHeaderComponent.headerColumns = new QueryList<ListColumnHeaderComponent>();
        spyOn(listHeaderComponent.headerColumns, 'forEach').and.callFake((callback: any) => [columnHeader1, columnHeader2, columnHeader3].forEach(callback));
        spyOn(listHeaderComponent.headerColumns, 'toArray').and.returnValue([columnHeader1, columnHeader2, columnHeader3]);
        spyOn(listHeaderComponent.sortChanged, 'emit');

        listHeaderComponent.ngAfterContentInit();
    });
    describe('when a header column changes sort', () => {
        beforeEach(() => {
            columnHeader1.sortChanged.emit(SortDirection.Descending);
        });
        it('a sortchanged event is emitted for that column', () => {
            expect(listHeaderComponent.sortChanged.emit).toHaveBeenCalledWith({ key: 'column1.key', direction: SortDirection.Descending })
        });
        it('and all other columns are set to sortDirection = none', () => {
            expect(columnHeader2.sortDirection).toEqual(SortDirection.None);
            expect(columnHeader3.sortDirection).toEqual(SortDirection.None);
        });
    });

    describe('when a header column changes sort for a column without a set sortKey', () => {
        beforeEach(() => {
            columnHeader2.sortChanged.emit(SortDirection.Descending);
        });
        it('a sortchanged event is emitted for that column with text as key', () => {
            expect(listHeaderComponent.sortChanged.emit).toHaveBeenCalledWith({ key: 'column2.text', direction: SortDirection.Descending })
        });
    });

    describe('when apply to column is called', () => {
        let listColumn: ListColumnComponent;
        beforeEach(() => {
            listColumn = new ListColumnComponent({ detectChanges: () => { } } as ChangeDetectorRef)
        });
        describe('and there is a matching header for the supplied index', () => {
            beforeEach(() => {
                spyOn(listColumn, 'copyPropertiesFromHeader');
                listHeaderComponent.applyToColumn(listColumn, 1);
            });
            it('the correct column header is used to copy properties to the list column', () => {
                expect(listColumn.copyPropertiesFromHeader).toHaveBeenCalledWith(columnHeader2);
            });
        });
        describe('and there is no matching header for the supplied index', () => {
            beforeEach(() => {
                spyOn(listColumn, 'copyPropertiesFromHeader');
                listHeaderComponent.applyToColumn(listColumn, 7);
            });
            it('the list column receives no properties', () => {
                expect(listColumn.copyPropertiesFromHeader).toHaveBeenCalledTimes(0);
            });
        });
    });
});
