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
var LockButtonComponent = (function () {
    function LockButtonComponent() {
        this.buttonClass = true;
        this.disabled = false;
        this.lockChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(LockButtonComponent.prototype, "label", {
        get: function () {
            return this.unlocked ? 'lås' : 'lås upp';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LockButtonComponent.prototype, "locked", {
        get: function () {
            return !this.unlocked;
        },
        enumerable: true,
        configurable: true
    });
    LockButtonComponent.prototype.onClick = function (event) {
        if (!this.disabled) {
            if (this.unlocked) {
                this.lock();
            }
            else {
                this.unlock();
            }
        }
    };
    LockButtonComponent.prototype.lock = function () {
        this.unlocked = false;
        this.lockChanged.emit(this.locked);
    };
    LockButtonComponent.prototype.unlock = function () {
        this.unlocked = true;
        this.lockChanged.emit(this.locked);
    };
    LockButtonComponent.prototype.keyPressed = function (event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.onClick(event);
            event.preventDefault();
        }
    };
    return LockButtonComponent;
}());
__decorate([
    core_1.HostBinding('class.button'),
    __metadata("design:type", Object)
], LockButtonComponent.prototype, "buttonClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], LockButtonComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LockButtonComponent.prototype, "unlocked", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], LockButtonComponent.prototype, "lockChanged", void 0);
LockButtonComponent = __decorate([
    core_1.Component({
        selector: 'vgr-lock-button',
        moduleId: module.id,
        templateUrl: './lockButton.component.html'
    })
], LockButtonComponent);
exports.LockButtonComponent = LockButtonComponent;
//# sourceMappingURL=lockButton.component.js.map