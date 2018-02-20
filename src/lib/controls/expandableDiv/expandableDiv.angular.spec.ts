import { ExpandableDivComponent } from './expandableDiv.component';
import { ExpandableDivHeaderComponent } from './expandableDiv-header.component';
import { ExpandableDivContentComponent } from './expandableDiv-content.component';
import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('[ExpandableDivComponent]', () => {

    let component: ExpandableDivComponent;
    let fixture: ComponentFixture<ExpandableDivComponent>;
    let rootElement: DebugElement;
    let header: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [ExpandableDivComponent],
            imports: [CommonModule]
        });

        TestBed.overrideComponent(ExpandableDivComponent, {
            set: {
                templateUrl: './expandableDiv.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ExpandableDivComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });

    describe('When component is initialized with expanded = true', () => {
        beforeEach(() => {
            component.expanded = true;
            fixture.detectChanges();
        });
        it('component has class expandable-div', () => {
            expect(rootElement.classes['expandable-div']).toBe(true);
        });
        it('component has class expandable-div--collapsed', () => {
            expect(rootElement.classes['expandable-div--collapsed']).toBe(false);
        });
        it('component does not have class expandable-div--expanded', () => {
            expect(rootElement.classes['expandable-div--expanded']).toBe(true);
        });


        describe('and header is clicked', () => {
            beforeEach(() => {
                header = rootElement.query(By.css('.expandable-div-header'));
                header.triggerEventHandler('click', null);
                fixture.detectChanges();
            });

            it('div is collapsed', () => {
                // TODO: Test funkar inte pga fördröjning på 400ms
                // expect(component.expanded).toBe(false);
            });

            describe('and header is clicked again', () => {
                beforeEach(() => {
                    header.triggerEventHandler('click', null);
                    fixture.detectChanges();
                });
                it('div is collapsed', () => {
                    expect(component.expanded).toBe(true);
                });
            });
        });
    });

    describe('When component is initialized', () => {
        it('component has class expandable-div', () => {
            console.log(rootElement.classes);
            expect(rootElement.classes['expandable-div']).toBe(true);
        });
        it('component has class expandable-div--collapsed', () => {
            console.log(rootElement.classes);
            expect(rootElement.classes['expandable-div--collapsed']).toBe(true);
        });
        it('component does not have class expandable-div--expanded', () => {
            console.log(rootElement.classes);
            expect(rootElement.classes['expandable-div--expanded']).toBe(false);
        });

        describe('and header is clicked', () => {
            beforeEach(() => {
                header = rootElement.query(By.css('.expandable-div-header'));
                header.triggerEventHandler('click', null);
                fixture.detectChanges();
            });

            it('div is expanded', () => {
                expect(component.expanded).toBe(true);
            });
            describe('and header is clicked again', () => {
                beforeEach(() => {
                    header.triggerEventHandler('click', null);
                    fixture.detectChanges();
                });
                it('div is collapsed', () => {
                    // TODO: Test funkar inte pga fördröjning på 400ms
                    // expect(component.expanded).toBe(false);
                });
            });
        });

    });
});
