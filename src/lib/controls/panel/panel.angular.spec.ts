
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

import { PanelComponent } from '../../controls/panel/panel.component';

describe('PanelComponent', () => {
    let component: PanelComponent;
    let fixture: ComponentFixture<PanelComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [PanelComponent],
            imports: [CommonModule]
        });

        TestBed.overrideComponent(PanelComponent, {
            set: {
                templateUrl: 'panel.component.html'
            }
        });
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(PanelComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });

    describe('When component is initialized', () => {

        beforeEach(() => {
            fixture.detectChanges();
        });

        it('should have the classes flex-width--4', () => {
            expect(component.classes.trim()).toEqual('panel flex-width--4');
        });
    });

    describe('When component is initialized with width = 12 and color = blue', () => {

        beforeEach(() => {
            component.width = 12;
            component.color = 'blue';
            fixture.detectChanges();
        });

        it('should have the classes flex-width--3', () => {
            expect(component.classes.trim()).toEqual('panel flex-width--12 color--blue');
        });
    });

    describe('When component is initialized with width = 12 and color = blue', () => {

        beforeEach(() => {
            component.width = 5;
            component.color = 'red';
            fixture.detectChanges();
        });

        it('should have the classes flex-width--3', () => {
            expect(component.classes.trim()).toEqual('panel flex-width--5 color--red');
        });
    });
});
