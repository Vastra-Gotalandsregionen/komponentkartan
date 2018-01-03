"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dropdownItemToSelectedTextPipe_1 = require("../../component-package/pipes/dropdownItemToSelectedTextPipe");
describe('DropdownItemToSelectedTextPipe', function () {
    var dropdownPipe = new dropdownItemToSelectedTextPipe_1.DropdownItemToSelectedTextPipe();
    describe('When displayNameWhenSelected is undefined', function () {
        it('display name is returned', function () {
            var result = dropdownPipe.transform({ displayName: 'DisplayName', displayNameWhenSelected: undefined });
            expect(result).toBe('DisplayName');
        });
    });
    describe('When displayNameWhenSelected is defined', function () {
        it('displayNameWhenSelected is returned', function () {
            var result = dropdownPipe.transform({ displayName: 'DisplayName', displayNameWhenSelected: 'When selected' });
            expect(result).toBe('When selected');
        });
    });
    describe('When neither displayNameWhenSelected nor displayName is defined', function () {
        it('empty string is returned', function () {
            var result = dropdownPipe.transform({ displayName: undefined, displayNameWhenSelected: undefined });
            expect(result).toBe('');
        });
    });
});
//# sourceMappingURL=dropdownItemToSelectedTextPipe.spec.js.map