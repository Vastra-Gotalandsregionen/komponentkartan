

import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonBaseComponent } from './button-base.component';

@Component({
    moduleId: module.id,
    template: `<div role="button" class="test-button" (click)="onClick($event)" (keydown)="keyPressed($event)">Test</div>`
})
export class TestButtonComponent extends ButtonBaseComponent { }

describe('[ButtonBaseComponent - angular]', () => {
    let component: TestButtonComponent;
    let fixture: ComponentFixture<TestButtonComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [TestButtonComponent],
            imports: [CommonModule, FormsModule]
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TestButtonComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('WCAG Tests', () => {
        let testButtonElement: DebugElement;
        beforeEach(() => {
            testButtonElement = rootElement.query(By.css('.test-button'));
            spyOn(component.click, 'emit');
            spyOn(component, 'onClick').and.callThrough();
        });
        describe('When button is enabled', () => {
            describe('and space is pressed', () => {
                const spacePressedEvent = { preventDefault: () => { }, keyCode: 32 };
                beforeEach(() => {
                    spyOn(spacePressedEvent, 'preventDefault');
                    testButtonElement.triggerEventHandler('keydown', spacePressedEvent);
                });
                it('a clicked event is triggered', () => {
                    expect(component.click.emit).toHaveBeenCalled();
                });
                it('to prevent the default behaviour of SPACE, preventDefault is called', () => {
                    expect(spacePressedEvent.preventDefault).toHaveBeenCalled();
                });
            });
            describe('and Enter is pressed', () => {
                it('a clicked event is triggered', () => {
                    testButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
                    expect(component.click.emit).toHaveBeenCalled();
                });
            });
            describe('and a letter is pressed', () => {
                it('no clicked event is triggered', () => {
                    testButtonElement.triggerEventHandler('keydown', { keyCode: 167 } as KeyboardEvent);
                    expect(component.click.emit).toHaveBeenCalledTimes(0);
                });
            });
            describe('and button is clicked', () => {
                const clickEvent = { preventDefault: () => { } };
                beforeEach(() => {
                    testButtonElement.triggerEventHandler('click', clickEvent);
                });
                it('a clicked event is not triggered', () => {
                    expect(component.onClick).toHaveBeenCalled();
                });
            });
        });
        describe('When button is disabled', () => {
            beforeEach(() => {
                component.disabled = true;
                fixture.detectChanges();
            });
            describe('and Enter is pressed', () => {
                it('a clicked event is triggered', () => {
                    testButtonElement.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
                    expect(component.click.emit).not.toHaveBeenCalled();
                });
            });
            describe('and space is pressed', () => {
                const spacePressedEvent = { preventDefault: () => { }, keyCode: 32 };
                beforeEach(() => {
                    spyOn(spacePressedEvent, 'preventDefault');
                    testButtonElement.triggerEventHandler('keydown', spacePressedEvent);
                });
                it('a clicked event is triggered', () => {
                    expect(component.click.emit).not.toHaveBeenCalled();
                });
                it('to prevent the default behaviour of SPACE, preventDefault is called', () => {
                    expect(spacePressedEvent.preventDefault).not.toHaveBeenCalled();
                });
            });
            describe('and button is clicked', () => {
                const clickEvent = { stopPropagation: () => { } };
                beforeEach(() => {
                    spyOn(clickEvent, 'stopPropagation');
                    testButtonElement.triggerEventHandler('click', clickEvent as MouseEvent);
                });
                it('a clicked event is not triggered', () => {
                    expect(clickEvent.stopPropagation).toHaveBeenCalled();
                });
            });
        });
    });
});

