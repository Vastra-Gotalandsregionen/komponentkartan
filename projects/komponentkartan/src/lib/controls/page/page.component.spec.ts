
import { PageComponent } from './page.component';
import { PageHeaderHeightService } from '../../services/page-header-height.service';

describe('[PageComponent]', () => {
  const service = new PageHeaderHeightService();
  let component: PageComponent;
  beforeEach(() => {
    component = new PageComponent(service);
    component.bodyContainer = {
      nativeElement: {
        style: {}
      }
    };
  });
  afterEach(() => {
    component.ngOnDestroy();
  });

  describe('Instatiate', () => {
    it('pageHeaderHeight is correct', () => {
      service.setHeight(0);
      component.ngOnInit();
      expect(component.bodyContainer.nativeElement.style.top).toBe('10px');
    });
  });

  describe('ngOnInit', () => {
    describe('When page header exists', () => {
      describe('and page header height changes', () => {
        it('body container is offset', () => {
          service.setHeight(100);
          component.ngOnInit();
          expect(component.bodyContainer.nativeElement.style.top).toBe('110px');
        });
      });
    });
  });
});
