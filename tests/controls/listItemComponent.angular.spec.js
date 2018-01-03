"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var common_1 = require("@angular/common");
var notificationIcon_model_1 = require("../../component-package/models/notificationIcon.model");
var notificationType_model_1 = require("../../component-package/models/notificationType.model");
var list_item_component_1 = require("../../component-package/controls/list-item/list-item.component");
var listItemJqueryHelper_1 = require("../../component-package/controls/list-item/listItemJqueryHelper");
describe('ListItemComponent', function () {
    var component;
    var fixture;
    var rootElement;
    var jqueryHelper = new listItemJqueryHelper_1.ListItemJqeuryHelper();
    beforeEach(function (done) {
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [list_item_component_1.ListItemComponent],
            imports: [common_1.CommonModule],
            providers: [{ provide: listItemJqueryHelper_1.ListItemJqeuryHelper, useValue: jqueryHelper }]
        });
        testing_1.TestBed.overrideComponent(list_item_component_1.ListItemComponent, {
            set: {
                templateUrl: './list-item.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            // spyOn(jqueryHelper, 'collapseContent');
            fixture = testing_1.TestBed.createComponent(list_item_component_1.ListItemComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('[ListItemComponent', function () {
        describe('When initialized', function () {
            beforeEach(function () {
                component.ngOnInit();
            });
            it('the component has the list-item class', function () {
                expect(rootElement.classes['list-item']).toBe(true);
            });
            describe('and the header is clicked', function () {
                var event = {};
                beforeEach(function () {
                    spyOn(jqueryHelper, 'isClickEventHeader').and.returnValue(true);
                    spyOn(jqueryHelper, 'toggleContent');
                    rootElement.triggerEventHandler('click', event);
                    fixture.detectChanges();
                });
                it('component is expanded', function () {
                    expect(component.expanded).toBe(true);
                });
                it('content is visible', function () {
                    expect(jqueryHelper.toggleContent).toHaveBeenCalled();
                });
                it('click event is not bubbled', function () {
                    expect(event.cancelBubble).toBeTruthy();
                });
                describe('and the header is clicked again', function () {
                    beforeEach(function () {
                        spyOn(jqueryHelper, 'collapseContent').and.callFake(function (header, callback) { callback(); });
                        rootElement.triggerEventHandler('click', null);
                        fixture.detectChanges();
                    });
                    it('component is collapsed', function () {
                        expect(component.expanded).toBe(false);
                    });
                    it('content not visible', function () {
                        expect(jqueryHelper.toggleContent).toHaveBeenCalled();
                    });
                });
            });
            describe('the component is clicked outside of the header', function () {
                beforeEach(function () {
                    spyOn(jqueryHelper, 'isClickEventHeader').and.returnValue(false);
                    spyOn(jqueryHelper, 'toggleContent');
                    rootElement.triggerEventHandler('click', null);
                    fixture.detectChanges();
                });
                it('component is not expanded', function () {
                    expect(component.expanded).toBeFalsy();
                });
                it('content is not visible', function () {
                    expect(jqueryHelper.toggleContent).toHaveBeenCalledTimes(0);
                });
            });
        });
        describe('When initialized with a Permanent notification is set,', function () {
            beforeEach(function () {
                component.notification = { message: 'Information', icon: notificationIcon_model_1.NotificationIcon.Ok, type: notificationType_model_1.NotificationType.Permanent };
                component.ngOnInit();
            });
            it('notification is displayed', function () {
                expect(component.notificationVisible).toBe(true);
            });
        });
        describe('When expanded is set to true', function () {
            beforeEach(function () {
                spyOn(jqueryHelper, 'toggleContent');
                component.expanded = true;
                fixture.detectChanges();
            });
            beforeAll(function () {
                jasmine.clock().uninstall();
                jasmine.clock().install();
            });
            afterAll(function () {
                jasmine.clock().uninstall();
            });
            it('the property expanded is set to true', function () {
                expect(component.expanded).toBe(true);
            });
            it('toggleContent is called', function () {
                expect(jqueryHelper.toggleContent).toHaveBeenCalled();
            });
            describe('and a ShowOnCollapse notification is set', function () {
                beforeEach(function () {
                    spyOn(jqueryHelper, 'collapseContent').and.callFake(function (header, callback) { callback(); });
                    component.notification = { message: 'Row saved', icon: notificationIcon_model_1.NotificationIcon.Ok, type: notificationType_model_1.NotificationType.ShowOnCollapse };
                });
                it('notification is displayed', function () {
                    expect(component.notificationVisible).toBe(true);
                });
                it('component is collapsing', function () {
                    expect(component.notInteractable).toBe(true);
                });
                describe('after 1,4 seconds', function () {
                    beforeEach(function () {
                        jasmine.clock().tick(1400);
                    });
                    it('content is collapsed', function () {
                        expect(jqueryHelper.collapseContent).toHaveBeenCalled();
                    });
                    describe('after another 2 seconds', function () {
                        beforeEach(function () {
                            jasmine.clock().tick(2000);
                            fixture.detectChanges();
                        });
                        it('the notification is hidden', function () {
                            expect(component.notificationVisible).toBe(false);
                        });
                        it('the notification is done', function () {
                            expect(component.notification.done).toBe(true);
                        });
                        it('component is not expanded', function () {
                            expect(component.expanded).toBe(false);
                        });
                        it('component is not collapsing', function () {
                            expect(component.notInteractable).toBe(false);
                        });
                    });
                });
            });
            describe('and a ShowOnRemove notification is set', function () {
                beforeEach(function () {
                    spyOn(jqueryHelper, 'collapseContent').and.callFake(function (header, callback) { callback(); });
                    component.notification = { message: 'Row deleted', icon: notificationIcon_model_1.NotificationIcon.Ok, type: notificationType_model_1.NotificationType.ShowOnRemove };
                });
                it('notification is displayed', function () {
                    expect(component.notificationVisible).toBe(true);
                });
                it('component is collapsing', function () {
                    expect(component.notInteractable).toBe(true);
                });
                describe('after 1,4 seconds', function () {
                    beforeEach(function () {
                        jasmine.clock().tick(1400);
                    });
                    it('content is collapsed', function () {
                        expect(jqueryHelper.collapseContent).toHaveBeenCalled();
                    });
                    describe('after another 2 seconds', function () {
                        beforeEach(function () {
                            jasmine.clock().tick(2000);
                            fixture.detectChanges();
                        });
                        it('the notification is hidden', function () {
                            expect(component.notificationVisible).toBe(false);
                        });
                        it('the notification is done', function () {
                            expect(component.notification.done).toBe(true);
                        });
                        it('component is not expanded', function () {
                            expect(component.expanded).toBe(false);
                        });
                        it('component is not collapsing', function () {
                            expect(component.notInteractable).toBe(false);
                        });
                        it('component is deleted', function () {
                            expect(component.isDeleted).toBe(true);
                        });
                    });
                });
            });
        });
        describe('When item is collapsing', function () {
            beforeEach(function () {
                spyOn(jqueryHelper, 'isClickEventHeader').and.returnValue(true);
                spyOn(jqueryHelper, 'toggleContent');
                component.notInteractable = true;
            });
            describe('and header is clicked', function () {
                beforeEach(function () {
                    rootElement.triggerEventHandler('click', null);
                    fixture.detectChanges();
                });
                it('item is not expanded', function () {
                    expect(component.expanded).toBeFalsy();
                });
                it('content is not visible', function () {
                    expect(jqueryHelper.toggleContent).toHaveBeenCalledTimes(0);
                });
            });
            describe('and expanded is set to true', function () {
                beforeEach(function () {
                    component.expanded = true;
                    fixture.detectChanges();
                });
                it('item is not expanded', function () {
                    expect(component.expanded).toBeFalsy();
                });
                it('content is not visible', function () {
                    expect(jqueryHelper.toggleContent).toHaveBeenCalledTimes(0);
                });
            });
        });
    });
});
//# sourceMappingURL=listItemComponent.angular.spec.js.map