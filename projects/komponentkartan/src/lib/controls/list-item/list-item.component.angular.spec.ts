import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

import { ListItemComponent } from './list-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ListItemHeaderComponent } from './list-item-header.component';
import { ListItemContentComponent } from './list-item-content.component';
import { ListColumnComponent } from '../list/list-column.component';
import { RowNotification } from '../../models/rowNotification.model';
import { NotificationType } from '../../models/notificationType.model';
import { ListService } from '../list/list.service';
import { IconComponent } from '../icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconModule } from '../icon/icon.module';

class ListServiceMock {
  requestExpandListItem(listItem: ListItemComponent) {
    listItem.setExpanded(true);
  }
}

@Component({
  selector: 'vgr-test',
  template: `
  <vgr-list-item [expanded]="expanded" [preventCollapse]="preventCollapse" [notification]="notification">
    <vgr-list-item-header>
      <vgr-list-column width="5">Förnamn</vgr-list-column>
      <vgr-list-column width="5">Efternamn</vgr-list-column>
      <vgr-list-column width="5">Yrke</vgr-list-column>
      <vgr-list-column width="5" align="right">inkomst</vgr-list-column>
    </vgr-list-item-header>
    <vgr-list-item-content>
      Dummy-content
    </vgr-list-item-content>
  </vgr-list-item>`
})
class TestListItemComponent {
  expanded = false;
  preventCollapse = false;
  notification: RowNotification;
}

