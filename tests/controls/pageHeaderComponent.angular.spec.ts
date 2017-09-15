
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageHeaderComponent } from '../../component-package/controls/pageHeader/pageHeader.component';
import { SaveCancelComponent } from '../../component-package/controls/saveCancel/saveCancel.component';
import { TextButtonComponent } from '../../component-package/controls/textButton/textButton.component';
import { LockButtonComponent } from '../../component-package/controls/lockButton/lockButton.component';

describe('PageHeaderComponent', () => {
    let component: PageHeaderComponent;
    let fixture: ComponentFixture<PageHeaderComponent>;
    let rootElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [PageHeaderComponent, SaveCancelComponent, TextButtonComponent, LockButtonComponent],
            imports: [CommonModule, FormsModule]
        });

        TestBed.overrideComponent(PageHeaderComponent, {
            set: {
                templateUrl: 'pageHeader.component.html'
            }
        });
        TestBed.overrideComponent(SaveCancelComponent, {
            set: {
                templateUrl: '../saveCancel/saveCancel.component.html'
            }
        });
        TestBed.overrideComponent(TextButtonComponent, {
            set: {
                templateUrl: '../textButton/textButton.component.html'
            }
        });
        TestBed.overrideComponent(LockButtonComponent, {
            set: {
                templateUrl: '../lockButton/lockButton.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(PageHeaderComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();

            done();
        });
    });
    describe('When initialized', () => {
        beforeEach(() => {
            spyOn(component.actionEnded, 'emit');
            spyOn(component.actionStarted, 'emit');
        });
        describe('When an enableActionsText is provided', () => {
            beforeEach(() => {
                component.enableActionsText = 'Aktivera';
                fixture.detectChanges();
            });
            it('actions are not visible', () => {
                expect(component.expanded).toBeFalsy();
            });
            it('and a text button is added', () => {
                var textButtons = rootElement.queryAll(By.css('.text-button'));
                expect(textButtons.length).toEqual(1);
            });
            describe('When the enableActionsButton is clicked', () => {
                beforeEach(() => {
                    rootElement.queryAll(By.css('vgr-text-button'))[0].triggerEventHandler('buttonClick', null);
                    fixture.detectChanges();
                });
                it('actions are visible', () => {
                    expect(component.expanded).toBeTruthy();
                });
                it('and an actionStarted event is emitted', () => {
                    expect(component.actionStarted.emit).toHaveBeenCalled();
                });
            });
            describe('And a disableActionsText is provided', () => {
                beforeEach(() => {
                    component.disableActionsText = 'Inaktivera';
                    component.enableActionsText = 'Aktivera';
                    fixture.detectChanges();
                });
                it('actions are not visible', () => {
                    expect(component.expanded).toBeFalsy();
                });
                it('and another text button is added', () => {
                    var textButtons = rootElement.queryAll(By.css('.text-button'));
                    expect(textButtons.length).toEqual(2);
                });
                describe('When the enableActionsButton is clicked', () => {
                    beforeEach(() => {
                        rootElement.queryAll(By.css('vgr-text-button'))[0].triggerEventHandler('buttonClick', null);
                        fixture.detectChanges();
                    });
                    it('actions are visible', () => {
                        expect(component.expanded).toBeTruthy();
                    });
                    it('and an actionStarted event is emitted', () => {
                        expect(component.actionStarted.emit).toHaveBeenCalled();
                    });
                    describe('When the disableActionsButton is clicked', () => {
                        beforeEach(() => {
                            rootElement.queryAll(By.css('vgr-text-button'))[1].triggerEventHandler('buttonClick', null);
                            fixture.detectChanges();
                        });
                        it('actions are not visible', () => {
                            expect(component.expanded).toBeFalsy();
                        });
                        it('and an actionEnded event is emitted', () => {
                            expect(component.actionEnded.emit).toHaveBeenCalled();
                        });
                    });
                });
            });
        });

        describe('When only a disableActionsText is provided', () => {
            beforeEach(() => {
                component.disableActionsText = 'Inaktivera';
                fixture.detectChanges();
            });
            it('actions are not visible', () => {
                expect(component.expanded).toBeFalsy();
            });
            it('and no text button is added', () => {
                var textButtons = rootElement.queryAll(By.css('.text-button'));
                expect(textButtons.length).toEqual(0);
            });
        });
    });
});