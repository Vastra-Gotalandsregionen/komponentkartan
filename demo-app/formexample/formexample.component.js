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
var validation_component_1 = require("../../component-package/controls/validation/validation.component");
var notificationIcon_model_1 = require("../../component-package/models/notificationIcon.model");
var notificationType_model_1 = require("../../component-package/models/notificationType.model");
var FormExampleComponent = (function () {
    function FormExampleComponent() {
        this.view = 'A';
        this.validationStatus = 'Inte validerad';
        this.items = [
            { displayName: 'Sverige' },
            { displayName: 'Danmark' },
        ];
        this.multiItems = [
            { displayName: 'Sverige' },
            { displayName: 'Danmark' },
            { displayName: 'Norge' },
            { displayName: 'Finland' },
            { displayName: 'Island' },
        ];
        this.notification = { message: 'Information saknas', icon: notificationIcon_model_1.NotificationIcon.ExclamationRed, type: notificationType_model_1.NotificationType.Permanent };
    }
    FormExampleComponent.prototype.onSave = function () {
        this.validationStatus = 'Inga fel (kontrollerar ' + this.validatedComponents.length + ' fält)';
        var isValid = true;
        this.validatedComponents.forEach(function (validatedComponent) {
            var result = validatedComponent.validate();
            if (result.isValid) {
            }
            else {
                isValid = false;
            }
        });
        if (!isValid) {
            this.validationStatus = 'Ett eller flera av ' + this.validatedComponents.length + ' fält har fel, se markering';
        }
    };
    return FormExampleComponent;
}());
__decorate([
    core_1.ViewChildren(validation_component_1.ValidationComponent),
    __metadata("design:type", core_1.QueryList)
], FormExampleComponent.prototype, "validatedComponents", void 0);
FormExampleComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'vgr-form-example',
        templateUrl: 'formexample.component.html'
    }),
    __metadata("design:paramtypes", [])
], FormExampleComponent);
exports.FormExampleComponent = FormExampleComponent;
//# sourceMappingURL=formexample.component.js.map