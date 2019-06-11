import { ListItemComponent } from './list-item.component';
import { ListService } from '../list/list.service';
import { NotificationType } from '../../models/notificationType.model';
import { RowNotification } from '../../models/rowNotification.model';

class ListServiceMock {
  requestExpandListItem(listItem: ListItemComponent) {
    listItem.setExpanded(true);
  }
}

describe('[ListItemComponent]', () => {
  let component: ListItemComponent;

  beforeEach(() => {
    component = new ListItemComponent(new ListServiceMock() as ListService, null, null);
  });

  describe('Instatiate', () => {
    it('expanded is correct', () => {
      expect(component.expanded).toBe(false);
    });
    it('preventCollapse is correct', () => {
      expect(component.preventCollapse).toBe(false);
    });
    it('notification is correct', () => {
      expect(component.notification).toBe(undefined);
    });
    it('animationSpeed is correct', () => {
      expect(component.animationSpeed).toBe(400);
    });
    it('isExpanded is correct', () => {
      expect(component.isExpanded).toBe(false);
    });
    it('isDeleted is correct', () => {
      expect(component.isDeleted).toBe(false);
    });
    it('notInteractable is correct', () => {
      expect(component.notInteractable).toBe(false);
    });
    it('overflow is correct', () => {
      expect(component.overflow).toBe(false);
    });
    it('temporaryNotification is correct', () => {
      expect(component.temporaryNotification).toBe(undefined);
    });
    it('permanentNotification is correct', () => {
      expect(component.permanentNotification).toBe(undefined);
    });
  });

  describe('ToggleExpanded', () => {
    it('and expandedChanged is emitted', () => {
      const spy = spyOn(component.expandedChanged, 'emit');
      component.toggleExpanded();
      expect(spy).toHaveBeenCalled();
    });
    describe('and expanded is false', () => {
      beforeEach(() => {
        component.isExpanded = false;
      });
      it('expanded is set to true', () => {
        component.toggleExpanded();
        expect(component.isExpanded).toBe(true);
      });
    });
    describe('and expanded is true', () => {
      beforeEach(() => {
        component.isExpanded = true;
      });
      it('expanded is set to false', () => {
        component.toggleExpanded();
        expect(component.isExpanded).toBe(false);
      });
      describe('and preventCollapse is true', () => {
        beforeEach(() => {
          component.preventCollapse = true;
        });
        it('collapsePrevented is emitted', () => {
          const spy = spyOn(component.collapsePrevented, 'emit');
          component.toggleExpanded();
          expect(spy).toHaveBeenCalled();
        });
        it('expanded is unchanged', () => {
          component.toggleExpanded();
          expect(component.isExpanded).toBe(true);
        });
      });
    });
  });

  describe('Notification', () => {
    beforeAll(() => {
      jasmine.clock().uninstall();
      jasmine.clock().install();
    });
    afterAll(() => {
      jasmine.clock().uninstall();
    });
    describe('is permanent', () => {
      beforeEach(() => {
        component.notification = { message: 'A permanent note', type: NotificationType.Permanent } as RowNotification;
        component.handleNotifications(component.notification);
      });
      it('permanentNotification is set', () => {
        expect(component.permanentNotification).toBe(component.notification);
      });
    });
  });
});
