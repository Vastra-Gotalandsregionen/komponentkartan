import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Renderer, ElementRef, Input, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  ListComponent,
  ListItemComponent, ListItemHeaderComponent, ListColumnComponent, ListHeaderComponent,
  ListItemContentComponent, ListColumnHeaderComponent, PaginationComponent
} from '../../index';
import { ListService } from './list.service';
import { SortDirection } from './list-column-header.component';

@Component({
  selector: 'vgr-test',
  template: `
  <vgr-list>
    <vgr-list-header>
      <vgr-list-column-header sortKey="test">Test</vgr-list-column-header>
    </vgr-list-header>
    <vgr-list-item *ngFor="let item of items" [expanded]="item.expanded" [preventCollapse]="item.preventCollapse">
      <vgr-list-item-header>
        <vgr-list-column>Test</vgr-list-column>
      </vgr-list-item-header>
      <vgr-list-item-content>{{item}}</vgr-list-item-content>
    </vgr-list-item>
  </vgr-list>
  `
})
export class TestComponent {
  @Input() items: { text: string; expanded: boolean; preventCollapse: boolean; }[];
}

describe('[ListComponent - Angular]', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: ListComponent;
  let rootElement: DebugElement;
  let headerElement: DebugElement;

  beforeEach(() => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        ListComponent,
        ListHeaderComponent,
        ListColumnHeaderComponent,
        ListItemComponent,
        ListItemHeaderComponent,
        ListColumnComponent,
        ListItemContentComponent,
        PaginationComponent
      ],
      imports: [CommonModule, BrowserAnimationsModule],
      providers: [
        { provide: ElementRef },
        { provide: Renderer },
        ListService
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    rootElement = fixture.debugElement.query(By.css('vgr-list'));
    headerElement = rootElement.query(By.css('vgr-list-header'));
    component = rootElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When a list column header is clicked', () => {
    let columnHeaderElement: DebugElement;
    let spy: jasmine.Spy;
    beforeEach(() => {
      spy = spyOn(component.sortChanged, 'emit');
      columnHeaderElement = headerElement.query(By.css('.list__column-header > div'));
      columnHeaderElement.triggerEventHandler('click', {});
      fixture.detectChanges();
    });
    it('a sortChange event is emitted', () => {
      expect(spy).toHaveBeenCalledWith({ direction: SortDirection.Ascending, key: 'test' });
    });
  });

  describe('When multiple expanded items is not allowed', () => {
    let itemElements: DebugElement[];
    beforeEach(() => {
      component.allowMultipleExpandedItems = false;
    });
    describe('and initialized with collapsed items ', () => {
      beforeEach(() => {
        testComponent.items = [
          { text: '0', expanded: false, preventCollapse: false },
          { text: '1', expanded: false, preventCollapse: false },
          { text: '2', expanded: false, preventCollapse: false }
        ];
        fixture.detectChanges();
        itemElements = rootElement.queryAll(By.css('.list-item'));
      });
      describe('and a collapsed item is clicked', () => {
        beforeEach(fakeAsync(() => {
          const itemHeader = itemElements[0].query(By.css('.list-item__header_wrapper'));
          itemHeader.triggerEventHandler('click', {});
          tick(400);
          fixture.detectChanges();
        }));
        it('it is expanded', () => {
          expect(itemElements[0].classes['list-item--expanded']).toBe(true);
        });
        it('all other items are collapsed', () => {
          expect(itemElements[1].classes['list-item--expanded']).toBe(false);
          expect(itemElements[2].classes['list-item--expanded']).toBe(false);
        });
      });
    });
    describe('and is initialized with one expanded and many collapsed items', () => {
      beforeEach(() => {
        testComponent.items = [
          { text: '0', expanded: false, preventCollapse: false },
          { text: '1', expanded: true, preventCollapse: false },
          { text: '2', expanded: false, preventCollapse: false }
        ];
        fixture.detectChanges();
        itemElements = rootElement.queryAll(By.css('.list-item'));
      });
      describe('and a collapsed item is clicked', () => {
        beforeEach(fakeAsync(() => {
          const itemHeader = itemElements[0].query(By.css('.list-item__header_wrapper'));
          itemHeader.triggerEventHandler('click', {});
          tick(400);
          fixture.detectChanges();
        }));
        it('it is expanded', () => {
          expect(itemElements[0].classes['list-item--expanded']).toBe(true);
        });
        it('all other items are collapsed', () => {
          expect(itemElements[1].classes['list-item--expanded']).toBe(false);
          expect(itemElements[2].classes['list-item--expanded']).toBe(false);
        });
      });
    });

    describe('and is initialized with an expanded item that prevents collapse', () => {
      let spyCollapsePrevented: jasmine.Spy;
      beforeEach(fakeAsync(() => {
        testComponent.items = [
          { text: '0', expanded: true, preventCollapse: true },
          { text: '1', expanded: false, preventCollapse: false },
          { text: '2', expanded: false, preventCollapse: false }
        ];
        fixture.detectChanges();
        tick(400);
        itemElements = rootElement.queryAll(By.css('.list-item'));
        spyCollapsePrevented = spyOn(itemElements[0].componentInstance.collapsePrevented, 'emit');
      }));
      describe('and it is clicked', () => {
        beforeEach(() => {
          const itemHeader = itemElements[0].query(By.css('.list-item__header_wrapper'));
          itemHeader.triggerEventHandler('click', {});
          fixture.detectChanges();
        });
        it('it is still expanded', () => {
          expect(itemElements[0].classes['list-item--expanded']).toBe(true);
        });
        it('it emits collapsePrevented event', () => {
          expect(spyCollapsePrevented).toHaveBeenCalled();
        });
      });
    });

    describe('and is initialized with an expanded item that prevents collapse', () => {
      let spyCollapsePrevented: jasmine.Spy;
      let spyExpandPrevented: jasmine.Spy;
      beforeEach(fakeAsync(() => {
        testComponent.items = [
          { text: '0', expanded: false, preventCollapse: false },
          { text: '1', expanded: true, preventCollapse: true },
          { text: '2', expanded: false, preventCollapse: false }
        ];
        fixture.detectChanges();
        tick(400);
        itemElements = rootElement.queryAll(By.css('.list-item'));
        spyCollapsePrevented = spyOn(itemElements[1].componentInstance.collapsePrevented, 'emit');
        spyExpandPrevented = spyOn(itemElements[0].componentInstance.expandPrevented, 'emit');
      }));
      describe('and another item is clicked', () => {
        beforeEach(fakeAsync(() => {
          const itemHeader = itemElements[0].query(By.css('.list-item__header_wrapper'));
          itemHeader.triggerEventHandler('click', {});
          tick();
          fixture.detectChanges();
        }));
        it('clicked item emits an expandPrevented event', () => {
          expect(spyExpandPrevented).toHaveBeenCalled();
        });
        it('clicked item is still collapsed', () => {
          expect(itemElements[0].classes['list-item--expanded']).toBe(false);
        });
        it('it emits a collapsePrevented event', () => {
          expect(spyCollapsePrevented).toHaveBeenCalled();
        });
        it('it is still expanded', () => {
          expect(itemElements[1].classes['list-item--expanded']).toBe(true);
        });
      });
    });
  });

  describe('When multiple expanded items are allowed', () => {
    let itemElements: DebugElement[];
    beforeEach(() => {
      component.allowMultipleExpandedItems = true;
    });
    describe('and is initialized with expanded and collapsed items', () => {
      beforeEach(() => {
        testComponent.items = [
          { text: '0', expanded: false, preventCollapse: false },
          { text: '1', expanded: true, preventCollapse: false },
          { text: '2', expanded: true, preventCollapse: false },
          { text: '3', expanded: false, preventCollapse: false }
        ];
        fixture.detectChanges();
        itemElements = rootElement.queryAll(By.css('.list-item'));
      });
      describe('and a collapsed item is clicked', () => {
        beforeEach(fakeAsync(() => {
          const itemHeader = itemElements[0].query(By.css('.list-item__header_wrapper'));
          itemHeader.triggerEventHandler('click', {});
          tick(400);
          fixture.detectChanges();
        }));
        it('it is expanded', () => {
          expect(itemElements[0].classes['list-item--expanded']).toBe(true);
        });
        it('expanded items are still expanded', () => {
          expect(itemElements[1].classes['list-item--expanded']).toBe(true);
          expect(itemElements[2].classes['list-item--expanded']).toBe(true);
        });
      });
    });
  });

  describe('When notification is set', () => {
    beforeEach(() => {
      component.notification = { message: 'Detta är en notifikation', icon: 'vgr-icon-plus' };
      fixture.detectChanges();
    });
    it('notification is visible', () => {
      expect(rootElement.queryAll(By.css('.list__notification')).length).toBe(1);
    });
    describe('and when notification is removed', () => {
      beforeEach(() => {
        component.notification = null;
        fixture.detectChanges();
      });
      it('notification is not visible', () => {
        expect(rootElement.queryAll(By.css('.list__notification')).length).toBe(0);
      });
    });
  });

  describe('When initialized wih items', () => {
    let itemElements: DebugElement[];
    let spy: jasmine.Spy;
    beforeEach(() => {
      testComponent.items = [
        { text: '0', expanded: false, preventCollapse: false },
        { text: '1', expanded: false, preventCollapse: false },
        { text: '2', expanded: false, preventCollapse: false },
        { text: '3', expanded: false, preventCollapse: false }
      ];
      fixture.detectChanges();
      itemElements = rootElement.queryAll(By.css('.list-item'));
    });
    describe('and the first item is focused', () => {
      beforeEach(() => {
        component.setFocusOnPreviousRow(0);
        fixture.detectChanges();
      });
      describe('and End is pressed', () => {
        beforeEach(() => {
          spy = spyOn(itemElements[3].componentInstance, 'setFocusOnRow');
          const itemHeaderElement = itemElements[0].query(By.css('.list-item__header'));
          itemHeaderElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'End' }));
          fixture.detectChanges();
        });
        it('the last item has focus', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
      describe('and ArrowDown is pressed', () => {
        beforeEach(() => {
          spy = spyOn(itemElements[1].componentInstance, 'setFocusOnRow');
          const itemHeaderElement = itemElements[0].query(By.css('.list-item__header'));
          itemHeaderElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowDown' }));
          fixture.detectChanges();
        });
        it('the next item has focus', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
      describe('and Ctrl + PageDown is pressed', () => {
        beforeEach(() => {
          spy = spyOn(itemElements[1].componentInstance, 'setFocusOnRow');
          const itemHeaderElement = itemElements[0].query(By.css('.list-item__header'));
          itemHeaderElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'PageDown', ctrlKey: true }));
          fixture.detectChanges();
        });
        it('the next item has focus', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });
    describe('and the last item is focused', () => {
      beforeEach(() => {
        component.setFocusOnNextRow(3);
        fixture.detectChanges();
      });
      describe('and Home is pressed', () => {
        beforeEach(() => {
          spy = spyOn(itemElements[0].componentInstance, 'setFocusOnRow');
          const itemHeaderElement = itemElements[3].query(By.css('.list-item__header'));
          itemHeaderElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'Home' }));
          fixture.detectChanges();
        });
        it('the first item has focus', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
      describe('and ArrowUp is pressed', () => {
        beforeEach(() => {
          spy = spyOn(itemElements[2].componentInstance, 'setFocusOnRow');
          const itemHeaderElement = itemElements[3].query(By.css('.list-item__header'));
          itemHeaderElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowUp' }));
          fixture.detectChanges();
        });
        it('the previous item has focus', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
      describe('and Ctrl + PageUp is pressed', () => {
        beforeEach(() => {
          spy = spyOn(itemElements[2].componentInstance, 'setFocusOnRow');
          const itemHeaderElement = itemElements[3].query(By.css('.list-item__header'));
          itemHeaderElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'PageUp', ctrlKey: true }));
          fixture.detectChanges();
        });
        it('the previous item has focus', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });
  });
});
