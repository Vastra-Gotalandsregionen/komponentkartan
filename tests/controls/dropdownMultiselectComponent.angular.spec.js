"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* tslint:disable */
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var dropdown_multiselect_component_1 = require("../../component-package/controls/dropdown-multiselect/dropdown-multiselect.component");
var filterTextbox_component_1 = require("../../component-package/controls/filterTextbox/filterTextbox.component");
var checkbox_component_1 = require("../../component-package/controls/checkbox/checkbox.component");
var truncatePipe_1 = require("../../component-package/pipes/truncatePipe");
var filterPipe_1 = require("../../component-package/pipes/filterPipe");
var dropdownItemToSelectedTextPipe_1 = require("../../component-package/pipes/dropdownItemToSelectedTextPipe");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
describe("[DropdownMultiSelectComponent]", function () {
    var component;
    var fixture;
    var rootElement;
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [dropdown_multiselect_component_1.DropdownMultiselectComponent, filterTextbox_component_1.FilterTextboxComponent, truncatePipe_1.TruncatePipe, filterPipe_1.FilterPipe, dropdownItemToSelectedTextPipe_1.DropdownItemToSelectedTextPipe, checkbox_component_1.CheckboxComponent],
            imports: [common_1.CommonModule, forms_1.FormsModule, ngx_perfect_scrollbar_1.PerfectScrollbarModule]
        });
        testing_1.TestBed.overrideComponent(dropdown_multiselect_component_1.DropdownMultiselectComponent, {
            set: {
                templateUrl: "dropdown-multiselect.component.html"
            }
        });
        testing_1.TestBed.overrideComponent(filterTextbox_component_1.FilterTextboxComponent, {
            set: {
                templateUrl: "../filterTextbox/filterTextbox.component.html"
            }
        });
        testing_1.TestBed.overrideComponent(checkbox_component_1.CheckboxComponent, {
            set: {
                templateUrl: "../checkbox/checkbox.component.html"
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(dropdown_multiselect_component_1.DropdownMultiselectComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            component.showAllItemText = "Select all";
            component.items = [{ displayName: "Option 1" },
                { displayName: "Option 2" },
                { displayName: "Option 3" }];
            component.ngOnChanges();
            fixture.detectChanges();
            done();
        });
    });
    describe("When component is initialized", function () {
        var dropdownElement;
        beforeEach(function () {
            dropdownElement = rootElement.query(platform_browser_1.By.css(".dropdown--edit"));
        });
        it("dropdown is not expanded", function () {
            expect(dropdownElement.classes["dropdown--open"]).toBe(false);
        });
        it("text in dropdown is 'Välj'", function () {
            expect(component.dropdownLabel).toBe("Välj");
        });
        it("select all is not selected", function () {
            expect(component.selectAllItem.selected).toBe(false);
        });
        it("there are 3 items in the list", function () {
            expect(component.items.length).toBe(3);
        });
        it("no item is selected", function () {
            expect(component.items.filter(function (x) { return x.selected; }).length).toBe(0);
        });
    });
    describe("When component is initialized with one selected item", function () {
        var dropdownElement;
        beforeEach(function () {
            spyOn(component.selectionChanged, "emit");
            component.items = [{ displayName: "Option 1" },
                { displayName: "Option 2", selected: true },
                { displayName: "Option 3" }];
            component.ngOnChanges();
            fixture.detectChanges();
        });
        it("selectAll is not selected", function () {
            expect(component.selectAllItem.selected).toBe(false);
        });
        it("selectionChanged event is emitted with the selected item", function () {
            expect(component.selectionChanged.emit).toHaveBeenCalledWith([component.items[1]]);
        });
        it("dropdown text is 1 vald", function () {
            expect(component.dropdownLabel).toBe("1 vald");
        });
    });
    describe("When component is initialized with two selected items", function () {
        var dropdownElement;
        beforeEach(function () {
            spyOn(component.selectionChanged, "emit");
            component.items = [{ displayName: "Option 1", selected: true },
                { displayName: "Option 2", selected: true },
                { displayName: "Option 3" }];
            component.ngOnChanges();
            fixture.detectChanges();
        });
        it("selectAll is not selected", function () {
            expect(component.selectAllItem.selected).toBe(false);
        });
        it("selectionChanged event is emitted with the selected items", function () {
            expect(component.selectionChanged.emit).toHaveBeenCalledWith([component.items[0], component.items[1]]);
        });
        it("dropdown text is 2 vald", function () {
            expect(component.dropdownLabel).toBe("2 valda");
        });
    });
    describe("when dropdown is clicked", function () {
        var dropdownElement;
        beforeEach(function () {
            dropdownElement = rootElement.query(platform_browser_1.By.css(".dropdown--edit"));
            dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement });
            fixture.detectChanges();
        });
        it("dropdown is expanded", function () {
            expect(dropdownElement.classes["dropdown--open"]).toBe(true);
        });
        describe("and dropdown is clicked again", function () {
            it("dropdown is collapsed", function () {
                dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement });
                fixture.detectChanges();
                expect(dropdownElement.classes["dropdown--open"]).toBe(false);
            });
        });
    });
    describe("when one item is selected", function () {
        var dropdownElement;
        beforeEach(function () {
            dropdownElement = rootElement.query(platform_browser_1.By.css(".dropdown"));
            component.expanded = true;
            component.selectItem(component.items[0]);
            fixture.detectChanges();
        });
        it("dropdown text is '1 vald'", function () {
            expect(component.dropdownLabel).toBe("1 vald");
        });
    });
    describe("when select all is clicked", function () {
        var dropdownElement;
        beforeEach(function () {
            dropdownElement = rootElement.query(platform_browser_1.By.css(".dropdown"));
            component.expanded = true;
            component.selectAllItems();
            fixture.detectChanges();
        });
        it("select all item is checked", function () {
            expect(component.selectAllItem.selected).toBeTruthy();
        });
        it("all items are checked", function () {
            expect(component.items.filter(function (x) { return !x.selected; }).length).toBe(0);
        });
        it("dropdown text is 'Alla'", function () {
            expect(component.dropdownLabel).toBe("Alla");
        });
        describe("and one item is deselected", function () {
            beforeEach(function () {
                component.deselectItem(component.items[0]);
                fixture.detectChanges();
            });
            it("deselected item is not checked", function () {
                expect(component.items[0].selected).toBe(false);
            });
            it("select all item is not checked", function () {
                expect(component.selectAllItem.selected).toBe(false);
            });
            it("dropdown text is '2 valda'", function () {
                expect(component.dropdownLabel).toBe("2 valda");
            });
        });
    });
    describe("when one item is not selected", function () {
        beforeEach(function () {
            component.items.forEach(function (x) { return x.selected = true; });
            component.items[0].selected = false;
        });
        describe("and the item is reselected", function () {
            beforeEach(function () {
                component.selectItem(component.items[0]);
            });
            it("reselected item is checked", function () {
                expect(component.items[0].selected).toBe(true);
            });
            it("select all item is checked", function () {
                expect(component.selectAllItem.selected).toBe(true);
            });
            it("dropdown text is 'Alla'", function () {
                expect(component.dropdownLabel).toBe("Alla");
            });
        });
        describe("and select all is clicked", function () {
            beforeEach(function () {
                component.selectAllItems();
            });
            it("all items are checked", function () {
                expect(component.items.filter(function (x) { return !x.selected; }).length).toBe(0);
            });
            it("select all item is checked", function () {
                expect(component.selectAllItem.selected).toBe(true);
            });
            it("dropdown text is 'Alla'", function () {
                expect(component.dropdownLabel).toBe("Alla");
            });
        });
    });
    describe("when dropdown is open", function () {
        var dropdownElement;
        beforeEach(function () {
            dropdownElement = rootElement.query(platform_browser_1.By.css(".dropdown--edit"));
            component.expanded = true;
            fixture.detectChanges();
        });
        describe("and select all is checked", function () {
            beforeEach(function () {
                component.selectAllItem.selected = true;
            });
            describe("and select all is clicked", function () {
                beforeEach(function () {
                    var selectAllItem = rootElement.query(platform_browser_1.By.css('.dropdown-item--select-all'));
                    var selectAllCheckbox = selectAllItem.query(platform_browser_1.By.css('.checkbox--inline')).query(platform_browser_1.By.css('.checkbox'));
                    var selectAllLink = selectAllItem.query(platform_browser_1.By.css('a'));
                    selectAllLink.triggerEventHandler("mousedown", { target: selectAllLink.nativeElement });
                    dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement });
                    fixture.detectChanges();
                });
                it("dropdown is not collapsed", function () {
                    expect(dropdownElement.classes["dropdown--open"]).toBe(true);
                });
            });
        });
        describe("and select all is not checked", function () {
            beforeEach(function () {
                component.selectAllItem.selected = false;
            });
            describe("and select all is clicked", function () {
                beforeEach(function () {
                    var selectAllItem = rootElement.query(platform_browser_1.By.css('.dropdown-item--select-all'));
                    var selectAllCheckbox = selectAllItem.query(platform_browser_1.By.css('.checkbox--inline')).query(platform_browser_1.By.css('.checkbox'));
                    var selectAllLink = selectAllItem.query(platform_browser_1.By.css('a'));
                    selectAllLink.triggerEventHandler("mousedown", { target: selectAllLink.nativeElement });
                    dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement });
                    fixture.detectChanges();
                });
                it("dropdown is not collapsed", function () {
                    expect(dropdownElement.classes["dropdown--open"]).toBe(true);
                });
            });
        });
    });
    describe("when there are more than 20 items in the dropdown", function () {
        beforeEach(function () {
            var dropdownItems = [];
            for (var i = 0; i <= 20; i++) {
                dropdownItems.push({ displayName: "Name" + i });
            }
            component.items = dropdownItems;
            component.ngOnChanges();
            fixture.detectChanges();
        });
        it("the filter textbox is visible", function () {
            var dropdownElement = rootElement.query(platform_browser_1.By.css(".dropdown--edit"));
            expect(dropdownElement.classes["dropdown--filter-visible"]).toBe(true);
        });
        describe("when the list has been filtered", function () {
            beforeEach(function () {
                component.filterTextboxComponent.value = "2";
                fixture.detectChanges();
            });
            it("the select all item text is 'Välj alla'", function () {
                var item = rootElement.query(platform_browser_1.By.css('.dropdown-item--select-all'));
                var itemLink = item.query(platform_browser_1.By.css("a"));
                expect(itemLink.nativeElement.title).toBe(component.showAllItemText);
            });
        });
        describe("when all items are selected and the list is filtered", function () {
            beforeEach(function () {
                component.selectAllItems();
                component.filterTextboxComponent.value = "2";
                fixture.detectChanges();
            });
            describe("and filter is cleared", function () {
                beforeEach(function () {
                    component.clearFilter();
                });
                it("the select all item remains checked", function () {
                    expect(component.selectAllItem.selected).toBe(true);
                });
                it("and select all item checkbox is visible", function () {
                    var selectAllItem = rootElement.query(platform_browser_1.By.css('.dropdown-item--select-all'));
                    var selectAllCheckbox = selectAllItem.query(platform_browser_1.By.css("vgr-checkbox"));
                    expect(selectAllCheckbox).toBeDefined();
                });
            });
            describe("and an item is deselected and the filter is cleared", function () {
                beforeEach(function () {
                    component.deselectItem(component.items.filter(function (x) { return x.displayName === "Name2"; })[0]);
                    component.clearFilter();
                });
                it("the select all item is not checked", function () {
                    expect(component.selectAllItem.selected).toBe(false);
                });
            });
        });
    });
    describe("when there are less than 20 items", function () {
        beforeEach(function () {
            var dropdownItems = [];
            for (var i = 0; i <= 19; i++) {
                dropdownItems.push({ displayName: "Name" + i });
            }
            component.items = dropdownItems;
            component.ngOnChanges();
            fixture.detectChanges();
        });
        it("the filter textbox is not visible", function () {
            var dropdownElement = rootElement.query(platform_browser_1.By.css(".dropdown--edit"));
            expect(dropdownElement.classes["dropdown--filter-visible"]).toBe(false);
        });
    });
    describe('When component is initialized with two simple values', function () {
        beforeEach(function () {
            component.values = ['one', 'two'];
            fixture.detectChanges();
            spyOn(component.selectionChanged, 'emit');
        });
        it('the item list contains two items', function () {
            expect(component.items).toEqual([{ displayName: 'one', id: 'one' }, { displayName: 'two', id: 'two' }]);
        });
        describe('and a selected value', function () {
            beforeEach(function () {
                component.selectedValues = ['one'];
            });
            it('the matching drop down item is selected', function () {
                expect(component.items[0].selected).toBe(true);
            });
            it('a selectedItemChanged is emitted', function () {
                expect(component.selectionChanged.emit).toHaveBeenCalledWith([{ displayName: 'one', id: 'one', selected: true }]);
            });
        });
        describe('and both are selected', function () {
            beforeEach(function () {
                component.selectedValues = ['one', 'two'];
            });
            it('the matching drop down items are selected', function () {
                expect(component.items[0].selected).toBe(true);
                expect(component.items[1].selected).toBe(true);
            });
            it('a selectedItemChanged is emitted', function () {
                expect(component.selectionChanged.emit).toHaveBeenCalledWith([{ displayName: 'one', id: 'one', selected: true }, { displayName: 'two', id: 'two', selected: true }]);
            });
            it('select all is selected', function () {
                expect(component.selectAllItem.selected).toBeTruthy();
            });
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
        it('should display "Välj"', function () {
            var selectedItemsSpan = fixture.debugElement.query(platform_browser_1.By.css('.dropdown--edit > span'));
            var content = selectedItemsSpan.nativeElement.textContent;
            expect(content.trim()).toBe('Välj');
        });
    });
    describe('When initialized with two selected items and disabled-mode', function () {
        beforeEach(function () {
            component.disabled = true;
            component.values = ['one', 'two', 'three'];
            component.selectedValues = ['one', 'two'];
            fixture.detectChanges();
        });
        it('has div class .disabled', function () {
            expect(fixture.debugElement.classes['disabled']).toBe(true);
        });
        it('should display a text with the number of items selected', function () {
            var selectedItemsSpan = fixture.debugElement.query(platform_browser_1.By.css('.dropdown--edit > span'));
            var content = selectedItemsSpan.nativeElement.textContent;
            expect(content.trim()).toBe('2 valda');
        });
    });
    describe('When initialized with two selected items and readonly-mode', function () {
        beforeEach(function () {
            component.readonly = true;
            component.values = ['one', 'two', 'three'];
            component.selectedValues = ['one', 'two'];
            fixture.detectChanges();
        });
        it('should display an ul with selected items', function () {
            var selectedItemslist = fixture.debugElement.queryAll(platform_browser_1.By.css('.dropdown__multiselect-readonlylist ul li'));
            expect(selectedItemslist.length).toBe(2);
            expect(selectedItemslist[0].nativeElement.textContent).toBe('one');
            expect(selectedItemslist[1].nativeElement.textContent).toBe('two');
        });
    });
});
//# sourceMappingURL=dropdownMultiselectComponent.angular.spec.js.map