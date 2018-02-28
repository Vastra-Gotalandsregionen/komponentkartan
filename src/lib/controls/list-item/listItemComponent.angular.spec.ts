
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement, Renderer, ElementRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowNotification } from '../../models/rowNotification.model';
import { NotificationIcon } from '../../models/notificationIcon.model';
import { NotificationType } from '../../models/notificationType.model';

import {
  ListItemComponent, ListItemHeaderComponent, ListColumnComponent,
  ListItemContentComponent, ListItemJqeuryHelper
} from '../../index';

describe('ListItemComponent', () => {
  let component: ListItemComponent;
  let fixture: ComponentFixture<ListItemComponent>;
  let rootElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [
        ListItemComponent,
        ListItemHeaderComponent,
        ListColumnComponent,
        ListItemContentComponent
      ],
      imports: [CommonModule, BrowserAnimationsModule],
      providers: [
        { provide: ElementRef },
        { provide: Renderer }]
    });

    TestBed.overrideComponent(ListItemComponent, {
      set: {
        // templateUrl: './list-item.component.html'
        template: `
                <vgr-list-item>
                  <vgr-list-item-header>
                      <vgr-list-column [text]="'Testman'"></vgr-list-column>
                  </vgr-list-item-header>
                  <vgr-list-item-content>
                    <span> Mer information</span>
                  </vgr-list-item-content>
                </vgr-list-item>
                `
      }
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ListItemComponent);

      fixture.componentInstance.listItemHeader = <ListItemHeaderComponent>fixture.debugElement.queryAll(By.directive(ListItemHeaderComponent))[0].componentInstance; // First element in list-item which is list-item-header;
      fixture.componentInstance.listContent = <ListItemContentComponent>fixture.debugElement.queryAll(By.directive(ListItemContentComponent))[0].componentInstance;  // Second element in list-item which is list-item-content;
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      component.ngAfterContentInit();

      fixture.detectChanges();
      done();
    });
  });


  describe('When initialized', () => {
    // beforeEach(() => {
    //   spyOn(component, 'toggleExpand').and.callThrough();
    // });

    it('the component has the list-item class', () => {
      expect(rootElement.classes['list-item']).toBe(true);
    });

    it('the component is collapsed', () => {
      expect(rootElement.classes['list-item--collapsed']).toBe(true);
    })

    it('the component is expanded', () => {
      expect(rootElement.classes['list-item--expanded']).toBe(false);
    })

    // describe('and the list-item-header is clicked', () => {
    //   const event: any = { cancelBubble: false };
    //   let spy: any;
    //   let element: DebugElement

    //   beforeEach(() => {
    //     component.expanded = false;
    //     component.notInteractable = false;
    //     component.isDeleted = false;

    //     element = rootElement.query(By.css('.list-item__header_wrapper'));

    //     element.triggerEventHandler('click', event);
    //     fixture.detectChanges();
    //   });

    //   it('toggleExpand has been called once', () => {
    //     expect(component.toggleExpand).toHaveBeenCalledTimes(1);
    //   });
    //   it('the component is collapsed', () => {
    //     expect(rootElement.classes['list-item--collapsed']).toBe(false);
    //   })
    //   it('component is expanded', () => {
    //     expect(rootElement.classes['list-item--expanded']).toBe(true);
    //   });
    //   it('click event is not bubbled', () => {
    //     expect(true).toBeTruthy();
    //   });

    //   // describe('and the header is clicked again', () => {
    //   //   beforeEach(() => {
    //   //     spyOn(jqueryHelper, 'collapseContent').and.callFake((header: any, callback: Function) => { callback(); });
    //   //     rootElement.triggerEventHandler('click', null);
    //   //     fixture.detectChanges();
    //   //   });
    //   //   it('component is collapsed', () => {
    //   //     expect(component.expanded).toBe(false);
    //   //   });
    //   //   it('content not visible', () => {
    //   //     expect(jqueryHelper.toggleContent).toHaveBeenCalled();
    //   //   });
    //   // });
    // });

    //   describe('and the list-item-header is in focus', () => {
    //     let header: DebugElement;
    //     beforeEach(() => {
    //       header = rootElement.children[0];  // First element in list-item which is list-item-header;
    //       spyOn(component.listItemHeader.expandedChanged, 'emit').and.callThrough();
    //       spyOn(component.listItemHeader.goToFirst, 'emit').and.callThrough();
    //       spyOn(component.listItemHeader.goToLast, 'emit').and.callThrough();
    //       spyOn(component.listItemHeader.goUp, 'emit').and.callThrough();
    //       spyOn(component.listItemHeader.goDown, 'emit').and.callThrough();

    //       spyOn(component.setFocusOnFirstRow, 'emit');
    //       spyOn(component.setFocusOnLastRow, 'emit');
    //       spyOn(component.setFocusOnPreviousRow, 'emit');
    //       spyOn(component.setFocusOnNextRow, 'emit');
    //       spyOn(component.setFocusOnPreviousRowContent, 'emit');
    //       spyOn(component.setFocusOnNextRowContent, 'emit');

    //       component.ngOnInit();
    //       fixture.detectChanges();
    //     });

    //     describe('and the header is pressed with space', () => {
    //       beforeEach(() => {
    //         header.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);
    //       });

    //       it('expandedChanged event has been emitted', () => {
    //         expect(component.listItemHeader.expandedChanged.emit).toHaveBeenCalledWith(true);
    //       });

    //       it('component is expanded', () => {
    //         expect(component.expanded).toBe(true);
    //       });
    //     });

    //     describe('and the header is pressed with enter', () => {
    //       beforeEach(() => {
    //         header.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
    //       });

    //       it('expandedChanged event has been emitted', () => {
    //         expect(component.listItemHeader.expandedChanged.emit).toHaveBeenCalledWith(true);
    //       });

    //       it('component is expanded', () => {
    //         expect(component.expanded).toBe(true);
    //       });
    //     });

    //     describe('and the header is pressed with Home key', () => {
    //       beforeEach(() => {
    //         header.triggerEventHandler('keydown', { keyCode: 36 } as KeyboardEvent);
    //       });

    //       it('goToFirst event has been emitted', () => {
    //         expect(component.listItemHeader.goToFirst.emit).toHaveBeenCalled();
    //       });

    //       it('setFocusOnFirstRow event is emitted', () => {
    //         expect(component.setFocusOnFirstRow.emit).toHaveBeenCalled();
    //       });
    //     });

    //     describe('and the header is pressed with End key', () => {
    //       beforeEach(() => {
    //         header.triggerEventHandler('keydown', { keyCode: 35 } as KeyboardEvent);
    //       });

    //       it('goToLast event has been emitted', () => {
    //         expect(component.listItemHeader.goToLast.emit).toHaveBeenCalled();
    //       });

    //       it('setFocusOnLastRow event is emitted', () => {
    //         expect(component.setFocusOnLastRow.emit).toHaveBeenCalled();
    //       });
    //     });

    //     describe('and the header is pressed with Ctrl + PageUp', () => {
    //       beforeEach(() => {
    //         header.triggerEventHandler('keydown', { ctrlKey: true, keyCode: 33 } as KeyboardEvent);
    //       });

    //       it('goToLast event has been emitted', () => {
    //         expect(component.listItemHeader.goUp.emit).toHaveBeenCalled();
    //       });

    //       it('setFocusOnPreviousRow event is emitted', () => {
    //         expect(component.setFocusOnPreviousRow.emit).toHaveBeenCalled();
    //       });
    //     });

    //     describe('and the header is pressed with Ctrl + PageDown', () => {
    //       beforeEach(() => {
    //         header.triggerEventHandler('keydown', { ctrlKey: true, keyCode: 34 } as KeyboardEvent);
    //       });

    //       it('goToLast event has been emitted', () => {
    //         expect(component.listItemHeader.goDown.emit).toHaveBeenCalled();
    //       });

    //       it('setFocusOnNextRow event is emitted', () => {
    //         expect(component.setFocusOnNextRow.emit).toHaveBeenCalled();
    //       });
    //     });

    //     describe('and the header is pressed with Arrow Up', () => {
    //       beforeEach(() => {
    //         header.triggerEventHandler('keydown', { keyCode: 38 } as KeyboardEvent);
    //       });

    //       it('goToLast event has been emitted', () => {
    //         expect(component.listItemHeader.goUp.emit).toHaveBeenCalled();
    //       });

    //       it('setFocusOnPreviousRow event is emitted', () => {
    //         expect(component.setFocusOnPreviousRow.emit).toHaveBeenCalled();
    //       });
    //     });

    //     describe('and the header is pressed with Arrow Down', () => {
    //       beforeEach(() => {
    //         header.triggerEventHandler('keydown', { keyCode: 40 } as KeyboardEvent);
    //       });

    //       it('goToLast event has been emitted', () => {
    //         expect(component.listItemHeader.goDown.emit).toHaveBeenCalled();
    //       });

    //       it('setFocusOnNextRow event is emitted', () => {
    //         expect(component.setFocusOnNextRow.emit).toHaveBeenCalled();
    //       });
    //     });
    //   });

    //   describe('and the list-item-content is in focus', () => {
    //     let content: DebugElement;

    //     beforeEach(() => {
    //       content = rootElement.children[1];
    //       spyOn(component.listContent.goUp, 'emit').and.callThrough();
    //       spyOn(component.listContent.goDown, 'emit').and.callThrough();
    //       spyOn(component.setFocusOnPreviousRowContent, 'emit');
    //       spyOn(component.setFocusOnNextRowContent, 'emit');
    //       component.ngOnInit();
    //     });

    //     describe('and the content is pressed with Ctrl + PageUp', () => {
    //       beforeEach(() => {
    //         content.triggerEventHandler('keydown', { ctrlKey: true, keyCode: 33 } as KeyboardEvent);
    //       });

    //       it('go up event is emitted', () => {
    //         expect(component.listContent.goUp.emit).toHaveBeenCalled();
    //       });
    //       it('setFocusOnPreviousRowContent event is emitted', () => {
    //         expect(component.setFocusOnPreviousRowContent.emit).toHaveBeenCalled();
    //       });
    //     });

    //     describe('and the content is pressed with Ctrl + PageDown', () => {
    //       beforeEach(() => {
    //         content.triggerEventHandler('keydown', { ctrlKey: true, keyCode: 34 } as KeyboardEvent);
    //       });

    //       it('go up event is emitted', () => {
    //         expect(component.listContent.goDown.emit).toHaveBeenCalled();
    //       });
    //       it('setFocusOnNextRowContent event is emitted', () => {
    //         expect(component.setFocusOnNextRowContent.emit).toHaveBeenCalled();
    //       });
    //     });
    //   });

    //   describe('the component is clicked outside of the list-item-header', () => {
    //     beforeEach(() => {
    //       spyOn(jqueryHelper, 'isClickEventHeader').and.returnValue(false);
    //       spyOn(jqueryHelper, 'toggleContent');
    //       rootElement.triggerEventHandler('click', null);
    //       fixture.detectChanges();
    //     });
    //     it('component is not expanded', () => {
    //       expect(component.expanded).toBeFalsy();
    //     });
    //     it('content is not visible', () => {
    //       expect(jqueryHelper.toggleContent).toHaveBeenCalledTimes(0);
    //     });
    //   });
    // });

    // describe('When initialized with a Permanent notification is set,', () => {
    //   beforeEach(() => {
    //     component.notification = { message: 'Information', icon: 'vgr-icon-ok-check ', type: NotificationType.Permanent } as RowNotification;
    //     component.ngOnInit();
    //   });
    //   it('notification is displayed', () => {
    //     expect(component.notificationVisible).toBe(true);
    //   });
    // });

    // describe('When expanded is set to true', () => {
    //   beforeEach(() => {
    //     spyOn(jqueryHelper, 'toggleContent');
    //     component.expanded = true;
    //     fixture.detectChanges();
    //   });
    //   beforeAll(() => {
    //     jasmine.clock().uninstall();
    //     jasmine.clock().install();
    //   });
    //   afterAll(() => {
    //     jasmine.clock().uninstall();
    //   });

    //   it('the property expanded is set to true', () => {
    //     expect(component.expanded).toBe(true);
    //   });
    //   it('toggleContent is called', () => {
    //     expect(jqueryHelper.toggleContent).toHaveBeenCalled();
    //   });

    //   describe('and a ShowOnCollapse notification is set', () => {
    //     beforeEach(() => {
    //       spyOn(jqueryHelper, 'collapseContent').and.callFake((header: any, callback: Function) => { callback(); });
    //       component.notification = { message: 'Row saved', icon: 'vgr-icon-ok-check ', type: NotificationType.ShowOnCollapse } as RowNotification;
    //     });
    //     it('notification is displayed', () => {
    //       expect(component.notificationVisible).toBe(true);
    //     });
    //     it('component is collapsing', () => {
    //       expect(component.notInteractable).toBe(true);
    //     });

    //     describe('after 1,4 seconds', () => {
    //       beforeEach(() => {
    //         jasmine.clock().tick(1400);
    //       });
    //       it('content is collapsed', () => {
    //         expect(jqueryHelper.collapseContent).toHaveBeenCalled();
    //       });
    //       describe('after another 2 seconds', () => {
    //         beforeEach(() => {
    //           jasmine.clock().tick(2000);
    //           fixture.detectChanges();
    //         });
    //         it('the notification is hidden', () => {
    //           expect(component.notificationVisible).toBe(false);
    //         });
    //         it('the notification is done', () => {
    //           expect(component.notification.done).toBe(true);
    //         });
    //         it('component is not expanded', () => {
    //           expect(component.expanded).toBe(false);
    //         });
    //         it('component is not collapsing', () => {
    //           expect(component.notInteractable).toBe(false);
    //         });
    //       });
    //     });
    //   });

    //   describe('and a ShowOnRemove notification is set', () => {
    //     beforeEach(() => {
    //       spyOn(jqueryHelper, 'collapseContent').and.callFake((header: any, callback: Function) => { callback(); });
    //       component.notification = { message: 'Row deleted', icon: 'vgr-icon-ok-check ', type: NotificationType.ShowOnRemove } as RowNotification;
    //     });
    //     it('notification is displayed', () => {
    //       expect(component.notificationVisible).toBe(true);
    //     });
    //     it('component is collapsing', () => {
    //       expect(component.notInteractable).toBe(true);
    //     });

    //     describe('after 1,4 seconds', () => {
    //       beforeEach(() => {
    //         jasmine.clock().tick(1400);
    //       });
    //       it('content is collapsed', () => {
    //         expect(jqueryHelper.collapseContent).toHaveBeenCalled();
    //       });
    //       describe('after another 2 seconds', () => {
    //         beforeEach(() => {
    //           jasmine.clock().tick(2000);
    //           fixture.detectChanges();
    //         });
    //         it('the notification is hidden', () => {
    //           expect(component.notificationVisible).toBe(false);
    //         });
    //         it('the notification is done', () => {
    //           expect(component.notification.done).toBe(true);
    //         });
    //         it('component is not expanded', () => {
    //           expect(component.expanded).toBe(false);
    //         });
    //         it('component is not collapsing', () => {
    //           expect(component.notInteractable).toBe(false);
    //         });
    //         it('component is deleted', () => {
    //           expect(component.isDeleted).toBe(true);
    //         });
    //       });
    //     });
    //   });

    // });

    // describe('When item is collapsing', () => {
    //   beforeEach(() => {
    //     spyOn(jqueryHelper, 'isClickEventHeader').and.returnValue(true);
    //     spyOn(jqueryHelper, 'toggleContent');
    //     component.notInteractable = true;
    //   });
    //   describe('and header is clicked', () => {
    //     beforeEach(() => {
    //       rootElement.triggerEventHandler('click', null);
    //       fixture.detectChanges();
    //     });
    //     it('item is not expanded', () => {
    //       expect(component.expanded).toBeFalsy();
    //     });
    //     it('content is not visible', () => {
    //       expect(jqueryHelper.toggleContent).toHaveBeenCalledTimes(0);
    //     });
    //   });
    //   describe('and expanded is set to true', () => {
    //     beforeEach(() => {
    //       component.expanded = true;
    //       fixture.detectChanges();
    //     });
    //     it('item is not expanded', () => {
    //       expect(component.expanded).toBeFalsy();
    //     });
    //     it('content is not visible', () => {
    //       expect(jqueryHelper.toggleContent).toHaveBeenCalledTimes(0);
    //     });
    //   });
  });
});
//});
