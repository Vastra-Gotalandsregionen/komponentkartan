import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Input, Component, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridHeaderComponent } from './grid-header.component';
import { IconModule } from '../icon/icon.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  GridComponent,
  GridHeaderColumnComponent,
  GridRowComponent,
  GridColumnComponent,
  GridContentComponent,
  PaginationComponent,
  LoaderComponent,
  IconComponent,
  GridSortDirection
} from '../../index';
import { GridService } from './grid.service';

@Component({
  selector: 'vgr-test',
  template: `
  <vgr-grid>
    <vgr-grid-header>
      <vgr-grid-header-column sortKey="test">Test</vgr-grid-header-column>
    </vgr-grid-header>
    <vgr-grid-row *ngFor="let row of rows" [expanded]="row.expanded" [preventCollapse]="row.preventCollapse">
      <vgr-grid-column>Test</vgr-grid-column>
      <vgr-grid-content>{{row}}</vgr-grid-content>
    </vgr-grid-row>
  </vgr-grid>
  `
})
export class TestComponent {
  @Input() rows: { text: string; expanded: boolean; preventCollapse: boolean; }[];
}

describe('GridComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: GridComponent;
  let rootElement: DebugElement;
  let headerElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        GridComponent,
        GridHeaderComponent,
        GridHeaderColumnComponent,
        GridRowComponent,
        GridColumnComponent,
        GridContentComponent,
        LoaderComponent,
        PaginationComponent,
        IconComponent
      ],
      imports: [CommonModule, BrowserAnimationsModule, FontAwesomeModule, IconModule],
      providers: [
        { provide: Renderer2 },
        GridService
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    rootElement = fixture.debugElement.query(By.css('vgr-grid'));
    headerElement = rootElement.query(By.css('vgr-grid-header'));
    component = rootElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When a grid header column is clicked', () => {
    let columnHeaderElement: DebugElement;
    let spy: jasmine.Spy;
    beforeEach(() => {
      spy = spyOn(component.sortChanged, 'emit');
      columnHeaderElement = headerElement.query(By.css('vgr-grid-header-column > div'));
      columnHeaderElement.triggerEventHandler('click', {});
      fixture.detectChanges();
    });
    it('a sortChange event is emitted', () => {
      expect(spy).toHaveBeenCalledWith({ direction: GridSortDirection.Ascending, key: 'test' });
    });
  });

  describe('When multiple expanded rows is not allowed', () => {
    let rowElements: DebugElement[];
    beforeEach(() => {
      component.allowMultipleExpandedRows = false;
    });
    describe('and initialized with collapsed rows ', () => {
      beforeEach(() => {
        testComponent.rows = [
          { text: '0', expanded: false, preventCollapse: false },
          { text: '1', expanded: false, preventCollapse: false },
          { text: '2', expanded: false, preventCollapse: false }
        ];
        fixture.detectChanges();
        rowElements = rootElement.queryAll(By.css('vgr-grid-row'));
      });
      describe('and a collapsed row is clicked', () => {
        let spyExpandedChanged: jasmine.Spy;
        beforeEach(fakeAsync(() => {
          spyExpandedChanged = spyOn(rowElements[0].componentInstance.expandedChanged, 'emit');
          const rowHeader = rowElements[0].query(By.css('.grid-row-container > div'));
          rowHeader.triggerEventHandler('click', {});
          tick(400);
          fixture.detectChanges();
        }));
        it('it emits expandedChanged event', () => {
          expect(spyExpandedChanged).toHaveBeenCalledWith(true);
        });
        it('it is expanded', () => {
          expect(rowElements[0].query(By.css('.grid-row-container')).classes['grid-row--expanded']).toBe(true);
        });
        it('all other rows are collapsed', () => {
          expect(rowElements[1].query(By.css('.grid-row-container')).classes['grid-row--expanded']).not.toBe(true);
          expect(rowElements[2].query(By.css('.grid-row-container')).classes['grid-row--expanded']).not.toBe(true);
        });
      });
    });

    describe('and is initialized with one expanded and many collapsed rows', () => {
      beforeEach(() => {
        testComponent.rows = [
          { text: '0', expanded: false, preventCollapse: false },
          { text: '1', expanded: true, preventCollapse: false },
          { text: '2', expanded: false, preventCollapse: false }
        ];
        fixture.detectChanges();
        rowElements = rootElement.queryAll(By.css('vgr-grid-row'));
      });
      describe('and a collapsed row is clicked', () => {
        beforeEach(fakeAsync(() => {
          const rowHeader = rowElements[0].query(By.css('.grid-row-container > div'));
          rowHeader.triggerEventHandler('click', {});
          tick(400);
          fixture.detectChanges();
        }));
        it('it is expanded', () => {
          expect(rowElements[0].query(By.css('.grid-row-container')).classes['grid-row--expanded']).toBe(true);
        });
        it('all other rows are collapsed', () => {
          expect(rowElements[1].query(By.css('.grid-row-container')).classes['grid-row--expanded']).not.toBe(true);
          expect(rowElements[2].query(By.css('.grid-row-container')).classes['grid-row--expanded']).not.toBe(true);
        });
      });
    });

    describe('and is initialized with an expanded row that prevents collapse', () => {
      let spyCollapsePrevented: jasmine.Spy;
      beforeEach(fakeAsync(() => {
        testComponent.rows = [
          { text: '0', expanded: true, preventCollapse: true },
          { text: '1', expanded: false, preventCollapse: false },
          { text: '2', expanded: false, preventCollapse: false }
        ];
        fixture.detectChanges();
        tick(400);
        rowElements = rootElement.queryAll(By.css('vgr-grid-row'));
        spyCollapsePrevented = spyOn(rowElements[0].componentInstance.collapsePrevented, 'emit');
      }));
      describe('and it is clicked', () => {
        beforeEach(() => {
          const rowHeader = rowElements[0].query(By.css('.grid-row-container > div'));
          rowHeader.triggerEventHandler('click', {});
          fixture.detectChanges();
        });
        it('it is still expanded', () => {
          expect(rowElements[0].query(By.css('.grid-row-container')).classes['grid-row--expanded']).toBe(true);
        });
        it('it emits collapsePrevented event', () => {
          expect(spyCollapsePrevented).toHaveBeenCalled();
        });
      });
    });

    describe('and is initialized with an expanded row that prevents collapse', () => {
      let spyCollapsePrevented: jasmine.Spy;
      let spyExpandPrevented: jasmine.Spy;
      beforeEach(fakeAsync(() => {
        testComponent.rows = [
          { text: '0', expanded: false, preventCollapse: false },
          { text: '1', expanded: true, preventCollapse: true },
          { text: '2', expanded: false, preventCollapse: false }
        ];
        fixture.detectChanges();
        tick(400);
        rowElements = rootElement.queryAll(By.css('vgr-grid-row'));
        spyCollapsePrevented = spyOn(rowElements[1].componentInstance.collapsePrevented, 'emit');
        spyExpandPrevented = spyOn(rowElements[0].componentInstance.expandPrevented, 'emit');
      }));
      describe('and another row is clicked', () => {
        beforeEach(fakeAsync(() => {
          const rowHeader = rowElements[0].query(By.css('.grid-row-container > div'));
          rowHeader.triggerEventHandler('click', {});
          tick();
          fixture.detectChanges();
        }));
        it('clicked row emits an expandPrevented event', () => {
          expect(spyExpandPrevented).toHaveBeenCalled();
        });
        it('clicked row is still collapsed', () => {
          expect(rowElements[0].query(By.css('.grid-row-container')).classes['grid-row--expanded']).not.toBe(true);
        });
        it('it emits a collapsePrevented event', () => {
          expect(spyCollapsePrevented).toHaveBeenCalled();
        });
        it('it is still expanded', () => {
          expect(rowElements[1].query(By.css('.grid-row-container')).classes['grid-row--expanded']).toBe(true);
        });
      });
    });
  });

  describe('When multiple expanded rows are allowed', () => {
    let rowElements: DebugElement[];
    beforeEach(() => {
      component.allowMultipleExpandedRows = true;
    });
    describe('and is initialized with expanded and collapsed rows', () => {
      beforeEach(() => {
        testComponent.rows = [
          { text: '0', expanded: false, preventCollapse: false },
          { text: '1', expanded: true, preventCollapse: false },
          { text: '2', expanded: true, preventCollapse: false },
          { text: '3', expanded: false, preventCollapse: false }
        ];
        fixture.detectChanges();
        rowElements = rootElement.queryAll(By.css('vgr-grid-row'));
      });
      describe('and a collapsed row is clicked', () => {
        beforeEach(fakeAsync(() => {
          const rowHeader = rowElements[0].query(By.css('.grid-row-container > div'));
          rowHeader.triggerEventHandler('click', {});
          tick(400);
          fixture.detectChanges();
        }));
        it('it is expanded', () => {
          expect(rowElements[0].query(By.css('.grid-row-container')).classes['grid-row--expanded']).toBe(true);
        });
        it('expanded rows are still expanded', () => {
          expect(rowElements[1].query(By.css('.grid-row-container')).classes['grid-row--expanded']).toBe(true);
          expect(rowElements[2].query(By.css('.grid-row-container')).classes['grid-row--expanded']).toBe(true);
        });
      });
    });
  });

  // describe('Keyboard navigation', () => {
  //   describe('When initialized wih rows', () => {
  //     let rowElements: DebugElement[];
  //     let spy: jasmine.Spy;
  //     beforeEach(() => {
  //       testComponent.rows = [
  //         { text: '0', expanded: false, preventCollapse: false },
  //         { text: '1', expanded: false, preventCollapse: false },
  //         { text: '2', expanded: false, preventCollapse: false },
  //         { text: '3', expanded: false, preventCollapse: false }
  //       ];
  //       fixture.detectChanges();
  //       rowElements = rootElement.queryAll(By.css('vgr-grid-row'));
  //     });
  //     describe('and the first row is focused', () => {
  //       beforeEach(() => {
  //         component.setFocusOnRow(0);
  //         fixture.detectChanges();
  //       });
  //       describe('and End is pressed', () => {
  //         beforeEach(() => {
  //           spy = spyOn(rootElement.componentInstance, 'setFocusOnRow');
  //           const rowHeaderElement = rowElements[0].query(By.css('.grid-row-container'));
  //           rowHeaderElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'End', bubbles: true }));

  //           fixture.detectChanges();
  //         });
  //         it('the last row has focus', () => {
  //           expect(spy).toHaveBeenCalledWith(3);
  //         });
  //       });
  //       describe('and ArrowDown is pressed', () => {
  //         beforeEach(() => {
  //           spy = spyOn(rootElement.componentInstance, 'setFocusOnRow');
  //           const rowHeaderElement = rowElements[0].query(By.css('.grid-row-container > .grid-row-header-focus'));
  //           rowHeaderElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowDown' }));
  //           fixture.detectChanges();
  //         });
  //         it('the next row has focus', () => {
  //           expect(spy).toHaveBeenCalledWith(1);
  //         });
  //       });
  //     });
  //     describe('and the last row is focused', () => {
  //       beforeEach(() => {
  //         component.setFocusOnRow(3);
  //         fixture.detectChanges();
  //       });
  //       describe('and Home is pressed', () => {
  //         beforeEach(() => {
  //           spy = spyOn(rootElement.componentInstance, 'setFocusOnRow');
  //           const rowHeaderElement = rowElements[3].query(By.css('.grid-row-container > .grid-row-header-focus'));
  //           rowHeaderElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'Home'}));
  //           fixture.detectChanges();
  //         });
  //         it('the first row has focus', () => {
  //           expect(spy).toHaveBeenCalledWith(0);
  //         });
  //       });
  //       describe('and ArrowUp is pressed', () => {
  //         beforeEach(() => {
  //           spy = spyOn(rootElement.componentInstance, 'setFocusOnRow');
  //           const rowHeaderElement = rowElements[3].query(By.css('.grid-row-container > .grid-row-header-focus'));
  //           rowHeaderElement.triggerEventHandler('keydown', new KeyboardEvent('keydown', { key: 'ArrowUp' }));
  //           fixture.detectChanges();
  //         });
  //         it('the previous row has focus', () => {
  //           expect(spy).toHaveBeenCalledWith(3);
  //         });
  //       });
  //     });
  //   });
  // });
});

