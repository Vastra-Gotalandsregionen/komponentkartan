"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var loader_component_1 = require("../../component-package/controls/loader/loader.component");
describe('[LoaderComponent]', function () {
    var loader;
    var changeDetector;
    beforeAll(function () {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        jasmine.clock().mockDate(new Date());
    });
    afterAll(function () {
        jasmine.clock().uninstall();
    });
    beforeEach(function () {
        changeDetector = {};
        loader = new loader_component_1.LoaderComponent(changeDetector);
    });
    describe('When initialized', function () {
        it('loader is not active', function () {
            expect(loader.active).toBe(false);
        });
        it('loader is not visible', function () {
            expect(loader.visible).toBe(false);
        });
        it('loader is not spinning', function () {
            expect(loader.spinning).toBe(false);
        });
    });
    describe('When activated', function () {
        beforeEach(function () {
            loader.active = true;
        });
        it('loader is visible', function () {
            expect(loader.visible).toBe(true);
        });
        it('loader is spinning', function () {
            expect(loader.spinning).toBe(true);
        });
        describe('and deactivated after 0.5s', function () {
            beforeEach(function () {
                jasmine.clock().tick(500);
                loader.active = false;
            });
            it('loader is still visible', function () {
                expect(loader.visible).toBe(true);
            });
            it('loader is still spinning', function () {
                expect(loader.spinning).toBe(true);
            });
            describe('after an additional 0.5s', function () {
                beforeEach(function () {
                    jasmine.clock().tick(500);
                });
                it('the loader is hidden', function () {
                    expect(loader.visible).toBe(false);
                });
                it('loader is still spinning', function () {
                    expect(loader.spinning).toBe(true);
                });
                describe('after an additional 0.4s', function () {
                    beforeEach(function () {
                        jasmine.clock().tick(400);
                    });
                    it('loader is not spinning', function () {
                        expect(loader.spinning).toBe(false);
                    });
                });
            });
            describe('and reactivated after 100ms', function () {
                beforeEach(function () {
                    jasmine.clock().tick(100);
                    loader.active = true;
                });
                it('the loader is visible', function () {
                    expect(loader.visible).toBe(true);
                });
                it('loader is spinning', function () {
                    expect(loader.spinning).toBe(true);
                });
                describe('after 1s', function () {
                    beforeEach(function () {
                        jasmine.clock().tick(1000);
                    });
                    it('loader is still spinning', function () {
                        expect(loader.spinning).toBe(true);
                    });
                    describe('and deactivated after 1s', function () {
                        beforeEach(function () {
                            jasmine.clock().tick(1000);
                            loader.active = false;
                        });
                        it('the loader is hidden', function () {
                            expect(loader.visible).toBe(false);
                        });
                        it('loader is still spinning', function () {
                            expect(loader.spinning).toBe(true);
                        });
                        describe('after an additional 0.4s', function () {
                            beforeEach(function () {
                                jasmine.clock().tick(400);
                            });
                            it('loader is not spinning', function () {
                                expect(loader.spinning).toBe(false);
                            });
                        });
                    });
                });
            });
        });
        describe('and deactivated after 1s', function () {
            beforeEach(function () {
                jasmine.clock().tick(1000);
                loader.active = false;
            });
            it('the loader is hidden', function () {
                expect(loader.visible).toBe(false);
            });
            it('loader is still spinning', function () {
                expect(loader.spinning).toBe(true);
            });
            describe('after an additional 0.4s', function () {
                beforeEach(function () {
                    jasmine.clock().tick(400);
                });
                it('loader is not spinning', function () {
                    expect(loader.spinning).toBe(false);
                });
            });
        });
    });
});
//# sourceMappingURL=loaderComponent.spec.js.map