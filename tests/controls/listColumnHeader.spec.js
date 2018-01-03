"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_column_header_component_1 = require("../../component-package/controls/list/list-column-header.component");
describe('[ListColumnHeaderComponent]', function () {
    var component;
    beforeEach(function () {
        component = new list_column_header_component_1.ListColumnHeaderComponent();
    });
    describe('When initialized,', function () {
        it('classes is set', function () {
            expect(component.classes).toBe('list__column-header flex-column flex-column--1 column--align-left');
        });
        it('the sortdirection is none', function () {
            expect(component.sortDirection).toBe(list_column_header_component_1.SortDirection.None);
        });
        describe('and clicked', function () {
            beforeEach(function () {
                component.onClick();
            });
            it('the sortdirection is Ascending', function () {
                expect(component.sortDirection).toBe(list_column_header_component_1.SortDirection.Ascending);
            });
            describe('and clicked again', function () {
                beforeEach(function () {
                    component.onClick();
                });
                it('the sortdirection is Descending', function () {
                    expect(component.sortDirection).toBe(list_column_header_component_1.SortDirection.Descending);
                });
                describe('and clicked for the last time', function () {
                    beforeEach(function () {
                        component.onClick();
                    });
                    it('the sortdirection is Ascending', function () {
                        expect(component.sortDirection).toBe(list_column_header_component_1.SortDirection.Ascending);
                    });
                });
            });
        });
    });
    describe('when initialized with column width set to 3', function () {
        beforeEach(function () {
            component.width = 3;
        });
        it('classes is set to reflect width', function () {
            expect(component.classes).toContain('list__column-header flex-column flex-column--3');
        });
    });
    describe('when initialized with align set to right', function () {
        beforeEach(function () {
            component.align = "right";
        });
        it('classes is set to reflect alignment', function () {
            expect(component.classes).toContain('column--align-right');
        });
    });
    describe('when initialized with align set to unknown alignment', function () {
        beforeEach(function () {
            component.align = "bold";
        });
        it('classes is set to reflect default alignment', function () {
            expect(component.classes).toContain('column--align-left');
        });
    });
    describe('When initialized with sortdirection is ascending,', function () {
        beforeEach(function () {
            component.sortDirection = list_column_header_component_1.SortDirection.Ascending;
        });
        it('the isSortAscending is set to true', function () {
            expect(component.isSortAscending).toBeTruthy();
        });
        it('the isSortDescending is set to false', function () {
            expect(component.isSortDescending).toBeFalsy();
        });
    });
});
//# sourceMappingURL=listColumnHeader.spec.js.map