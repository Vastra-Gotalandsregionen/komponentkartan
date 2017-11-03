import { ListColumnHeaderComponent, ColumnWidth, SortDirection } from '../../component-package/controls/list/list-column-header.component';

describe('[ListColumnHeaderComponent]', () => {
    let component: ListColumnHeaderComponent;

    beforeEach(() => {
        component = new ListColumnHeaderComponent();
    });

    describe('When initialized with no ColumnWidth,', () => {
        it('the maxCharacters is 10', () => {
            expect(component.maxCharacters).toBe(10);
        });
        it('and the class for column-width is flex-column--m', () => {
            expect(component.getColumnWidthClass()).toBe('flex-column--m');
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

    describe('When initialized with ColumnWidth xxs and sortdirection is ascending,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.xxs
            component.sortDirection = SortDirection.Ascending
        });

        it('the isSortAscending is set to true', () => {
            expect(component.isSortAscending).toBeTruthy();
        });

        it('the isSortDescending is set to false', () => {
            expect(component.isSortDescending).toBeFalsy();
        });

        it('The maxCharacters is 3', () => {
            expect(component.maxCharacters).toBe(3);
        });

        it('and the class for column-width is flex-column--xxs', () => {
            expect(component.getColumnWidthClass()).toBe('flex-column--xxs');
        });
    });

    describe('When initialized with ColumnWidth xs,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.xs

        });
        it('maxCharacters is 5', () => {
            expect(component.maxCharacters).toBe(5);
        });
    });

    describe('When initialized with ColumnWidth s,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.s
        });

        it('maxCharacters is 7', () => {
            expect(component.maxCharacters).toBe(7);
        });
    });

    describe('When initialized with ColumnWidth m,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.m
        });

        it('maxCharacters is 10', () => {
            expect(component.maxCharacters).toBe(10);
        });
    });

    describe('When initialized with ColumnWidth l,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.l
        });

        it('maxCharacters is 20', () => {
            expect(component.maxCharacters).toBe(20);
        });
    });


    describe('When initialized with ColumnWidth xl,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.xl
        });

        it('maxCharacters is 35', () => {
            expect(component.maxCharacters).toBe(35);
        });
    });

    describe('When initialized with ColumnWidth xxl,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.xxl
        });

        it('maxCharacters is 50', () => {
            expect(component.maxCharacters).toBe(50);
        });
    });

    describe('When initialized with ColumnWidth xxxl,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.xxxl
        });

        it('maxCharacters is 70', () => {
            expect(component.maxCharacters).toBe(70);
        });
    });

});

