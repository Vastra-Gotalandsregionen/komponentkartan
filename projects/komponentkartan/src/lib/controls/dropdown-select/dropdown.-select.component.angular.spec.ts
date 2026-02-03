import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, DebugElement, provideZoneChangeDetection, NgModule } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule, FormControl } from '@angular/forms';

import { DropdownSelectComponent } from './dropdown-select.component';
import { DropdownItemComponent } from './dropdown-item.component';
import { ButtonComponent } from '../button/button.component';
import { TruncatePipe } from '../../pipes/truncatePipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from '../icon/icon.component';
import { IconModule } from '../icon/icon.module';
import { ErrorMessagePipe } from '../../pipes/errorMessagePipe';

import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { InputComponent } from '../input/input.component';
import { ScrollbarComponent } from '../scrollbar/scrollbar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

@Component({
    selector: 'vgr-test',
    template: `
  <vgr-dropdown-select [formControl]="form">
    @for (item of items; track item) {
      <vgr-dropdown-item [value]="item">{{item}}</vgr-dropdown-item>
    }
  </vgr-dropdown-select>
  `,
    standalone: false
})
export class TestComponent {
  @Input() items = [];
  form = new FormControl();
}

@NgModule({ providers: [ provideZoneChangeDetection() ] })
export class ZoneChangeDetectionModule {}


describe('[DropdownSelectComponent - Angular]', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: DropdownSelectComponent;
  let rootElement: DebugElement;
  let headerElement: DebugElement;
  let menuElement: DebugElement;
  let filterElement: InputComponent;
  let deselectElement: DebugElement;
  let selectAllElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment([ZoneChangeDetectionModule, BrowserDynamicTestingModule], platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
});
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule, IconModule, FormsModule, NgScrollbarModule],
      declarations: [
        TestComponent,
        DropdownSelectComponent,
        DropdownItemComponent,
        ButtonComponent,
        TruncatePipe,
        IconComponent,
        ErrorMessagePipe,
        InputComponent,
        ScrollbarComponent
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      testComponent = fixture.componentInstance;
      rootElement = fixture.debugElement.query(By.css('vgr-dropdown-select'));
      headerElement = rootElement.query(By.css('.dropdown-select__header'));
      component = rootElement.componentInstance;
      filterElement = component.filter;
      fixture.detectChanges();
      done();
    });
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
      it('event is emitted', () => {
        const spy = spyOn(component.expandedChanged, 'emit');
        headerElement.triggerEventHandler('click', {});
        expect(spy).toHaveBeenCalledWith(true);
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
      it('event is emitted', () => {
        const spy = spyOn(component.expandedChanged, 'emit');
        headerElement.triggerEventHandler('click', {});
        expect(spy).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('When there are 20 items or less', () => {
    beforeEach(() => {
      component.expanded = true;
      fixture.componentInstance.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
      fixture.detectChanges();
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
      filterElement = component.filter;
    });
    it('filter is shown', () => {
      expect(filterElement).toBeTruthy();
    });
    describe('and filter is applied', () => {
      beforeEach(() => {
        component.searchString = '1';
        component.filterItems();
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
          expect(itemElements[0].classes['dropdown-item--selected']).not.toBe(true);
          expect(itemElements[1].classes['dropdown-item--selected']).not.toBe(true);
          expect(itemElements[2].classes['dropdown-item--selected']).not.toBe(true);
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
          expect(itemElements[0].classes['dropdown-item--selected']).not.toBe(true);
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
          expect(itemElements[0].classes['dropdown-item--selected']).not.toBe(true);
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
          expect(itemElements[0].classes['dropdown-item--selected']).not.toBe(true);
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
