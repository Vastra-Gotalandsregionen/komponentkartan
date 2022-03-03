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
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ScrollbarComponent } from '../scrollbar/scrollbar.component';
import { NgScrollbarModule } from 'ngx-scrollbar';

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

function pickRandom(values: any[]): any {
  const index = Math.ceil(Math.random() * values.length) - 1;
  return values[index];
}

describe('[ComboboxComponent - Angular]', () => {
  let fixture: ComponentFixture<TestComponent>;
  let testComponent: TestComponent;
  let component: ComboboxComponent;
  let rootElement: DebugElement;
  let expandButtonElement: DebugElement;
  let menuElement: DebugElement;
  let textInputElement: DebugElement;

  beforeAll(() => {
    jasmine.clock().uninstall();
    jasmine.clock().install();
  });

  afterAll(() => {
    jasmine.clock().uninstall();
  });

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FontAwesomeModule, IconModule, FormsModule, NgScrollbarModule],
      declarations: [
        TestComponent,
        ComboboxComponent,
        ComboboxItemComponent,
        TruncatePipe,
        IconComponent,
        ErrorMessagePipe,
        ScrollbarComponent
      ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestComponent);
      testComponent = fixture.componentInstance;
      rootElement = fixture.debugElement.query(By.css('vgr-combobox'));
      component = rootElement.componentInstance;
      fixture.componentInstance.items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21];
      fixture.detectChanges();
      done();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When expand button is clicked', () => {
    describe('and menu is collapsed', () => {
      beforeEach(() => {
        component.showButton = true;
        component.expanded = false;
        component.searchString = '';
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

  describe('When there are items', () => {
    let itemElements: DebugElement[];
    beforeEach(() => {
      component.expanded = true;
      fixture.detectChanges();
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

  describe('When an item is clicked', () => {
    let itemElements: DebugElement[];
    let spy: jasmine.Spy;
    beforeEach(() => {
      component.expanded = true;
      component.searchString = '';
      fixture.detectChanges();
      itemElements = rootElement.queryAll(By.css('.combobox__menu__items__item'));
      spy = spyOn(component.selectedChanged, 'emit');
      itemElements[0].triggerEventHandler('click', {});
      fixture.detectChanges();
    });
    it('item is selected', () => {
      expect(itemElements[0].classes['combobox-item--selected']).toBe(true);
    });
    it('label is set', () => {
      expect(component.searchString).toBe('1');
    });
    it('value is set', () => {
      expect(testComponent.form.value).toBe(1);
    });
    it('event is emitted', () => {
      expect(spy).toHaveBeenCalledWith(1);
    });
  });

  describe('onKeydown', () => {
    let itemElements: DebugElement[];
    let event;
    let spy: jasmine.Spy;
    describe('When key is ArrowUp or Up', () => {
      beforeEach(() => {
        const key = pickRandom(['ArrowUp', 'Up']);
        event = { key: key } as KeyboardEvent;
        textInputElement = rootElement.query(By.css('.combobox__header__input'));
        spy = spyOn(component.expandedChanged, 'emit');
        textInputElement.triggerEventHandler('keydown', event);
      });
      it('expandedChanged is emitted', () => {
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
      });
      it('expanded to be true', () => {
        fixture.detectChanges();
        expect(component.expanded).toBeTrue();
      });
      it('last item higlighted to be true', () => {
        fixture.detectChanges();
        itemElements = rootElement.queryAll(By.css('.combobox__menu__items__item'));
        expect(itemElements[itemElements.length - 1].classes['combobox-item--highlighted']).toBe(true);
      });
    });
    describe('When key is ArrowDown or Down', () => {
      beforeEach(() => {
        const key = pickRandom(['ArrowDown', 'Down']);
        event = { key: key } as KeyboardEvent;
        textInputElement = rootElement.query(By.css('.combobox__header__input'));
        spy = spyOn(component.expandedChanged, 'emit');
        textInputElement.triggerEventHandler('keydown', event);
        fixture.detectChanges();
      });
      it('expandedChanged is emitted', () => {
        expect(spy).toHaveBeenCalled();
      });
      it('expanded to be true', () => {
        expect(component.expanded).toBeTrue();
      });
      it('first item higlighted to be true', () => {
        jasmine.clock().tick(1);
        fixture.detectChanges();
        itemElements = rootElement.queryAll(By.css('.combobox__menu__items__item'));
        expect(itemElements[0].classes['combobox-item--highlighted']).toBe(true);
      });
    });
    describe('When altKey + key is ArrowUp or Up', () => {
      beforeEach(() => {
        const key = pickRandom(['ArrowUp', 'Up']);
        event = { key: key, altKey: true } as KeyboardEvent;
        textInputElement = rootElement.query(By.css('.combobox__header__input'));
        spy = spyOn(component.expandedChanged, 'emit');
        textInputElement.triggerEventHandler('keydown', event);
      });
      it('expandedChanged is emitted', () => {
        fixture.detectChanges();
        expect(spy).toHaveBeenCalled();
      });
      it('expanded to be fale', () => {
        fixture.detectChanges();
        expect(component.expanded).toBeFalse();
      });
      it('no visible items exists', () => {
        fixture.detectChanges();
        itemElements = rootElement.queryAll(By.css('.combobox__menu__items__item'));
        expect(itemElements.length).toEqual(0);
      });
    });
    describe('When altKey + key is ArrowDown or Down', () => {
      beforeEach(() => {
        const key = pickRandom(['ArrowDown', 'Down']);
        event = { key: key, altKey: true } as KeyboardEvent;
        textInputElement = rootElement.query(By.css('.combobox__header__input'));
        spy = spyOn(component.expandedChanged, 'emit');
        textInputElement.triggerEventHandler('keydown', event);
        fixture.detectChanges();
      });
      it('expandedChanged is emitted', () => {
        expect(spy).toHaveBeenCalled();
      });
      it('expanded to be true', () => {
        expect(component.expanded).toBeTrue();
      });
      it('there is not any item higlighted', () => {
        jasmine.clock().tick(1);
        fixture.detectChanges();
        itemElements = rootElement.queryAll(By.css('.combobox__menu__items__item'));
        const index = itemElements.findIndex(x => x.classes['combobox-item--highlighted']);
        expect(index).toEqual(-1);
      });
    });
    describe('When key is Enter', () => {
      beforeEach(() => {
        event = { key: 'Enter' } as KeyboardEvent;
        textInputElement = rootElement.query(By.css('.combobox__header__input'));
        spy = spyOn(component.expandedChanged, 'emit');
      });
      describe('and searchstring is empty', () => {
        beforeEach(() => {
          component.searchString = '';
          textInputElement.triggerEventHandler('keydown', event);
          fixture.detectChanges();
        });
        it('confirm is emitted', () => {
          fixture.detectChanges();
          expect(spy).toHaveBeenCalled();
        });
        it('expanded to be true', () => {
          expect(component.expanded).toBeTrue();
        });
      });
      describe('and searchstring is not empty', () => {
        let spy2: jasmine.Spy;
        beforeEach(() => {
          component.items.forEach(x => {
            x.highlighted = false;
            x.selected = false;
          });
          component.expanded = true;
          component.searchString = 'abc';   // doesent matter the test. just not empty.
          spy2 = spyOn(component.selectedChanged, 'emit');
        });
        describe('and there is a higlighted item', () => {
          beforeEach(() => {
            testComponent.form.setValue(2);
            component.expanded = true;
            component.items.first.highlighted = true;
            textInputElement.triggerEventHandler('keydown', event);
            fixture.detectChanges();
          });
          it('expandedChanged is emitted', () => {
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
          });
          it('expanded to be false', () => {
            expect(component.expanded).toBeFalse();
          });
          it('the form value have the new value', () => {
            expect(testComponent.form.value).toBe(1);
          });
          it('selectedChanged is emitted', () => {
            expect(spy2).toHaveBeenCalledWith(1);
          });
        });
        describe('and there is not any higlighted item', () => {
          beforeEach(() => {
            testComponent.form.setValue(2);
            component.expanded = true;
            textInputElement.triggerEventHandler('keydown', event);
            fixture.detectChanges();
          });
          it('confirm is emitted', () => {
            expect(spy).toHaveBeenCalled();
          });
          it('expanded to be false', () => {
            expect(component.expanded).toBeFalse();
          });
          it('the form value same as before', () => {
            expect(testComponent.form.value).toBe(2);
          });
          it('selectedChanged is emitted', () => {
            expect(spy2).toHaveBeenCalledWith(2);
          });
        });
      });
    });
    describe('When key is Escape or Esc', () => {
      beforeEach(() => {
        const key = pickRandom(['Escape', 'Esc']);
        event = { key: key } as KeyboardEvent;
        textInputElement = rootElement.query(By.css('.combobox__header__input'));
        spy = spyOn(component.selectedChanged, 'emit');
      });
      describe('and old value is null', () => {
        beforeEach(() => {
          textInputElement.triggerEventHandler('keydown', event);
          fixture.detectChanges();
        });
        it('confirm is emitted', () => {
          fixture.detectChanges();
          expect(spy).not.toHaveBeenCalled();
        });
        it('expanded to be true', () => {
          expect(testComponent.form.value).toBeNull();
        });
      });
      describe('and old value is not null', () => {
        beforeEach(() => {
          component.expanded = true;
          component.searchString = 'abc';   // doesent matter the test. just not empty.
        });
        describe('and there is a higlighted item', () => {
          let randomValue: any;
          beforeEach(() => {
            randomValue = pickRandom([1, 2, 3]);
            testComponent.form.setValue(randomValue);
            textInputElement.triggerEventHandler('keydown', event);
            fixture.detectChanges();
          });
          it('confirm is emitted', () => {
            fixture.detectChanges();
            expect(spy).toHaveBeenCalled();
          });
          it('expanded to be false', () => {
            expect(component.expanded).toBeFalse();
          });
          it('the form value have the new value', () => {
            expect(testComponent.form.value).toBe(randomValue);
          });
        });
      });
    });
    describe('When key is word character', () => {
      let key: string;
      beforeEach(() => {
        key = pickRandom([
          'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
          'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
          'u', 'v', 'w', 'x', 'y', 'z', 'å', 'ä', 'ö', '1',
          '2', '3', '4', '5', '6', '7', '8', '9', '0', '_', ' '
        ]);
        event = { key: key } as KeyboardEvent;
      });
      describe('and there are matching items or not', () => {
        beforeEach(() => {
          spy = spyOn(component.expandedChanged, 'emit');
          component.onKeydown(event);
          jasmine.clock().tick(1);
          fixture.detectChanges();
        });
        it('expandedChanged is emitted', () => {
          expect(spy).toHaveBeenCalled();
        });
      });
    });
    describe('When key is Tab or Shift + Tab', () => {
      let key: string;
      let altKey: boolean;
      beforeEach(() => {
        key = 'Tab';
        altKey = pickRandom([true, false]);
        event = { key: key } as KeyboardEvent;
      });
      describe('and there are items or not', () => {
        beforeEach(() => {
          component.expanded = true;
          spy = spyOn(component.expandedChanged, 'emit');
          component.onKeydown(event);
          jasmine.clock().tick(1);
          fixture.detectChanges();
        });
        it('expandedChanged is emitted', () => {
          expect(spy).toHaveBeenCalled();
        });
        it('expanded is false', () => {
          expect(component.expanded).toBeFalse();
        });
      });
    });

  });
});
