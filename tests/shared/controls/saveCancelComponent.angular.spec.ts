/// <reference path="../../../node_modules/@types/jasmine/index.d.ts" />

import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { By } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { DebugElement } from "@angular/core";
import { CommonModule } from "@angular/common";

import { SaveCancelComponent } from "../../../app/shared/controls/saveCancel/saveCancel.component";
import { TextButtonComponent } from "../../../app/shared/controls/textButton/textButton.component";
import { LockButtonComponent } from "../../../app/shared/controls/lockButton/lockButton.component";

describe("SaveCancelComponent", () => {
    let component: SaveCancelComponent;
    let fixture: ComponentFixture<SaveCancelComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [SaveCancelComponent, TextButtonComponent, LockButtonComponent],
            imports: [CommonModule, FormsModule]
        });

        TestBed.overrideComponent(SaveCancelComponent, {
            set: {
                templateUrl: "app/shared/controls/saveCancel/saveCancel.component.html"
            }
        });
        TestBed.overrideComponent(TextButtonComponent, {
            set: {
                templateUrl: "app/shared/controls/textButton/textButton.component.html"
            }
        });
        TestBed.overrideComponent(LockButtonComponent, {
            set: {
                templateUrl: "app/shared/controls/lockButton/lockButton.component.html"
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(SaveCancelComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe("When initialized", () => {
        beforeEach(() => {
            spyOn(component.onCancel, "emit");
            spyOn(component.onSave, "emit");
            spyOn(component.lockButtonComponent, "unlock");
            spyOn(component.lockButtonComponent, "lock");
        });
        describe("When enabled", () => {
            beforeEach(() => {
                component.enabled = true;
                component.ngOnChanges();
            });
            it("text buttons are enabled", () => {
                expect(component.textButtonComponents.filter(x => !x.disabled).length).toBe(component.textButtonComponents.length);
            });
            it("Lock button is unlocked", () => {
                expect(component.lockButtonComponent.unlock).toHaveBeenCalled();
            });
        });
        describe("When disabled", () => {
            beforeEach(() => {
                component.enabled = false;
                component.ngOnChanges();
            });
            it("text buttons are disabled", () => {
                expect(component.textButtonComponents.filter(x => x.disabled).length).toBe(component.textButtonComponents.length);
            });
            it("Llck button is locked", () => {
                expect(component.lockButtonComponent.lock).toHaveBeenCalled();
            });
        });
        describe("When save button is clicked", () => {
            beforeEach(() => {
                var saveButton = rootElement.query(By.css(".text-button--save"));
                saveButton.triggerEventHandler("buttonClick", null);
            });
            it("lock button is locked", () => {
                expect(component.lockButtonComponent.lock).toHaveBeenCalled();
            });
            it("a save event is sent", () => {
                expect(component.onSave.emit).toHaveBeenCalled();
            });
            
        });
        describe("When cancel button is clicked", () => {
            beforeEach(() => {
                var cancelButton = rootElement.query(By.css(".text-button--cancel"));
                cancelButton.triggerEventHandler("buttonClick", null);
            });
            it("lock button is locked", () => {
                expect(component.lockButtonComponent.lock).toHaveBeenCalled();
            });
            it("a cancel event is sent", () => {
                expect(component.onCancel.emit).toHaveBeenCalled();
            });
        });
        describe("When unlock button is clicked", () => {
            beforeEach(() => {
                var lockButton = rootElement.query(By.css("lock-button"));
                lockButton.triggerEventHandler("onUnlocked", null);
            });
            it("saveCancelEnable is set to true", () => {
                expect(component.saveCancelEnabled).toBe(true);
            });
        });
        describe("When lock button is clicked", () => {
            beforeEach(() => {
                var lockButton = rootElement.query(By.css("lock-button"));
                lockButton.triggerEventHandler("onLocked", null);
            });
            it("a save event is sent", () => {
                expect(component.onSave.emit).toHaveBeenCalled();
            });
            it("saveCancelEnable is set to false", () => {
                expect(component.saveCancelEnabled).toBe(false);
            });
        });
    });
});