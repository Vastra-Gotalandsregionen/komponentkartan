import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { DropdownSelectComponent } from './dropdown-select.component';
import { DropdownItemComponent } from './dropdown-item.component';
import { ButtonComponent } from '../button/button.component';
import { TruncatePipe } from '../../pipes/truncatePipe';

@Component({
  selector: 'perfect-scrollbar',
  template: `
  <div class="ps">
    <ng-content></ng-content>
  </div>
  `
})
class MockPerfectScrollbarComponent {
  @Input() config;
}

@Component({
  selector: 'vgr-test',
  template: `
  <vgr-dropdown-select [formControl]="form">
    <vgr-dropdown-item *ngFor="let item of items" [value]="item">{{item}}</vgr-dropdown-item>
  </vgr-dropdown-select>
  `
})
export class TestComponent {
  @Input() items = [];
  form = new FormControl();
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
  let selectAllElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
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
    let itemElements: DebugElement[];
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
    let itemElements: DebugElement[];
    let spy: jasmine.Spy;
    beforeEach(() => {
      fixture.componentInstance.items = [1, 2, 3];
      component.expanded = true;
      component.multi = true;
      fixture.detectChanges();
      itemElements = rootElement.queryAll(By.css('.dropdown-select__menu__items__item'));
      spy = spyOn(component.selectedChanged, 'emit');
    });
    it('select all is shown', () => {
      selectAllElement = rootElement.query(By.css('.dropdown-select__menu__header__select-all'));
      expect(selectAllElement).toBeTruthy();
    });
    describe('and select all is clicked', () => {
      beforeEach(() => {
        selectAllElement = rootElement.query(By.css('.dropdown-select__menu__header__select-all'));
        selectAllElement.triggerEventHandler('click', {});
        fixture.detectChanges();
      });
      it('all items are selected', () => {
        expect(itemElements[0].classes['dropdown-item--selected']).toBe(true);
        expect(itemElements[1].classes['dropdown-item--selected']).toBe(true);
        expect(itemElements[2].classes['dropdown-item--selected']).toBe(true);
      });
      it('label is set', () => {
        const headerLabelElement = headerElement.query(By.css('.dropdown-select__header__label'));
        const headerLabelText = (headerLabelElement.nativeElement as HTMLElement).textContent;
        expect(headerLabelText).toBe('1, 2, 3');
      });
      it('value is set', () => {
        expect(testComponent.form.value).toEqual([1, 2, 3]);
      });
      it('event is emitted', () => {
        expect(spy).toHaveBeenCalledWith([1, 2, 3]);
      });
      describe('and select all is clicked again', () => {
        beforeEach(() => {
          selectAllElement.triggerEventHandler('click', {});
          fixture.detectChanges();
        });
        it('all items are deselected', () => {
          expect(itemElements[0].classes['dropdown-item--selected']).toBe(false);
          expect(itemElements[1].classes['dropdown-item--selected']).toBe(false);
          expect(itemElements[2].classes['dropdown-item--selected']).toBe(false);
        });
        it('label is set', () => {
          const headerLabelElement = headerElement.query(By.css('.dropdown-select__header__label'));
          const headerLabelText = (headerLabelElement.nativeElement as HTMLElement).textContent;
          expect(headerLabelText).toBe(component.noItemSelectedLabel);
        });
        it('value is set', () => {
          expect(testComponent.form.value).toBeNull();
        });
        it('event is emitted', () => {
          expect(spy).toHaveBeenCalledWith(null);
        });
      });
    });
    describe('and unselected item is clicked', () => {
      beforeEach(() => {
        itemElements[0].triggerEventHandler('click', {});
        fixture.detectChanges();
      });
      it('item is selected', () => {
        expect(itemElements[0].classes['dropdown-item--selected']).toBe(true);
      });
      it('label is set', () => {
        const headerLabelElement = headerElement.query(By.css('.dropdown-select__header__label'));
        const headerLabelText = (headerLabelElement.nativeElement as HTMLElement).textContent;
        expect(headerLabelText).toBe('1');
      });
      it('value is set', () => {
        expect(testComponent.form.value).toEqual([1]);
      });
      it('event is emitted', () => {
        expect(spy).toHaveBeenCalledWith([1]);
      });
      describe('and then other unselected item is clicked', () => {
        beforeEach(() => {
          itemElements[1].triggerEventHandler('click', {});
          fixture.detectChanges();
        });
        it('both items are selected', () => {
          expect(itemElements[0].classes['dropdown-item--selected']).toBe(true);
          expect(itemElements[1].classes['dropdown-item--selected']).toBe(true);
        });
        it('label is set', () => {
          const headerLabelElement = headerElement.query(By.css('.dropdown-select__header__label'));
          const headerLabelText = (headerLabelElement.nativeElement as HTMLElement).textContent;
          expect(headerLabelText).toBe('1, 2');
        });
        it('value is set', () => {
          expect(testComponent.form.value).toEqual([1, 2]);
        });
        it('event is emitted', () => {
          expect(spy).toHaveBeenCalledWith([1, 2]);
        });
      });
      describe('and then selected item is clicked', () => {
        beforeEach(() => {
          itemElements[0].triggerEventHandler('click', {});
          fixture.detectChanges();
        });
        it('item is deselected', () => {
          expect(itemElements[0].classes['dropdown-item--selected']).toBe(false);
        });
        it('label is set', () => {
          const headerLabelElement = headerElement.query(By.css('.dropdown-select__header__label'));
          const headerLabelText = (headerLabelElement.nativeElement as HTMLElement).textContent;
          expect(headerLabelText).toBe(component.noItemSelectedLabel);
        });
        it('value is set', () => {
          expect(testComponent.form.value).toBeNull();
        });
        it('event is emitted', () => {
          expect(spy).toHaveBeenCalledWith(null);
        });
      });
    });
  });

  describe('When multi is false', () => {
    let itemElements: DebugElement[];
    let spy: jasmine.Spy;
    beforeEach(() => {
      fixture.componentInstance.items = [1, 2, 3];
      component.expanded = true;
      component.multi = false;
      fixture.detectChanges();
      itemElements = rootElement.queryAll(By.css('.dropdown-select__menu__items__item'));
      spy = spyOn(component.selectedChanged, 'emit');
    });
    describe('and unselected item is clicked', () => {
      beforeEach(() => {
        itemElements[0].triggerEventHandler('click', {});
        fixture.detectChanges();
      });
      it('item is selected', () => {
        expect(itemElements[0].classes['dropdown-item--selected']).toBe(true);
      });
      it('label is set', () => {
        const headerLabelElement = headerElement.query(By.css('.dropdown-select__header__label'));
        const headerLabelText = (headerLabelElement.nativeElement as HTMLElement).textContent;
        expect(headerLabelText).toBe('1');
      });
      it('value is set', () => {
        expect(testComponent.form.value).toBe(1);
      });
      it('event is emitted', () => {
        expect(spy).toHaveBeenCalledWith(1);
      });
      describe('and then other item is clicked', () => {
        beforeEach(() => {
          itemElements[1].triggerEventHandler('click', {});
          fixture.detectChanges();
        });
        it('previous item is deselected', () => {
          expect(itemElements[0].classes['dropdown-item--selected']).toBe(false);
        });
        it('new item is selected', () => {
          expect(itemElements[1].classes['dropdown-item--selected']).toBe(true);
        });
        it('label is set', () => {
          const headerLabelElement = headerElement.query(By.css('.dropdown-select__header__label'));
          const headerLabelText = (headerLabelElement.nativeElement as HTMLElement).textContent;
          expect(headerLabelText).toBe('2');
        });
        it('value is set', () => {
          expect(testComponent.form.value).toBe(2);
        });
        it('event is emitted', () => {
          expect(spy).toHaveBeenCalledWith(2);
        });
      });
      describe('and deselect button is clicked', () => {
        beforeEach(() => {
          component.expanded = true;
          component.deselectable = true;
          fixture.detectChanges();
          deselectElement = rootElement.query(By.css('.dropdown-select__menu__header__deselect'));
          deselectElement.triggerEventHandler('click', {});
          fixture.detectChanges();
        });
        it('item is deselected', () => {
          expect(itemElements[0].classes['dropdown-item--selected']).toBe(false);
        });
        it('label is set', () => {
          const headerLabelElement = headerElement.query(By.css('.dropdown-select__header__label'));
          const headerLabelText = (headerLabelElement.nativeElement as HTMLElement).textContent;
          expect(headerLabelText).toBe(component.noItemSelectedLabel);
        });
        it('value is set', () => {
          expect(testComponent.form.value).toBeNull();
        });
        it('event is emitted', () => {
          expect(spy).toHaveBeenCalledWith(null);
        });
      });
    });
  });
});