describe('[ListItemComponent - Angular]', () => {
  let fixture: ComponentFixture<TestListItemComponent>;
  let testComponent: TestListItemComponent;
  let component: ListItemComponent;
  let rootElement: DebugElement;
  let headerWrapperElement: DebugElement;
  let contentElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FontAwesomeModule, IconModule],
      declarations: [
        ListItemComponent,
        TestListItemComponent,
        ListItemContentComponent,
        ListItemHeaderComponent,
        ListColumnComponent,
        IconComponent
      ],
      providers: [
        { provide: ListService, useClass: ListServiceMock }
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestListItemComponent);
      testComponent = fixture.componentInstance;
      fixture.detectChanges();

      rootElement = fixture.debugElement.query(By.css('vgr-list-item'));
      component = rootElement.componentInstance;

      headerWrapperElement = rootElement.query(By.css('.list-item__header_wrapper'));
      contentElement = rootElement.query(By.css('vgr-list-item-content'));
      done();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When list item is collapsed', () => {
    let spy: jasmine.Spy;
    beforeEach(() => {
      component.isExpanded = false;
    });
    describe('and header is clicked', () => {
      beforeEach(() => {
        spy = spyOn(component.expandedChanged, 'emit');
        headerWrapperElement.triggerEventHandler('click', {});
        fixture.detectChanges();
      });
      it('an expandedChanged is emitted', () => {
        expect(spy).toHaveBeenCalled();
      });
      it('it is expanded', () => {
        expect(component.isExpanded).toBe(true);
      });
    });
  });
  describe('When list item is expanded', () => {
    let spy: jasmine.Spy;
    beforeEach(() => {
      component.isExpanded = true;
    });
    describe('and header is clicked', () => {
      beforeEach(() => {
        spy = spyOn(component.expandedChanged, 'emit');
        headerWrapperElement.triggerEventHandler('click', {});
        fixture.detectChanges();
      });
      it('an expandedChanged is emitted', () => {
        expect(spy).toHaveBeenCalled();
      });
      it('it is collapsed', () => {
        expect(component.isExpanded).toBe(false);
      });
    });
    describe('and preventCollapse is set', () => {
      let spyPrevented: jasmine.Spy;
      beforeEach(() => {
        testComponent.preventCollapse = true;
        fixture.detectChanges();
      });
      describe('and header is clicked', () => {
        beforeEach(() => {
          spy = spyOn(component.expandedChanged, 'emit');
          spyPrevented = spyOn(component.collapsePrevented, 'emit');
          headerWrapperElement.triggerEventHandler('click', {});
          fixture.detectChanges();
        });
        it('expandedChanged is not emitted', () => {
          expect(spy).not.toHaveBeenCalled();
        });
        it('a collapsePrevented is emitted', () => {
          expect(spyPrevented).toHaveBeenCalled();
        });
        it('it is still expanded', () => {
          expect(component.isExpanded).toBe(true);
        });
      });
    });
  });

  describe('when Home is pressed on header', () => {
    it('setFocusOnFirstRow is emitted', () => {
      const spy = spyOn(component.setFocusOnFirstRow, 'emit');
      headerWrapperElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'Home' }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('when End is pressed on header', () => {
    it('setFocusOnLastRow is emitted', () => {
      const spy = spyOn(component.setFocusOnLastRow, 'emit');
      headerWrapperElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'End' }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('When ArrowDown is pressed on header', () => {
    it('setFocusOnNextRow is emitted', () => {
      const spy = spyOn(component.setFocusOnNextRow, 'emit');
      headerWrapperElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('When ArrowUp is pressed on header', () => {
    it('setFocusOnPreviousRow is emitted', () => {
      const spy = spyOn(component.setFocusOnPreviousRow, 'emit');
      headerWrapperElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('when Ctrl + PageDown is pressed on header', () => {
    it('setFocusOnNextRow is emitted', () => {
      const spy = spyOn(component.setFocusOnNextRow, 'emit');
      headerWrapperElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'PageDown', ctrlKey: true }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('when Ctrl + PageUp is pressed on header', () => {
    it('setFocusOnPreviousRow is emitted', () => {
      const spy = spyOn(component.setFocusOnPreviousRow, 'emit');
      headerWrapperElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'PageUp', ctrlKey: true }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });

  // Bort komenterad vid flytt till Angular 8
  xdescribe('when Ctrl + PageDown is pressed in content', () => {
    it('setFocusOnNextRowContent is emitted', () => {
      const spy = spyOn(component.setFocusOnNextRowContent, 'emit');
      contentElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'PageDown', ctrlKey: true }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  // Bort komenterad vid flytt till Angular 8
  xdescribe('when Ctrl + PageUp is pressed in content', () => {
    it('setFocusOnPreviousRowContent is emitted', () => {
      const spy = spyOn(component.setFocusOnPreviousRowContent, 'emit');
      contentElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'PageUp', ctrlKey: true }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('When a permanent notification is set', () => {
    beforeEach(() => {
      testComponent.notification = {
        message: 'A permanent note',
        icon: {
          name: 'check-circle',
          color: 'success'
        },
        type: NotificationType.Permanent
      } as RowNotification;
      fixture.detectChanges();
    });
    it('the permanent notification is shown', () => {
      const messageElement = rootElement.query(By.css('.list-item__notification__message')).nativeElement;
      expect(messageElement.innerText).toMatch('A permanent note');
    });
    describe('and a temporary notification ShowOnCollapse is set', () => {
      beforeEach(() => {
        testComponent.notification = {
          message: 'A temporary note',
          icon: {
            name: 'check-circle',
            color: 'success'
          },
          type: NotificationType.ShowOnCollapse
        } as RowNotification;
      });
      it('the temporary notification is shown', () => {
        fixture.detectChanges();
        const messageElement = rootElement.query(By.css('.list-item__notification__message')).nativeElement;
        expect(messageElement.innerText).toMatch('A temporary note');
      });
      describe('and after the temporary notification is removed', () => {
        let spy: jasmine.Spy;
        beforeEach(fakeAsync(() => {
          spy = spyOn(component.notificationChanged, 'emit');
          fixture.detectChanges();
          tick(component.showNotificationDurationMs); // timer to show note in expanded state
          tick(component.showNotificationDurationMs); // new timer to show note in collapsed state
          fixture.detectChanges();
          tick(); // act on expandedChanged subscription to hide notifications
        }));
        it('the permanent notification is shown again', () => {
          fixture.detectChanges();
          const messageElement = rootElement.query(By.css('.list-item__notification__message')).nativeElement;
          expect(messageElement.innerText).toMatch('A permanent note');
        });
        it('a notificationChanged is emitted', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });
    describe('and a temporary notification ShowOnCollapse is set with remove(permanent)WhenDone', () => {
      beforeEach(fakeAsync(() => {
        testComponent.notification = {
          message: 'A temporary note',
          type: NotificationType.ShowOnCollapse,
          icon: {
            name: 'check-circle',
            color: 'success'
          },
          removeWhenDone: true
        } as RowNotification;
      }));
      it('the temporary notification is shown', () => {
        fixture.detectChanges();
        const messageElement = rootElement.query(By.css('.list-item__notification__message')).nativeElement;
        expect(messageElement.innerText).toMatch('A temporary note');
      });
      describe('and after the temporary notification is removed', () => {
        let spy: jasmine.Spy;
        beforeEach(fakeAsync(() => {
          spy = spyOn(component.notificationChanged, 'emit');
          fixture.detectChanges();
          tick(component.showNotificationDurationMs); // timer to show note in expanded state
          tick(component.showNotificationDurationMs); // new timer to show note in collapsed state
          fixture.detectChanges();
          tick(); // act on expandedChanged subscription to hide notifications
        }));
        it('the permanent notification removed', () => {
          fixture.detectChanges();
          const messageElement = rootElement.query(By.css('.list-item__notification__message'));
          console.log(messageElement);
          expect(messageElement).toBeFalsy();
        });
        it('a notificationChanged is emitted', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });
    describe('When a temporary notification ShowOnRemove is set', () => {
      beforeEach(() => {
        testComponent.notification = {
          message: 'A temporary note',
          icon: {
            name: 'check-circle',
            color: 'success'
          },
          type: NotificationType.ShowOnRemove
        } as RowNotification;
      });
      it('the temporary notification is shown', () => {
        fixture.detectChanges();
        const textElement = rootElement.query(By.css('.list-item__notification__message')).nativeElement;
        expect(textElement.innerText).toMatch('A temporary note');
      });
      describe('after the temporary notification is removed', () => {
        let spy: jasmine.Spy;
        beforeEach(fakeAsync(() => {
          spy = spyOn(component.deleted, 'emit');
          fixture.detectChanges();
          tick(component.showNotificationDurationMs); // timer to show note in expanded state
          tick(component.showNotificationDurationMs); // new timer to show note in collapsed state
          fixture.detectChanges();
          tick(); // act expandedChanged subscription to hide notifications
        }));
        it('the item is hidden', () => {
          fixture.detectChanges();
          const itemElement = rootElement.query(By.css('.list-item'));
          expect(itemElement).toBeFalsy();
        });
        it('deleted is emitted', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });
  });

  describe('ShowOnCollapse', () => {
    beforeEach(() => {
      jasmine.clock().uninstall();
      jasmine.clock().install();
      component.notification = { message: 'A temporary note', type: NotificationType.ShowOnCollapse } as RowNotification;
      component.handleNotifications(component.notification);
    });
    afterEach(() => {
      jasmine.clock().uninstall();
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
      jasmine.clock().uninstall();
      jasmine.clock().install();
      component.notification = { message: 'A temporary note', type: NotificationType.ShowOnRemove } as RowNotification;
      component.handleNotifications(component.notification);
    });
    afterEach(() => {
      jasmine.clock().uninstall();
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
  });
});
