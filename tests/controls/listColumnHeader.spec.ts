import { ListColumnHeaderComponent, SortDirection } from '../../component-package/controls/list/list-column-header.component';

describe('[ListColumnHeaderComponent]', () => {
    let component: ListColumnHeaderComponent;

    beforeEach(() => {
        component = new ListColumnHeaderComponent();
    });


    describe('When initialized,', () => {
        it('classes is set', () => {
            expect(component.classes).toBe('list__column-header flex-column flex-column--1');
        });
        it('the sortdirection is none', () => {
            expect(component.sortDirection).toBe(SortDirection.None);
        });
        describe('and clicked', () => {
            beforeEach(() => {
                component.onClick();
            });
            it('the sortdirection is Ascending', () => {
                expect(component.sortDirection).toBe(SortDirection.Ascending);
            });
            describe('and clicked again', () => {
                beforeEach(() => {
                    component.onClick();
                });
                it('the sortdirection is Descending', () => {
                    expect(component.sortDirection).toBe(SortDirection.Descending);
                });
                describe('and clicked for the last time', () => {
                    beforeEach(() => {
                        component.onClick();
                    });
                    it('the sortdirection is Ascending', () => {
                        expect(component.sortDirection).toBe(SortDirection.Ascending);
                    });
                });
            });
        });
    });

    describe('when initialized with column width set to 3', () => {
        beforeEach(() => {
            component.width = 3;
        })

        it('classes is set to reflect width', () => {
            expect(component.classes).toBe('list__column-header flex-column flex-column--3');
        })
    })

    describe('When initialized with sortdirection is ascending,', () => {
        beforeEach(() => {
            component.sortDirection = SortDirection.Ascending
        });

        it('the isSortAscending is set to true', () => {
            expect(component.isSortAscending).toBeTruthy();
        });

        it('the isSortDescending is set to false', () => {
            expect(component.isSortDescending).toBeFalsy();
        });

    });
});

