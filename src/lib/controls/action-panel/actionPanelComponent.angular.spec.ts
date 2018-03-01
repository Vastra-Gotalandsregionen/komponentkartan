
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement, ElementRef, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ActionPanelJqeuryHelper } from './actionPanelJqueryHelper';
import { ActionPanelComponent } from './action-panel.component';
import { CloseButtonComponent } from '../closeButton/closeButton.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ActionPanelComponent', () => {
    let component: ActionPanelComponent;
    let fixture: ComponentFixture<ActionPanelComponent>;
    let rootElement: DebugElement;
    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [ActionPanelComponent, CloseButtonComponent],
            imports: [CommonModule, FormsModule, BrowserAnimationsModule],
            providers: [
                { provide: ElementRef },
                { provide: ChangeDetectorRef },
                { provide: ActionPanelJqeuryHelper }]
        });
        TestBed.overrideComponent(ActionPanelComponent, {
            set: {
                templateUrl: 'action-panel.component.html'
            }
        });

        TestBed.overrideComponent(CloseButtonComponent, {
            set: {
                templateUrl: '../closeButton/closeButton.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ActionPanelComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When component is initialized', () => {
        let titleElement: DebugElement;
        let closeButton: DebugElement;
        beforeEach(() => {
            component.title = 'MyTitle';
            fixture.detectChanges();
        });

        it('title is set', () => {
            titleElement = rootElement.query(By.css('.action-panel__title'));
            expect(titleElement.nativeElement.innerText).toBe('MyTitle');
        });

        it('close button is not visible', () => {
            closeButton = rootElement.query(By.css('.close-button'));
            expect(closeButton).toBeNull();
        });

        it('panel is collapsed', () => {
            expect(component.expanded).toBeUndefined();
        });

        describe('with a close button', () => {
            beforeEach(() => {
                component.showCloseButton = true;
                fixture.detectChanges();
            });

            it('close button is visible', () => {
                closeButton = rootElement.query(By.css('.close-button'));
                expect(closeButton).toBeDefined();
            });
        });
        describe('the panel is expanded', () => {
            beforeEach(() => {
                spyOn(component.expandedChanged, 'emit');
                component.expanded = true;
                fixture.detectChanges();
            });

            it('close button is visible', () => {
                expect(component.expandedChanged.emit).toHaveBeenCalled();
            });
        });
        describe('the panel is deleted', () => {
            beforeEach(() => {
                spyOn(component.expandedChanged, 'emit');
                component.deleted = true;
                component.expanded = true;
                fixture.detectChanges();
            });

            it('the panel is not expanded since it is deleted', () => {
                expect(component.expandedChanged.emit).not.toHaveBeenCalled();
            });
        });

        describe('the panel is not interactable', () => {
            beforeEach(() => {
                spyOn(component.expandedChanged, 'emit');
                component.notInteractable = true;
                component.expanded = true;
                fixture.detectChanges();
            });

            it('the panel is not expanded since it is not interactabvle', () => {
                expect(component.expandedChanged.emit).not.toHaveBeenCalled();
            });
        });
    });
});
