
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

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
            console.log(component.classes);
            expect(component.classes).toContain('flex-width--4');
        });
    });

    describe('When component is initialized with width = 12 and color = blue', () => {

        beforeEach(() => {
            component.width = 12;
            component.themecolor = 'blue';
            fixture.detectChanges();
        });

        it('should have the classes flex-width--3', () => {
            expect(component.classes).toEqual('flex-width--12 panel-with-border color--blue');
        });
    });

    describe('When component is initialized with width = 5 and color = red', () => {

        beforeEach(() => {
            component.width = 5;
            component.themecolor = 'red';
            fixture.detectChanges();
        });

        it('should have the classes flex-width--3', () => {
            expect(component.classes.trim()).toEqual('flex-width--5 panel-with-border color--red');
        });
    });

    describe('When component is initialized with width = 6 and no border', () => {

        beforeEach(() => {
            component.width = 6;
            component.noborder = true;
            component.themecolor = 'red';
            fixture.detectChanges();
        });

        it('should have the classes flex-width--6', () => {
            expect(component.classes.trim()).toEqual('flex-width--6');
        });
    });
});
