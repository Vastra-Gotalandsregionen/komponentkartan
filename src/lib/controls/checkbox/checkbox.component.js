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
var CheckboxComponent = CheckboxComponent_1 = (function () {
    function CheckboxComponent() {
        this.checkedChanged = new core_1.EventEmitter();
        this.disabled = false;
        this.checked = false;
    }
    CheckboxComponent.prototype.onClick = function () {
        if (!this.disabled) {
            this.checked = !this.checked;
            this.onChange(this.checked);
            this.checkedChanged.emit(this.checked);
        }
    };
    CheckboxComponent.prototype.onKeyDown = function (event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.onClick();
            event.preventDefault();
        }
    };
    CheckboxComponent.prototype.writeValue = function (value) {
        this.checked = value;
    };
    CheckboxComponent.prototype.registerOnChange = function (func) {
        this.onChange = func;
    };
    CheckboxComponent.prototype.registerOnTouched = function (func) {
        this.onTouched = func;
    };
    CheckboxComponent.prototype.onChange = function (input) {
    };
    CheckboxComponent.prototype.onTouched = function () { };
    return CheckboxComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CheckboxComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], CheckboxComponent.prototype, "checked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], CheckboxComponent.prototype, "checkedChanged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CheckboxComponent.prototype, "label", void 0);
CheckboxComponent = CheckboxComponent_1 = __decorate([
    core_1.Component({
        selector: 'vgr-checkbox',
        moduleId: module.id,
        templateUrl: './checkbox.component.html',
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return CheckboxComponent_1; }),
                multi: true
            }]
    }),
    __metadata("design:paramtypes", [])
], CheckboxComponent);
exports.CheckboxComponent = CheckboxComponent;
var CheckboxComponent_1;
//# sourceMappingURL=checkbox.component.js.map