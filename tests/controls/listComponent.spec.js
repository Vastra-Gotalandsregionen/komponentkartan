"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../component-package/controls/index");
var core_1 = require("@angular/core");
describe('[ListComponent]', function () {
    var listComponent;
    beforeEach(function () {
        listComponent = new index_1.ListComponent();
        listComponent.listHeader = new index_1.ListHeaderComponent();
    });
    describe('when header changes sort', function () {
        beforeEach(function () {
            spyOn(listComponent.sortChanged, 'emit');
            listComponent.ngAfterContentInit();
            listComponent.listHeader.sortChanged.emit({ direction: index_1.SortDirection.Ascending, key: 'foo' });
        });
        it('a sortChange event is emitted', function () {
            expect(listComponent.sortChanged.emit).toHaveBeenCalledWith({ direction: index_1.SortDirection.Ascending, key: 'foo' });
        });
    });
    describe('when list is initialized with three items', function () {
        var childItem1 = { copyPropertiesFromHeader: function (h) { }, expandedChanged: new core_1.EventEmitter() };
        var childItem2 = { copyPropertiesFromHeader: function (h) { }, expandedChanged: new core_1.EventEmitter() };
        var childItem3 = { copyPropertiesFromHeader: function (h) { }, expandedChanged: new core_1.EventEmitter() };
        beforeEach(function () {
            listComponent.items = new core_1.QueryList();
            spyOn(childItem1, 'copyPropertiesFromHeader');
            spyOn(childItem2, 'copyPropertiesFromHeader');
            spyOn(childItem3, 'copyPropertiesFromHeader');
            spyOn(listComponent.items, 'forEach').and.callFake((function (callback) { return [childItem1, childItem2, childItem3].forEach(callback); }));
            spyOn(listComponent.items, 'filter').and.callFake((function (callback) { return [childItem1, childItem2, childItem3].filter(callback); }));
            listComponent.ngAfterContentInit();
        });
        it('items are initialized with header sizing information', function () {
            expect(childItem1.copyPropertiesFromHeader).toHaveBeenCalledWith(listComponent.listHeader);
            expect(childItem2.copyPropertiesFromHeader).toHaveBeenCalledWith(listComponent.listHeader);
            expect(childItem3.copyPropertiesFromHeader).toHaveBeenCalledWith(listComponent.listHeader);
        });
        describe('and multiple expanded items is not allowed', function () {
            beforeEach(function () {
                listComponent.allowMultipleExpandedItems = false;
            });
            describe('and a child item is expanded', function () {
                beforeEach(function () {
                    childItem1.expanded = true;
                    childItem1.expandedChanged.emit(true);
                });
                it('the other items are collapsed', function () {
                    expect(childItem2.expanded).toBe(false);
                    expect(childItem3.expanded).toBe(false);
                });
                describe('and a different child item is expanded', function () {
                    beforeEach(function () {
                        childItem2.expanded = true;
                        childItem2.expandedChanged.emit(true);
                    });
                    it('the other items are collapsed', function () {
                        expect(childItem1.expanded).toBe(false);
                        expect(childItem3.expanded).toBe(false);
                    });
                });
            });
        });
    });
});
//# sourceMappingURL=listComponent.spec.js.map