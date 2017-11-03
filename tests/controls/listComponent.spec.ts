import { ListComponent, ListHeaderComponent, SortChangedArgs, SortDirection, ListItemComponent, ListItemJqeuryHelper } from '../../component-package/controls/index';
import { QueryList, EventEmitter } from '@angular/core';

describe('[ListComponent]', () => {
    let listComponent: ListComponent;
    beforeEach(() => {
        listComponent = new ListComponent();
        listComponent.listHeader = new ListHeaderComponent();
    });
    describe('when header changes sort', () => {
        beforeEach(() => {
            spyOn(listComponent.sortChanged, 'emit');
            listComponent.ngAfterContentInit();
            listComponent.listHeader.sortChanged.emit({ direction: SortDirection.Ascending, key: 'foo' } as SortChangedArgs);
        });
        it('a sortChange event is emitted', () => {
            expect(listComponent.sortChanged.emit).toHaveBeenCalledWith({ direction: SortDirection.Ascending, key: 'foo' });
        });
    });
    describe('when list is initialized with three items', () => {
        const childItem1 = { copyPropertiesFromHeader: (h) => { }, expandedChanged: new EventEmitter<boolean>() } as ListItemComponent;
        const childItem2 = { copyPropertiesFromHeader: (h) => { }, expandedChanged: new EventEmitter<boolean>() } as ListItemComponent;
        const childItem3 = { copyPropertiesFromHeader: (h) => { }, expandedChanged: new EventEmitter<boolean>() } as ListItemComponent;

        beforeEach(() => {
            listComponent.items = new QueryList<ListItemComponent>();
            spyOn(childItem1, 'copyPropertiesFromHeader');
            spyOn(childItem2, 'copyPropertiesFromHeader');
            spyOn(childItem3, 'copyPropertiesFromHeader');
            spyOn(listComponent.items, 'forEach').and.callFake(((callback: any) => [childItem1, childItem2, childItem3].forEach(callback)));
            spyOn(listComponent.items, 'filter').and.callFake(((callback: any) => [childItem1, childItem2, childItem3].filter(callback)));
            listComponent.ngAfterContentInit();
        });
        it('items are initialized with header sizing information', () => {
            expect(childItem1.copyPropertiesFromHeader).toHaveBeenCalledWith(listComponent.listHeader);
            expect(childItem2.copyPropertiesFromHeader).toHaveBeenCalledWith(listComponent.listHeader);
            expect(childItem3.copyPropertiesFromHeader).toHaveBeenCalledWith(listComponent.listHeader);
        });

        describe('and multiple expanded items is not allowed', () => {
            beforeEach(() => {
                listComponent.allowMultipleExpandedItems = false;
            });
            describe('and a child item is expanded', () => {
                beforeEach(() => {
                    childItem1.expanded = true;
                    childItem1.expandedChanged.emit(true);
                });
                it('the other items are collapsed', () => {
                    expect(childItem2.expanded).toBe(false);
                    expect(childItem3.expanded).toBe(false);
                });
                describe('and a different child item is expanded', () => {
                    beforeEach(() => {
                        childItem2.expanded = true;
                        childItem2.expandedChanged.emit(true);
                    });
                    it('the other items are collapsed', () => {
                        expect(childItem1.expanded).toBe(false);
                        expect(childItem3.expanded).toBe(false);
                    });
                });
            });
        });
    });
});
