
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowNotification } from '../../component-package/models/rowNotification.model';
import { NotificationIcon } from '../../component-package/models/notificationIcon.model';
import { NotificationType } from '../../component-package/models/notificationType.model';

import { ExpandableContainerComponent } from '../../component-package/controls/expandableContainer/expandableContainer.component';
import { ExpandableContainerJqeuryHelper } from '../../component-package/controls/expandableContainer/expandableContainerJqueryHelper';


describe('ExpandableContainerComponent', () => {
    let component: ExpandableContainerComponent;
    let fixture: ComponentFixture<ExpandableContainerComponent>;
    let rootElement: DebugElement;
    const jqueryHelper: ExpandableContainerJqeuryHelper = new ExpandableContainerJqeuryHelper();

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [ExpandableContainerComponent],
            imports: [CommonModule],
            providers: [{ provide: ExpandableContainerJqeuryHelper, useValue: jqueryHelper }]
        });

        TestBed.overrideComponent(ExpandableContainerComponent, {
            set: {
                templateUrl: './expandableContainer.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            // spyOn(jqueryHelper, 'collapseContent');
            fixture = TestBed.createComponent(ExpandableContainerComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('[ExpandableContainerComponent', () => {
        describe('When initialized', () => {
            beforeEach(() => {
                component.ngOnInit();
            });

            it('the component has the expandable-container class', () => {
                expect(rootElement.classes['expandable-container']).toBe(true);
            });

            describe('and the header is clicked', () => {
                const event: any = {};
                beforeEach(() => {
                    spyOn(jqueryHelper, 'isClickEventHeader').and.returnValue(true);
                    spyOn(jqueryHelper, 'toggleContent');
                    rootElement.triggerEventHandler('click', event);
                    fixture.detectChanges();
                });
                it('component is expanded', () => {
                    expect(component.expanded).toBe(true);
                });
                it('content is visible', () => {
                    expect(jqueryHelper.toggleContent).toHaveBeenCalled();
                });
                it('click event is not bubbled', () => {
                    expect(event.cancelBubble).toBeTruthy();
                });
                describe('and the header is clicked again', () => {
                    beforeEach(() => {
                        spyOn(jqueryHelper, 'collapseContent').and.callFake((header: any, callback: Function) => { callback() });
                        rootElement.triggerEventHandler('click', null);
                        fixture.detectChanges();
                    });
                    it('component is collapsed', () => {
                        expect(component.expanded).toBe(false);
                    });
                    it('content not visible', () => {
                        expect(jqueryHelper.toggleContent).toHaveBeenCalled();
                    });
                });
            });
            describe('the component is clicked outside of the header', () => {
                beforeEach(() => {
                    spyOn(jqueryHelper, 'isClickEventHeader').and.returnValue(false);
                    spyOn(jqueryHelper, 'toggleContent');
                    rootElement.triggerEventHandler('click', null);
                    fixture.detectChanges();
                });
                it('component is not expanded', () => {
                    expect(component.expanded).toBeFalsy();
                });
                it('content is not visible', () => {
                    expect(jqueryHelper.toggleContent).toHaveBeenCalledTimes(0);
                });
            });
        });

        describe('When initialized with a Permanent notification is set,', () => {
            beforeEach(() => {
                component.notification = { message: 'Information', icon: NotificationIcon.Ok, type: NotificationType.Permanent } as RowNotification;
                component.ngOnInit();
            });
            it('notification is displayed', () => {
                expect(component.notificationVisible).toBe(true);
            })
        });

        describe('When expanded is set to true', () => {
            beforeEach(() => {
                spyOn(jqueryHelper, 'toggleContent');
                component.expanded = true;
                fixture.detectChanges();
            });
            beforeAll(() => {
                jasmine.clock().uninstall();
                jasmine.clock().install();
            });
            afterAll(() => {
                jasmine.clock().uninstall();
            })

            it('the property expanded is set to true', () => {
                expect(component.expanded).toBe(true);
            });
            it('toggleContent is called', () => {
                expect(jqueryHelper.toggleContent).toHaveBeenCalled();
            });

            describe('and a ShowOnCollapse notification is set', () => {
                beforeEach(() => {
                    spyOn(jqueryHelper, 'collapseContent').and.callFake((header: any, callback: Function) => { callback() });
                    component.notification = { message: 'Row saved', icon: NotificationIcon.Ok, type: NotificationType.ShowOnCollapse } as RowNotification;
                });
                it('notification is displayed', () => {
                    expect(component.notificationVisible).toBe(true);
                });
                it('component is collapsing', () => {
                    expect(component.collapsing).toBe(true);
                });

                describe('after 1,4 seconds', () => {
                    beforeEach(() => {
                        jasmine.clock().tick(1400);
                    });
                    it('content is collapsed', () => {
                        expect(jqueryHelper.collapseContent).toHaveBeenCalled();
                    });
                    describe('after another 2 seconds', () => {
                        beforeEach(() => {
                            jasmine.clock().tick(2000);
                            fixture.detectChanges();
                        });
                        it('the notification is hidden', () => {
                            expect(component.notificationVisible).toBe(false);
                        });
                        it('the notification is done', () => {
                            expect(component.notification.done).toBe(true);
                        });
                        it('component is not expanded', () => {
                            expect(component.expanded).toBe(false);
                        });
                        it('component is not collapsing', () => {
                            expect(component.collapsing).toBe(false);
                        });
                    });
                });
            });

            describe('and a ShowOnRemove notification is set', () => {
                beforeEach(() => {
                    spyOn(jqueryHelper, 'collapseContent').and.callFake((header: any, callback: Function) => { callback() });
                    component.notification = { message: 'Row deleted', icon: NotificationIcon.Ok, type: NotificationType.ShowOnRemove } as RowNotification;
                });
                it('notification is displayed', () => {
                    expect(component.notificationVisible).toBe(true);
                });
                it('component is collapsing', () => {
                    expect(component.collapsing).toBe(true);
                });

                describe('after 1,4 seconds', () => {
                    beforeEach(() => {
                        jasmine.clock().tick(1400);
                    });
                    it('content is collapsed', () => {
                        expect(jqueryHelper.collapseContent).toHaveBeenCalled();
                    });
                    describe('after another 2 seconds', () => {
                        beforeEach(() => {
                            jasmine.clock().tick(2000);
                            fixture.detectChanges();
                        });
                        it('the notification is hidden', () => {
                            expect(component.notificationVisible).toBe(false);
                        });
                        it('the notification is done', () => {
                            expect(component.notification.done).toBe(true);
                        });
                        it('component is not expanded', () => {
                            expect(component.expanded).toBe(false);
                        });
                        it('component is not collapsing', () => {
                            expect(component.collapsing).toBe(false);
                        });
                        it('component is deleted', () => {
                            expect(component.deleted).toBe(true);
                        });
                    });
                });
            });

        });

        describe('When container is collapsing', () => {
            beforeEach(() => {
                spyOn(jqueryHelper, 'isClickEventHeader').and.returnValue(true);
                spyOn(jqueryHelper, 'toggleContent');
                component.collapsing = true;
            });
            describe('and header is clicked', () => {
                beforeEach(() => {
                    rootElement.triggerEventHandler('click', null);
                    fixture.detectChanges();
                });
                it('container is not expanded', () => {
                    expect(component.expanded).toBeFalsy();
                });
                it('content is not visible', () => {
                    expect(jqueryHelper.toggleContent).toHaveBeenCalledTimes(0);
                });
            });
            describe('and expanded is set to true', () => {
                beforeEach(() => {
                    component.expanded = true;
                    fixture.detectChanges();
                });
                it('container is not expanded', () => {
                    expect(component.expanded).toBeFalsy();
                });
                it('content is not visible', () => {
                    expect(jqueryHelper.toggleContent).toHaveBeenCalledTimes(0);
                });
            });
        });
    });
});


