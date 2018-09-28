import { TableComponent } from './table.component';
import { TableHeaderComponent } from './table-header.component';
import { TableHeaderColumnComponent } from './table-header-column.component';
import { TableRowComponent } from './table-row.component';
import { TableRowColumnComponent } from './table-row-column.component';

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
        TableRowColumnComponent
      ],
      imports: [CommonModule, BrowserAnimationsModule]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestTableComponent);
      component = fixture.debugElement.query(By.directive(TableComponent)).componentInstance;
      rootElement = fixture.debugElement.query(By.directive(TableComponent));
      fixture.detectChanges();
      done();
    });
  });

  describe('When component is initialized with expanded = true', () => {

    it('headerrow does not have class collapsed', () => {
      expect(rootElement.query(By.css('.table-header')).classes['collapsed']).toBe(undefined);
    });
    it('headerrow do have class expanded', () => {
      expect(rootElement.query(By.css('.table-header')).classes['expanded']).toBe(true);
    });

    describe('and table header is clicked', () => {
      beforeEach(() => {
        spyOn(component.expandedChanged, 'emit').and.callThrough();

        rootElement.children[0].triggerEventHandler('click', event);
        fixture.detectChanges();
      });

      it('expandedChanged has been called', () => {
        expect(component.expandedChanged.emit).toHaveBeenCalledWith(false);
      });
      it('headerrow does not have class collapsed', () => {
        expect(rootElement.query(By.css('.table-header')).classes['collapsed']).toBe(true);
      });
      it('headerrow do have class expanded', () => {
        expect(rootElement.query(By.css('.table-header')).classes['expanded']).toBe(false);
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
      it('headerrow do have class collapsed', () => {
        expect(rootElement.query(By.css('.table-header')).classes['collapsed']).toBe(true);
      });
      it('headerrow does not have class expanded', () => {
        expect(rootElement.query(By.css('.table-header')).classes['expanded']).toBe(false);
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
        it('headerrow do have class expanded', () => {
          expect(rootElement.query(By.css('.table-header')).classes['expanded']).toBe(true);
        });
        it('headerrow does not have class collapsed', () => {
          expect(rootElement.query(By.css('.table-header')).classes['collapsed']).toBe(false);
        });
      });

    });

  });
});
