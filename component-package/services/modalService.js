"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var ModalService = (function () {
    function ModalService() {
        // Observable string sources
        this.modalOpenedSource = new Subject_1.Subject();
        // Observable string streams
        this.modalOpened$ = this.modalOpenedSource.asObservable();
    }
    ModalService.prototype.openDialog = function (title, message, button1Config, button2Config, button3Config) {
        var buttonConfigs = [button1Config];
        if (button2Config && button3Config) {
            buttonConfigs = [button1Config, button2Config, button3Config];
        }
        else if (button2Config) {
            buttonConfigs = [button1Config, button2Config];
        }
        this.modalOpenedSource.next(new ModalConfiguration(title, message, buttonConfigs));
    };
    ModalService.prototype.openOneButtonDialog = function (title, message, buttonText, callback) {
        this.openDialog(title, message, new ModalButtonConfiguration(buttonText, callback));
    };
    ModalService.prototype.openSaveDontSaveCancelDialog = function (title, message, saveCallback, dontSaveCallback, cancelCallback) {
        this.openDialog(title, message, new ModalButtonConfiguration('Spara', saveCallback), new ModalButtonConfiguration('Spara inte', dontSaveCallback), new ModalButtonConfiguration('Avbryt', cancelCallback, true));
    };
    return ModalService;
}());
ModalService = __decorate([
    core_1.Injectable()
], ModalService);
exports.ModalService = ModalService;
var ModalConfiguration = (function () {
    function ModalConfiguration(title, message, buttons) {
        this.title = title;
        this.message = message;
        this.buttons = buttons;
    }
    return ModalConfiguration;
}());
exports.ModalConfiguration = ModalConfiguration;
var ModalButtonConfiguration = (function () {
    function ModalButtonConfiguration(text, callback, isDefault) {
        if (isDefault === void 0) { isDefault = false; }
        this.text = text;
        this.callback = callback;
        this.isDefault = isDefault;
    }
    return ModalButtonConfiguration;
}());
exports.ModalButtonConfiguration = ModalButtonConfiguration;
//# sourceMappingURL=modalService.js.map