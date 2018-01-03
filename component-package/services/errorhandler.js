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
var ErrorHandler = (function () {
    function ErrorHandler() {
    }
    ;
    ErrorHandler.prototype.getErrorMessageReactiveForms = function (validationMessages, control, smallMode) {
        if (control.errors) {
            if (typeof (validationMessages) === 'object') {
                for (var key in control.errors) {
                    if (key === 'required' && smallMode && !validationMessages[key]) {
                        return 'Obligatoriskt';
                    }
                    else if (key === 'required' && !smallMode && !validationMessages[key]) {
                        return 'Fältet är obligatoriskt';
                    }
                    else if (validationMessages) {
                        return validationMessages[key];
                    }
                    else {
                        return 'Det här ska inte hända';
                    }
                }
            }
            else {
                return validationMessages;
            }
        }
    };
    ErrorHandler.prototype.convertObjectToArray = function (obj) {
        var arr = [];
        for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
                arr.push(key + '=' + obj[key]);
            }
        }
        ;
        return arr.join(',');
    };
    ErrorHandler.prototype.getErrorMessagesReactiveForms = function (formErrors, validationMessages, form, smallMode) {
        if (!form) {
            return;
        }
        for (var field in formErrors) {
            if (form.get(field)['controls']) {
                for (var subfield in form.get(field)['controls']) {
                    formErrors[field][subfield] = '';
                    var control = form.get(field)['controls'][subfield];
                    if (control && control.dirty && !control.valid) {
                        var messages = validationMessages[subfield];
                        for (var key in control.errors) {
                            formErrors[field][subfield] = messages[key] + ' ';
                        }
                    }
                }
            }
            else {
                var control = form.get(field);
                formErrors[field] = '';
                if (control && !control.valid) {
                    var messages = validationMessages[field];
                    for (var key in control.errors) {
                        if (key === 'required') {
                            if (smallMode) {
                                formErrors[field] = messages[key] ? messages[key] + ' ' : ' Obligatoriskt ';
                            }
                            else
                                formErrors[field] = messages[key] ? messages[key] + ' ' : ' Fältet är obligatoriskt ';
                        }
                        else {
                            formErrors[field] = messages[key] + ' ';
                        }
                    }
                }
            }
        }
        return formErrors;
    };
    return ErrorHandler;
}());
ErrorHandler = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [])
], ErrorHandler);
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=errorhandler.js.map