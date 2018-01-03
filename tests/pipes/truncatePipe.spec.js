"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var truncatePipe_1 = require("../../component-package/pipes/truncatePipe");
describe('truncatePipe test', function () {
    var truncatePipe = new truncatePipe_1.TruncatePipe();
    describe('When text is undefined', function () {
        it('empty text is returned', function () {
            expect(truncatePipe.transform(null)).toBe('');
        });
    });
    describe('When text is 20 characters long', function () {
        var text = 'abcdefghijklmnopqrst';
        describe('and limit is 10 characters', function () {
            var result;
            beforeEach(function () {
                result = truncatePipe.transform(text, '10');
            });
            it('text should be 10 characters long', function () {
                expect(result.length).toBe(10);
            });
            it('text should be 7 characters and trailing ...', function () {
                expect(result).toBe('abcdefg...');
            });
        });
        describe('and limit is not set', function () {
            it('text should not be modified', function () {
                expect(truncatePipe.transform(text)).toBe(text);
            });
        });
        describe('and limit is not a number', function () {
            it('text should not be modified', function () {
                expect(truncatePipe.transform(text, 'ten')).toBe(text);
            });
        });
        describe('and limit is greater than text', function () {
            it('text should not be modified', function () {
                expect(truncatePipe.transform(text, (text.length + 1).toString())).toBe(text);
            });
        });
        describe('and limit is equal to text', function () {
            it('text should not be modified', function () {
                expect(truncatePipe.transform(text, text.length.toString())).toBe(text);
            });
        });
    });
});
//# sourceMappingURL=truncatePipe.spec.js.map