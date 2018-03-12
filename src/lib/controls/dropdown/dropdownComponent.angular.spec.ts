
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule, FormControl, Validators } from '@angular/forms';

import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownComponent } from '../../controls/dropdown/dropdown.component';
import { FilterTextboxComponent } from '../../controls/filterTextbox/filterTextbox.component';
import { TruncatePipe } from '../../pipes/truncatePipe';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { DropdownItem } from '../../models/dropdownItem.model';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

describe('DropdownComponent', () => {
    let component: DropdownComponent;
    let fixture: ComponentFixture<DropdownComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [DropdownComponent, FilterTextboxComponent, TruncatePipe, FilterPipe, DropdownItemToSelectedTextPipe],
            imports: [CommonModule, FormsModule, PerfectScrollbarModule]
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(DropdownComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });

    describe('When component is initialized', () => {
        let dropdownElement: DebugElement;
        beforeEach(() => {
            dropdownElement = rootElement.query(By.css('.dropdown--edit'));
            component.showAllItemText = 'Select all';
            component.ngOnChanges();
        });
        it('dropdown is not expanded', () => {
            expect(dropdownElement.classes['dropdown--open']).toBe(false);
        });
        it('should have Välj selected items text', () => {
            const selectedItemsSpan = fixture.debugElement.query(By.css('.dropdown--edit > span'));
            const content = selectedItemsSpan.nativeElement.textContent;
            expect(content.trim()).toBe('Välj');
        });
        describe('and dropdown is clicked', () => {
            it('dropdown is expanded', () => {
                dropdownElement.triggerEventHandler('mousedown', { target: dropdownElement.nativeElement } as MouseEvent);
                fixture.detectChanges();

                expect(dropdownElement.classes['dropdown--open']).toBe(true);
            });

            describe('and dropdown is expanded', () => {
                beforeEach(() => {
                    component.expanded = true;
                    fixture.detectChanges();
                });

                describe('and filterTextBox is clicked', () => {
                    it('dropdown is not collapsed', () => {
                        const filterTextbox = rootElement.query(By.css('.dropdown__filterTextbox'));
                        filterTextbox.triggerEventHandler('mousedown', { target: filterTextbox.nativeElement } as MouseEvent);
                        fixture.detectChanges();

                        expect(dropdownElement.classes['dropdown--open']).toBe(true);
                    });
                });

                describe('and dropdown is clicked', () => {
                    it('dropdown is collapsed', () => {
                        dropdownElement.triggerEventHandler('mousedown', { target: dropdownElement.nativeElement } as MouseEvent);
                        fixture.detectChanges();
                        expect(dropdownElement.classes['dropdown--open']).toBe(false);
                    });
                });
            });
        });

        describe('and item list is less than 20 items', () => {
            it('filter is not visible', () => {
                component.items = [{ displayName: 'name' }] as DropdownItem<any>[];
                expect(dropdownElement.classes['dropdown--filter-visible']).toBe(false);
            });
        });
        describe('and item list is more than 20 items', () => {
            beforeEach(() => {
                const dropdownItems = [] as DropdownItem<any>[];
                for (let i = 0; i <= 20; i++) {
                    dropdownItems.push({ displayName: `Name${i}` } as DropdownItem<any>);
                }
                component.items = dropdownItems;
                component.ngOnChanges();
                fixture.detectChanges();
            });
            it('filter is visible', () => {
                expect(dropdownElement.classes['dropdown--filter-visible']).toBe(true);
            });
            it('all items are visible', () => {
                const listItems = rootElement.queryAll(By.css('li'));
                expect(listItems.length).toBe(21 + 1); // +1 for select all element
            });

            describe('and filter text is added', () => {
                let filterBoxElement: DebugElement;

                beforeEach(() => {
                    filterBoxElement = rootElement.query(By.css('.dropdown__filterTextbox'));
                });

                describe('and the text mathches 11 items', () => {
                    beforeEach(() => {
                        filterBoxElement.triggerEventHandler('valueChanged', 'Name1');
                        fixture.detectChanges();
                    });
                    it('11 items are displayed', () => {
                        const listItems = rootElement.queryAll(By.css('li'));
                        expect(listItems.length).toBe(11 + 1); // +1 for select all element
                    });
                });

                describe('and the text mathches 7 new items', () => {
                    beforeEach(() => {
                        for (let i = 0; i < 7; i++) {
                            component.items.push({ displayName: `NewItem!${i}` } as DropdownItem<any>);
                        }
                        filterBoxElement.triggerEventHandler('valueChanged', 'NewItem');
                        fixture.detectChanges();
                    });
                    it('7 items are displayed', () => {
                        const listItems = rootElement.queryAll(By.css('li'));
                        expect(listItems.length).toBe(7 + 1); // +1 for select all element
                    });
                });
                describe('and the text mathches displayName an item', () => {
                    beforeEach(() => {
                        component.items.push({ value: 'SomeId', displayName: 'SomeId' } as DropdownItem<any>);
                        filterBoxElement.triggerEventHandler('valueChanged', 'SomeIdHej');
                        fixture.detectChanges();
                    });
                    it('no items are displayed', () => {
                        const listItems = rootElement.queryAll(By.css('li'));
                        expect(listItems.length).toBe(1); // +1 for select all element
                    });
                });
            });
        });

        describe('and an item is clicked', () => {
            let itemToClick: DebugElement;
            beforeEach(() => {
                spyOn(component.selectedChanged, 'emit');
                component.items = [{ displayName: 'one' }, { displayName: 'two' }, { displayName: 'three' }] as DropdownItem<any>[];
                fixture.detectChanges();
                itemToClick = rootElement.queryAll(By.css('a')).filter(x => x.nativeElement.textContent === 'one')[0];
                itemToClick.triggerEventHandler('mousedown', null);
                fixture.detectChanges();
            });
            it('the clicked item is selected', () => {
                expect(itemToClick.parent.classes['dropdown-item--selected']).toBe(true);
            });
            it('the clicked item is marked', () => {
                expect(itemToClick.parent.classes['dropdown-item--marked']).toBe(true);
            });
            it('a selectedItemChangedEvent is emitted', () => {
                expect(component.selectedChanged.emit).toHaveBeenCalled();
            });

            describe('and an item is hovered', () => {
                let itemToHover: DebugElement;
                beforeEach(() => {
                    itemToHover = rootElement.queryAll(By.css('a')).filter(x => x.nativeElement.textContent === 'two')[0];
                    itemToHover.triggerEventHandler('mouseenter', null);
                    fixture.detectChanges();
                });
                it('the hovered item is marked', () => {
                    expect(itemToHover.parent.classes['dropdown-item--marked']).toBe(true);
                });
                it('the hovered item is not selected', () => {
                    expect(itemToHover.parent.classes['dropdown-item--selected']).toBe(false);
                });
                it('the selected item is not marked', () => {
                    expect(itemToClick.parent.classes['dropdown-item--marked']).toBe(false);
                });
                it('the clicked item is selected', () => {
                    expect(itemToClick.parent.classes['dropdown-item--selected']).toBe(true);
                });

                describe('and the item is un-hovered', () => {
                    beforeEach(() => {
                        itemToHover.triggerEventHandler('mouseleave', null);
                        fixture.detectChanges();
                    });
                    it('the un-hovered item is not marked', () => {
                        expect(itemToHover.parent.classes['dropdown-item--marked']).toBe(false);
                    });
                    it('the un-hovered item is not selected', () => {
                        expect(itemToHover.parent.classes['dropdown-item--selected']).toBe(false);
                    });
                    it('the selected item is marked', () => {
                        expect(itemToClick.parent.classes['dropdown-item--marked']).toBe(true);
                    });
                    it('the clicked item is selected', () => {
                        expect(itemToClick.parent.classes['dropdown-item--selected']).toBe(true);
                    });
                });
            });
        });

        describe('and showAll is clicked', () => {
            let itemToClick: DebugElement;
            beforeEach(() => {
                spyOn(component.selectedChanged, 'emit');
                const dropdownItems = [] as DropdownItem<any>[];
                for (let i = 0; i <= 20; i++) {
                    dropdownItems.push({ displayName: `Name${i}` } as DropdownItem<any>);
                }
                component.items = dropdownItems;
                component.showAllItemText = 'show all';

                component.ngOnChanges();
                fixture.detectChanges();

                itemToClick = rootElement.queryAll(By.css('a')).filter(x => x.nativeElement.text === 'show all')[0];
                itemToClick.triggerEventHandler('mousedown', null);
                fixture.detectChanges();

            });
            it('the showAll is not selected', () => {
                expect(itemToClick.parent.classes['dropdown-item--selected']).toBeFalsy();

            });
            it('no item is selected', () => {
                expect(component.selectedItem).toBeUndefined();
            });
            it('a selectedItemChangedEvent is not emitted', () => {

                expect(component.selectedChanged.emit).not.toHaveBeenCalled();
            });
        });


        describe('and noItemSelectedLabel is set', () => {
            let item: DebugElement;
            beforeEach(() => {
                component.items = [{ displayName: 'one' }, { displayName: 'two' }, { displayName: 'three' }] as DropdownItem<any>[];

                component.noItemSelectedLabel = 'Choose Item';
                fixture.detectChanges();
                component.ngOnChanges();
                item = rootElement.queryAll(By.css('span'))[0];
            });
            it('the showAllItem Is Initialized with displayName', () => {
                expect(item.nativeElement.innerText).toBe('Choose Item');
            });
        });
    });

    describe('When component is initialized with one selected item', () => {
        let dropdownElement: DebugElement;
        let selectedItemSpan: DebugElement;

        beforeEach(() => {
            component.items = [{ displayName: 'one' }, { displayName: 'two', selected: true }, { displayName: 'three' }] as DropdownItem<any>[];
            dropdownElement = rootElement.query(By.css('.dropdown--edit'));
            fixture.detectChanges();
            selectedItemSpan = dropdownElement.query(By.css('span'));
        });
        it('item is selected', () => {
            expect(component.selectedItem).toBe(component.items[1]);
        });
        it('selected item text is shown', () => {
            expect(selectedItemSpan.nativeElement.title).toBe('two');
        });
    });

    describe('When component is initialized with two selected items', () => {
        let dropdownElement: DebugElement;
        let selectedItemSpan: DebugElement;
        beforeEach(() => {
            component.items = [{ displayName: 'one', selected: true }, { displayName: 'two', selected: true }, { displayName: 'three' }] as DropdownItem<any>[];
            dropdownElement = rootElement.query(By.css('.dropdown--edit'));
            fixture.detectChanges();
            selectedItemSpan = dropdownElement.query(By.css('span'));
        });
        it('first item is selected', () => {
            expect(component.selectedItem).toBe(component.items[0]);
        });
        it('selected item text is shown', () => {
            expect(selectedItemSpan.nativeElement.title).toBe('one');
        });
        it('the second item is unselected', () => {
            expect(component.items[1].selected).toBe(false);
        });
    });

    describe('When component is initialized with two simple values', () => {
        beforeEach(() => {
            component.values = ['one', 'two'];
            component.ngOnChanges();
            fixture.detectChanges();
            spyOn(component.selectedChanged, 'emit');
        });
        it('the item list contains two items', () => {
            expect(component.items).toEqual([{ displayName: 'one', value: 'one' }, { displayName: 'two', value: 'two' }] as DropdownItem<any>[]);
        });
        describe('and a selected value', () => {
            beforeEach(() => {
                component.selectItem(component.items[0]);
            });
            it('the matching drop down item is selected', () => {
                expect(component.items[0].selected).toBe(true);
            });
            it('a selectedItemChanged is emitted', () => {
                expect(component.selectedChanged.emit).toHaveBeenCalledWith('one');
            });
        });
    });

    describe('When component is initialized with two simple values and one selected item', () => {
        let element: DebugElement;

        beforeEach(() => {
            element = rootElement.query(By.css('.dropdown--edit'));
            component.control = new FormControl(null, { validators: [Validators.required], updateOn: 'blur' });
            component.values = ['one', 'two'];
            component.ngOnChanges();
            element.triggerEventHandler('focusin', event);
            component.selectItem(component.items[1]);
            fixture.detectChanges();
        });

        it('the matching drop down item is selected', () => {
            expect(component.items[1].selected).toBe(true);
        });

        it('the form control value is not updated', () => {
            expect(component.control.value).toBe(null);
        });

        describe('when onLeave is triggered', () => {
            beforeEach(() => {
                element.triggerEventHandler('focusout', event);
                fixture.detectChanges();
            });

            it('the matching drop down item is selected', () => {
                expect(component.items[1].selected).toBe(true);
                expect(component.control.value).toBe(component.items[1].value);
            });

            it('the control is touched and dirty', () => {
                expect(component.control.touched).toBe(true);
                expect(component.control.dirty).toBe(true);
            });
        });
    });

    describe('When initialized with no selected item and readonly-mode', () => {
        beforeEach(() => {
            component.readonly = true;
            fixture.detectChanges();
        });

        it('has div class .readonly', () => {
            expect(fixture.debugElement.classes['readonly']).toBe(true);
        });

        it('should have empty selected items text', () => {
            const selectedItemsSpan = fixture.debugElement.query(By.css('.dropdown--edit > span'));
            const content = selectedItemsSpan.nativeElement.textContent;
            expect(content.trim()).toBe('');
        });
    });

    describe('When initialized with one selected item and readonly-mode', () => {
        beforeEach(() => {
            component.readonly = true;
            component.items = [{ displayName: 'one', value: 'one', selected: true }, { displayName: 'two', value: 'two' }];
            fixture.detectChanges();
        });

        it('has div class .readonly', () => {
            expect(fixture.debugElement.classes['readonly']).toBe(true);
        });

        it('should display selected item text', () => {
            const selectedItemsSpan = fixture.debugElement.query(By.css('.dropdown--edit > span'));
            const content = selectedItemsSpan.nativeElement.textContent;
            expect(content.trim()).toBe('one');
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

        it('should have empty selected items text', () => {
            const selectedItemsSpan = fixture.debugElement.query(By.css('.dropdown--edit > span'));
            const content = selectedItemsSpan.nativeElement.textContent;
            expect(content.trim()).toBe('');
        });
    });

    describe('When initialized with one selected item and disabled-mode', () => {
        beforeEach(() => {
            component.disabled = true;
            component.items = [{ displayName: 'one', value: 'one' }, { displayName: 'two', value: 'two', selected: true }];
            fixture.detectChanges();
        });

        it('has div class .disabled', () => {
            expect(fixture.debugElement.classes['disabled']).toBe(true);
        });

        it('should display selected item text', () => {
            const selectedItemsSpan = fixture.debugElement.query(By.css('.dropdown--edit > span'));
            const content = selectedItemsSpan.nativeElement.textContent;
            expect(content.trim()).toBe('two');
        });
    });

    describe('When initialized with no selected items and disabled-mode and readonly-mode set to false', () => {
        beforeEach(() => {
            component.disabled = false;
            component.readonly = false;
            fixture.detectChanges();
        });

        it('does not have div class .readonly or .disabled', () => {
            expect(fixture.debugElement.classes['disabled']).toBe(false);
            expect(fixture.debugElement.classes['readonly']).toBe(false);
        });
    });


    describe('WCAG Tests', () => {
        let dropdownElement: DebugElement;
        let listElement: DebugElement;
        beforeEach(() => {
            dropdownElement = rootElement.query(By.css('.dropdown--edit'));
            component.values = ['one', 'two'];
            component.ngOnChanges();
            fixture.detectChanges();
        });

        it('The dropdown has role combobox.', () => {
            expect(dropdownElement.attributes['role']).toBe('combobox');
        });

        it('Aria-expanded is false', () => {
            console.log(dropdownElement
            );
            expect(dropdownElement.attributes['aria-expanded']).toBe('false');
        })
        describe('list is initialized with items', () => {
            beforeEach(() => {
                listElement = rootElement.query(By.css('.dropdown__menu__items'));
                component.values = ['one', 'two', 'three'];
                component.ngOnChanges();
                fixture.detectChanges();
            });
            it('the list has role listbox', () => {
                expect(listElement.attributes['role']).toBe('listbox');
            });
            describe('key arrow down, marks first item', () => {
                beforeEach(() => {

                    dropdownElement.triggerEventHandler('keydown', { keyCode: 40 } as KeyboardEvent);

                    fixture.detectChanges();
                });

                it('first element is marked', () => {
                    expect(component.items[0].marked).toBe(true);
                });
                it('other elements is not marked', () => {
                    expect(component.items.filter(x => x.marked).length).toEqual(1);
                });
                describe('and enter is pressed', () => {
                    beforeEach(() => {

                        dropdownElement.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);

                        fixture.detectChanges();
                    });

                    // it('marked element is selected', () => {
                    //     expect(component.items[0].marked).toBe(true);
                    //     expect(component.items[0].selected).toBe(true);
                    // });
                });

            });

            describe('key arrow up, marks last item', () => {
                beforeEach(() => {

                    dropdownElement.triggerEventHandler('keydown', { keyCode: 38 } as KeyboardEvent);

                    fixture.detectChanges();
                });

                it('last element is marked', () => {
                    expect(component.items[component.items.length - 1].marked).toBe(true);
                });
                it('other elements is not marked', () => {
                    expect(component.items.filter(x => x.marked).length).toEqual(1);
                });

            });
        })

    });
});
