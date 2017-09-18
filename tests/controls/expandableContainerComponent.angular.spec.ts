
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExpandableContainerComponent } from '../../component-package/controls/expandableContainer/expandableContainer.component';


describe('SaveCancelComponent', () => {
    let component: ExpandableContainerComponent;
    let fixture: ComponentFixture<ExpandableContainerComponent>;
    let rootElement: DebugElement;



    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [ExpandableContainerComponent],
            imports: [CommonModule]
        });

        TestBed.overrideComponent(ExpandableContainerComponent, {
            set: {
                templateUrl: './expandableContainer.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ExpandableContainerComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When initialized', () => {
        it('component has the expandable-container class', () => {
            expect(rootElement.classes['expandable-container']).toBe(true);
        });
    });

});
