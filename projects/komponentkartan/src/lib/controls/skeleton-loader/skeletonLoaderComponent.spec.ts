import { ChangeDetectorRef } from '@angular/core';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader.component';

describe('[SkeletonLoaderComponent]', () => {
  let loader: SkeletonLoaderComponent;
  let changeDetector: ChangeDetectorRef;
  beforeAll(() => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
    jasmine.clock().mockDate(new Date());
  });
  afterAll(() => {
    jasmine.clock().uninstall();
  });
  beforeEach(() => {
    changeDetector = {} as ChangeDetectorRef;
    loader = new SkeletonLoaderComponent(changeDetector);

  });
  describe('When initialized', () => {
    it('loader is not active', () => {
      expect(loader.active).toBe(false);
    });
    it('loader is not visible', () => {
      expect(loader.visible).toBe(false);
    });
  });
  describe('When activated', () => {
    beforeEach(() => {
      loader.active = true;
    });
    it('loader is visible', () => {
      expect(loader.visible).toBe(true);
    });
    describe('and deactivated after 0.5s', () => {
      beforeEach(() => {
        jasmine.clock().tick(500);
        loader.active = false;
      });
      it('loader is still visible', () => {
        expect(loader.visible).toBe(true);
      });
      describe('after an additional 0.5s', () => {
        beforeEach(() => {
          jasmine.clock().tick(500);
        });
        it('the loader is hidden', () => {
          expect(loader.visible).toBe(false);
        });
      });
      describe('and reactivated after 100ms', () => {
        beforeEach(() => {
          jasmine.clock().tick(100);
          loader.active = true;
        });
        it('the loader is visible', () => {
          expect(loader.visible).toBe(true);
        });
        describe('after 1s', () => {
          beforeEach(() => {
            jasmine.clock().tick(1000);
          });
          describe('and deactivated after 1s', () => {
            beforeEach(() => {
              jasmine.clock().tick(1000);
              loader.active = false;
            });
            it('the loader is hidden', () => {
              expect(loader.visible).toBe(false);
            });
          });
        });
      });
    });
    describe('and deactivated after 1s', () => {
      beforeEach(() => {
        jasmine.clock().tick(1000);
        loader.active = false;
      });
      it('the loader is hidden', () => {
        expect(loader.visible).toBe(false);
      });
    });

  });
});
