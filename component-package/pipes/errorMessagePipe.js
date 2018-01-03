"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ErrorMessagePipe = (function () {
    function ErrorMessagePipe() {
    }
    ErrorMessagePipe.prototype.transform = function (message, hasFocus, errors, small) {
        if (!message) {
            return null;
        }
        if (!hasFocus) {
            this.currentMessage = this.setErrorMessage(errors, message, small);
        }
        return this.currentMessage;
    };
    ErrorMessagePipe.prototype.setErrorMessage = function (errors, message, small) {
        if (typeof (message) === 'object') {
            for (var key in errors) {
                if (key === 'required' && small && !message[key]) {
                    return 'Obligatoriskt';
                }
                else if (key === 'required' && !small && !message[key]) {
                    return 'Fältet är obligatoriskt';
                }
                else if (message) {
                    return message[key];
                }
                else {
                    return 'Det här ska inte hända';
                }
            }
        }
        else {
            return message;
        }
    };
    return ErrorMessagePipe;
}());
ErrorMessagePipe = __decorate([
    core_1.Pipe({
        name: 'errormessagehandler'
    })
], ErrorMessagePipe);
exports.ErrorMessagePipe = ErrorMessagePipe;
//# sourceMappingURL=errorMessagePipe.js.map