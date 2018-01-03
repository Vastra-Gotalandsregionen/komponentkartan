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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var errorhandler_1 = require("../../services/errorhandler");
var InputComponent = InputComponent_1 = (function () {
    function InputComponent(errorHandler, controlContainer) {
        this.errorHandler = errorHandler;
        this.controlContainer = controlContainer;
        this.valueChanged = new core_1.EventEmitter();
        this.hasClass = true;
        this.hasFocus = false;
        this.touched = false;
        this.invalidOnFocus = false;
        this.blur = new core_1.EventEmitter();
        this.focus = new core_1.EventEmitter();
        this.nrOfDecimals = 2;
        this.swedishDecimalPipe = new common_1.DecimalPipe('sv-se');
    }
    Object.defineProperty(InputComponent.prototype, "errorClass", {
        get: function () {
            return (this.formControlName ? this.control.invalid : this.isInvalid) && !this.hasFocus && (this.touched || this.validateOnInit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "editingClass", {
        get: function () {
            return this.invalidOnFocus && this.hasFocus && (this.touched || this.validateOnInit);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InputComponent.prototype, "fixedClass", {
        get: function () {
            return this.invalidOnFocus && this.touched && (this.formControlName ? this.control.valid : !this.isInvalid) && !this.hasFocus;
        },
        enumerable: true,
        configurable: true
    });
    InputComponent.prototype.ngOnChanges = function (changes) {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
    };
    InputComponent.prototype.ngOnInit = function () {
        this.setDisplayValue();
    };
    InputComponent.prototype.writeValue = function (value) {
        if (value !== undefined) {
            this.value = value;
            this.setDisplayValue();
        }
    };
    InputComponent.prototype.setDisplayValue = function () {
        if (this.formatNumber && !(this.formControlName ? this.control.invalid : this.isInvalid)) {
            this.displayValue = this.convertNumberToString(this.value);
        }
        else {
            this.displayValue = this.value;
        }
    };
    InputComponent.prototype.registerOnChange = function (func) {
        this.onChange = func;
    };
    InputComponent.prototype.registerOnTouched = function (func) {
        this.onTouched = func;
    };
    InputComponent.prototype.onChange = function (input) {
        this.value = input;
    };
    InputComponent.prototype.onTouched = function () { };
    InputComponent.prototype.onBlur = function () {
        if (this.readonly) {
            return;
        }
        if (this.formatNumber && !(this.formControlName ? this.control.invalid : this.isInvalid)) {
            this.value = this.convertStringToNumber(this.displayValue);
            this.displayValue = this.convertNumberToString(this.value);
        }
        else {
            this.value = this.displayValue;
        }
        this.onChange(this.value);
        this.touched = true;
        this.hasFocus = false;
        this.blur.emit(event);
    };
    InputComponent.prototype.onFocus = function () {
        if (this.readonly) {
            return;
        }
        this.displayValue = this.formatNumber ? this.convertNumberToString(this.value) : this.value;
        this.invalidOnFocus = (this.formControlName ? this.control.invalid : this.isInvalid) && (this.touched || this.validateOnInit);
        this.hasFocus = true;
        this.focus.emit(event);
    };
    InputComponent.prototype.convertStringToNumber = function (value) {
        var normalized = value.toString().trim().replace(/\s/g, '').replace(',', '.').replace('−', '-');
        var floatVal = this.roundNumber(parseFloat(normalized));
        return floatVal;
    };
    InputComponent.prototype.roundNumber = function (number) {
        if (isNaN(number)) {
            return number;
        }
        var factor = Math.pow(10, this.nrOfDecimals);
        var tempNumber = number * factor;
        var roundedTempNumber = Math.round(tempNumber);
        return roundedTempNumber / factor;
    };
    ;
    InputComponent.prototype.convertNumberToString = function (value) {
        if (!isNaN(this.value)) {
            return this.swedishDecimalPipe.transform(this.value, "1." + this.nrOfDecimals + "-" + this.nrOfDecimals);
        }
        return null;
    };
    return InputComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputComponent.prototype, "formControlName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputComponent.prototype, "isInvalid", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputComponent.prototype, "formatNumber", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InputComponent.prototype, "nrOfDecimals", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], InputComponent.prototype, "suffix", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], InputComponent.prototype, "maxlength", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], InputComponent.prototype, "validateOnInit", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], InputComponent.prototype, "errorMessage", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.readonly'),
    __metadata("design:type", Boolean)
], InputComponent.prototype, "readonly", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.input--small'),
    __metadata("design:type", Boolean)
], InputComponent.prototype, "small", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.align-right'),
    __metadata("design:type", Boolean)
], InputComponent.prototype, "alignRight", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputComponent.prototype, "blur", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputComponent.prototype, "focus", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], InputComponent.prototype, "valueChanged", void 0);
__decorate([
    core_1.HostBinding('class.validated-input'),
    __metadata("design:type", Object)
], InputComponent.prototype, "hasClass", void 0);
__decorate([
    core_1.HostBinding('class.validation-error--active'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], InputComponent.prototype, "errorClass", null);
__decorate([
    core_1.HostBinding('class.validation-error--editing'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], InputComponent.prototype, "editingClass", null);
__decorate([
    core_1.HostBinding('class.validation-error--fixed'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], InputComponent.prototype, "fixedClass", null);
InputComponent = InputComponent_1 = __decorate([
    core_1.Component({
        selector: 'vgr-input',
        moduleId: module.id,
        templateUrl: './input.component.html',
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return InputComponent_1; }),
                multi: true,
            }]
    }),
    __param(1, core_1.Optional()), __param(1, core_1.Host()), __param(1, core_1.SkipSelf()),
    __metadata("design:paramtypes", [errorhandler_1.ErrorHandler, forms_1.ControlContainer])
], InputComponent);
exports.InputComponent = InputComponent;
var InputComponent_1;
//# sourceMappingURL=input.component.js.map