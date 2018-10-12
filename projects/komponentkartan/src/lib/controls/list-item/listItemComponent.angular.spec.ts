
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement, Renderer, ElementRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowNotification } from '../../models/rowNotification.model';
import { NotificationType } from '../../models/notificationType.model';

import {
  ListItemComponent, ListItemHeaderComponent, ListColumnComponent,
  ListItemContentComponent
} from '../../index';

@Component({
  selector: 'vgr-test',
  template: `
          <vgr-list-item>
            <vgr-list-item-header>
            </vgr-list-item-header>
            <vgr-list-item-content>
              <span> Mer information</span>
            </vgr-list-item-content>
          </vgr-list-item>
          `
})
class TestListItemComponent { }



describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let testListItemComponentFixture: ComponentFixture<TestListItemComponent>;
  let listItemComponentFixture: ComponentFixture<ListItemComponent>;
  let rootElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      declarations: [TestListItemComponent,
        ListItemComponent,
        ListItemHeaderComponent,
        ListItemContentComponent
      ],
      imports: [CommonModule, BrowserAnimationsModule, BrowserDynamicTestingModule],
      providers: [
        { provide: ElementRef },
        { provide: Renderer }]
    });

    TestBed.compileComponents().then(() => {
      testListItemComponentFixture = TestBed.createComponent(TestListItemComponent);
      listItemComponentFixture = TestBed.createComponent(ListItemComponent);
      listItemComponentFixture.componentInstance.listItemHeader = <ListItemHeaderComponent>testListItemComponentFixture.debugElement.query(By.directive(ListItemHeaderComponent)).componentInstance; // First element in list-item which is list-item-header;
      listItemComponentFixture.componentInstance.listContent = <ListItemContentComponent>testListItemComponentFixture.debugElement.query(By.directive(ListItemContentComponent)).componentInstance;  // Second element in list-item which is list-item-content;
      component = listItemComponentFixture.componentInstance;
      rootElement = listItemComponentFixture.debugElement;
      component.ngAfterContentInit();

      testListItemComponentFixture.detectChanges();
      listItemComponentFixture.detectChanges();
      done();
    });
  });

  describe('When initialized', () => {
    let element: DebugElement;

    it('the component has the list-item class', () => {

      expect(rootElement.classes['list-item']).toBe(true);
    });

    it('the component is collapsed', () => {
      expect(rootElement.classes['list-item--collapsed']).toBe(true);
    });

    it('the component is not expanded', () => {
      expect(rootElement.classes['list-item--expanded']).toBe(false);
    });

    it(' the indent on content is set to true', () => {
      expect(listItemComponentFixture.componentInstance.listContent.indentContent).toBe(true);
    });

    describe('and the list-item-header is clicked', () => {
      const event: any = { cancelBubble: false };

      beforeEach(() => {
        spyOn(component, 'toggleExpand').and.callThrough();
        component.notInteractable = false;
        component.isDeleted = false;

        element = rootElement.query(By.css('.list-item__header_wrapper'));
        element.triggerEventHandler('click', event);

        listItemComponentFixture.detectChanges();
      });

      it('should create', () => {
        expect(component).toBeTruthy();
      });
      it('toggleExpand has been called once', () => {
        expect(component.toggleExpand).toHaveBeenCalledTimes(1);
      });
      it('the component is not collapsed', () => {
        expect(rootElement.classes['list-item--collapsed']).toBe(false);
      });
      it('component is expanded', () => {
        expect(rootElement.classes['list-item--expanded']).toBe(true);
      });



      it('click event is not bubbled', () => {
        expect(event.cancelBubble).toBeTruthy();
      });

      describe('and the header is clicked again', () => {
        const event2: any = { cancelBubble: false };

        beforeAll(() => {
          jasmine.clock().uninstall();
          jasmine.clock().install();

        });
        afterAll(() => {
          jasmine.clock().uninstall();
        });

        beforeEach(() => {
          component.notInteractable = false;
          component.isDeleted = false;

          element = rootElement.query(By.css('.list-item__header_wrapper'));
          element.triggerEventHandler('click', event2);

          jasmine.clock().tick(5001);
          listItemComponentFixture.detectChanges();

        });
        it('the component is collapsed', () => {
          console.log(component.expanded);
          expect(rootElement.classes['list-item--collapsed']).toBe(true);
        });
        it('component is not expanded', () => {
          expect(rootElement.classes['list-item--expanded']).toBe(false);
        });
        it('toggleExpand has been called once again', () => {
          expect(component.toggleExpand).toHaveBeenCalledTimes(2);
        });
      });
    });

  });

  describe('When the list-item-header is in focus', () => {
    let header: DebugElement;
    let toggleExpandSpy: jasmine.Spy;
    beforeEach(() => {
      header = testListItemComponentFixture.debugElement.query(By.directive(ListItemHeaderComponent)); // First element in list-item which is list-item-header;

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

      spyOn(component, 'setExpandOrCollapsed').and.callThrough();
      toggleExpandSpy = spyOn(listItemComponentFixture.componentInstance.listItemHeader, 'toggleExpand').and.callThrough();
      spyOn(listItemComponentFixture.componentInstance.listItemHeader, 'setFocus').and.callThrough();

      component.ngAfterContentInit();

      listItemComponentFixture.componentInstance.listItemHeader.setFocus();
      listItemComponentFixture.detectChanges();
    });

    it('the setFocus has been called', () => {
      expect(listItemComponentFixture.componentInstance.listItemHeader.setFocus).toHaveBeenCalledTimes(1);
    });

    describe('and the header is pressed with space', () => {
      beforeEach(() => {
        header.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
        listItemComponentFixture.detectChanges();
      });

      it('expandedChanged event has been emitted', () => {
        expect(component.listItemHeader.expandedChanged.emit).toHaveBeenCalledWith(true);
      });

      it('listItemHeaderComponent listItemHeader toggleExpand has been called', () => {
        expect(listItemComponentFixture.componentInstance.listItemHeader.toggleExpand).toHaveBeenCalled();
      });

      it('listItemHeaderComponent listItemHeader setExpandOrCollapsed has been called', () => {
        expect(component.setExpandOrCollapsed).toHaveBeenCalled();
      });

      it('component is expanded', () => {
        expect(rootElement.classes['list-item--expanded']).toBe(true);
      });

      it('the component is not collapsed', () => {
        expect(rootElement.classes['list-item--collapsed']).toBe(false);
      });
    });
    describe('and the header is pressed with enter', () => {
      beforeEach(() => {
        header.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
        listItemComponentFixture.detectChanges();
      });

      it('expandedChanged event has been emitted', () => {
        expect(component.listItemHeader.expandedChanged.emit).toHaveBeenCalledWith(true);
      });

      it('component is expanded', () => {
        expect(rootElement.classes['list-item--expanded']).toBe(true);
      });

      it('the component is not collapsed', () => {
        expect(rootElement.classes['list-item--collapsed']).toBe(false);
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
      content = testListItemComponentFixture.debugElement.query(By.directive(ListItemContentComponent)); // First element in list-item which is list-item-header;

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
      listItemComponentFixture.detectChanges();
    });
    it('component is not expanded', () => {
      expect(component.expanded).toBeFalsy();
    });
    it('content is not visible', () => {
      expect(component.toggleExpand).toHaveBeenCalledTimes(0);
    });
  });


  describe('When initialized with a Permanent notification', () => {
    beforeAll(() => {
      jasmine.clock().uninstall();
      jasmine.clock().install();

    });
    afterAll(() => {
      jasmine.clock().uninstall();
    });
    beforeEach(() => {
      component.notification = { message: 'Information', icon: 'vgr-icon-ok-check ', type: NotificationType.Permanent } as RowNotification;
      component.ngAfterContentInit();
    });
    it('notification is displayed', () => {
      expect(component.notificationVisible).toBe(true);
    });
    it('notification is displayed', () => {
      expect(component.notification.message).toBe('Information');
    });

    describe('and collapsenotification is triggered without removing permanentmessage,', () => {
      beforeEach(() => {
        component.notification = { message: 'Nu sparar vi', icon: 'vgr-icon-ok-check ', type: NotificationType.ShowOnCollapse } as RowNotification;
      });
      it('notification is displayed', () => {
        expect(component.notificationVisible).toBe(true);
      });

      it('collapse notification is displayed', () => {
        expect(component.notification.message).toBe('Nu sparar vi');
      });

      describe('and permanent notification is restored after 3,4s,', () => {
        beforeEach(() => {
          jasmine.clock().tick(3400);
          listItemComponentFixture.detectChanges();
        });

        it('notification changes back to permanent notification', () => {
          expect(component.notification.message).toBe('Information');

        });

      });
    });

    describe('and collapsenotification is triggered and removing permanentmessage,', () => {
      beforeEach(() => {
        spyOn(component.expandedChanged, 'emit');
        component.notification = { message: 'Nu sparar vi', icon: 'vgr-icon-ok-check ', type: NotificationType.ShowOnCollapse, removeWhenDone: true } as RowNotification;
        listItemComponentFixture.detectChanges();
      });
      it('notification is displayed', () => {
        expect(component.notificationVisible).toBe(true);
      });

      it('collapse notification is displayed', () => {
        expect(component.notification.message).toBe('Nu sparar vi');
      });

      describe('and notification is collapsing after 1,4s', () => {
        beforeEach(() => {
          jasmine.clock().tick(3401);

        });
        it('content is collapsed', () => {
          expect(component.collapsed).toBe(true);
        });

        it('content is collapsed', () => {
          expect(component.expandedChanged.emit).toHaveBeenCalled();
        });
      });

      describe('and notification should be removed after 5s,', () => {
        beforeEach(() => {
          jasmine.clock().tick(5000);
          listItemComponentFixture.detectChanges();
        });

        it('notification to be removed ', () => {
          expect(component.notification).toBe(null);

        });
        it('notification is not displayed', () => {
          expect(component.notificationVisible).toBe(false);
        });

      });

    });

    describe('and removenotification is triggered removing the notification,', () => {
      beforeEach(() => {
        spyOn(component.deleted, 'emit');
        spyOn(component.expandedChanged, 'emit');
        component.notification = { message: 'Nu tar vi bort', icon: 'vgr-icon-ok-check ', type: NotificationType.ShowOnRemove } as RowNotification;
      });
      it('notification is displayed', () => {
        expect(component.notificationVisible).toBe(true);
      });

      it('collapse notification is displayed', () => {
        expect(component.notification.message).toBe('Nu tar vi bort');
      });

      describe('and notification is collapsing after 1,4s', () => {
        beforeEach(() => {
          jasmine.clock().tick(1400);
        });
        it('content is collapsed', () => {
          expect(component.collapsed).toBe(true);
        });

        it('content is collapsed', () => {
          expect(component.expandedChanged.emit).toHaveBeenCalled();
        });
      });

      describe('and component is emitting deleted after 3,4s', () => {
        beforeEach(() => {
          jasmine.clock().tick(3400);
        });
        it('component deleted is emitted', () => {
          expect(component.deleted.emit).toHaveBeenCalled();
        });

        it('is deleted is set to true', () => {
          expect(component.isDeleted).toBe(true);
        });

      });
    });

    describe('and notification is set to null', () => {
      beforeEach(() => {
        component.notification = null;

      });
      it('notification is set to null', () => {
        expect(component.notification).toBe(null);
      });

      it('notification is not visible', () => {
        expect(component.notificationVisible).toBe(false);
      });
    });
  });

  describe('When initialized with a Temporary notification', () => {
    beforeAll(() => {
      jasmine.clock().uninstall();
      jasmine.clock().install();

    });
    afterAll(() => {
      jasmine.clock().uninstall();
    });

    beforeEach(() => {
      component.notification = { message: 'Temporär', icon: 'vgr-icon-ok-check ', type: NotificationType.ShowOnCollapse } as RowNotification;
      jasmine.clock().tick(5000);
      listItemComponentFixture.detectChanges();
    });

    it('', () => {
      expect(component.notificationVisible).toBe(false);
    });

    describe('When expanded is set to true', () => {
      beforeEach(() => {
        spyOn(component.expandedChanged, 'emit');
        component.expanded = true;
        listItemComponentFixture.detectChanges();
      });

      it('the property expanded is set to true', () => {
        expect(component.expanded).toBe(true);
      });

      it('expandedChanged is called', () => {
        expect(component.expandedChanged.emit).toHaveBeenCalled();
      });
    });
  });
});