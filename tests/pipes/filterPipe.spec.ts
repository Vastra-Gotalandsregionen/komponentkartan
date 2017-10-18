import { FilterPipe } from '../../component-package/pipes/filterPipe';

describe('FilterPipe', () => {

    const filterPipe = new FilterPipe();
    describe('When filtering on all string properties of an object', () => {
        describe('When filter is undefined', () => {
            it('all objects are returned', () => {
                const filteredResults = filterPipe.transform([{ name: 'Anna' }, { name: 'Anna-Karin' }, { name: 'Bob' }], undefined);

                expect(filteredResults.length).toBe(3);
            });
        });
        describe('When filter is empty string', () => {
            it('all objects are returned', () => {
                const filteredResults = filterPipe.transform([{ name: 'Anna' }, { name: 'Anna-Karin' }, { name: 'Bob' }], '');

                expect(filteredResults.length).toBe(3);
            });
        });
        describe('When filter mathches nothing', () => {
            it('no objects are returned', () => {
                const filteredResults = filterPipe.transform([{ name: 'Anna' }, { name: 'Anna-Karin' }, { name: 'Bob' }], 'adfhksjdhfkjsdbfkjsd');

                expect(filteredResults.length).toBe(0);
            });

        });
        describe('When object has one property', () => {
            describe('and filter matches property', () => {
                it('matching objects are returned', () => {
                    const filteredResults = filterPipe.transform([{ name: 'Anna' }, { name: 'Anna-Karin' }, { name: 'Bob' }], 'Anna');

                    expect(filteredResults.map(x => x.name)).toEqual(['Anna', 'Anna-Karin']);
                });
            });

            describe('and filter matches property in different casing', () => {
                it('matching objects are returned', () => {
                    const filteredResults = filterPipe.transform([{ name: 'Anna' }, { name: 'Anna-Karin' }, { name: 'Bob' }], 'anna');

                    expect(filteredResults.map(x => x.name)).toEqual(['Anna', 'Anna-Karin']);
                });
            });
        });

        describe('When object has two properties', () => {
            describe('and filter matches one property', () => {
                it('matching objects are returned', () => {
                    const filteredResults = filterPipe.transform([{ name: 'Anna', lastName: 'Johansson' }, { name: 'Anna-Karin', lastName: 'Svensson' }, { name: 'Bob', lastName: 'Saget' }], 'son');

                    expect(filteredResults.map(x => x.name)).toEqual(['Anna', 'Anna-Karin']);
                });
            });

            describe('and filter matches two properties', () => {
                it('matching objects are returned', () => {
                    const filteredResults = filterPipe.transform([{ name: 'Anna', lastName: 'Johansson' }, { name: 'Anna-Karin', lastName: 'Svensson' }, { name: 'Johan', lastName: 'Larsson' }], 'Johan');

                    expect(filteredResults.map(x => x.name)).toEqual(['Anna', 'Johan']);
                });
            });
        });


        describe('When object has properties of non-string types', () => {
            describe('and filter matches one property', () => {
                it('matching objects are returned', () => {
                    const filteredResults = filterPipe.transform([
                        { name: 'Anna', lastName: 'Johansson', isSingle: false, age: 45, adress: { street: 'Lövgränd 1' } },
                        { name: 'Anna-Karin', lastName: 'Svensson', isSingle: true, age: 25, adress: { street: 'Lövgränd 2' } },
                        { name: 'Bob', lastName: 'Saget', isSingle: false, age: 52, adress: { street: 'Lövgränd 3' } }], 'son');

                    expect(filteredResults.map(x => x.name)).toEqual(['Anna', 'Anna-Karin']);
                });
            });
        });

    });

    describe('When filtered properties are explicitly selected', () => {
        it('filter is only applied to the supplied properties', () => {
            const filteredResults = filterPipe.transform(
                [{ name: 'Anna', lastName: 'Johansson', address: 'Genvägen 12' },
                { name: 'Anna-Karin', lastName: 'Svensson', address: 'Johans väg 12' },
                { name: 'Johan', lastName: 'Larsson', address: 'Hemvägen 12' }], 'Johan', ['name', 'address']);

            expect(filteredResults.map(x => x.name)).toEqual(['Anna-Karin', 'Johan']);
        });


        describe('and an object has an undefined property value', () => {
            describe('and the filter does not match any other property', () => {
                it('It is not matched by the filter', () => {
                    const filteredResults = filterPipe.transform([
                        { name: undefined, lastName: undefined }], 'Value', ['name', 'lastName']);

                    expect(filteredResults).toEqual([]);
                });
            });
            describe('and the filter matches a defined property', () => {
                it('the object is returned', () => {
                    const filteredResults = filterPipe.transform([
                        { name: undefined, lastName: 'Larsson', isSingle: false, age: 45, adress: { street: 'Lövgränd 1' } }], 'Larsson', ['name', 'lastName']);

                    expect(filteredResults.map(x => x.lastName)).toEqual(['Larsson']);
                });
            });
        });
    });
});
