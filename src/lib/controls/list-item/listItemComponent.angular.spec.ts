
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, Renderer, ElementRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowNotification } from '../../models/rowNotification.model';
import { NotificationIcon } from '../../models/notificationIcon.model';
import { NotificationType } from '../../models/notificationType.model';

import {
    ListItemComponent, ListItemHeaderComponent, ListColumnComponent,
    ListItemContentComponent, ListItemJqeuryHelper
} from '../../controls/index';

export class MockElementRef extends ElementRef {
    constructor() { super(null); }

}

describe('ListItemComponent', () => {
    let component: ListItemComponent;
    let fixture: ComponentFixture<ListItemComponent>;
    let rootElement: DebugElement;
    // let renderer: Renderer;
    const jqueryHelper: ListItemJqeuryHelper = new ListItemJqeuryHelper();

    // const rendererMock = jasmine.createSpyObj('rendererMock', ['selectRootElement',
    //     'createElement',
    //     'createViewRoot',
    //     'createText',
    //     'setElementProperty',
    //     'setElementAttribute',
    //     'setText',
    //     'setBindingDebugInfo',
    //     'createTemplateAnchor',
    //     'projectNodes',
    //     'attachViewAfter',
    //     'detachView',
    //     'destroyView',
    //     'listen',
    //     'listenGlobal',
    //     'setElementClass',
    //     'setElementStyle',
    //     'invokeElementMethod',
    //     'animate']);



    // let rootRendererMock = {
    //     renderComponent: () => {
    //         return rendererMock;
    //     }
    // };



    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [
                ListItemComponent,
                ListItemHeaderComponent,
                ListColumnComponent,
                ListItemContentComponent
            ],
            imports: [CommonModule],
            providers: [
                { provide: ElementRef, useClass: MockElementRef },
                { provide: Renderer },
                { provide: ListItemJqeuryHelper, useValue: jqueryHelper }]
        });

        TestBed.overrideComponent(ListItemComponent, {
            set: {
                template: `
                <vgr-list-item-header>
                   <vgr-list-column [text]="'Testman'"></vgr-list-column>
               </vgr-list-item-header>
               <vgr-list-item-content>
                 <span> Mer information</span>
               </vgr-list-item-content>`
            }
        });

        TestBed.compileComponents().then(() => {
            // spyOn(jqueryHelper, 'collapseContent');

            fixture = TestBed.createComponent(ListItemComponent);
            fixture.componentInstance.listItemHeader = <ListItemHeaderComponent>fixture.debugElement.children[0].componentInstance; // First element in list-item which is list-item-header;
            fixture.componentInstance.listContent = <ListItemContentComponent>fixture.debugElement.children[1].componentInstance;  // Second element in list-item which is list-item-content;
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;

            fixture.detectChanges();
            done();
        });
    });
    describe('[ListItemComponent', () => {
        describe('When initialized', () => {
            beforeEach(() => {
                component.ngOnInit();
                component.ngAfterContentInit();
                // component.listItemHeader.setFocus();
            });

            it('the component has the list-item class', () => {
                expect(rootElement.classes['list-item']).toBe(true);
            });

            it('When header is focused and space is presssed', () => {
                // TODO: sätta header i fokus
                // component.listItemHeader.setFocus();
                let header: DebugElement;
                header = rootElement.children[0];  // First element in list-item which is list-item-header;
                console.log('content', header.name);
                spyOn(component.listItemHeader.expandedChanged, 'emit');

                header.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);

                expect(component.listItemHeader.expandedChanged.emit).toHaveBeenCalledWith(true);
            });

            it('When content is focused and Ctrl + PageUp is pressed', () => {
                // TODO: sätta content i fokus
                // component.listContent.setFocus();
                let content: DebugElement;
                content = rootElement.children[1]; // Second element in list-item which is list-item-content;
                spyOn(component.listContent.goUp, 'emit');
                console.log('content', content.name);

                content.triggerEventHandler('keydown', { ctrlKey: true, keyCode: 33 } as KeyboardEvent);
                expect(component.listContent.goUp.emit).toHaveBeenCalled();
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
                        spyOn(jqueryHelper, 'collapseContent').and.callFake((header: any, callback: Function) => { callback(); });
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
            });
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
            });

            it('the property expanded is set to true', () => {
                expect(component.expanded).toBe(true);
            });
            it('toggleContent is called', () => {
                expect(jqueryHelper.toggleContent).toHaveBeenCalled();
            });

            describe('and a ShowOnCollapse notification is set', () => {
                beforeEach(() => {
                    spyOn(jqueryHelper, 'collapseContent').and.callFake((header: any, callback: Function) => { callback(); });
                    component.notification = { message: 'Row saved', icon: NotificationIcon.Ok, type: NotificationType.ShowOnCollapse } as RowNotification;
                });
                it('notification is displayed', () => {
                    expect(component.notificationVisible).toBe(true);
                });
                it('component is collapsing', () => {
                    expect(component.notInteractable).toBe(true);
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
                            expect(component.notInteractable).toBe(false);
                        });
                    });
                });
            });

            describe('and a ShowOnRemove notification is set', () => {
                beforeEach(() => {
                    spyOn(jqueryHelper, 'collapseContent').and.callFake((header: any, callback: Function) => { callback(); });
                    component.notification = { message: 'Row deleted', icon: NotificationIcon.Ok, type: NotificationType.ShowOnRemove } as RowNotification;
                });
                it('notification is displayed', () => {
                    expect(component.notificationVisible).toBe(true);
                });
                it('component is collapsing', () => {
                    expect(component.notInteractable).toBe(true);
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
                            expect(component.notInteractable).toBe(false);
                        });
                        it('component is deleted', () => {
                            expect(component.isDeleted).toBe(true);
                        });
                    });
                });
            });

        });

        describe('When item is collapsing', () => {
            beforeEach(() => {
                spyOn(jqueryHelper, 'isClickEventHeader').and.returnValue(true);
                spyOn(jqueryHelper, 'toggleContent');
                component.notInteractable = true;
            });
            describe('and header is clicked', () => {
                beforeEach(() => {
                    rootElement.triggerEventHandler('click', null);
                    fixture.detectChanges();
                });
                it('item is not expanded', () => {
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
                it('item is not expanded', () => {
                    expect(component.expanded).toBeFalsy();
                });
                it('content is not visible', () => {
                    expect(jqueryHelper.toggleContent).toHaveBeenCalledTimes(0);
                });
            });
        });
    });
});
