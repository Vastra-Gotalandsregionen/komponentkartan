"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_column_component_1 = require("../../component-package/controls/list/list-column.component");
describe('[ListColumnComponent]', function () {
    var component;
    beforeEach(function () {
        component = new list_column_component_1.ListColumnComponent();
    });
    describe('When set width is called', function () {
        beforeEach(function () {
            component.setWidth(20);
        });
        it('Width is set', function () {
            expect(component.width).toEqual(20);
        });
    });
    describe('When getClasses is called', function () {
        describe('And width  and align is not set', function () {
            it('It returns the default classes', function () {
                expect(component.classes).toEqual('list__column flex-column flex-column--1 column--align-left');
            });
        });
        describe('And width is set', function () {
            beforeEach(function () {
                component.setWidth(20);
            });
            it('It returns classes updated with width', function () {
                expect(component.classes).toEqual('list__column flex-column flex-column--20 column--align-left');
            });
        });
        describe('And align is set', function () {
            beforeEach(function () {
                component.setAlignment('center');
            });
            it('It returns classes updated with width', function () {
                expect(component.classes).toEqual('list__column flex-column flex-column--1 column--align-center');
            });
        });
    });
});
//# sourceMappingURL=listColumn.component.spec.js.map