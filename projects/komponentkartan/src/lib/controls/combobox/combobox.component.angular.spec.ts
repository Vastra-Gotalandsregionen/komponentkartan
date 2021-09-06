import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, Input, DebugElement, ElementRef } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ComboboxComponent } from './combobox.component';
import { ComboboxItemComponent } from './combobox-item.component';
import { TruncatePipe } from '../../pipes/truncatePipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from '../icon/icon.component';
import { IconModule } from '../icon/icon.module';
import { ErrorMessagePipe } from '../../pipes/errorMessagePipe';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

@Component({
  selector: 'vgr-test',
  template: `
  <vgr-combobox [formControl]="form">
    <vgr-combobox-item *ngFor="let item of items" [value]="item">{{item}}</vgr-combobox-item>
  </vgr-combobox>
  `
})
export class TestComponent {
  @Input() items = [];
  form = new FormControl();
}

describe('[ComboboxComponent - Angulatr]', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: ComboboxComponent;
  let rootElement: DebugElement;
  let headerElement: DebugElement;
  let expandButtonElement: DebugElement;
  let menuElement: DebugElement;
  let textInputElement: ElementRef;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule, IconModule, PerfectScrollbarModule, FormsModule],
      declarations: [
        TestComponent,
        ComboboxComponent,
        ComboboxItemComponent,
        TruncatePipe,
        IconComponent,
        ErrorMessagePipe,
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      testComponent = fixture.componentInstance;   
      testComponent.items = [1, 2, 3, 4, 5];   
      rootElement = fixture.debugElement.query(By.css('vgr-combobox'));
      headerElement = rootElement.query(By.css('.combobox__header'));     
      component = rootElement.componentInstance;
      fixture.detectChanges();
      done();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When button is clicked', () => {
    describe('and menu is collapsed', () => {
      beforeEach(() => {
        component.showButton = true;
        component.expanded = false;
        component.searchString = null;
        expandButtonElement = rootElement.query(By.css('.combobox__header__button'));
      });
      it('menu is expanded', () => {
        expandButtonElement.triggerEventHandler('click', {});
        fixture.detectChanges();
        
        menuElement = rootElement.query(By.css('.combobox__menu')); 
        expect(menuElement).toBeTruthy();
      });
      it('event is emitted', () => {
        const spy = spyOn(component.expandedChanged, 'emit');
        expandButtonElement.triggerEventHandler('click', {});
        expect(spy).toHaveBeenCalledWith(true);
      });
      describe('and component is disabled', () => {
        beforeEach(() => {
          component.disabled = true;
        });
        it('menu is not expanded', () => {
          expandButtonElement.triggerEventHandler('click', {});
          fixture.detectChanges();
          menuElement = rootElement.query(By.css('.combobox__menu'));
          expect(menuElement).toBeFalsy();
        });
      });
      describe('and component is readonly', () => {
        beforeEach(() => {
          component.readonly = true;
        });
        it('menu is not expanded', () => {
          expandButtonElement.triggerEventHandler('click', {});
          fixture.detectChanges();
          menuElement = rootElement.query(By.css('.combobox__menu'));
          expect(menuElement).toBeFalsy();
        });
      });
    });
  });

  describe('When there are more than 20 items', () => {
    let itemElements: DebugElement[];
    beforeEach(() => {
      component.expanded = true;
      fixture.componentInstance.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      fixture.detectChanges();
      textInputElement = component.textInput;
    });

    describe('and filter is applied', () => {
      beforeEach(() => {
        component.searchString = '1';
        component.filterItems();
        fixture.detectChanges();
      });
      it('only matching items are shown', () => {
        itemElements = rootElement.queryAll(By.css('.combobox__menu__items__item'));
        expect(itemElements.length).toBe(11);
      });
    });
  });

  // describe('When multi is false', () => {
  //   let itemElements: DebugElement[];
  //   let spy: jasmine.Spy;
  //   beforeEach(() => {
  //     fixture.componentInstance.items = [1, 2, 3];
  //     component.expanded = true;
  //     fixture.detectChanges();
  //     itemElements = rootElement.queryAll(By.css('.combobox__menu__items__item'));
  //     spy = spyOn(component.selectedChanged, 'emit');
  //   });
  //   describe('and unselected item is clicked', () => {
  //     beforeEach(() => {
  //       itemElements[0].triggerEventHandler('click', {});
  //       fixture.detectChanges();
  //     });
  //     it('item is selected', () => {
  //       expect(itemElements[0].classes['dropdown-item--selected']).toBe(true);
  //     });
  //     it('label is set', () => {
  //       const headerLabelElement = headerElement.query(By.css('.dropdown-select__header__label'));
  //       const headerLabelText = (headerLabelElement.nativeElement as HTMLElement).textContent;
  //       expect(headerLabelText).toBe('1');
  //     });
  //     it('value is set', () => {
  //       expect(testComponent.form.value).toBe(1);
  //     });
  //     it('event is emitted', () => {
  //       expect(spy).toHaveBeenCalledWith(1);
  //     });
  //     describe('and then other item is clicked', () => {
  //       beforeEach(() => {
  //         itemElements[1].triggerEventHandler('click', {});
  //         fixture.detectChanges();
  //       });
  //       it('previous item is deselected', () => {
  //         expect(itemElements[0].classes['dropdown-item--selected']).not.toBe(true);
  //       });
  //       it('new item is selected', () => {
  //         expect(itemElements[1].classes['dropdown-item--selected']).toBe(true);
  //       });
  //       it('label is set', () => {
  //         const headerLabelElement = headerElement.query(By.css('.dropdown-select__header__label'));
  //         const headerLabelText = (headerLabelElement.nativeElement as HTMLElement).textContent;
  //         expect(headerLabelText).toBe('2');
  //       });
  //       it('value is set', () => {
  //         expect(testComponent.form.value).toBe(2);
  //       });
  //       it('event is emitted', () => {
  //         expect(spy).toHaveBeenCalledWith(2);
  //       });
  //     });
  //     describe('and deselect button is clicked', () => {
  //       beforeEach(() => {
  //         component.expanded = true;


  //         fixture.detectChanges();
  //       });
  //       it('item is deselected', () => {
  //         expect(itemElements[0].classes['dropdown-item--selected']).not.toBe(true);
  //       });
  //       it('label is set', () => {
  //         const headerLabelElement = headerElement.query(By.css('.dropdown-select__header__label'));
  //         const headerLabelText = (headerLabelElement.nativeElement as HTMLElement).textContent;
  //       });
  //       it('value is set', () => {
  //         expect(testComponent.form.value).toBeNull();
  //       });
  //       it('event is emitted', () => {
  //         expect(spy).toHaveBeenCalledWith(null);
  //       });
  //     });
  //   });
  // });

});
