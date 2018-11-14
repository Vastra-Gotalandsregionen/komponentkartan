import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { DropdownSelectComponent } from './dropdown-select.component';
import { DropdownItemComponent } from './dropdown-item.component';
import { ButtonComponent } from '../button/button.component';
import { TruncatePipe } from '../../pipes/truncatePipe';

@Component({
  selector: 'perfect-scrollbar',
  template: '<ng-content></ng-content>'
})
class MockPerfectScrollbarComponent {
  @Input() config;
}

@Component({
  selector: 'vgr-test',
  template: `
  <vgr-dropdown-select>
    <vgr-dropdown-item *ngFor="let item of items">{{item}}</vgr-dropdown-item>
  </vgr-dropdown-select>
  `
})
export class TestComponent {
  @Input() items = [];
}

describe('[DropdownSelectComponent - Angular]', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: DropdownSelectComponent;
  let rootElement: DebugElement;
  let headerElement: DebugElement;
  let menuElement: DebugElement;
  let filterElement: DebugElement;
  let deselectElement: DebugElement;
  let itemElements: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TestComponent,
        DropdownSelectComponent,
        DropdownItemComponent,
        ButtonComponent,
        MockPerfectScrollbarComponent,
        TruncatePipe
      ]
    });
    fixture = TestBed.createComponent(TestComponent);
    testComponent = fixture.componentInstance;
    rootElement = fixture.debugElement.query(By.css('vgr-dropdown-select'));
    headerElement = rootElement.query(By.css('.dropdown-select__header'));
    component = rootElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When header is clicked', () => {
    describe('and menu is collapsed', () => {
      beforeEach(() => {
        component.expanded = false;
      });
      it('menu is expanded', () => {
        headerElement.triggerEventHandler('click', {});
        fixture.detectChanges();
        menuElement = rootElement.query(By.css('.dropdown-select__menu'));
        expect(menuElement).toBeTruthy();
      });
      describe('and component is disabled', () => {
        beforeEach(() => {
          component.disabled = true;
        });
        it('menu is not expanded', () => {
          headerElement.triggerEventHandler('click', {});
          fixture.detectChanges();
          menuElement = rootElement.query(By.css('.dropdown-select__menu'));
          expect(menuElement).toBeFalsy();
        });
      });
      describe('and component is readonly', () => {
        beforeEach(() => {
          component.readonly = true;
        });
        it('menu is not expanded', () => {
          headerElement.triggerEventHandler('click', {});
          fixture.detectChanges();
          menuElement = rootElement.query(By.css('.dropdown-select__menu'));
          expect(menuElement).toBeFalsy();
        });
      });
    });
    describe('and menu is expanded', () => {
      beforeEach(() => {
        component.expanded = true;
      });
      it('menu is collapsed', () => {
        headerElement.triggerEventHandler('click', {});
        fixture.detectChanges();
        menuElement = rootElement.query(By.css('.dropdown-select__menu'));
        expect(menuElement).toBeFalsy();
      });
    });
  });

  describe('When there are 20 items or less', () => {
    beforeEach(() => {
      component.expanded = true;
      fixture.componentInstance.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      fixture.detectChanges();
      filterElement = rootElement.query(By.css('.dropdown-select__menu__header__filter'));
    });
    it('filter is not shown', () => {
      expect(filterElement).toBeFalsy();
    });
  });

  describe('When there are more than 20 items', () => {
    beforeEach(() => {
      component.expanded = true;
      fixture.componentInstance.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      fixture.detectChanges();
      filterElement = rootElement.query(By.css('.dropdown-select__menu__header__filter'));
    });
    it('filter is shown', () => {
      expect(filterElement).toBeTruthy();
    });
    describe('and filter is applied', () => {
      beforeEach(() => {
        const filterInputElement = filterElement.query(By.css('input'));
        filterInputElement.nativeElement.value = '1';
        filterInputElement.triggerEventHandler('input', {});
        fixture.detectChanges();
      });
      it('only matching items are shown', () => {
        itemElements = rootElement.queryAll(By.css('.dropdown-select__menu__items__item'));
        expect(itemElements.length).toBe(12);
      });
    });
  });

  describe('When deselectable is true', () => {
    beforeEach(() => {
      component.expanded = true;
      component.deselectable = true;
      fixture.detectChanges();
    });
    it('deselect button is shown', () => {
      deselectElement = rootElement.query(By.css('.dropdown-select__menu__header__deselect'));
      expect(deselectElement).toBeTruthy();
    });
    describe('and multi is true', () => {
      beforeEach(() => {
        component.multi = true;
        fixture.detectChanges();
      });
      it('deselect button is not shown', () => {
        deselectElement = rootElement.query(By.css('.dropdown-select__menu__header__deselect'));
        expect(deselectElement).toBeFalsy();
      });
    });
  });

  describe('When multi is true', () => {
    beforeEach(() => {
      component.multi = true;
      fixture.detectChanges();
    });
    it('select all is shown', () => { });
  });
});
