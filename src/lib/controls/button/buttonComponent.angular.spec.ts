
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

describe('[ButtonComponent - Angular]', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [ButtonComponent],
            imports: [CommonModule, FormsModule]
        });

        TestBed.overrideComponent(ButtonComponent, {
            set: {
                templateUrl: 'button.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ButtonComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When button is initialized', () => {
        let textButtonElement: DebugElement;
        beforeEach(() => {
            textButtonElement = rootElement.query(By.css('.text-button'));
        });

        describe('And button is enabled', () => {
            beforeEach(() => {
                component.disabled = false;
                fixture.detectChanges();
            });
            it('button is enabled', () => {
                expect(textButtonElement.classes['button--disabled']).toBe(false);
            });
        });
        describe('When button is disabled', () => {
            beforeEach(() => {
                component.disabled = true;
                fixture.detectChanges();
                spyOn(component.click, 'emit');
            });
            it('button is displayed as disabled', () => {
                expect(textButtonElement.classes['button--disabled']).toBe(true);
            });
        });
    });

    describe('WCAG Tests', () => {
        let textButtonElement: DebugElement;
        beforeEach(() => {
            textButtonElement = rootElement.query(By.css('.text-button'));
        });
        describe('When button is enabled', () => {
            it('button has tab stop', () => {
                expect(textButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
            });

            it('button has role "button"', () => {
                expect(textButtonElement.attributes['role']).toBe('button');
            });

            it('aria-disabled is false', () => {
                expect(textButtonElement.attributes['aria-disabled']).toBe('false');
            });
        });
        describe('When button is disabled', () => {
            beforeEach(() => {
                component.disabled = true;
                fixture.detectChanges();
            });
            it('button has tab stop', () => {
                expect(textButtonElement.nativeElement.attributes.tabIndex.value).toBe('0');
            });
            it('aria-disabled is set to true', () => {
                expect(textButtonElement.attributes['aria-disabled']).toBe('true');
            });
        });
    });
});

