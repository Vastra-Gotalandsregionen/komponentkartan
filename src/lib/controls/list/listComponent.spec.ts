import { ListComponent, ListHeaderComponent, ListItemContentComponent, SortChangedArgs, SortDirection, ListItemComponent, ListItemJqeuryHelper } from '../../controls/index';
import { QueryList, EventEmitter } from '@angular/core';
import { ListItemHeaderComponent } from '../list-item/list-item-header.component';

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
        const childItem1 = { setFocusOnFirstRow: new EventEmitter(), setFocusOnLastRow: new EventEmitter(), setFocusOnPreviousRow: new EventEmitter(), setFocusOnNextRow: new EventEmitter(), setFocusOnPreviousRowContent: new EventEmitter(), setFocusOnNextRowContent: new EventEmitter(), copyPropertiesFromHeader: (h) => { }, expandedChanged: new EventEmitter<boolean>() } as ListItemComponent;
        const childItem2 = { setFocusOnFirstRow: new EventEmitter(), setFocusOnLastRow: new EventEmitter(), setFocusOnPreviousRow: new EventEmitter(), setFocusOnNextRow: new EventEmitter(), setFocusOnPreviousRowContent: new EventEmitter(), setFocusOnNextRowContent: new EventEmitter(), copyPropertiesFromHeader: (h) => { }, expandedChanged: new EventEmitter<boolean>() } as ListItemComponent;
        const childItem3 = { setFocusOnFirstRow: new EventEmitter(), setFocusOnLastRow: new EventEmitter(), setFocusOnPreviousRow: new EventEmitter(), setFocusOnNextRow: new EventEmitter(), setFocusOnPreviousRowContent: new EventEmitter(), setFocusOnNextRowContent: new EventEmitter(), copyPropertiesFromHeader: (h) => { }, expandedChanged: new EventEmitter<boolean>() } as ListItemComponent;

        beforeEach(() => {
            listComponent.items = new QueryList<ListItemComponent>();
            spyOn(childItem1, 'copyPropertiesFromHeader');
            spyOn(childItem2, 'copyPropertiesFromHeader');
            spyOn(childItem3, 'copyPropertiesFromHeader');
            spyOn(listComponent.items, 'forEach').and.callFake(((callback: any) => [childItem1, childItem2, childItem3].forEach(callback)));
            spyOn(listComponent.items, 'filter').and.callFake(((callback: any) => [childItem1, childItem2, childItem3].filter(callback)));
            spyOn(listComponent.items, 'toArray').and.returnValue([childItem1, childItem2, childItem3]);
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

        describe('if focus is on the first list-item header', () => {
            beforeEach(() => {
                spyOn(listComponent, 'setFocusOnPreviousRow');
                listComponent.setFocusOnPreviousRow(childItem1, 0);

            });
            it('setFocusOnPreviousRow toHaveBeenCalled ', () => {
                expect(listComponent.setFocusOnPreviousRow).toHaveBeenCalledWith(childItem1, 0);
            });
            it('setFocus on last row', () => {
                expect(listComponent.items.toArray()[listComponent.items.toArray().length - 1]).toBeTruthy();
            });

        });
    });
});
