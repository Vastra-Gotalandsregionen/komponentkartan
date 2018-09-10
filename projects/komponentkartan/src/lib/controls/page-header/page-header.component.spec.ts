import { ElementRef } from '@angular/core';

import { PageHeaderComponent } from './page-header.component';

describe('[PageHeaderComponent]', () => {
  let component: PageHeaderComponent;
  beforeEach(() => {
    component = new PageHeaderComponent();
  });

  describe('Instatiate', () => {
    it('title is correct', () => {
      expect(component.title).toBeFalsy();
    });
    it('height is correct', () => {
      expect(component.height).toBe(0);
    });
  });

  describe('ngAfterViewChecked', () => {
    describe('When position is fixed', () => {
      beforeEach(() => {
        component.pageHeader = {
          nativeElement: {
            offsetTop: 100,
            offsetHeight: 200
          } as HTMLElement
        } as ElementRef;
      });
      it('height is set to offset', () => {
        component.ngAfterViewChecked();
        expect(component.height).toBe(200);
      });
    });
    describe('When position is not fixed', () => {
      beforeEach(() => {
        component.pageHeader = {
          nativeElement: {
            offsetTop: 0,
            offsetHeight: 200
          } as HTMLElement
        } as ElementRef;
      });
      it('height is set to zero', () => {
        component.ngAfterViewChecked();
        expect(component.height).toBe(0);
      });
    });
  });

  describe('setHeight', () => {
    describe('When position is fixed', () => {
      beforeEach(() => {
        component.pageHeader = {
          nativeElement: {
            offsetTop: 100,
            offsetHeight: 200
          } as HTMLElement
        } as ElementRef;
      });
      it('height is set to offset', () => {
        component.setHeight();
        expect(component.height).toBe(200);
      });
    });
    describe('When position is not fixed', () => {
      beforeEach(() => {
        component.pageHeader = {
          nativeElement: {
            offsetTop: 0,
            offsetHeight: 200
          } as HTMLElement
        } as ElementRef;
      });
      it('height is set to zero', () => {
        component.setHeight();
        expect(component.height).toBe(0);
      });
    });
    describe('When height has changed', () => {
      let spy: jasmine.Spy;
      beforeEach(() => {
        component.pageHeader = {
          nativeElement: {
            offsetTop: 100,
            offsetHeight: 200
          } as HTMLElement
        } as ElementRef;

        component.setHeight();

        component.pageHeader = {
          nativeElement: {
            offsetTop: 100,
            offsetHeight: 300
          } as HTMLElement
        } as ElementRef;

        spy = spyOn(component.heightChanged, 'emit');
      });
      describe('and emit is true', () => {
        it('new height is emitted', () => {
          component.setHeight(true);
          expect(spy).toHaveBeenCalledWith(300);
        });
      });
      describe('and emit is false', () => {
        it('new height is not emitted', () => {
          component.setHeight(false);
          expect(spy).not.toHaveBeenCalled();
        });
      });
    });
  });

});