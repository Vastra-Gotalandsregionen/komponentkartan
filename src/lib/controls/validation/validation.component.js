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
var validation_model_1 = require("../../models/validation.model");
var ValidationComponent = (function () {
    function ValidationComponent() {
        this.validationErrorState = validation_model_1.ValidationErrorState.NoError;
    }
    Object.defineProperty(ValidationComponent.prototype, "validationErrorActive", {
        get: function () {
            return this.validationErrorState === validation_model_1.ValidationErrorState.Active;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationComponent.prototype, "validationErrorEditing", {
        get: function () {
            return this.validationErrorState === validation_model_1.ValidationErrorState.Editing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ValidationComponent.prototype, "validationErrorFixed", {
        get: function () {
            return this.validationErrorState === validation_model_1.ValidationErrorState.Fixed;
        },
        enumerable: true,
        configurable: true
    });
    ValidationComponent.prototype.validate = function () {
        var result = this.doValidate();
        if (result.isValid) {
            this.setValidationStateNoError();
        }
        else {
            this.setValidationStateErrorActive(result.validationError);
        }
        return result;
    };
    ValidationComponent.prototype.setValidationStateEditing = function () {
        if (this.validationErrorState === validation_model_1.ValidationErrorState.Active) {
            this.validationErrorState = validation_model_1.ValidationErrorState.Editing;
        }
        else if (this.validationErrorState === validation_model_1.ValidationErrorState.Fixed) {
            this.setValidationStateNoError();
        }
    };
    ValidationComponent.prototype.setValidationStateErrorActive = function (message) {
        this.validationErrorMessage = message;
        this.validationErrorState = validation_model_1.ValidationErrorState.Active;
    };
    ValidationComponent.prototype.setValidationStateErrorFixed = function () {
        this.validationErrorMessage = '';
        this.validationErrorState = validation_model_1.ValidationErrorState.Fixed;
    };
    ValidationComponent.prototype.setValidationStateNoError = function () {
        if (this.validationErrorState === validation_model_1.ValidationErrorState.Active || this.validationErrorState === validation_model_1.ValidationErrorState.Editing) {
            this.setValidationStateErrorFixed();
        }
        else {
            this.validationErrorMessage = '';
            this.validationErrorState = validation_model_1.ValidationErrorState.NoError;
        }
    };
    return ValidationComponent;
}());
__decorate([
    core_1.HostBinding('class.validation-error--active'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ValidationComponent.prototype, "validationErrorActive", null);
__decorate([
    core_1.HostBinding('class.validation-error--editing'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ValidationComponent.prototype, "validationErrorEditing", null);
__decorate([
    core_1.HostBinding('class.validation-error--fixed'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ValidationComponent.prototype, "validationErrorFixed", null);
exports.ValidationComponent = ValidationComponent;
//# sourceMappingURL=validation.component.js.map