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
var forms_1 = require("@angular/forms");
var RadioGroupComponent = RadioGroupComponent_1 = (function () {
    function RadioGroupComponent() {
        this.hasClass = true;
        this.role = 'radiogroup';
        this.selectedChanged = new core_1.EventEmitter();
    }
    RadioGroupComponent.prototype.ngOnChanges = function () {
        if (!this.noSelection && this.options && this.options.length > 0) {
            var preSelectedOptions = this.options.filter(function (x) { return x.selected; });
            if (preSelectedOptions.length > 0) {
                this.selectOption(preSelectedOptions[0]);
            }
            else {
                var enabledOptions = this.options.filter(function (x) { return !x.disabled; });
                this.selectOption(enabledOptions[0]);
            }
        }
    };
    RadioGroupComponent.prototype.optionClicked = function (option) {
        if (this.disabled || option.disabled || option.selected) {
            return;
        }
        this.selectOption(option);
    };
    RadioGroupComponent.prototype.keyDown = function (event, option) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.optionClicked(option);
            event.preventDefault();
        }
    };
    RadioGroupComponent.prototype.writeValue = function (optionValue) {
        this.options.forEach(function (o) {
            o.selected = o.displayName === optionValue;
        });
    };
    RadioGroupComponent.prototype.registerOnChange = function (func) {
        this.onChange = func;
    };
    RadioGroupComponent.prototype.registerOnTouched = function (func) {
        this.onTouched = func;
    };
    RadioGroupComponent.prototype.onChange = function (input) {
    };
    RadioGroupComponent.prototype.onTouched = function () { };
    RadioGroupComponent.prototype.selectOption = function (option) {
        option.selected = true;
        this.options.filter(function (x) { return x !== option; }).forEach(function (o) {
            o.selected = false;
        });
        this.selectedChanged.emit(option);
        this.onChange(option.displayName);
    };
    return RadioGroupComponent;
}());
__decorate([
    core_1.HostBinding('class.radio-group'),
    __metadata("design:type", Object)
], RadioGroupComponent.prototype, "hasClass", void 0);
__decorate([
    core_1.HostBinding('attr.role'),
    __metadata("design:type", Object)
], RadioGroupComponent.prototype, "role", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.disabled'),
    __metadata("design:type", Boolean)
], RadioGroupComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], RadioGroupComponent.prototype, "options", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], RadioGroupComponent.prototype, "noSelection", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], RadioGroupComponent.prototype, "selectedChanged", void 0);
RadioGroupComponent = RadioGroupComponent_1 = __decorate([
    core_1.Component({
        selector: 'vgr-radio-group',
        moduleId: module.id,
        templateUrl: './radioGroup.component.html',
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return RadioGroupComponent_1; }),
                multi: true
            }]
    }),
    __metadata("design:paramtypes", [])
], RadioGroupComponent);
exports.RadioGroupComponent = RadioGroupComponent;
var RadioGroupComponent_1;
//# sourceMappingURL=radioGroup.component.js.map