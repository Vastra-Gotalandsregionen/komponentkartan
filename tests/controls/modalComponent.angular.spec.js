"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var testing_1 = require("@angular/core/testing");
var testing_2 = require("@angular/platform-browser-dynamic/testing");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var modal_component_1 = require("../../component-package/controls/modal/modal.component");
var button_component_1 = require("../../component-package/controls/button/button.component");
var modalService_1 = require("../../component-package/services/modalService");
describe('ModalPlaceholderComponent', function () {
    var component;
    var fixture;
    var rootElement;
    var modalService;
    var selectedButton;
    beforeEach(function (done) {
        modalService = new modalService_1.ModalService();
        testing_1.TestBed.resetTestEnvironment();
        testing_1.TestBed.initTestEnvironment(testing_2.BrowserDynamicTestingModule, testing_2.platformBrowserDynamicTesting());
        testing_1.TestBed.configureTestingModule({
            declarations: [modal_component_1.ModalPlaceholderComponent, button_component_1.ButtonComponent],
            imports: [common_1.CommonModule, forms_1.FormsModule],
            providers: [{ provide: modalService_1.ModalService, useValue: modalService }]
        });
        testing_1.TestBed.overrideComponent(modal_component_1.ModalPlaceholderComponent, {
            set: {
                templateUrl: 'modal.component.html'
            }
        });
        testing_1.TestBed.overrideComponent(button_component_1.ButtonComponent, {
            set: {
                templateUrl: 'button.component.html'
            }
        });
        testing_1.TestBed.compileComponents().then(function () {
            fixture = testing_1.TestBed.createComponent(modal_component_1.ModalPlaceholderComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('When component is initialized', function () {
        it('modal is not open', function () {
            expect(component.isOpen).toBe(false);
        });
    });
    describe('When a two-button modal is opened', function () {
        beforeEach(function () {
            modalService.openDialog('Title', 'Message', new modalService_1.ModalButtonConfiguration('Button1', function () { return selectedButton = 'Button1'; }), new modalService_1.ModalButtonConfiguration('Button2', function () { return selectedButton = 'Button2'; }));
            fixture.detectChanges();
        });
        it('modal is open', function () {
            expect(component.isOpen).toBe(true);
        });
        it('modal is visible', function () {
            var openModals = rootElement.queryAll(platform_browser_1.By.css('.vgr-modal--open'));
            expect(openModals.length).toBe(1);
        });
        describe('and button 2 is clicked', function () {
            beforeEach(function () {
                var buttons = rootElement.queryAll(platform_browser_1.By.css('.button'));
                buttons[1].triggerEventHandler('click', {});
            });
            it('modal is closed', function () {
                expect(component.isOpen).toBe(false);
            });
            it('button 2 callback is called', function () {
                expect(selectedButton).toBe('Button2');
            });
        });
    });
});
//# sourceMappingURL=modalComponent.angular.spec.js.map