"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var filterPipe_1 = require("../../component-package/pipes/filterPipe");
describe('FilterPipe', function () {
    var filterPipe = new filterPipe_1.FilterPipe();
    describe('When filtering on all string properties of an object', function () {
        describe('When filter is undefined', function () {
            it('all objects are returned', function () {
                var filteredResults = filterPipe.transform([{ name: 'Anna' }, { name: 'Anna-Karin' }, { name: 'Bob' }], undefined);
                expect(filteredResults.length).toBe(3);
            });
        });
        describe('When filter is empty string', function () {
            it('all objects are returned', function () {
                var filteredResults = filterPipe.transform([{ name: 'Anna' }, { name: 'Anna-Karin' }, { name: 'Bob' }], '');
                expect(filteredResults.length).toBe(3);
            });
        });
        describe('When filter mathches nothing', function () {
            it('no objects are returned', function () {
                var filteredResults = filterPipe.transform([{ name: 'Anna' }, { name: 'Anna-Karin' }, { name: 'Bob' }], 'adfhksjdhfkjsdbfkjsd');
                expect(filteredResults.length).toBe(0);
            });
        });
        describe('When object has one property', function () {
            describe('and filter matches property', function () {
                it('matching objects are returned', function () {
                    var filteredResults = filterPipe.transform([{ name: 'Anna' }, { name: 'Anna-Karin' }, { name: 'Bob' }], 'Anna');
                    expect(filteredResults.map(function (x) { return x.name; })).toEqual(['Anna', 'Anna-Karin']);
                });
            });
            describe('and filter matches property in different casing', function () {
                it('matching objects are returned', function () {
                    var filteredResults = filterPipe.transform([{ name: 'Anna' }, { name: 'Anna-Karin' }, { name: 'Bob' }], 'anna');
                    expect(filteredResults.map(function (x) { return x.name; })).toEqual(['Anna', 'Anna-Karin']);
                });
            });
        });
        describe('When object has two properties', function () {
            describe('and filter matches one property', function () {
                it('matching objects are returned', function () {
                    var filteredResults = filterPipe.transform([{ name: 'Anna', lastName: 'Johansson' }, { name: 'Anna-Karin', lastName: 'Svensson' }, { name: 'Bob', lastName: 'Saget' }], 'son');
                    expect(filteredResults.map(function (x) { return x.name; })).toEqual(['Anna', 'Anna-Karin']);
                });
            });
            describe('and filter matches two properties', function () {
                it('matching objects are returned', function () {
                    var filteredResults = filterPipe.transform([{ name: 'Anna', lastName: 'Johansson' }, { name: 'Anna-Karin', lastName: 'Svensson' }, { name: 'Johan', lastName: 'Larsson' }], 'Johan');
                    expect(filteredResults.map(function (x) { return x.name; })).toEqual(['Anna', 'Johan']);
                });
            });
        });
        describe('When object has properties of non-string types', function () {
            describe('and filter matches one property', function () {
                it('matching objects are returned', function () {
                    var filteredResults = filterPipe.transform([
                        { name: 'Anna', lastName: 'Johansson', isSingle: false, age: 45, adress: { street: 'Lövgränd 1' } },
                        { name: 'Anna-Karin', lastName: 'Svensson', isSingle: true, age: 25, adress: { street: 'Lövgränd 2' } },
                        { name: 'Bob', lastName: 'Saget', isSingle: false, age: 52, adress: { street: 'Lövgränd 3' } }
                    ], 'son');
                    expect(filteredResults.map(function (x) { return x.name; })).toEqual(['Anna', 'Anna-Karin']);
                });
            });
        });
    });
    describe('When filtered properties are explicitly selected', function () {
        it('filter is only applied to the supplied properties', function () {
            var filteredResults = filterPipe.transform([{ name: 'Anna', lastName: 'Johansson', address: 'Genvägen 12' },
                { name: 'Anna-Karin', lastName: 'Svensson', address: 'Johans väg 12' },
                { name: 'Johan', lastName: 'Larsson', address: 'Hemvägen 12' }], 'Johan', ['name', 'address']);
            expect(filteredResults.map(function (x) { return x.name; })).toEqual(['Anna-Karin', 'Johan']);
        });
        describe('and an object has an undefined property value', function () {
            describe('and the filter does not match any other property', function () {
                it('It is not matched by the filter', function () {
                    var filteredResults = filterPipe.transform([
                        { name: undefined, lastName: undefined }
                    ], 'Value', ['name', 'lastName']);
                    expect(filteredResults).toEqual([]);
                });
            });
            describe('and the filter matches a defined property', function () {
                it('the object is returned', function () {
                    var filteredResults = filterPipe.transform([
                        { name: undefined, lastName: 'Larsson', isSingle: false, age: 45, adress: { street: 'Lövgränd 1' } }
                    ], 'Larsson', ['name', 'lastName']);
                    expect(filteredResults.map(function (x) { return x.lastName; })).toEqual(['Larsson']);
                });
            });
        });
    });
});
//# sourceMappingURL=filterPipe.spec.js.map