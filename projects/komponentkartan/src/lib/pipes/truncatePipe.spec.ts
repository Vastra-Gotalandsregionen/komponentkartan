import { TruncatePipe } from './truncatePipe';

describe('truncatePipe test', () => {

    const truncatePipe = new TruncatePipe();

    describe('When text is undefined',
        () => {

            it('empty text is returned',
                () => {
                    expect(truncatePipe.transform(null)).toBe('');
                });
        });

    describe('When text is 20 characters long', () => {
        const text = 'abcdefghijklmnopqrst';
        describe('and limit is 10 characters', () => {
            let result: string;
            beforeEach(() => {
                result = truncatePipe.transform(text, 10);
            });

            it('text should be 10 characters long',
                () => {
                    expect(result.length).toBe(10);
                });

            it('text should be 7 characters and trailing ...', () => {
                expect(result).toBe('abcdefg...');
            })
        });
        describe('and limit is not set',
            () => {

                it('text should not be modified',
                    () => {
                        expect(truncatePipe.transform(text)).toBe(text);
                    });
            });

        describe('and limit is not a number',
            () => {

                it('text should not be modified',
                    () => {
                        expect(truncatePipe.transform(text, 10)).toBe(text);
                    });

            });

        describe('and limit is greater than text',
            () => {

                it('text should not be modified',
                    () => {
                        expect(truncatePipe.transform(text, (text.length + 1))).toBe(text);
                    });

            });
        describe('and limit is equal to text',
            () => {

                it('text should not be modified',
                    () => {
                        expect(truncatePipe.transform(text, text.length)).toBe(text);
                    });

            });


    });
});
