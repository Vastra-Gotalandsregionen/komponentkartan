import { ElementRef, EventEmitter } from '@angular/core';

import { PageComponent } from './page.component';
import { PageHeaderComponent } from '../page-header/page-header.component';

describe('[PageComponent]', () => {
  let component: PageComponent;
  beforeEach(() => {
    component = new PageComponent();
  });
  afterEach(() => {
    component.ngOnDestroy();
  });

  describe('Instatiate', () => {
    it('pageHeaderHeight is correct', () => {
      expect(component.pageHeaderHeight).toBe(0);
    });
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      component.bodyContainer = {
        nativeElement: {
          style: {}
        }
      };
    });
    describe('When page header exists', () => {
      beforeEach(() => {
        component.pageHeader = {
          heightChanged: new EventEmitter<number>()
        } as PageHeaderComponent;
      });
      describe('and page header height changes', () => {
        it('body container is offset', () => {
          component.ngOnInit();
          component.pageHeader.heightChanged.emit(100);
          expect(component.bodyContainer.nativeElement.style.top).toBe('100px');
        });
      });
    });
  });

  describe('ngAfterViewChecked', () => {
    beforeEach(() => {
      component.bodyContainer = {
        nativeElement: {
          style: {}
        }
      };
    });
    describe('When page header exists', () => {
      beforeEach(() => {
        component.pageHeader = { height: 100 } as PageHeaderComponent;
      });
      it('body container is offset', () => {
        component.ngAfterViewChecked();
        expect(component.bodyContainer.nativeElement.style.top).toBe('100px');
      });
    });
  });

});