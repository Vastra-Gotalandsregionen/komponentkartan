import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListItemComponent } from './list-item.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ListItemHeaderComponent } from './list-item-header.component';
import { ListItemContentComponent } from './list-item-content.component';
import { ListColumnComponent } from '../list/list-column.component';
import { RowNotification } from '../../models/rowNotification.model';
import { ListService } from '../list/list.service';

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
  let component: ListItemComponent;
  let rootElement: DebugElement;
  let headerWrapperElement: DebugElement;
  let headerElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      declarations: [
        ListItemComponent,
        TestListItemComponent,
        ListItemContentComponent,
        ListItemHeaderComponent,
        ListColumnComponent,
      ],
      providers: [
        { provide: ListService, useClass: ListServiceMock }
      ]
    });

    fixture = TestBed.createComponent(TestListItemComponent);
    fixture.detectChanges();
    rootElement = fixture.debugElement.query(By.css('vgr-list-item'));
    component = rootElement.componentInstance;
    headerWrapperElement = rootElement.query(By.css('.list-item__header_wrapper'));
    headerElement = rootElement.query(By.css('.list-item__header'));
  }));

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
        component.preventCollapse = true;
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
      headerElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'Home' }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('when End is pressed on header', () => {
    it('setFocusOnLastRow is emitted', () => {
      const spy = spyOn(component.setFocusOnLastRow, 'emit');
      headerElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'End' }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('When ArrowDown is pressed on header', () => {
    it('setFocusOnNextRow is emitted', () => {
      const spy = spyOn(component.setFocusOnNextRow, 'emit');
      headerElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowDown' }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('When ArrowUp is pressed on header', () => {
    it('setFocusOnPreviousRow is emitted', () => {
      const spy = spyOn(component.setFocusOnPreviousRow, 'emit');
      headerElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('when Ctrl + PageDown is pressed on header', () => {
    it('setFocusOnNextRow is emitted', () => {
      const spy = spyOn(component.setFocusOnNextRow, 'emit');
      headerElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'PageDown', ctrlKey: true }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
  describe('when Ctrl + PageUp is pressed on header', () => {
    it('setFocusOnPreviousRow is emitted', () => {
      const spy = spyOn(component.setFocusOnPreviousRow, 'emit');
      headerElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'PageUp', ctrlKey: true }));
      fixture.detectChanges();
      expect(spy).toHaveBeenCalled();
    });
  });
});

/* describe('When initialized as expanded', () => {
  beforeEach(() => {
    spyOn(component, 'toggleExpanded').and.callThrough();
    component.expanded = true;
    component.ngOnChanges({ expanded: new SimpleChange(undefined, true, true) });
    fixture.detectChanges();
  });

  it('toggleExpanded has been called once', () => {
    expect(component.toggleExpanded).toHaveBeenCalledTimes(1);
  });

  it('the component is expanded', () => {
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
    spyOn(component, 'toggleExpanded').and.callThrough();
    component.notInteractable = false;
    component.isDeleted = false;

    element = rootElement.query(By.css('.list-item__header_wrapper'));
    element.triggerEventHandler('click', event);

    fixture.detectChanges();
  });

  it('toggleExpanded has been called once', () => {
    expect(component.toggleExpanded).toHaveBeenCalledTimes(1);
  });

  it('component is expanded', () => {
    expect(listElement.classes['list-item--expanded']).toBe(true);
  });

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

    it('toggleExpanded has been called once again', () => {
      expect(component.toggleExpanded).toHaveBeenCalledTimes(2);
    });
  });
});

describe('When the list-item-header is in focus', () => {
  let header: DebugElement;
  let onKeyDownSpy: jasmine.Spy;
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

    spyOn(component, 'toggleExpanded').and.callThrough();
    onKeyDownSpy = spyOn(component.listItemHeader, 'onKeyDown').and.callThrough();
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

    it('listItemHeaderComponent listItemHeader onKeyDown has been called', () => {
      expect(component.listItemHeader.onKeyDown).toHaveBeenCalled();
    });

    it('listItemHeaderComponent listItemHeader setExpandOrCollapsed has been called', () => {
      expect(component.toggleExpanded).toHaveBeenCalled();
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
    spyOn(component, 'toggleExpanded');
    rootElement.triggerEventHandler('click', event);
    fixture.detectChanges();
  });
  it('component is not expanded', () => {
    expect(component.isExpanded).toBeFalsy();
  });
  it('content is not visible', () => {
    expect(component.toggleExpanded).toHaveBeenCalledTimes(0);
  });
});

describe('When initialized with a Permanent notification', () => {
  let message;
  beforeEach(() => {
    component.notification = { message: 'Information', icon: 'vgr-icon-ok-check ', type: NotificationType.Permanent } as RowNotification;
    component.isExpanded = true;
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
    expect(component.isExpanded).toBe(true);
    expect(message).toBe('Sparar');
    expect(component.notInteractable).toBe(false);

    // Closing the content area
    tick(component.showNotificationDurationMs);
    fixture.detectChanges();
    expect(component.isExpanded).toBe(false);
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
    expect(component.isExpanded).toBe(true);
    expect(message).toBe('Tar Bort');
    expect(component.notInteractable).toBe(false);

    // Closing the content area
    tick(component.showNotificationDurationMs);
    fixture.detectChanges();
    expect(component.isExpanded).toBe(false);
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
    expect(component.isExpanded).toBe(true);
    expect(message).toBe('Tar Bort');
    expect(component.notInteractable).toBe(false);
    expect(component.isDeleted).toBe(false);

    // Closing the content area
    tick(component.showNotificationDurationMs);
    fixture.detectChanges();
    expect(component.isExpanded).toBe(false);
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

}); */
