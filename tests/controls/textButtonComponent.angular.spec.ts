
import {
    ComponentFixture,
    TestBed,
    async
} from "@angular/core/testing";
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from "@angular/platform-browser-dynamic/testing";
import {
    By
} from "@angular/platform-browser";
import {
    FormsModule
} from "@angular/forms"
import {
    DebugElement
} from "@angular/core";
import {
    CommonModule
} from "@angular/common";

import {
    TextButtonComponent
} from "../../component-package/controls/textButton/textButton.component";


describe("TextButtonComponent", () => {
    let component: TextButtonComponent;
    let fixture: ComponentFixture<TextButtonComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [TextButtonComponent],
            imports: [CommonModule, FormsModule]
        });

        TestBed.overrideComponent(TextButtonComponent, {
            set: {
                templateUrl: "component-package/controls/textButton/textButton.component.html"
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TextButtonComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe("When component is initialized", () => {
        var textButtonElement: DebugElement;
        beforeEach(() => {
            textButtonElement = rootElement.query(By.css(".text-button"));
            spyOn(component.buttonClick, "emit");
        });
        it("button is enabled", () => {
            expect(textButtonElement.classes["button--disabled"]).toBeFalsy();
        });
        it("button has tab stop", () => {
            expect(textButtonElement.nativeElement.attributes.tabIndex.value).toBe("0");
        });
        describe("and button is clicked", () => {
            it("a buttonClicked event is triggered", () => {
                textButtonElement.triggerEventHandler("click", null);
                expect(component.buttonClick.emit).toHaveBeenCalled();
            });
        });
        describe("and space is pressed", () => {
            it("a buttonClicked event is triggered", () => {
                textButtonElement.triggerEventHandler("keydown", { keyCode: 32 } as KeyboardEvent);
                expect(component.buttonClick.emit).toHaveBeenCalled();
            });
        });
        describe("and Enter is pressed", () => {
            it("a buttonClicked event is triggered", () => {
                textButtonElement.triggerEventHandler("keydown", { keyCode: 13 } as KeyboardEvent);
                expect(component.buttonClick.emit).toHaveBeenCalled();
            });
        });
        describe("and a letter is pressed", () => {
            it("no buttonClicked event is triggered", () => {
                textButtonElement.triggerEventHandler("keydown", { keyCode: 167 } as KeyboardEvent);
                expect(component.buttonClick.emit).toHaveBeenCalledTimes(0);
            });
        });
        describe("and button is disabled", () => {
            beforeEach(() => {
                component.disabled = true;
                fixture.detectChanges();
            });
            it("button is displayed as disabled", () => {
                expect(textButtonElement.classes["button--disabled"]).toBeTruthy();
            });
            it("button has no tab stop", () => {
                expect(textButtonElement.nativeElement.attributes.tabIndex.value).toBe("-1");
            });
            describe("and button is clicked", () => {
                it("no buttonClicked event is triggered", () => {
                    textButtonElement.triggerEventHandler("click", null);
                    expect(component.buttonClick.emit).toHaveBeenCalledTimes(0);
                });
            });
            describe("and space is pressed", () => {
                it("no buttonClicked event is triggered", () => {
                    textButtonElement.triggerEventHandler("keypress", { code: "Space" } as KeyboardEvent);
                    expect(component.buttonClick.emit).toHaveBeenCalledTimes(0);
                });
            });
            describe("and Enter is pressed", () => {
                it("no buttonClicked event is triggered", () => {
                    textButtonElement.triggerEventHandler("keypress", { code: "Enter" } as KeyboardEvent);
                    expect(component.buttonClick.emit).toHaveBeenCalledTimes(0);
                });
            });
        });
    });
});