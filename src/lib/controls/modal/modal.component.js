"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var modalService_1 = require("../../services/modalService");
var button_component_1 = require("../button/button.component");
var ModalPlaceholderComponent = (function () {
    function ModalPlaceholderComponent(modalService, elementRef) {
        var _this = this;
        this.modalService = modalService;
        this.elementRef = elementRef;
        // A list of elements that can recieve focus
        this.focusableElementsString = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]';
        this.buttons = [];
        this.isOpen = false;
        this.modalService.modalOpened$.subscribe(function (args) {
            _this.modalInitialized = false;
            _this.message = args.message;
            _this.title = args.title;
            _this.buttons = args.buttons;
            _this.openModal();
        });
    }
    ModalPlaceholderComponent.prototype.ngAfterViewChecked = function () {
        if (!this.modalInitialized && this.isOpen && this.buttonComponents && this.buttonComponents.length > 0) {
            this.initFocusableElements();
            this.modalInitialized = true;
        }
    };
    ModalPlaceholderComponent.prototype.initFocusableElements = function () {
        var _this = this;
        // Had to put this in a SetTimeout since the QuerySelector returned old objects from the last opened dialog otherwise
        setTimeout(function () {
            var focusableNodes = _this.elementRef.nativeElement.querySelectorAll(_this.focusableElementsString);
            _this.focusableElements = Array.from(focusableNodes);
            _this.firstTabStop = _this.focusableElements[0];
            _this.lastTabStop = _this.focusableElements[_this.focusableElements.length - 1];
            // Set default button if one is defined
            var defaultButton = _this.buttonComponents.find(function (x) { return x.nativeElement.getAttribute('default') === 'true'; });
            if (defaultButton) {
                defaultButton.nativeElement.children[0].focus();
            }
            else {
                _this.firstTabStop.focus();
            }
        }, 1);
    };
    ModalPlaceholderComponent.prototype.openModal = function () {
        this.isOpen = true;
        $('body').addClass('modal--open');
    };
    ModalPlaceholderComponent.prototype.closeModal = function () {
        this.isOpen = false;
        $('body').removeClass('modal--open');
    };
    ModalPlaceholderComponent.prototype.onButtonClick = function (callback) {
        callback();
        this.closeModal();
    };
    ModalPlaceholderComponent.prototype.onKeyDown = function (e) {
        if (e.keyCode === 9) {
            // If Shift + Tab
            if (e.shiftKey) {
                // If the current element in focus is the first focusable element within the modal window...
                if (document.activeElement === this.firstTabStop) {
                    e.preventDefault();
                    // ...jump to the last focusable element
                    this.lastTabStop.focus();
                }
                // if Tab
            }
            else {
                // If the current element in focus is the last focusable element within the modal window...
                if (document.activeElement === this.lastTabStop) {
                    e.preventDefault();
                    // ...jump to the first focusable element
                    this.firstTabStop.focus();
                }
            }
        }
    };
    return ModalPlaceholderComponent;
}());
__decorate([
    core_1.ViewChildren(button_component_1.ButtonComponent, { read: core_1.ElementRef }),
    __metadata("design:type", core_1.QueryList)
], ModalPlaceholderComponent.prototype, "buttonComponents", void 0);
ModalPlaceholderComponent = __decorate([
    core_1.Component({
        selector: 'vgr-modal',
        moduleId: module.id,
        templateUrl: './modal.component.html'
    }),
    __metadata("design:paramtypes", [modalService_1.ModalService, core_1.ElementRef])
], ModalPlaceholderComponent);
exports.ModalPlaceholderComponent = ModalPlaceholderComponent;
//# sourceMappingURL=modal.component.js.map