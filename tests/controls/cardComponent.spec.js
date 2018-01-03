"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card_component_1 = require("../../component-package/controls/card/card.component");
describe('[CardComponent]', function () {
    var card = new card_component_1.CardComponent();
    describe('When card contains two columns', function () {
        beforeEach(function () {
            card.columns = {
                length: 2,
                first: {},
                last: {}
            };
            card.ngAfterContentInit();
        });
        it('The first column is placed left', function () {
            expect(card.columns.first.left).toBeTruthy();
            expect(card.columns.first.right).toBeFalsy();
            expect(card.columns.first.fullwidth).toBeFalsy();
        });
        it('The second column is placed right', function () {
            expect(card.columns.last.right).toBeTruthy();
            expect(card.columns.last.left).toBeFalsy();
            expect(card.columns.last.fullwidth).toBeFalsy();
        });
    });
    describe('When card contains one column', function () {
        beforeEach(function () {
            card.columns = {
                length: 1,
                first: {}
            };
            card.ngAfterContentInit();
        });
        it('The column is full-width', function () {
            expect(card.columns.first.fullwidth).toBeTruthy();
            expect(card.columns.first.right).toBeFalsy();
            expect(card.columns.first.left).toBeFalsy();
        });
    });
});
//# sourceMappingURL=cardComponent.spec.js.map