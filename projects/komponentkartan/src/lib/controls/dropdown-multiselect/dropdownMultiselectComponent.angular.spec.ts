﻿/* tslint:disable */
import { ComponentFixture, TestBed, async, } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { By } from "@angular/platform-browser";
import { FormsModule, FormControl, Validators } from "@angular/forms"

import { DebugElement, forwardRef } from "@angular/core";
import { CommonModule } from "@angular/common";


import { DropdownMultiselectComponent } from "../../controls/dropdown-multiselect/dropdown-multiselect.component";
import { FilterTextboxComponent } from "../../controls/filterTextbox/filterTextbox.component";
import { CheckboxComponent } from "../../controls/checkbox/checkbox.component";
import { TruncatePipe } from "../../pipes/truncatePipe";
import { FilterPipe } from "../../pipes/filterPipe";
import { DropdownItemToSelectedTextPipe } from "../../pipes/dropdownItemToSelectedTextPipe";
import { DropdownItem } from "../../models/dropdownItem.model";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';


describe("[DropdownMultiSelectComponent]", () => {
  let component: DropdownMultiselectComponent;
  let fixture: ComponentFixture<DropdownMultiselectComponent>;
  let rootElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [DropdownMultiselectComponent, FilterTextboxComponent, TruncatePipe, FilterPipe, DropdownItemToSelectedTextPipe, CheckboxComponent],
      imports: [CommonModule, FormsModule, PerfectScrollbarModule],
      providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropdownMultiselectComponent),
        multi: true
      }]
    });

    TestBed.overrideComponent(DropdownMultiselectComponent,
      {
        set: {
          templateUrl: "dropdown-multiselect.component.html"
        }
      });

    TestBed.overrideComponent(FilterTextboxComponent,
      {
        set: {
          templateUrl: "../filterTextbox/filterTextbox.component.html"
        }
      });


    TestBed.overrideComponent(CheckboxComponent,
      {
        set: {
          templateUrl: "../checkbox/checkbox.component.html"
        }
      });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(DropdownMultiselectComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      component.showAllItemText = "Select all";
      component.items = [
        { displayName: "Option 1", value: 'option 1' } as DropdownItem<string>,
        { displayName: "Option 2", value: 'option 2' } as DropdownItem<string>,
        { displayName: "Option 3", value: 'option 3' } as DropdownItem<string>
      ] as DropdownItem<string>[];

      fixture.detectChanges();
      done();
    });
  });
  describe("When component is initialized", () => {
    var dropdownElement: DebugElement;
    beforeEach(() => {
      dropdownElement = rootElement.query(By.css(".dropdown--edit"));
      component.ngOnInit();
      fixture.detectChanges();

    });
    it("dropdown is not expanded", () => {
      expect(dropdownElement.classes["dropdown--open"]).toBe(false);
    });
    it("text in dropdown is 'Välj'", () => {
      expect(component.dropdownLabel).toBe("Välj");
    });
    it("select all is not selected", () => {
      expect(component.selectAllItemsChecked).toBe(false);
    });
    it("there are 3 items in the list", () => {
      expect(component.items.length).toBe(3);
    });
    it("no item is selected", () => {
      expect(component.items.filter(x => x.selected).length).toBe(0);
    });
  });

  describe("When component is initialized with one selected item", () => {
    var dropdownElement: DebugElement;

    beforeEach(() => {
      spyOn(component.selectionChanged, "emit");
      component.items = [
        { displayName: "Option 1", value: { name: 'option 1', id: 1 } } as DropdownItem<object>,
        { displayName: "Option 2", value: { name: 'option 1', id: 1 }, selected: true } as DropdownItem<object>,
        { displayName: "Option 3", value: { name: 'option 1', id: 1 } } as DropdownItem<object>
      ] as DropdownItem<object>[];

      fixture.detectChanges();
    });
    it("selectAll is not selected", () => {
      expect(component.selectAllItemsChecked).toBe(false);
    });
    it("selectionChanged event is emitted with the selected item", () => {
      expect(component.selectionChanged.emit).toHaveBeenCalledWith([component.items[1].value]);
    });
    it("dropdown text is 1 vald", () => {
      expect(component.dropdownLabel).toBe("1 vald")
    });
  });

  describe("When component is initialized with two selected items", () => {
    var dropdownElement: DebugElement;

    beforeEach(() => {
      spyOn(component.selectionChanged, "emit");
      component.items = [
        { displayName: "Option 1", value: { name: 'option 1', id: 1 }, selected: true } as DropdownItem<object>,
        { displayName: "Option 2", value: { name: 'option 2', id: 2 }, selected: true } as DropdownItem<object>,
        { displayName: "Option 3", value: { name: 'option 3', id: 3 } } as DropdownItem<object>
      ] as DropdownItem<object>[];


      fixture.detectChanges();
    });
    it("selectAll is not selected", () => {
      expect(component.selectAllItemsChecked).toBe(false);
    });
    it("selectionChanged event is emitted with the selected items", () => {
      expect(component.selectionChanged.emit).toHaveBeenCalledWith([component.items[0].value, component.items[1].value]);
    });
    it("dropdown text is 2 vald", () => {
      expect(component.dropdownLabel).toBe("2 valda")
    });

  });


  describe("when dropdown is clicked", () => {
    var dropdownElement: DebugElement;
    beforeEach(() => {
      dropdownElement = rootElement.query(By.css(".dropdown--edit"));
      dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement } as MouseEvent);
      fixture.detectChanges();
    });
    it("dropdown is expanded", () => {
      expect(dropdownElement.classes["dropdown--open"]).toBe(true);
    });

    describe("and dropdown is clicked again", () => {
      it("dropdown is collapsed", () => {
        dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement } as MouseEvent);
        fixture.detectChanges();
        expect(dropdownElement.classes["dropdown--open"]).toBe(false);
      });
    });
  });

  describe("when one item is selected", () => {
    var dropdownElement: DebugElement;
    beforeEach(() => {
      spyOn(component.selectionChanged, "emit");
      dropdownElement = rootElement.query(By.css(".dropdown"));
      component.expanded = true;
      component.selectItem(component.items[0]);
      fixture.detectChanges();
    });

    it("dropdown text is '1 vald'", () => {
      expect(component.dropdownLabel).toBe("1 vald");
    });
    it('a selectedItemChanged is emitted', () => {
      expect(component.selectionChanged.emit).toHaveBeenCalledWith(['option 1']);
    });
  });

  describe("when select all is clicked", () => {
    var dropdownElement: DebugElement;
    beforeEach(() => {
      dropdownElement = rootElement.query(By.css(".dropdown"));
      component.expanded = true;
      component.selectAllItems(true);
      fixture.detectChanges();
    });
    it("select all item is checked", () => {
      expect(component.selectAllItemsChecked).toBe(true);
    });
    it("all items are checked", () => {
      expect(component.items.filter(x => !x.selected).length).toBe(0);
    });
    it("dropdown text is 'Alla'", () => {
      expect(component.dropdownLabel).toBe("Alla");
    });

    describe("and one item is deselected", () => {
      beforeEach(() => {
        spyOn(component.selectionChanged, 'emit');
        component.deselectItem(component.items[0]);
        fixture.detectChanges();
      });
      it("deselected item is not checked", () => {
        expect(component.items[0].selected).toBe(false);
      });
      it("select all item is not checked", () => {
        expect(component.selectAllItemsChecked).toBe(false);
      });
      it("dropdown text is '2 valda'", () => {
        expect(component.dropdownLabel).toBe("2 valda");
      });
      it('a selectedItemChanged is emitted', () => {
        expect(component.selectionChanged.emit).toHaveBeenCalledWith([component.items[1].value, component.items[2].value]);
      });
    });
  });

  describe("when one item is not selected", () => {
    beforeEach(() => {
      component.items.forEach(x => x.selected = true);
      component.items[0].selected = false;
    });
    describe("and the item is reselected", () => {
      beforeEach(() => {
        component.selectItem(component.items[0]);
      });
      it("reselected item is checked", () => {
        expect(component.items[0].selected).toBe(true);
      });
      it("select all item is checked", () => {
        expect(component.selectAllItemsChecked).toBe(true);
      });
      it("dropdown text is 'Alla'", () => {
        expect(component.dropdownLabel).toBe("Alla");
      });
    });

    describe("and select all is clicked", () => {
      beforeEach(() => {
        component.selectAllItems(true);
      });
      it("all items are checked", () => {
        expect(component.items.filter(x => !x.selected).length).toBe(0);
      });
      it("select all item is checked", () => {
        expect(component.selectAllItemsChecked).toBe(true);
      });
      it("dropdown text is 'Alla'", () => {
        expect(component.dropdownLabel).toBe("Alla");
      });
    });
  });

  describe("when dropdown is open", () => {
    var dropdownElement: DebugElement;
    beforeEach(() => {
      dropdownElement = rootElement.query(By.css(".dropdown--edit"));
      component.expanded = true;
      fixture.detectChanges();
    });
    describe("and select all is checked", () => {
      beforeEach(() => {
        component.selectAllItems(true);
      });
      describe("and select all is clicked", () => {
        beforeEach(() => {
          let selectAllItem = rootElement.query(By.css('.dropdown-item--select-all'));
          let selectAllCheckbox = selectAllItem.query(By.css('.checkbox'));
          let selectAllLink = selectAllItem.query(By.css('a'));
          selectAllLink.triggerEventHandler("mousedown", { target: selectAllLink.nativeElement } as MouseEvent);
          dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement } as MouseEvent);
          fixture.detectChanges();
        });
        it("dropdown is not collapsed", () => {
          expect(dropdownElement.classes["dropdown--open"]).toBe(true);
        });
      });
    });
    describe("and select all is not checked", () => {
      beforeEach(() => {
        component.selectAllItems(false);
      });
      describe("and select all is clicked", () => {
        beforeEach(() => {
          let selectAllItem = rootElement.query(By.css('.dropdown-item--select-all'));
          let selectAllCheckbox = selectAllItem.query(By.css('.checkbox'));
          let selectAllLink = selectAllItem.query(By.css('a'));
          selectAllLink.triggerEventHandler("mousedown", { target: selectAllLink.nativeElement } as MouseEvent);
          dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement } as MouseEvent);
          fixture.detectChanges();
        });
        it("dropdown is not collapsed", () => {
          expect(dropdownElement.classes["dropdown--open"]).toBe(true);
        });
      });
    });
  });

  describe("when there are more than 20 items in the dropdown", () => {
    beforeEach(() => {
      let dropdownItems = [] as DropdownItem<any>[];
      for (let i = 0; i <= 20; i++) {
        dropdownItems.push({ displayName: `Name${i}`, value: 'option' } as DropdownItem<any>);
      }
      component.items = dropdownItems;
      component.ngOnInit();
      fixture.detectChanges();
    });
    it("the filter textbox is visible", () => {
      let dropdownElement = rootElement.query(By.css(".dropdown--edit"));
      expect(dropdownElement.classes["dropdown--filter-visible"]).toBe(true);
    });

    describe("when the list has been filtered", () => {
      let showAll;
      beforeEach(() => {
        jasmine.clock().uninstall();
        jasmine.clock().install();
        component.filterTextboxComponent.value = "2";
        fixture.detectChanges();
        jasmine.clock().tick(100);
        showAll = rootElement.query(By.css('.dropdown-item--select-all'));
      });
      it('there are five focusable items', () => {
        jasmine.clock().tick(200);
        expect(component.focusableItems.length).toBe(5);
      });
      describe('and space is pressed', () => {
        beforeEach(() => {
          jasmine.clock().uninstall();
          jasmine.clock().install();
          showAll.triggerEventHandler('keydown', { keyCode: 32, preventDefault: function () { } } as KeyboardEvent);
          fixture.detectChanges();
        });

        it('filter is cleared', () => {
          jasmine.clock().tick(100);
          expect(component.filter).toBe('');
        });
        it('there are 23 focusable items', () => {
          jasmine.clock().tick(100);
          expect(component.focusableItems.length).toBe(23);
        });
      });
      describe('and enter is pressed', () => {
        beforeEach(() => {
          jasmine.clock().uninstall();
          jasmine.clock().install();
          showAll.triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
          fixture.detectChanges();
        });

        it('filter is cleared', () => {
          jasmine.clock().tick(100);
          expect(component.filter).toBe('');
        });
        it('there are 23 focusable items', () => {
          jasmine.clock().tick(100);
          expect(component.focusableItems.length).toBe(23);
        });
      });
    });

    describe("when all items are selected and the list is filtered", () => {
      beforeEach(() => {
        component.selectAllItems(true);
        component.filterTextboxComponent.value = "2";
        fixture.detectChanges();
      });
      describe("and filter is cleared", () => {
        beforeEach(() => {
          component.clearFilter();
        });
        it("the select all item remains checked", () => {
          expect(component.selectAllItemsChecked).toBe(true);
        });

        it("and select all item checkbox is visible", () => {
          let selectAllItem = rootElement.query(By.css('.dropdown-item--select-all'));
          let selectAllCheckbox = selectAllItem.query(By.css("vgr-checkbox"));
          expect(selectAllCheckbox).toBeDefined();
        });
      });
      describe("and an item is deselected and the filter is cleared", () => {
        beforeEach(() => {
          component.deselectItem(component.items.filter(x => x.displayName === "Name2")[0]);
          component.clearFilter();
        });
        it("the select all item is not checked", () => {
          expect(component.selectAllItemsChecked).toBe(false);
        });
      });
    });
  });

  describe("when there are less than 20 items", () => {
    beforeEach(() => {
      let dropdownItems = [] as DropdownItem<any>[];
      for (let i = 0; i <= 19; i++) {
        dropdownItems.push({ displayName: `Name${i}` } as DropdownItem<any>);
      }
      component.items = dropdownItems;

      fixture.detectChanges();
    });
    it("the filter textbox is not visible", () => {
      let dropdownElement = rootElement.query(By.css(".dropdown--edit"));
      expect(dropdownElement.classes["dropdown--filter-visible"]).toBe(false);
    });
  });

  describe('When component is initialized with two simple values', () => {
    let element: DebugElement;

    beforeEach(() => {
      element = rootElement.query(By.css('.dropdown--edit'));
      component.values = ['one', 'two'];
      fixture.detectChanges();
      spyOn(component.selectionChanged, 'emit');
    });
    it('the item list contains two items', () => {
      expect(component.items).toEqual([{ displayName: 'one', value: 'one' }, { displayName: 'two', value: 'two' }] as DropdownItem<any>[]);
    })
    describe('and a selected value', () => {
      beforeEach(() => {
        component.selectedValues = ['one'];
        fixture.detectChanges();
      });
      it('the matching drop down item is selected', () => {
        expect(component.items[0].selected).toBe(true);
      });
      it('a selectedItemChanged is emitted', () => {
        expect(component.selectionChanged.emit).toHaveBeenCalledWith(['one']);
      });
      it('textlabel is 1 vald', () => {
        expect(component.dropdownLabel).toBe('1 vald')
      });
      it('html span text is 1 vald', () => {

        expect(element.nativeElement.querySelector("span").innerText).toBe('1 vald')
      });
    });
    describe('and both are selected', () => {
      beforeEach(() => {
        component.selectedValues = ['one', 'two'];
        fixture.detectChanges();
      });
      it('the matching drop down items are selected', () => {
        expect(component.items[0].selected).toBe(true);
        expect(component.items[1].selected).toBe(true);
      });

      it('a selectedItemChanged is emitted', () => {
        expect(component.selectionChanged.emit).toHaveBeenCalledWith(['one', 'two']);
      });
      it('select all is selected', () => {
        expect(component.selectAllItemsChecked).toBe(true);
      });
      it('component label is Alla', () => {
        expect(component.dropdownLabel).toBe('Alla')
      });
      it('html span text is Alla', () => {

        expect(element.nativeElement.querySelector("span").innerText).toBe('Alla')
      });
    });
    describe('and both are selected', () => {
      beforeEach(() => {
        component.selectedValues = ['one', 'two'];
        fixture.detectChanges();
      });
      it('the matching drop down items are selected', () => {
        expect(component.items[0].selected).toBe(true);
        expect(component.items[1].selected).toBe(true);
      });

      it('a selectedItemChanged is emitted', () => {
        expect(component.selectionChanged.emit).toHaveBeenCalledWith(['one', 'two']);
      });
      it('select all is selected', () => {
        expect(component.selectAllItemsChecked).toBe(true);
      });
    });

  });

  describe('When initialized with no selected items and disabled-mode', () => {
    beforeEach(() => {
      component.disabled = true;
      fixture.detectChanges();
    });

    it('has div class .disabled', () => {
      expect(fixture.debugElement.classes['disabled']).toBe(true);
    });

    it('should display "Välj"', () => {
      const selectedItemsSpan = fixture.debugElement.query(By.css('.dropdown--edit > span'));
      const content = selectedItemsSpan.nativeElement.textContent;
      expect(content.trim()).toBe('Välj');
    });
  });

  describe('When initialized with two selected items and disabled-mode', () => {
    beforeEach(() => {
      component.disabled = true;
      component.values = ['one', 'two', 'three'];
      component.selectedValues = ['one', 'two'];
      fixture.detectChanges();
    });

    it('has div class .disabled', () => {
      expect(fixture.debugElement.classes['disabled']).toBe(true);
    });

    it('should display a text with the number of items selected', () => {
      const selectedItemsSpan = fixture.debugElement.query(By.css('.dropdown--edit > span'));
      const content = selectedItemsSpan.nativeElement.textContent;
      expect(content.trim()).toBe('2 valda');
    });
  });

  describe('When initialized with two selected items and readonly-mode', () => {
    beforeEach(() => {
      component.readonly = true;
      component.values = ['one', 'two', 'three'];
      component.selectedValues = ['one', 'two'];
      fixture.detectChanges();
    });

    it('should display an ul with selected items', () => {
      const selectedItemslist = fixture.debugElement.queryAll(By.css('.dropdown__multiselect-readonlylist ul li'));
      expect(selectedItemslist.length).toBe(2);
      expect(selectedItemslist[0].nativeElement.textContent).toBe('one');
      expect(selectedItemslist[1].nativeElement.textContent).toBe('two');
    });
  });

  describe('When component is initialized with two simple values and one selected item', () => {
    let element: DebugElement;

    beforeEach(() => {
      element = rootElement.query(By.css('.dropdown--edit'));
      component.control = new FormControl(null, { validators: [Validators.required], updateOn: 'blur' });
      component.values = ['one', 'two', 'three'];
      component.selectAllItems(true);

      element.triggerEventHandler('focusin', event);
      fixture.detectChanges();
    });

    it('the matching drop down item is selected', () => {
      expect(component.items[0].selected).toBe(true);
      expect(component.items[1].selected).toBe(true);
      expect(component.items[2].selected).toBe(true);

    });

    it('the form control value is not updated', () => {
      expect(component.control.value).toBe(null);
    });

    describe('when onLeave is triggered', () => {
      beforeEach(() => {
        component.control = new FormControl([{ name: 'option 1', id: 1 }, { name: 'option 2', id: 2 }, { name: 'option 3', id: 3 }], { validators: [Validators.required], updateOn: 'blur' });
        element.triggerEventHandler('focusout', event);
        fixture.detectChanges();
      });

      it('the matching drop down item is selected', () => {
        expect(component.items[1].selected).toBe(true);
        expect(component.control.value.toString()).toBe([{ name: 'option 1', id: 1 }, { name: 'option 2', id: 2 }, { name: 'option 3', id: 3 }].toString());
      });

      it('the control is touched and dirty', () => {
        expect(component.control.touched).toBe(true);
        expect(component.control.dirty).toBe(true);
      });
    });
  });

  describe('Component is reseted', () => {
    beforeEach(() => {
      component.writeValue(null);
    });
    it('other options are is unselected and unmarked', () => {
      component.items.forEach(i => {
        expect(i.selected).toBe(false);
        expect(i.marked).toBe(false);
      });
    });
  });

  describe('WCAG Tests', () => {
    let dropdownElement: DebugElement;
    let listElement: DebugElement;
    beforeEach(() => {
      dropdownElement = rootElement.query(By.css('.dropdown--edit'));

      fixture.detectChanges();
    });

    it('The dropdown has role combobox.', () => {
      expect(dropdownElement.attributes['role']).toBe('combobox');
    });

    it('Aria-expanded is false', () => {
      expect(dropdownElement.attributes['aria-expanded']).toBe('false');
    });
    it('aria-disabled is false', () => {
      expect(dropdownElement.attributes['aria-disabled']).toBe('false');
    });
    it('tabindex to be 0', () => {
      expect(dropdownElement.properties['tabIndex']).toBe('0');
    });

    describe('list is initialized with items', () => {
      let listItems;
      beforeEach(() => {
        component.expanded = false;

        component.items = [{ displayName: 'one', value: 1 }, { displayName: 'two', value: 2 }, { displayName: 'three', value: 3 }];
        fixture.detectChanges();

        listElement = rootElement.query(By.css('.dropdown__menu__items'));
        dropdownElement = rootElement.query(By.css('.dropdown--edit'));
        listItems = rootElement.queryAll(By.css('.dropdown-item'));
      });
      it('the list has role listbox', () => {
        expect(listElement.attributes['role']).toBe('listbox');
      });
      it('has four focusable items', () => {
        expect(component.focusableItems.length).toBe(4);
      });
      it('first item is "Välja alla"', () => {
        expect(listElement.children[0].classes['dropdown-item--select-all']).toBe(true);
      });
      it('there are 5 focusable items ', () => {
        expect(component.focusableItems.length).toBe(4);
      })
      describe('and alt + arrow down is pressed', () => {
        beforeEach(() => {
          dropdownElement.triggerEventHandler('keydown', { keyCode: 40, altKey: true, preventDefault: function () { } } as KeyboardEvent);
          fixture.detectChanges();
        });
        it('dropdown is collapsed', () => {
          expect(dropdownElement.classes['dropdown--open']).toBe(true);
        });
        describe('and alt + arrow up is pressed', () => {
          beforeEach(() => {
            dropdownElement.triggerEventHandler('keydown', { keyCode: 38, altKey: true, preventDefault: function () { } } as KeyboardEvent);
            fixture.detectChanges();
          });
          it('dropdown is collapsed', () => {
            expect(dropdownElement.classes['dropdown--open']).toBe(false);
          });
        });
      });
      describe('and space is pressed', () => {
        beforeEach(() => {
          dropdownElement.triggerEventHandler('keydown', { keyCode: 32, preventDefault: function () { } } as KeyboardEvent);
          fixture.detectChanges();
        });
        // it('dropdown is expanded', () => {
        //     expect(dropdownElement.classes['dropdown--open']).toBe(true);
        // });

        describe('key arrow down focuses first item', () => {
          beforeEach(() => {
            spyOn(component.focusableItems[0], 'focus').and.callThrough();
            dropdownElement.triggerEventHandler('keydown', { keyCode: 40, preventDefault: function () { } } as KeyboardEvent);
            fixture.detectChanges();
          });

          it('first element has focus', () => {
            let focusedElement = rootElement.query(By.css(':focus'));
            expect(focusedElement.children[0].properties['title']).toBe('Välj alla');
          });
          it('first element has aria label "Välj alla"', () => {
            expect(listElement.children[0].attributes['aria-label']).toBe('Välj alla');
          });
          it('focusable items first object has focus', () => {
            expect(component.focusableItems[0].focus).toHaveBeenCalledTimes(1);
          });
          it('and select all items checkbox is marked', () => {
            expect(component.selectAllItemsMarked).toBe(true);
          });
          it('and select all items checkbox is not checked', () => {
            expect(component.selectAllItemsChecked).toBe(false);
          });
          describe('enter is pressed ', () => {
            let selectAll;
            beforeEach(() => {
              selectAll = rootElement.query(By.css('.dropdown-item--select-all'));
              selectAll.triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
            });
            it('and select all items checkbox is checked', () => {
              expect(component.selectAllItemsChecked).toBe(true);
            });
            describe('enter is pressed again ', () => {
              beforeEach(() => {
                selectAll.triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
              });
              it('and select all items checkbox is unchecked', () => {
                expect(component.selectAllItemsChecked).toBe(false);
              });
            });
          });
          describe('space is pressed ', () => {
            let selectAll;
            beforeEach(() => {
              selectAll = rootElement.query(By.css('.dropdown-item--select-all'));
              selectAll.triggerEventHandler('keydown', { keyCode: 32, preventDefault: function () { } } as KeyboardEvent);
            });
            it('and select all items checkbox is checked', () => {
              expect(component.selectAllItemsChecked).toBe(true);
            });
          });

          describe('key arrow down againn, focus on next item', () => {
            beforeEach(() => {
              spyOn(component.focusableItems[1], 'focus').and.callThrough();
              dropdownElement.triggerEventHandler('keydown', { keyCode: 40, preventDefault: function () { } } as KeyboardEvent);
              fixture.detectChanges();
            });
            it('second focusable element has aria label "one"', () => {
              expect(listElement.children[1].attributes['aria-label']).toBe('one');
            });
            it('focusable items first object has focus', () => {
              expect(component.focusableItems[1].focus).toHaveBeenCalledTimes(1);
            });
            describe('key arrow down pressed three times, focus is back to first element', () => {
              beforeEach(() => {
                dropdownElement.triggerEventHandler('keydown', { keyCode: 40, preventDefault: function () { } } as KeyboardEvent);
                dropdownElement.triggerEventHandler('keydown', { keyCode: 40, preventDefault: function () { } } as KeyboardEvent);
                dropdownElement.triggerEventHandler('keydown', { keyCode: 40, preventDefault: function () { } } as KeyboardEvent);
                fixture.detectChanges();
              });
              it('focusable items first object has focus', () => {
                expect(component.focusableItems[0].focus).toHaveBeenCalledTimes(2);
              });
              it('and select all items checkbox is marked', () => {
                expect(component.selectAllItemsMarked).toBe(true);
              });
              it('and select all items checkbox is not checked', () => {
                expect(component.selectAllItemsChecked).toBe(false);
              });
            });
            describe('and tab is pressed', () => {
              beforeEach(() => {
                listItems[1].triggerEventHandler('keydown', { keyCode: 9, preventDefault: function () { } } as KeyboardEvent);
                dropdownElement.triggerEventHandler('keydown', { keyCode: 9, preventDefault: function () { } } as KeyboardEvent);
                fixture.detectChanges();
              });

              it('current element is not selected', () => {
                expect(component.items[1].selected).toBeFalsy();
              });

              it('dropdown is collapsed', () => {
                expect(dropdownElement.classes['dropdown--open']).toBe(false);
              });
            });
          });
        });
        describe('key arrow up focuses last item', () => {
          beforeEach(() => {
            spyOn(component.focusableItems[3], 'focus').and.callThrough();
            dropdownElement.triggerEventHandler('keydown', { keyCode: 38, preventDefault: function () { } } as KeyboardEvent);
            listItems[2].triggerEventHandler('focusin', {});
            fixture.detectChanges();
          });
          it('last element has aria label "Välj alla"', () => {
            expect(listElement.children[3].attributes['aria-label']).toBe('three');
          });
          it('focusable items last object has focus', () => {
            expect(component.focusableItems[3].focus).toHaveBeenCalledTimes(1);
          });
          it('and last item checkbox is marked', () => {
            expect(component.items[2].marked).toBe(true);
          });
          it('and last item is not selected', () => {
            expect(component.items[2].selected).toBeFalsy();
          });

          describe('enter is pressed', () => {
            beforeEach(() => {
              listItems[2].triggerEventHandler('keydown', { keyCode: 13, preventDefault: function () { } } as KeyboardEvent);
              fixture.detectChanges();
            });
            it('and last item checkbox is selected', () => {
              expect(component.items[2].selected).toBe(true);
            });
          });
          describe('space is pressed', () => {
            beforeEach(() => {
              listItems[2].triggerEventHandler('keydown', { keyCode: 32, preventDefault: function () { } } as KeyboardEvent);
              fixture.detectChanges();
            });
            it('and last item checkbox is unselected', () => {
              expect(component.items[2].selected).toBe(true);
            });

          });

          describe('key arrow up again, focus on second item', () => {
            beforeEach(() => {
              spyOn(component.focusableItems[2], 'focus').and.callThrough();
              dropdownElement.triggerEventHandler('keydown', { keyCode: 38, preventDefault: function () { } } as KeyboardEvent);
              listItems[1].triggerEventHandler('focusin', {});
              fixture.detectChanges();
            });
            it('focusable items first object has focus', () => {
              expect(component.focusableItems[2].focus).toHaveBeenCalledTimes(1);
            });
            it('and second last item checkbox is marked', () => {
              expect(component.items[1].marked).toBe(true);
            });
          });
        });
      });
    });

    describe('dropdown initialized as readonly', () => {
      let dropdownElement: DebugElement;
      let readonlyDropdownElement: DebugElement;
      let selectedItemsElement: DebugElement[];
      beforeEach(() => {
        component.expanded = false;

        component.items = [{ displayName: 'one', value: 1, selected: true }, { displayName: 'two', value: 2 }, { displayName: 'three', value: 3 }];
        component.readonly = true;
        dropdownElement = rootElement.query(By.css('.dropdown--edit'));
        readonlyDropdownElement = rootElement.query(By.css('.dropdown__multiselect-readonlylist'));

        fixture.detectChanges();
        selectedItemsElement = readonlyDropdownElement.queryAll(By.css('li'));
      });

      it('aria-readonly set to true on readonly-items', () => {
        expect(readonlyDropdownElement.attributes['aria-readonly']).toBe('true');
      })

      it('tabindex to be 0 on readonly-list', () => {
        expect(readonlyDropdownElement.properties['tabIndex']).toBe('0');
      });
      it('tabindex to be -1 on dropdown', () => {
        expect(dropdownElement.properties['tabIndex']).toBe('-1');
      });

      it('selectedItem is "one"', () => {
        expect(selectedItemsElement.length).toBe(1);
      })

      it('selectedItem is "one"', () => {
        expect(selectedItemsElement[0].nativeElement.innerText).toBe('one');
      })
    });
  })
});