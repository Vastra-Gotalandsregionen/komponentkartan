"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../component-package/controls/index");
var core_1 = require("@angular/core");
describe('[ListHeaderComponent]', function () {
    var listHeaderComponent;
    var columnHeader1;
    var columnHeader2;
    var columnHeader3;
    beforeEach(function () {
        columnHeader1 = new index_1.ListColumnHeaderComponent();
        columnHeader1.sortKey = 'column1.key';
        columnHeader1.width = 1;
        columnHeader2 = new index_1.ListColumnHeaderComponent();
        columnHeader2.text = 'column2.text';
        columnHeader2.width = 2;
        columnHeader3 = new index_1.ListColumnHeaderComponent();
        columnHeader3.sortKey = 'column3.key';
        columnHeader3.width = 3;
        listHeaderComponent = new index_1.ListHeaderComponent();
        listHeaderComponent.headerColumns = new core_1.QueryList();
        spyOn(listHeaderComponent.headerColumns, 'forEach').and.callFake(function (callback) { return [columnHeader1, columnHeader2, columnHeader3].forEach(callback); });
        spyOn(listHeaderComponent.headerColumns, 'toArray').and.returnValue([columnHeader1, columnHeader2, columnHeader3]);
        spyOn(listHeaderComponent.sortChanged, 'emit');
        listHeaderComponent.ngAfterContentInit();
    });
    describe('when a header column changes sort', function () {
        beforeEach(function () {
            columnHeader1.sortChanged.emit(index_1.SortDirection.Descending);
        });
        it('a sortchanged event is emitted for that column', function () {
            expect(listHeaderComponent.sortChanged.emit).toHaveBeenCalledWith({ key: 'column1.key', direction: index_1.SortDirection.Descending });
        });
        it('and all other columns are set to sortDirection = none', function () {
            expect(columnHeader2.sortDirection).toEqual(index_1.SortDirection.None);
            expect(columnHeader3.sortDirection).toEqual(index_1.SortDirection.None);
        });
    });
    describe('when a header column changes sort for a column without a set sortKey', function () {
        beforeEach(function () {
            columnHeader2.sortChanged.emit(index_1.SortDirection.Descending);
        });
        it('a sortchanged event is emitted for that column with text as key', function () {
            expect(listHeaderComponent.sortChanged.emit).toHaveBeenCalledWith({ key: 'column2.text', direction: index_1.SortDirection.Descending });
        });
    });
    describe('when apply to column is called', function () {
        var listColumn;
        beforeEach(function () {
            listColumn = new index_1.ListColumnComponent();
            jasmine.clock().uninstall();
            jasmine.clock().install();
        });
        describe('and there is a matching header for the supplied index', function () {
            beforeEach(function () {
                spyOn(listColumn, 'setWidth');
                listHeaderComponent.applyToColumn(listColumn, 1);
                jasmine.clock().tick(1);
            });
            it('the correct column header is used to copy properties to the list column', function () {
                expect(listColumn.setWidth).toHaveBeenCalledWith(columnHeader2.width);
            });
        });
        describe('and there is no matching header for the supplied index', function () {
            beforeEach(function () {
                spyOn(listColumn, 'setWidth');
                listHeaderComponent.applyToColumn(listColumn, 7);
            });
            it('the list column receives no properties', function () {
                expect(listColumn.setWidth).toHaveBeenCalledTimes(0);
            });
        });
        afterEach(function () {
            jasmine.clock().uninstall();
        });
    });
});
//# sourceMappingURL=listHeaderComponent.spec.js.map