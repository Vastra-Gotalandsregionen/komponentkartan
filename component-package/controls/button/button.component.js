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
var ButtonComponent = (function () {
    function ButtonComponent() {
        this.buttonClass = true;
        this.disabled = false;
        this.click = new core_1.EventEmitter();
    }
    ButtonComponent.prototype.onClick = function (event) {
        if (this.disabled) {
            event.stopPropagation();
        }
    };
    ButtonComponent.prototype.ngOnChanges = function () {
        this.reenabled = this.lastDisabledStatus === true && this.disabled === false;
        this.lastDisabledStatus = this.disabled;
    };
    ButtonComponent.prototype.keyPressed = function (event) {
        if (this.disabled) {
            return;
        }
        if (event.keyCode === 32) {
            event.preventDefault();
            this.click.emit();
        }
        else if (event.keyCode === 13) {
            this.click.emit();
        }
    };
    return ButtonComponent;
}());
__decorate([
    core_1.HostBinding('class.button'),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "buttonClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ButtonComponent.prototype, "secondary", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ButtonComponent.prototype, "click", void 0);
ButtonComponent = __decorate([
    core_1.Component({
        selector: 'vgr-button',
        moduleId: module.id,
        templateUrl: './button.component.html'
    }),
    __metadata("design:paramtypes", [])
], ButtonComponent);
exports.ButtonComponent = ButtonComponent;
//# sourceMappingURL=button.component.js.map