
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseButtonComponent } from '../../controls/close-button/close-button.component';

describe('CloseButtonComponent', () => {
    let component: CloseButtonComponent;
    let fixture: ComponentFixture<CloseButtonComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [CloseButtonComponent],
            imports: [CommonModule, FormsModule]
        });

        TestBed.overrideComponent(CloseButtonComponent, {
            set: {
                templateUrl: 'closeButton.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(CloseButtonComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When component is initialized', () => {
        let closeButtonElement: DebugElement;
        beforeEach(() => {
            closeButtonElement = rootElement.query(By.css('.close-button'));
        });

        it('button is enabled', () => {
            expect(closeButtonElement.classes['button--disabled']).toBeFalsy();
        });

        describe('and button is clicked', () => {

        });

        describe('and button is disabled', () => {
            beforeEach(() => {
                component.disabled = true;
                fixture.detectChanges();
            });

            it('button is displayed as disabled', () => {
                expect(closeButtonElement.classes['button--disabled']).toBeTruthy();
            });
        });
    });
    describe('WCAG Tests', () => {
        let closeButtonElement: DebugElement;
        beforeEach(() => {
            closeButtonElement = rootElement.query(By.css('.close-button'));
        });
        describe('When button is enabled', () => {
            it('button has tab stop', () => {
                expect(closeButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
            });
            it('button aria-label is set to Stäng', () => {
                expect(closeButtonElement.attributes['aria-label']).toBe('stäng');
            });
        });

        describe('and button is disabled', () => {
            beforeEach(() => {
                component.disabled = true;
                fixture.detectChanges();
            });
            it('the aria-disabled is set to true', () => {
                expect(closeButtonElement.attributes['aria-disabled']).toBeTruthy();
            });
            it('button has no tab stop', () => {
                expect(closeButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
            });
        });
    });
});
