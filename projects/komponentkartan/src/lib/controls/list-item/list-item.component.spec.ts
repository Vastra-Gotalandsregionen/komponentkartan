import { ListItemComponent } from './list-item.component';
import { ListService } from '../list/list.service';
import { NotificationType } from '../../models/notificationType.model';
import { RowNotification } from '../../models/rowNotification.model';
import { IconComponent } from '../icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

class ListServiceMock {
  requestExpandListItem(listItem: ListItemComponent) {
    listItem.setExpanded(true);
  }
}

describe('[ListItemComponent]', () => {
  let component: ListItemComponent;
<<<<<<< HEAD
  let fixture: ComponentFixture<TestListItemComponent>;
  let rootElement: DebugElement;
  let listElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        FontAwesomeModule
      ],
      declarations: [
        ListItemComponent,
        TestListItemComponent,
        ListItemContentComponent,
        ListItemHeaderComponent,
        ListColumnComponent,
        IconComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestListItemComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(ListItemComponent)).componentInstance;
    rootElement = fixture.debugElement;
    listElement = rootElement.query(By.css('.list-item'));
  }));

  describe('When initialized as expanded', () => {
    beforeEach(() => {
      component.expanded = true;
      fixture.detectChanges();
    });
=======
>>>>>>> 7d4895ccb45114296b5038c0c7e145cf9733c3fd

  beforeEach(() => {
    component = new ListItemComponent(new ListServiceMock() as ListService);
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
<<<<<<< HEAD
  });

  describe('the component is clicked outside of the list-item-header', () => {
    beforeEach(() => {
      spyOn(component, 'toggleExpand');
      rootElement.triggerEventHandler('click', event);
      fixture.detectChanges();
    });
    it('component is not expanded', () => {
      expect(component.expanded).toBeFalsy();
    });
    it('content is not visible', () => {
      expect(component.toggleExpand).toHaveBeenCalledTimes(0);
    });
  });

  describe('When initialized with a Permanent notification', () => {
    let message;
    beforeEach(() => {
      component.notification = { message: 'Information', icon: {name:'check-circle'}, type: NotificationType.Permanent } as RowNotification;
      component.expanded = true;
      // component.ngAfterContentInit();
      component.ngOnChanges({
        notification: new SimpleChange(null, component.notification, true)
=======
    describe('is temporary', () => {
      beforeEach(() => {
        component.isExpanded = true;
      });
      describe('ShowOnCollapse', () => {
        beforeEach(() => {
          component.notification = { message: 'A temporary note', type: NotificationType.ShowOnCollapse } as RowNotification;
          component.handleNotifications(component.notification);
        });
        it('temporaryNotification is set', () => {
          expect(component.temporaryNotification).toBe(component.notification);
        });
        it('item is collapsed', () => {
          jasmine.clock().tick(component.showNotificationDurationMs);
          expect(component.isExpanded).toBe(false);
        });
        it('temporaryNotification is removed', () => {
          jasmine.clock().tick(component.showNotificationDurationMs); // timer to show note in expanded state
          jasmine.clock().tick(component.showNotificationDurationMs); // timer to show note in collapsed state
          expect(component.temporaryNotification).toBeFalsy();
        });
      });
      describe('ShowOnRemove', () => {
        beforeEach(() => {
          component.notification = { message: 'A temporary note', type: NotificationType.ShowOnRemove } as RowNotification;
          component.handleNotifications(component.notification);
        });
        it('temporaryNotification is set', () => {
          expect(component.temporaryNotification).toBe(component.notification);
        });
        it('item is collapsed', () => {
          jasmine.clock().tick(component.showNotificationDurationMs);
          expect(component.isExpanded).toBe(false);
        });
        it('item is removed', () => {
          jasmine.clock().tick(component.showNotificationDurationMs); // timer to show note in expanded state
          jasmine.clock().tick(component.showNotificationDurationMs); // timer to show note in collapsed state
          expect(component.isDeleted).toBe(true);
        });
>>>>>>> 7d4895ccb45114296b5038c0c7e145cf9733c3fd
      });
    });
<<<<<<< HEAD

    it('should show a temporary notificiation and restore permanent notification after delay', fakeAsync(() => {
      component.notification = { message: 'Sparar', icon: {name: 'check-circle', color: 'success'}, type: NotificationType.ShowOnCollapse } as RowNotification;
      component.ngOnChanges({
        notification: new SimpleChange(component.permanentNotification, component.notification, true)
      });
      fixture.detectChanges();
      message = listElement.query(By.css('.list-item__notification')).nativeElement.innerText.trim();

      expect(component.temporaryNotificationVisible).toBe(true);
      expect(component.expanded).toBe(true);
      expect(message).toBe('Sparar');
      expect(component.notInteractable).toBe(false);

      // Closing the content area
      tick(component.showNotificationDurationMs);
      fixture.detectChanges();
      expect(component.expanded).toBe(false);
      expect(component.notInteractable).toBe(true);

      // Waiting for it to be interactable again
      tick(400);
      fixture.detectChanges();
      expect(component.notInteractable).toBe(false);

      // Waiting for the fadeout of the temporary notification
      tick(1100);
      fixture.detectChanges();

      // Waiting until it's removed
      tick(component.showNotificationDurationMs);
      fixture.detectChanges();
      message = listElement.query(By.css('.list-item__notification')).nativeElement.innerText.trim();
      expect(component.temporaryNotificationVisible).toBe(false);
      expect(message).toBe('Information');
    }));

    it('should show a temporary notificiation and remove the permanent notification after delay', fakeAsync(() => {
      component.notification = { message: 'Tar Bort', icon: {name: 'exclamation-circle', color: 'error'}, type: NotificationType.ShowOnCollapse, removeWhenDone: true } as RowNotification;
      component.ngOnChanges({
        notification: new SimpleChange(component.permanentNotification, component.notification, true)
      });
      fixture.detectChanges();
      message = listElement.query(By.css('.list-item__notification')).nativeElement.innerText.trim();

      expect(component.temporaryNotificationVisible).toBe(true);
      expect(component.expanded).toBe(true);
      expect(message).toBe('Tar Bort');
      expect(component.notInteractable).toBe(false);

      // Closing the content area
      tick(component.showNotificationDurationMs);
      fixture.detectChanges();
      expect(component.expanded).toBe(false);
      expect(component.notInteractable).toBe(true);

      // Waiting for it to be interactable again
      tick(400);
      fixture.detectChanges();
      expect(component.notInteractable).toBe(false);

      // Waiting for the fadeout of the temporary notification
      tick(1100);
      fixture.detectChanges();

      // Waiting until it's removed
      tick(component.showNotificationDurationMs);
      fixture.detectChanges();

      expect(component.temporaryNotificationVisible).toBe(false);
      expect(component.permanentNotification).toBe(null);
      expect(component.temporaryNotification).toBe(null);
    }));

    it('should show a temporary notificiation and remove the parent element after delay', fakeAsync(() => {
      component.notification = { message: 'Tar Bort', icon: {name: 'check-circle', color: 'success'}, type: NotificationType.ShowOnRemove } as RowNotification;
      component.ngOnChanges({
        notification: new SimpleChange(component.permanentNotification, component.notification, true)
      });
      fixture.detectChanges();
      message = listElement.query(By.css('.list-item__notification')).nativeElement.innerText.trim();

      expect(component.temporaryNotificationVisible).toBe(true);
      expect(component.expanded).toBe(true);
      expect(message).toBe('Tar Bort');
      expect(component.notInteractable).toBe(false);
      expect(component.isDeleted).toBe(false);

      // Closing the content area
      tick(component.showNotificationDurationMs);
      fixture.detectChanges();
      expect(component.expanded).toBe(false);
      expect(component.notInteractable).toBe(true);

      // Waiting for it to be interactable again
      tick(400);
      fixture.detectChanges();
      expect(component.notInteractable).toBe(false);

      // Waiting for the fadeout of the temporary notification
      tick(1100);
      fixture.detectChanges();

      // Waiting until it's removed
      tick(component.showNotificationDurationMs);
      fixture.detectChanges();

      expect(component.isDeleted).toBe(true);

    }));

=======
>>>>>>> 7d4895ccb45114296b5038c0c7e145cf9733c3fd
  });
});
