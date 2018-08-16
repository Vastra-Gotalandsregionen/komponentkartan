
import { TableComponent } from './table.component';
import { TableHeaderComponent } from './table-header.component';
import { TableHeaderColumnComponent } from './table-header-column.component';
import { TableRowComponent } from './table-row.component';
import { TableRowColumnComponent } from './table-row-column.component';

import { ExpandableDivComponent } from '../expandableDiv/expandableDiv.component';
import { ExpandableDivHeaderComponent } from '../expandableDiv/expandableDiv-header.component';
import { ExpandableDivContentComponent } from '../expandableDiv/expandableDiv-content.component';

import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { DebugElement, Component } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@Component({
  selector: 'vgr-test-table-component',
  template: `
    <vgr-table [expanded]="true">
      <vgr-table-header>
        <vgr-table-header-column>Header Column</vgr-table-header-column>
      </vgr-table-header>
      <vgr-table-row>
        <vgr-table-row-column>Row Column</vgr-table-row-column>
      </vgr-table-row>
    </vgr-table>
          `
})
class TestTableComponent { }


describe('[TestTableComponent]', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TestTableComponent>;

  let rootElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [
        TestTableComponent,
        TableComponent,
        TableHeaderComponent,
        TableHeaderColumnComponent,
        TableRowComponent,
        TableRowColumnComponent,
        ExpandableDivComponent,
        ExpandableDivHeaderComponent,
        ExpandableDivContentComponent
      ],
      imports: [CommonModule, BrowserAnimationsModule]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestTableComponent);
      component = fixture.debugElement.query(By.directive(ExpandableDivComponent)).componentInstance;
      rootElement = fixture.debugElement.query(By.directive(ExpandableDivComponent));
      fixture.detectChanges();
      done();
    });
  });

  describe('When component is initialized with expanded = true', () => {

    it('component has class expandable-div', () => {
      expect(rootElement.classes['expandable-div']).toBe(true);
    });
    it('component does not have class expandable-div--collapsed', () => {
      expect(rootElement.classes['expandable-div--collapsed']).toBe(false);
    });
    it('component does not have class expandable-div--expanded', () => {
      expect(rootElement.classes['expandable-div--expanded']).toBe(true);
    });

    describe('and table header is clicked', () => {
      beforeEach(() => {
        spyOn(component.expandedChanged, 'emit').and.callThrough();

        rootElement.children[0].triggerEventHandler('click', event);
        fixture.detectChanges();
      });

      it('expandedChanged has been called', () => {
        console.log(rootElement.classes);
        expect(component.expandedChanged.emit).toHaveBeenCalledWith(false);
      });
      it('component has class expandable-div', () => {
        expect(rootElement.classes['expandable-div']).toBe(true);
      });
      it('component has class expandable-div--collapsed', () => {
        expect(rootElement.classes['expandable-div--collapsed']).toBe(true);
      });
      it('component does not have class expandable-div--expanded', () => {
        expect(rootElement.classes['expandable-div--expanded']).toBe(false);
      });
    });

    describe('table is expanded, row is focused and enter is pressed', () => {
      beforeEach(() => {
        spyOn(component.expandedChanged, 'emit').and.callThrough();

        const keyEvent = new KeyboardEvent('keydown', {key: 'Enter'});
        const focusedElement = rootElement.children[0];
        Object.defineProperty(keyEvent, 'keyCode', {'value' : 13});
        Object.defineProperty(keyEvent, 'target', {'value' : focusedElement.nativeElement});
        component.toggleRow(keyEvent);
        fixture.detectChanges();
      });

      it('expandedChanged has been called', () => {
        expect(component.expandedChanged.emit).toHaveBeenCalledWith(false);
      });
      it('component has class expandable-div', () => {
        expect(rootElement.classes['expandable-div']).toBe(true);
      });
      it('component has class expandable-div--collapsed', () => {
        expect(rootElement.classes['expandable-div--collapsed']).toBe(true);
      });
      it('component does not have class expandable-div--expanded', () => {
        expect(rootElement.classes['expandable-div--expanded']).toBe(false);
      });

      describe('table is collapsed, row is focused and enter is space', () => {
        beforeEach(() => {

          const keyEvent = new KeyboardEvent('keydown', {key: 'Enter'});
          const focusedElement = rootElement.children[0];
          Object.defineProperty(keyEvent, 'keyCode', {'value' : 32});
          Object.defineProperty(keyEvent, 'target', {'value' : focusedElement.nativeElement});
          component.toggleRow(keyEvent);
          fixture.detectChanges();
        });

        it('expandedChanged has been called', () => {
          expect(component.expandedChanged.emit).toHaveBeenCalledWith(false);
        });
        it('component has class expandable-div', () => {
          expect(rootElement.classes['expandable-div']).toBe(true);
        });
        it('component does not have class expandable-div--collapsed', () => {
          expect(rootElement.classes['expandable-div--collapsed']).toBe(false);
        });
        it('component has class expandable-div--expanded', () => {
          expect(rootElement.classes['expandable-div--expanded']).toBe(true);
        });
      });

    });

  });
});
