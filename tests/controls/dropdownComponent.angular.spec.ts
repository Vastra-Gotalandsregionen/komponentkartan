
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms"

import { DebugElement } from "@angular/core";
import { CommonModule } from "@angular/common";


import { DropdownComponent } from "../../component-package/controls/dropdown/dropdown.component";
import { FilterTextboxComponent } from "../../component-package/controls/filterTextbox/filterTextbox.component";
import { TruncatePipe } from "../../component-package/pipes/truncatePipe";
import { FilterPipe } from "../../component-package/pipes/filterPipe";
import { DropdownItemToSelectedTextPipe } from "../../component-package/pipes/dropdownItemToSelectedTextPipe";
import { IDropdownItem } from "../../component-package/models/dropdownItem.model";
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

describe("DropdownComponent", () => {
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
    describe("When component is initialized", () => {
        var dropdownElement: DebugElement;
        beforeEach(() => {
            dropdownElement = rootElement.query(By.css(".dropdown"));
            component.selectAllItemText = "Select all";
            component.ngOnChanges();
        });
        it("dropdown is not expanded", () => {
            expect(dropdownElement.classes["dropdown--open"]).toBe(false);
        });
        describe("and dropdown is clicked", () => {
            it("dropdown is expanded", () => {
                dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement } as MouseEvent);
                fixture.detectChanges();

                expect(dropdownElement.classes["dropdown--open"]).toBe(true);
            });

            describe("and dropdown is expanded", () => {
                beforeEach(() => {
                    component.expanded = true;
                    fixture.detectChanges();
                });

                describe("and filterTextBox is clicked", () => {
                    it("dropdown is not collapsed", () => {
                        let filterTextbox = rootElement.query(By.css(".dropdown__filterTextbox"));
                        filterTextbox.triggerEventHandler("mousedown", { target: filterTextbox.nativeElement } as MouseEvent);
                        fixture.detectChanges();

                        expect(dropdownElement.classes["dropdown--open"]).toBe(true);
                    });
                });
                //describe("and scrollbar is clicked", () => {
                //it("dropdown is not collapsed", () => {
                //Behöver skrivas
                //  });
                // });
                describe("and dropdown is clicked", () => {
                    it("dropdown is collapsed", () => {
                        dropdownElement.triggerEventHandler("mousedown", { target: dropdownElement.nativeElement } as MouseEvent);
                        fixture.detectChanges();
                        expect(dropdownElement.classes["dropdown--open"]).toBe(false);
                    });
                });
            });
        });

        describe("and item list is less than 11 items", () => {
            it("scroll is not visible", () => {
                component.items = [{ displayName: "name" }] as IDropdownItem[];

                let dropdownElement = rootElement.query(By.css(".dropdown"));
                expect(dropdownElement.classes["dropdown--scroll-visible"]).toBe(false);
            });
        });
        describe("and item list is more than 11 items", () => {
            it("scroll is visible", () => {
                let dropdownItems = [] as IDropdownItem[];
                for (let i = 0; i <= 11; i++) {
                    dropdownItems.push({ displayName: `Name${i}` } as IDropdownItem);
                }

                component.items = dropdownItems;
                component.ngOnChanges();
                fixture.detectChanges();
                let dropdownElement = rootElement.query(By.css(".dropdown"));
                expect(dropdownElement.classes["dropdown--scroll-visible"]).toBe(true);
            });
        });
        describe("and item list is less than 20 items", () => {
            it("filter is not visible", () => {
                component.items = [{ displayName: "name" }] as IDropdownItem[];

                let dropdownElement = rootElement.query(By.css(".dropdown"));
                expect(dropdownElement.classes["dropdown--filter-visible"]).toBe(false);
            });
        });
        describe("and item list is more than 20 items", () => {
            beforeEach(() => {
                let dropdownItems = [] as IDropdownItem[];
                for (let i = 0; i <= 20; i++) {
                    dropdownItems.push({ displayName: `Name${i}` } as IDropdownItem);
                }
                component.items = dropdownItems;
                component.ngOnChanges();
                fixture.detectChanges();
            });
            it("filter is visible", () => {
                let dropdownElement = rootElement.query(By.css(".dropdown"));
                expect(dropdownElement.classes["dropdown--filter-visible"]).toBe(true);
            });
            it("all items are visible", () => {
                let listItems = rootElement.queryAll(By.css("li"));
                expect(listItems.length).toBe(21 + 1); //+1 for select all element
            });
            describe("and filter text is added", () => {
                var filterBoxElement: DebugElement;
                beforeEach(() => {
                    filterBoxElement = rootElement.query(By.css(".dropdown__filterTextbox"));
                });
                describe("and the text mathches 11 items", () => {
                    beforeEach(() => {
                        filterBoxElement.triggerEventHandler("inputChange", "Name1");
                        fixture.detectChanges();
                    });
                    it("11 items are displayed", () => {

                        let listItems = rootElement.queryAll(By.css("li"));
                        expect(listItems.length).toBe(11 + 1);//+1 for select all element
                    });
                    it("scroll is visible", () => {

                        let dropdownElement = rootElement.query(By.css(".dropdown"));
                        expect(dropdownElement.classes["dropdown--scroll-visible"]).toBe(true);
                    });
                });
                describe("and the text mathches 8 new items", () => {
                    beforeEach(() => {
                        for (let i = 0; i < 8; i++) {
                            component.items.push({ displayName: `NewItem!${i}` } as IDropdownItem);
                        };
                        filterBoxElement.triggerEventHandler("inputChange", "NewItem");
                        fixture.detectChanges();
                    });
                    it("8 items are displayed", () => {

                        let listItems = rootElement.queryAll(By.css("li"));
                        expect(listItems.length).toBe(8 + 1);//+1 for select all element
                    });
                    it("scroll is not visible", () => {
                        let dropdownElement = rootElement.query(By.css(".dropdown"));
                        expect(dropdownElement.classes["dropdown--scroll-visible"]).toBe(false);
                    });
                });
                describe("and the text mathches and id of an item", () => {
                    beforeEach(() => {
                        component.items.push({ id: "SomeId" } as IDropdownItem);
                        filterBoxElement.triggerEventHandler("inputChange", "SomeId");
                        fixture.detectChanges();
                    });
                    it("no items are displayed", () => {

                        let listItems = rootElement.queryAll(By.css("li"));
                        expect(listItems.length).toBe(1);//+1 for select all element
                    });
                    it("scroll is not visible", () => {
                        let dropdownElement = rootElement.query(By.css(".dropdown"));
                        expect(dropdownElement.classes["dropdown--scroll-visible"]).toBe(false);
                    });
                });
            });
        });

        describe("and an item is clicked", () => {
            var itemToClick: DebugElement;
            beforeEach(() => {
                spyOn(component.selectedItemChanged, "emit");
                component.items = [{ displayName: "one" }, { displayName: "two" }, { displayName: "three" }] as IDropdownItem[];
                fixture.detectChanges();
                itemToClick = rootElement.queryAll(By.css("a")).filter(x => x.nativeElement.textContent === "one")[0];
                itemToClick.triggerEventHandler("mousedown", null);
                fixture.detectChanges();

            });
            it("the clicked item is selected", () => {
                expect(itemToClick.parent.classes["dropdown-item--selected"]).toBe(true);
            });
            it("the clicked item is marked", () => {
                expect(itemToClick.parent.classes["dropdown-item--marked"]).toBe(true);
            });
            it("a selectedItemChangedEvent is emitted", () => {

                expect(component.selectedItemChanged.emit).toHaveBeenCalled();
            });

            describe("and an item is hovered", () => {
                var itemToHover: DebugElement;
                beforeEach(() => {
                    itemToHover = rootElement.queryAll(By.css("a")).filter(x => x.nativeElement.textContent === "two")[0];
                    itemToHover.triggerEventHandler("mouseenter", null);
                    fixture.detectChanges();
                });
                it("the hovered item is marked", () => {
                    expect(itemToHover.parent.classes["dropdown-item--marked"]).toBe(true);
                });
                it("the hovered item is not selected", () => {
                    expect(itemToHover.parent.classes["dropdown-item--selected"]).toBe(false);
                });
                it("the selected item is not marked", () => {
                    expect(itemToClick.parent.classes["dropdown-item--marked"]).toBe(false);
                });
                it("the clicked item is selected", () => {
                    expect(itemToClick.parent.classes["dropdown-item--selected"]).toBe(true);
                });

                describe("and the item is un-hovered", () => {
                    beforeEach(() => {
                        itemToHover.triggerEventHandler("mouseleave", null);
                        fixture.detectChanges();
                    });
                    it("the un-hovered item is not marked", () => {
                        expect(itemToHover.parent.classes["dropdown-item--marked"]).toBe(false);
                    });
                    it("the un-hovered item is not selected", () => {
                        expect(itemToHover.parent.classes["dropdown-item--selected"]).toBe(false);
                    });
                    it("the selected item is marked", () => {
                        expect(itemToClick.parent.classes["dropdown-item--marked"]).toBe(true);
                    });
                    it("the clicked item is selected", () => {
                        expect(itemToClick.parent.classes["dropdown-item--selected"]).toBe(true);
                    });
                });
            });
        });

        describe("and selectAll is clicked", () => {
            var itemToClick: DebugElement;
            beforeEach(() => {
                spyOn(component.selectedItemChanged, "emit");
                component.items = [{ displayName: "one" }, { displayName: "two" }, { displayName: "three" }] as IDropdownItem[];
                component.selectAllItem = { displayName: "select all" } as IDropdownItem;
                fixture.detectChanges();
                component.ngOnChanges();
                itemToClick = rootElement.queryAll(By.css("a")).filter(x => x.nativeElement.textContent === "select all")[0];
                itemToClick.triggerEventHandler("mousedown", null);
                fixture.detectChanges();

            });
            it("the clicked item is selected", () => {
                expect(itemToClick.parent.classes["dropdown-item--selected"]).toBe(true);
            });
            it("the clicked item is marked", () => {
                expect(itemToClick.parent.classes["dropdown-item--marked"]).toBe(true);
            });
            it("a selectedItemChangedEvent is emitted", () => {

                expect(component.selectedItemChanged.emit).toHaveBeenCalled();
            });
        });

        describe("and selectAllItemText is set", () => {
            beforeEach(() => {
                component.items = [{ displayName: "one" }, { displayName: "two" }, { displayName: "three" }] as IDropdownItem[];
                component.selectAllItemText = "Select All";
                component.ngOnChanges();
                fixture.detectChanges();
            });
            it("the selectAllItem Is Initialized", () => {
                expect(component.selectAllItem.displayName).toBe("Select All");
            });
            it("the selectAllItem is selected", () => {
                expect(component.selectedItem).toEqual(component.selectAllItem);
            });
            it("the selectAllItem is selected in the drop down list", () => {
                var itemInList = rootElement.queryAll(By.css("a")).filter(x => x.nativeElement.textContent === "Select All")[0];
                expect(itemInList.parent.classes["dropdown-item--selected"]).toBeTruthy();
            });
        });

        describe("and selectAllISelectedText is set", () => {
            beforeEach(() => {
                component.items = [{ displayName: "one" }, { displayName: "two" }, { displayName: "three" }] as IDropdownItem[];
                component.selectAllItemText = "Item text in list";
                component.selectAllSelectedText = "Text when selected";
                fixture.detectChanges();
                component.ngOnChanges();
            });
            it("the selectAllItem Is Initialized with displayName", () => {
                expect(component.selectAllItem.displayName).toBe("Item text in list");
            });
            it("the selectAllItem Is Initialized with displayNameWhenSelected", () => {
                expect(component.selectAllItem.displayNameWhenSelected).toBe("Text when selected");
            });
        });
    });

    describe("When component is initialized with one selected item", () => {
        var dropdownElement: DebugElement;
        var selectedItemSpan: DebugElement;

        beforeEach(() => {
            component.items = [{ displayName: "one" }, { displayName: "two", selected: true }, { displayName: "three" }] as IDropdownItem[];
            dropdownElement = rootElement.query(By.css(".dropdown"));
            fixture.detectChanges();
            selectedItemSpan = dropdownElement.query(By.css("span"));
        });
        it("item is selected", () => {
            expect(component.selectedItem).toBe(component.items[1]);
        });
        it("selected item text is shown", () => {
            expect(selectedItemSpan.nativeElement.title).toBe("two");
        });
    });

    describe("When component is initialized with two selected items", () => {
        var dropdownElement: DebugElement;
        var selectedItemSpan: DebugElement;
        beforeEach(() => {
            component.items = [{ displayName: "one", selected: true }, { displayName: "two", selected: true }, { displayName: "three" }] as IDropdownItem[];
            dropdownElement = rootElement.query(By.css(".dropdown"));
            fixture.detectChanges();
            selectedItemSpan = dropdownElement.query(By.css("span"));
        });
        it("first item is selected", () => {
            expect(component.selectedItem).toBe(component.items[0]);
        });
        it("selected item text is shown", () => {
            expect(selectedItemSpan.nativeElement.title).toBe("one");
        });
        it("the second item is unselected", () => {
            expect(component.items[1].selected).toBe(false);
        });
    });

    describe("When selectAllText is not set", () => {
        beforeEach(() => {
            component.items = [{ displayName: "one" }, { displayName: "two" }, { displayName: "three" }] as IDropdownItem[];
            fixture.detectChanges();
            component.ngOnChanges();
        });
        it("the selectAllItem is not initialized", () => {
            expect(component.selectAllItem).toBeUndefined();
        });
    });
});