import { TruncatePipe } from "../../component-package/pipes/truncatePipe";

describe("truncatePipe test", () => {

    var truncatePipe = new TruncatePipe();

    describe("When text is undefined",
        () => {

            it("empty text is returned",
                () => {
                    expect(truncatePipe.transform(null)).toBe("");
                });
        });

    describe("When text is 20 characters long", () => {
        var text = "abcdefghijklmnopqrst";
        describe("and limit is 10 characters", () => {
            var result: string;
            beforeEach(() => {
                result = truncatePipe.transform(text, "10");
            });

            it("text should be 10 characters long",
                () => {
                    expect(result.length).toBe(10);
                });

            it("text should be 7 characters and trailing ...", () => {
                expect(result).toBe("abcdefg...");
            })
        });
        describe("and limit is not set",
            () => {

                it("text should not be modified",
                    () => {
                        expect(truncatePipe.transform(text)).toBe(text);
                    });
            });

        describe("and limit is not a number",
            () => {

                it("text should not be modified",
                    () => {
                        expect(truncatePipe.transform(text, "ten")).toBe(text);
                    });

            });

        describe("and limit is greater than text",
            () => {

                it("text should not be modified",
                    () => {
                        expect(truncatePipe.transform(text, (text.length + 1).toString())).toBe(text);
                    });

            });
        describe("and limit is equal to text",
            () => {

                it("text should not be modified",
                    () => {
                        expect(truncatePipe.transform(text, text.length.toString())).toBe(text);
                    });

            });


    });
});