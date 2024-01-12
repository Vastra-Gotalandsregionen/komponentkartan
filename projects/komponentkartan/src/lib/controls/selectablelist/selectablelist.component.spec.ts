import { waitForAsync, ComponentFixture, TestBed, fakeAsync, tick, discardPeriodicTasks, flush } from '@angular/core/testing';

import { SelectablelistComponent } from './selectablelist.component';
import { SelectablelistHeaderColumnComponent } from './selectablelist.header-column.component';
import { SelectablelistColumnComponent } from './selectablelist.column.component';
import { SelectablelistHeaderComponent } from './selectablelist.header.component';
import { SelectablelistRowComponent } from './selectablelist.row.component';

import { Component, DebugElement, SimpleChange } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SelectablelistService } from './selectablelist.service';
import { ScrollbarComponent } from '../scrollbar/scrollbar.component';

@Component({
  selector: 'vgr-selectablelist-test',
  template: `
  <vgr-selectablelist [active]="true" id="djurlistan">
    <vgr-selectablelist-header>
      <vgr-selectablelist-header-column>Rubrik</vgr-selectablelist-header-column>
      <vgr-selectablelist-header-column [alignRight]="true">värde</vgr-selectablelist-header-column>
    </vgr-selectablelist-header>
    <vgr-selectablelist-row [groupheader]="true">
      <vgr-selectablelist-column>Djur</vgr-selectablelist-column>
      <vgr-selectablelist-column></vgr-selectablelist-column>
    </vgr-selectablelist-row>
    <vgr-selectablelist-row [value]="1">
      <vgr-selectablelist-column>Hund</vgr-selectablelist-column>
      <vgr-selectablelist-column>1</vgr-selectablelist-column>
    </vgr-selectablelist-row>
    <vgr-selectablelist-row [value]="2">
      <vgr-selectablelist-column>Katt</vgr-selectablelist-column>
      <vgr-selectablelist-column>2</vgr-selectablelist-column>
    </vgr-selectablelist-row>
    <vgr-selectablelist-row [value]="3">
      <vgr-selectablelist-column>Kanin</vgr-selectablelist-column>
      <vgr-selectablelist-column>3</vgr-selectablelist-column>
    </vgr-selectablelist-row>
    <vgr-selectablelist-row [value]="4">
      <vgr-selectablelist-column>Spndel</vgr-selectablelist-column>
      <vgr-selectablelist-column>4</vgr-selectablelist-column>
    </vgr-selectablelist-row>
    <vgr-selectablelist-row [value]="5">
      <vgr-selectablelist-column>Kråka</vgr-selectablelist-column>
      <vgr-selectablelist-column>5</vgr-selectablelist-column>
    </vgr-selectablelist-row>
    <vgr-selectablelist-row [value]="6">
      <vgr-selectablelist-column>Anka</vgr-selectablelist-column>
      <vgr-selectablelist-column>6</vgr-selectablelist-column>
    </vgr-selectablelist-row>
    <vgr-selectablelist-row [value]="7">
      <vgr-selectablelist-column>Elefant</vgr-selectablelist-column>
      <vgr-selectablelist-column>7</vgr-selectablelist-column>
    </vgr-selectablelist-row>
    <vgr-selectablelist-row [value]="8">
      <vgr-selectablelist-column>Zebra</vgr-selectablelist-column>
      <vgr-selectablelist-column>8</vgr-selectablelist-column>
    </vgr-selectablelist-row>
  </vgr-selectablelist>
  `
}) class TestSelectablelistComponent { }


