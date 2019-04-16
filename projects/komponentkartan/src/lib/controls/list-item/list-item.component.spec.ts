import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement, Component, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ListItemHeaderComponent } from './list-item-header.component';
import { ListItemContentComponent } from './list-item-content.component';
import { ListColumnComponent } from '../list/list-column.component';
import { NotificationType } from '../../models/notificationType.model';
import { RowNotification } from '../../models/rowNotification.model';
import { IconComponent } from '../icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'vgr-test',
  template: `
  <vgr-list-item>
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
class TestListItemComponent { }


describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<TestListItemComponent>;
  let rootElement: DebugElement;
  let listElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, FontAwesomeModule],
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

    it('the component is collapsed', () => {
      expect(listElement.classes['list-item--expanded']).toBe(true);
    });
  });

  describe('When initialized normally', () => {
    it('the component has the list-item class', () => {
      expect(listElement.classes['list-item']).toBe(true);
    });

    it('the component is collapsed', () => {
      expect(listElement.classes['list-item--expanded']).toBe(false);
    });

    it(' the indent on content is set to true', () => {
      expect(component.listContent.indentContent).toBe(true);
    });
  });

  describe('and the list-item-header is clicked', () => {
    const event: any = { cancelBubble: false };
    let element: DebugElement;

    beforeEach(() => {
      spyOn(component, 'toggleExpand').and.callThrough();
      component.notInteractable = false;
      component.isDeleted = false;

      element = rootElement.query(By.css('.list-item__header_wrapper'));
      element.triggerEventHandler('click', event);

      fixture.detectChanges();
    });
    it('toggleExpand has been called once', () => {
      expect(component.toggleExpand).toHaveBeenCalledTimes(1);
    });
    it('component is expanded', () => {
      expect(listElement.classes['list-item--expanded']).toBe(true);
    });

    /*it('click event is not bubbled', () => {
      expect(event.cancelBubble).toBeTruthy();
    });*/

    describe('and the header is clicked again', () => {
      const event2: any = { cancelBubble: false };

      beforeEach(() => {
        component.notInteractable = false;
        component.isDeleted = false;

        element = rootElement.query(By.css('.list-item__header_wrapper'));
        element.triggerEventHandler('click', event2);

        fixture.detectChanges();

      });

      it('component is not expanded', () => {
        expect(listElement.classes['list-item--expanded']).toBe(false);
      });
      it('toggleExpand has been called once again', () => {
        expect(component.toggleExpand).toHaveBeenCalledTimes(2);
      });
    });
  });

  describe('When the list-item-header is in focus', () => {
    let header: DebugElement;
    let toggleExpandSpy: jasmine.Spy;
    beforeEach(() => {
      header = fixture.debugElement.query(By.directive(ListItemHeaderComponent)); // First element in list-item which is list-item-header;

      spyOn(component.listItemHeader.expandedChanged, 'emit').and.callThrough();
      spyOn(component.listItemHeader.goToFirst, 'emit').and.callThrough();
      spyOn(component.listItemHeader.goToLast, 'emit').and.callThrough();
      spyOn(component.listItemHeader.goUp, 'emit').and.callThrough();
      spyOn(component.listItemHeader.goDown, 'emit').and.callThrough();

      spyOn(component.setFocusOnFirstRow, 'emit');
      spyOn(component.setFocusOnLastRow, 'emit');
      spyOn(component.setFocusOnPreviousRow, 'emit');
      spyOn(component.setFocusOnNextRow, 'emit');
      spyOn(component.setFocusOnPreviousRowContent, 'emit');
      spyOn(component.setFocusOnNextRowContent, 'emit');

      spyOn(component, 'toggleExpand').and.callThrough();
      toggleExpandSpy = spyOn(component.listItemHeader, 'toggleExpand').and.callThrough();
      spyOn(component.listItemHeader, 'setFocus').and.callThrough();

      component.ngAfterContentInit();

      component.listItemHeader.setFocus();
      fixture.detectChanges();
    });

    it('the setFocus has been called', () => {
      expect(component.listItemHeader.setFocus).toHaveBeenCalledTimes(1);
    });

    describe('and the header is pressed with space', () => {
      beforeEach(() => {
        header.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
        fixture.detectChanges();
      });

      it('expandedChanged event has been emitted', () => {
        expect(component.listItemHeader.expandedChanged.emit).toHaveBeenCalledWith(true);
      });

      it('listItemHeaderComponent listItemHeader toggleExpand has been called', () => {
        expect(component.listItemHeader.toggleExpand).toHaveBeenCalled();
      });

      it('listItemHeaderComponent listItemHeader setExpandOrCollapsed has been called', () => {
        expect(component.toggleExpand).toHaveBeenCalled();
      });

      it('component is expanded', () => {
        expect(listElement.classes['list-item--expanded']).toBe(true);
      });

    });
    describe('and the header is pressed with enter', () => {
      beforeEach(() => {
        header.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
        fixture.detectChanges();
      });

      it('expandedChanged event has been emitted', () => {
        expect(component.listItemHeader.expandedChanged.emit).toHaveBeenCalledWith(true);
      });

      it('component is expanded', () => {
        expect(listElement.classes['list-item--expanded']).toBe(true);
      });
    });

    describe('and the header is pressed with Home key', () => {
      beforeEach(() => {
        header.triggerEventHandler('keydown', { keyCode: 36 } as KeyboardEvent);
      });

      it('goToFirst event has been emitted', () => {
        expect(component.listItemHeader.goToFirst.emit).toHaveBeenCalled();
      });

      it('setFocusOnFirstRow event is emitted', () => {
        expect(component.setFocusOnFirstRow.emit).toHaveBeenCalled();
      });
    });

    describe('and the header is pressed with End key', () => {
      beforeEach(() => {
        header.triggerEventHandler('keydown', { keyCode: 35 } as KeyboardEvent);
      });

      it('goToLast event has been emitted', () => {
        expect(component.listItemHeader.goToLast.emit).toHaveBeenCalled();
      });

      it('setFocusOnLastRow event is emitted', () => {
        expect(component.setFocusOnLastRow.emit).toHaveBeenCalled();
      });
    });

    describe('and the header is pressed with Ctrl + PageUp', () => {
      beforeEach(() => {
        header.triggerEventHandler('keydown', { ctrlKey: true, keyCode: 33 } as KeyboardEvent);
      });

      it('goToLast event has been emitted', () => {
        expect(component.listItemHeader.goUp.emit).toHaveBeenCalled();
      });

      it('setFocusOnPreviousRow event is emitted', () => {
        expect(component.setFocusOnPreviousRow.emit).toHaveBeenCalled();
      });
    });

    describe('and the header is pressed with Ctrl + PageDown', () => {
      beforeEach(() => {
        header.triggerEventHandler('keydown', { ctrlKey: true, keyCode: 34 } as KeyboardEvent);
      });

      it('goToLast event has been emitted', () => {
        expect(component.listItemHeader.goDown.emit).toHaveBeenCalled();
      });

      it('setFocusOnNextRow event is emitted', () => {
        expect(component.setFocusOnNextRow.emit).toHaveBeenCalled();
      });
    });

    describe('and the header is pressed with Arrow Up', () => {
      beforeEach(() => {
        header.triggerEventHandler('keydown', { keyCode: 38 } as KeyboardEvent);
      });

      it('goToLast event has been emitted', () => {
        expect(component.listItemHeader.goUp.emit).toHaveBeenCalled();
      });

      it('setFocusOnPreviousRow event is emitted', () => {
        expect(component.setFocusOnPreviousRow.emit).toHaveBeenCalled();
      });
    });

    describe('and the header is pressed with Arrow Down', () => {
      beforeEach(() => {
        header.triggerEventHandler('keydown', { keyCode: 40 } as KeyboardEvent);
      });

      it('goToLast event has been emitted', () => {
        expect(component.listItemHeader.goDown.emit).toHaveBeenCalled();
      });

      it('setFocusOnNextRow event is emitted', () => {
        expect(component.setFocusOnNextRow.emit).toHaveBeenCalled();
      });
    });
  });

  describe('and the list-item-content is in focus', () => {
    let content: DebugElement;

    beforeEach(() => {
      content = fixture.debugElement.query(By.directive(ListItemContentComponent)); // First element in list-item which is list-item-header;

      spyOn(component.listContent.goUp, 'emit').and.callThrough();
      spyOn(component.listContent.goDown, 'emit').and.callThrough();
      spyOn(component.setFocusOnPreviousRowContent, 'emit');
      spyOn(component.setFocusOnNextRowContent, 'emit');
      component.ngAfterContentInit();
    });

    describe('and the content is pressed with Ctrl + PageUp', () => {
      beforeEach(() => {
        content.triggerEventHandler('keydown', { ctrlKey: true, keyCode: 33 } as KeyboardEvent);
      });

      it('go up event is emitted', () => {
        expect(component.listContent.goUp.emit).toHaveBeenCalled();
      });
      it('setFocusOnPreviousRowContent event is emitted', () => {
        expect(component.setFocusOnPreviousRowContent.emit).toHaveBeenCalled();
      });
    });

    describe('and the content is pressed with Ctrl + PageDown', () => {
      beforeEach(() => {
        content.triggerEventHandler('keydown', { ctrlKey: true, keyCode: 34 } as KeyboardEvent);
      });

      it('go up event is emitted', () => {
        expect(component.listContent.goDown.emit).toHaveBeenCalled();
      });
      it('setFocusOnNextRowContent event is emitted', () => {
        expect(component.setFocusOnNextRowContent.emit).toHaveBeenCalled();
      });
    });
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
      component.notification = { message: 'Information', icon: 'vgr-icon-ok-check ', type: NotificationType.Permanent } as RowNotification;
      component.expanded = true;
      // component.ngAfterContentInit();
      component.ngOnChanges({
        notification: new SimpleChange(null, component.notification, true)
      });
      fixture.detectChanges();
    });

    it('notification is displayed', () => {
      expect(component.permanentNotification).toBe(component.notification);
    });
    it('message is "information"', () => {
      message = listElement.query(By.css('.list-item__notification')).nativeElement.innerText.trim();
      expect(message).toBe('Information');
    });

    it('should show a temporary notificiation and restore permanent notification after delay', fakeAsync(() => {
      component.notification = { message: 'Sparar', icon: 'vgr-icon-ok-check-green', type: NotificationType.ShowOnCollapse } as RowNotification;
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
      component.notification = { message: 'Tar Bort', icon: 'vgr-icon-exclamation--red', type: NotificationType.ShowOnCollapse, removeWhenDone: true } as RowNotification;
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
      component.notification = { message: 'Tar Bort', icon: 'vgr-icon-ok-check-green', type: NotificationType.ShowOnRemove } as RowNotification;
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

  });

});
