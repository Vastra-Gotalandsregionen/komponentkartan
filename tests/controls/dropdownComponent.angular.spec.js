"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var dropdown_component_1 = require("../../component-package/controls/dropdown/dropdown.component");
var filterTextbox_component_1 = require("../../component-package/controls/filterTextbox/filterTextbox.component");
var truncatePipe_1 = require("../../component-package/pipes/truncatePipe");
var filterPipe_1 = require("../../component-package/pipes/filterPipe");
var dropdownItemToSelectedTextPipe_1 = require("../../component-package/pipes/dropdownItemToSelectedTextPipe");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
describe('DropdownComponent', function () {
    var component;
    var fixture;
    var rootElement;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [dropdown_component_1.DropdownComponent, filterTextbox_component_1.FilterTextboxComponent, truncatePipe_1.TruncatePipe, filterPipe_1.FilterPipe, dropdownItemToSelectedTextPipe_1.DropdownItemToSelectedTextPipe],
            imports: [common_1.CommonModule, forms_1.FormsModule, ngx_perfect_scrollbar_1.PerfectScrollbarModule]
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(dropdown_component_1.DropdownComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('When component is initialized', function () {
        var dropdownElement;
        beforeEach(function () {
            dropdownElement = rootElement.query(platform_browser_1.By.css('.dropdown--edit'));
            component.showAllItemText = 'Select all';
            component.ngOnChanges();
        });
        it('dropdown is not expanded', function () {
            expect(dropdownElement.classes['dropdown--open']).toBe(false);
        });
        describe('and dropdown is clicked', function () {
            it('dropdown is expanded', function () {
                dropdownElement.triggerEventHandler('mousedown', { target: dropdownElement.nativeElement });
                fixture.detectChanges();
                expect(dropdownElement.classes['dropdown--open']).toBe(true);
            });
            describe('and dropdown is expanded', function () {
                beforeEach(function () {
                    component.expanded = true;
                    fixture.detectChanges();
                });
                describe('and filterTextBox is clicked', function () {
                    it('dropdown is not collapsed', function () {
                        var filterTextbox = rootElement.query(platform_browser_1.By.css('.dropdown__filterTextbox'));
                        filterTextbox.triggerEventHandler('mousedown', { target: filterTextbox.nativeElement });
                        fixture.detectChanges();
                        expect(dropdownElement.classes['dropdown--open']).toBe(true);
                    });
                });
                describe('and dropdown is clicked', function () {
                    it('dropdown is collapsed', function () {
                        dropdownElement.triggerEventHandler('mousedown', { target: dropdownElement.nativeElement });
                        fixture.detectChanges();
                        expect(dropdownElement.classes['dropdown--open']).toBe(false);
                    });
                });
            });
        });
        describe('and item list is less than 20 items', function () {
            it('filter is not visible', function () {
                component.items = [{ displayName: 'name' }];
                expect(dropdownElement.classes['dropdown--filter-visible']).toBe(false);
            });
        });
        describe('and item list is more than 20 items', function () {
            beforeEach(function () {
                var dropdownItems = [];
                for (var i = 0; i <= 20; i++) {
                    dropdownItems.push({ displayName: "Name" + i });
                }
                component.items = dropdownItems;
                component.ngOnChanges();
                fixture.detectChanges();
            });
            it('filter is visible', function () {
                expect(dropdownElement.classes['dropdown--filter-visible']).toBe(true);
            });
            it('all items are visible', function () {
                var listItems = rootElement.queryAll(platform_browser_1.By.css('li'));
                expect(listItems.length).toBe(21 + 1); // +1 for select all element
            });
            describe('and filter text is added', function () {
                var filterBoxElement;
                beforeEach(function () {
                    filterBoxElement = rootElement.query(platform_browser_1.By.css('.dropdown__filterTextbox'));
                });
                describe('and the text mathches 11 items', function () {
                    beforeEach(function () {
                        filterBoxElement.triggerEventHandler('valueChanged', 'Name1');
                        fixture.detectChanges();
                    });
                    it('11 items are displayed', function () {
                        var listItems = rootElement.queryAll(platform_browser_1.By.css('li'));
                        expect(listItems.length).toBe(11 + 1); // +1 for select all element
                    });
                });
                describe('and the text mathches 7 new items', function () {
                    beforeEach(function () {
                        for (var i = 0; i < 7; i++) {
                            component.items.push({ displayName: "NewItem!" + i });
                        }
                        ;
                        filterBoxElement.triggerEventHandler('valueChanged', 'NewItem');
                        fixture.detectChanges();
                    });
                    it('7 items are displayed', function () {
                        var listItems = rootElement.queryAll(platform_browser_1.By.css('li'));
                        expect(listItems.length).toBe(7 + 1); // +1 for select all element
                    });
                });
                describe('and the text mathches and id of an item', function () {
                    beforeEach(function () {
                        component.items.push({ id: 'SomeId' });
                        filterBoxElement.triggerEventHandler('valueChanged', 'SomeId');
                        fixture.detectChanges();
                    });
                    it('no items are displayed', function () {
                        var listItems = rootElement.queryAll(platform_browser_1.By.css('li'));
                        expect(listItems.length).toBe(1); // +1 for select all element
                    });
                });
            });
        });
        describe('and an item is clicked', function () {
            var itemToClick;
            beforeEach(function () {
                spyOn(component.selectedItemChanged, 'emit');
                component.items = [{ displayName: 'one' }, { displayName: 'two' }, { displayName: 'three' }];
                fixture.detectChanges();
                itemToClick = rootElement.queryAll(platform_browser_1.By.css('a')).filter(function (x) { return x.nativeElement.textContent === 'one'; })[0];
                itemToClick.triggerEventHandler('mousedown', null);
                fixture.detectChanges();
            });
            it('the clicked item is selected', function () {
                expect(itemToClick.parent.classes['dropdown-item--selected']).toBe(true);
            });
            it('the clicked item is marked', function () {
                expect(itemToClick.parent.classes['dropdown-item--marked']).toBe(true);
            });
            it('a selectedItemChangedEvent is emitted', function () {
                expect(component.selectedItemChanged.emit).toHaveBeenCalled();
            });
            describe('and an item is hovered', function () {
                var itemToHover;
                beforeEach(function () {
                    itemToHover = rootElement.queryAll(platform_browser_1.By.css('a')).filter(function (x) { return x.nativeElement.textContent === 'two'; })[0];
                    itemToHover.triggerEventHandler('mouseenter', null);
                    fixture.detectChanges();
                });
                it('the hovered item is marked', function () {
                    expect(itemToHover.parent.classes['dropdown-item--marked']).toBe(true);
                });
                it('the hovered item is not selected', function () {
                    expect(itemToHover.parent.classes['dropdown-item--selected']).toBe(false);
                });
                it('the selected item is not marked', function () {
                    expect(itemToClick.parent.classes['dropdown-item--marked']).toBe(false);
                });
                it('the clicked item is selected', function () {
                    expect(itemToClick.parent.classes['dropdown-item--selected']).toBe(true);
                });
                describe('and the item is un-hovered', function () {
                    beforeEach(function () {
                        itemToHover.triggerEventHandler('mouseleave', null);
                        fixture.detectChanges();
                    });
                    it('the un-hovered item is not marked', function () {
                        expect(itemToHover.parent.classes['dropdown-item--marked']).toBe(false);
                    });
                    it('the un-hovered item is not selected', function () {
                        expect(itemToHover.parent.classes['dropdown-item--selected']).toBe(false);
                    });
                    it('the selected item is marked', function () {
                        expect(itemToClick.parent.classes['dropdown-item--marked']).toBe(true);
                    });
                    it('the clicked item is selected', function () {
                        expect(itemToClick.parent.classes['dropdown-item--selected']).toBe(true);
                    });
                });
            });
        });
        describe('and showAll is clicked', function () {
            var itemToClick;
            beforeEach(function () {
                spyOn(component.selectedItemChanged, 'emit');
                var dropdownItems = [];
                for (var i = 0; i <= 20; i++) {
                    dropdownItems.push({ displayName: "Name" + i });
                }
                component.items = dropdownItems;
                component.showAllItemText = 'show all';
                component.ngOnChanges();
                fixture.detectChanges();
                itemToClick = rootElement.queryAll(platform_browser_1.By.css('a')).filter(function (x) { return x.nativeElement.text === 'show all'; })[0];
                itemToClick.triggerEventHandler('mousedown', null);
                fixture.detectChanges();
            });
            it('the showAll is not selected', function () {
                expect(itemToClick.parent.classes['dropdown-item--selected']).toBeFalsy();
            });
            it('no item is selected', function () {
                expect(component.selectedItem).toBeUndefined();
            });
            it('a selectedItemChangedEvent is not emitted', function () {
                expect(component.selectedItemChanged.emit).not.toHaveBeenCalled();
            });
        });
        describe('and noItemSelectedLabel is set', function () {
            var item;
            beforeEach(function () {
                component.items = [{ displayName: 'one' }, { displayName: 'two' }, { displayName: 'three' }];
                component.noItemSelectedLabel = 'Choose Item';
                fixture.detectChanges();
                component.ngOnChanges();
                item = rootElement.queryAll(platform_browser_1.By.css('span'))[0];
            });
            it('the showAllItem Is Initialized with displayName', function () {
                expect(item.nativeElement.innerText).toBe('Choose Item');
            });
        });
    });
    describe('When component is initialized with one selected item', function () {
        var dropdownElement;
        var selectedItemSpan;
        beforeEach(function () {
            component.items = [{ displayName: 'one' }, { displayName: 'two', selected: true }, { displayName: 'three' }];
            dropdownElement = rootElement.query(platform_browser_1.By.css('.dropdown--edit'));
            fixture.detectChanges();
            selectedItemSpan = dropdownElement.query(platform_browser_1.By.css('span'));
        });
        it('item is selected', function () {
            expect(component.selectedItem).toBe(component.items[1]);
        });
        it('selected item text is shown', function () {
            expect(selectedItemSpan.nativeElement.title).toBe('two');
        });
    });
    describe('When component is initialized with two selected items', function () {
        var dropdownElement;
        var selectedItemSpan;
        beforeEach(function () {
            component.items = [{ displayName: 'one', selected: true }, { displayName: 'two', selected: true }, { displayName: 'three' }];
            dropdownElement = rootElement.query(platform_browser_1.By.css('.dropdown--edit'));
            fixture.detectChanges();
            selectedItemSpan = dropdownElement.query(platform_browser_1.By.css('span'));
        });
        it('first item is selected', function () {
            expect(component.selectedItem).toBe(component.items[0]);
        });
        it('selected item text is shown', function () {
            expect(selectedItemSpan.nativeElement.title).toBe('one');
        });
        it('the second item is unselected', function () {
            expect(component.items[1].selected).toBe(false);
        });
    });
    describe('When component is initialized with two simple values', function () {
        beforeEach(function () {
            component.values = ['one', 'two'];
            component.ngOnChanges();
            fixture.detectChanges();
            spyOn(component.selectedItemChanged, 'emit');
        });
        it('the item list contains two items', function () {
            expect(component.items).toEqual([{ displayName: 'one', id: 'one' }, { displayName: 'two', id: 'two' }]);
        });
        describe('and a selected value', function () {
            beforeEach(function () {
                component.selectedValue = 'one';
            });
            it('the matching drop down item is selected', function () {
                expect(component.items[0].selected).toBe(true);
            });
            it('a selectedItemChanged is emitted', function () {
                expect(component.selectedItemChanged.emit).toHaveBeenCalledWith({ displayName: 'one', id: 'one', selected: true, marked: true });
            });
        });
    });
    describe('When initialized with no selected item and readonly-mode', function () {
        beforeEach(function () {
            component.readonly = true;
            fixture.detectChanges();
        });
        it('has div class .readonly', function () {
            expect(fixture.debugElement.classes['readonly']).toBe(true);
        });
        it('should have empty selected items text', function () {
            var selectedItemsSpan = fixture.debugElement.query(platform_browser_1.By.css('.dropdown--edit > span'));
            var content = selectedItemsSpan.nativeElement.textContent;
            expect(content.trim()).toBe('');
        });
    });
    describe('When initialized with one selected item and readonly-mode', function () {
        beforeEach(function () {
            component.readonly = true;
            component.values = ['one', 'two'];
            component.selectedValue = 'one';
            fixture.detectChanges();
        });
        it('has div class .readonly', function () {
            expect(fixture.debugElement.classes['readonly']).toBe(true);
        });
        it('should display selected item text', function () {
            var selectedItemsSpan = fixture.debugElement.query(platform_browser_1.By.css('.dropdown--edit > span'));
            var content = selectedItemsSpan.nativeElement.textContent;
            expect(content.trim()).toBe('one');
        });
    });
    describe('When initialized with no selected items and disabled-mode', function () {
        beforeEach(function () {
            component.disabled = true;
            fixture.detectChanges();
        });
        it('has div class .disabled', function () {
            expect(fixture.debugElement.classes['disabled']).toBe(true);
        });
        it('should have empty selected items text', function () {
            var selectedItemsSpan = fixture.debugElement.query(platform_browser_1.By.css('.dropdown--edit > span'));
            var content = selectedItemsSpan.nativeElement.textContent;
            expect(content.trim()).toBe('');
        });
    });
    describe('When initialized with one selected item and disabled-mode', function () {
        beforeEach(function () {
            component.disabled = true;
            component.values = ['one', 'two'];
            component.selectedValue = 'two';
            fixture.detectChanges();
        });
        it('has div class .disabled', function () {
            expect(fixture.debugElement.classes['disabled']).toBe(true);
        });
        it('should display selected item text', function () {
            var selectedItemsSpan = fixture.debugElement.query(platform_browser_1.By.css('.dropdown--edit > span'));
            var content = selectedItemsSpan.nativeElement.textContent;
            expect(content.trim()).toBe('two');
        });
    });
    describe('When initialized with no selected items and disabled-mode and readonly-mode set to false', function () {
        beforeEach(function () {
            component.disabled = false;
            component.readonly = false;
            fixture.detectChanges();
        });
        it('does not have div class .readonly or .disabled', function () {
            expect(fixture.debugElement.classes['disabled']).toBe(false);
            expect(fixture.debugElement.classes['readonly']).toBe(false);
        });
    });
});
//# sourceMappingURL=dropdownComponent.angular.spec.js.map