describe('SelectablelistComponent', () => {
  let component: SelectablelistComponent;
  let fixture: ComponentFixture<TestSelectablelistComponent>;
  let rootElement: DebugElement;
  let selectionChangedSpy: jasmine.Spy;
  let rows: SelectablelistRowComponent[];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestSelectablelistComponent,
        SelectablelistComponent,
        SelectablelistHeaderComponent,
        SelectablelistHeaderColumnComponent,
        SelectablelistRowComponent,
        SelectablelistColumnComponent,
        ScrollbarComponent
      ],
      providers: [
        { provide: SelectablelistService },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestSelectablelistComponent);
    fixture.detectChanges();
    component = fixture.debugElement.query(By.directive(SelectablelistComponent)).componentInstance;
    rootElement = fixture.debugElement;
    selectionChangedSpy = spyOn(component.selectedChanged, 'emit').and.callThrough();
    rows = component.rows.toArray();
  });

  describe('When activated', () => {
    beforeEach(() => {
      component.active = false;
      component.ngOnChanges({
        active: new SimpleChange(true, false, false)
      });
      component.active = true;
      component.ngOnChanges({
        active: new SimpleChange(false, true, false)
      });
      fixture.detectChanges();
    });

    xit('should not select the first selectable row (row 2)', () => {
      const isAnySelected = rows.some(r => r.selected);
      expect(isAnySelected).toBe(true);
      expect(rows[1].selected).toBe(true);
    });

    it('should not select the groupheader row (even if its the first)', () => {
      expect(rows[0].selected).not.toBe(true);
      expect(rows[0].groupheader).toBe(true);
    });

    it('second headercolumn should be align right', () => {
      const secondColumn = rootElement.queryAll(By.directive(SelectablelistHeaderColumnComponent))[1];
      expect(secondColumn.classes['right']).toBe(true);
    });

  });

  describe('when "Kanin" row is clicked', () => {
    beforeEach(fakeAsync(() => {
      selectionChangedSpy.calls.reset();
      component.clearSelection();
      component.active = true;
      const kaninRow = rootElement.queryAll(By.directive(SelectablelistRowComponent))
        .filter(item => item.nativeElement.innerText.includes('Kanin'))[0];
      kaninRow.triggerEventHandler('click', {});
      fixture.detectChanges();
      tick(400);
      fixture.detectChanges();
      tick(Infinity);
      discardPeriodicTasks();
      flush();
    }));

    it('"Kaninrow" should be the selected', () => {
      expect(rows[3].selected).toBe(true);
      expect(rows.filter(row => row.selected === true).length).toBe(1);
    });

    it('should emit event that selection is changed', () => {
      expect(selectionChangedSpy).toHaveBeenCalledWith([3]);
    });
  });

  describe('when both "Kanin" and "Hund" rows are clicked', () => { // removed because multiselect not yet implemented
    beforeEach(fakeAsync(() => {
      selectionChangedSpy.calls.reset();
      component.clearSelection();
      component.active = true;
      const kaninRow = rootElement.queryAll(By.directive(SelectablelistRowComponent))
        .filter(item => item.nativeElement.innerText.includes('Kanin'))[0];
      const hundRow = rootElement.queryAll(By.directive(SelectablelistRowComponent))
        .filter(item => item.nativeElement.innerText.includes('Hund'))[0];
      kaninRow.nativeElement.click();
      hundRow.nativeElement.click();
      tick(400);
      fixture.detectChanges();
      tick(Infinity);
      discardPeriodicTasks();
      flush();
    }));

    it('Both rows should be selected', () => {
      expect(rows[3].selected).toBe(true);
      expect(rows[1].selected).toBe(true);
      expect(rows.filter(row => row.selected === true).length).toBe(2);
    });

    it('should emit event that selection is changed', () => {
      expect(selectionChangedSpy).toHaveBeenCalledWith([1, 3]);
    });
  });

  // Dessa tester failar väldigt ofta lokalt (men aldrig på servern), Bör ses över någon gång, tills vidare har jag inaktiverat dem /Arvid
  xdescribe('Setting focus to the list', () => {
    let list: DebugElement;
    beforeEach(() => {
      selectionChangedSpy.calls.reset();
      component.clearSelection();
      component.active = true;
      list = rootElement.query(By.directive(SelectablelistComponent));
      list.nativeElement.focus();
      fixture.detectChanges();
    });

    it('should set focusclass and aria-activedecendants', () => {
      const row = rootElement.queryAll(By.directive(SelectablelistRowComponent))[0];
      expect(row.classes['focused']).toBe(true);
      expect(list.attributes['aria-activedescendant']).toBe('djurlistan-row0');
    });

    describe('Pressing arrow up twice', () => {
      beforeEach(() => {
        list.triggerEventHandler('keydown', { keyCode: 38, preventDefault: () => { } });
        list.triggerEventHandler('keydown', { keyCode: 38, preventDefault: () => { } });
        fixture.detectChanges();
      });
      it('should focus on the eigth element in the list', () => {
        const row = rootElement.queryAll(By.directive(SelectablelistRowComponent))[7];
        expect(row.classes['focused']).toBe(true);
      });

      describe('pressing down 7 times', () => {
        beforeEach(() => {
          list.triggerEventHandler('keydown', { keyCode: 40, preventDefault: () => { } });
          list.triggerEventHandler('keydown', { keyCode: 40, preventDefault: () => { } });
          list.triggerEventHandler('keydown', { keyCode: 40, preventDefault: () => { } });
          list.triggerEventHandler('keydown', { keyCode: 40, preventDefault: () => { } });
          list.triggerEventHandler('keydown', { keyCode: 40, preventDefault: () => { } });
          list.triggerEventHandler('keydown', { keyCode: 40, preventDefault: () => { } });
          list.triggerEventHandler('keydown', { keyCode: 40, preventDefault: () => { } });
          fixture.detectChanges();
        });
        it('Row 6 should be focused', () => {
          const row = rootElement.queryAll(By.directive(SelectablelistRowComponent))[5];
          expect(row.classes['focused']).toBe(true);
        });

        describe('pressing space', () => {
          beforeEach(() => {
            selectionChangedSpy.calls.reset();
            list.triggerEventHandler('keydown', { keyCode: 32, preventDefault: () => { } });
            list.triggerEventHandler('keydown', { keyCode: 32, preventDefault: () => { }, repeat: true });
            fixture.detectChanges();
          });
          it('should select the row and emit event', () => {
            expect(rows[5].selected).toBe(true);
            expect(selectionChangedSpy).toHaveBeenCalledWith([5]);
          });
        });
      });
    });
  });

  describe('Removing focus from the list', () => {
    let list: DebugElement;
    beforeEach(() => {
      component.active = true;
      list = rootElement.query(By.directive(SelectablelistComponent));
      list.nativeElement.focus();
      fixture.detectChanges();
      list.nativeElement.blur();
      fixture.detectChanges();
    });
    it('should remove the focusclass and aria-activedecendants', () => {
      const row = rootElement.queryAll(By.directive(SelectablelistRowComponent))[0];
      expect(row.classes['focused']).not.toBe(true);
      expect(component.activeDecendant).toBe(null);
    });
  });


  describe('When deactivated', () => {
    beforeEach(() => {
      component.active = false;
      component.ngOnChanges({
        active: new SimpleChange(true, false, true)
      });
      fixture.detectChanges();
    });

    it('should clear all selected', () => {
      const isanySelected = component.rows.toArray().some(row => row.selected);
      expect(isanySelected).toBe(false);
    });
  });

});
