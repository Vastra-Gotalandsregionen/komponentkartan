import { ListComponent } from './list.component';
import { ListService } from './list.service';
import { Subject } from 'rxjs';

class ListServiceMock {
  expandListItemRequested = new Subject<any>().asObservable();
}

describe('[ListComponent]', () => {
  let component: ListComponent;

  beforeEach(() => {
    component = new ListComponent(new ListServiceMock() as ListService);
  });

  describe('Instatiate', () => {
    it('allowMultipleExpandedItems is correct', () => {
      expect(component.allowMultipleExpandedItems).toBe(false);
    });
    it('notification is correct', () => {
      expect(component.notification).toBe(undefined);
    });
    it('pages is correct', () => {
      expect(component.pages).toBe(1);
    });
    it('activePage is correct', () => {
      expect(component.activePage).toBe(1);
    });
    it('flexibleHeader is correct', () => {
      expect(component.flexibleHeader).toBe(false);
    });
  });
});
