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
var SaveCancelComponent = (function () {
    function SaveCancelComponent() {
        this.cancel = new core_1.EventEmitter();
        this.save = new core_1.EventEmitter();
        this.unlock = new core_1.EventEmitter();
        this.saveButtonText = 'Spara';
    }
    SaveCancelComponent.prototype.ngOnInit = function () {
        if (this.hideLock) {
            this.unlocked = true;
        }
    };
    SaveCancelComponent.prototype.onLockChanged = function (locked) {
        if (locked) {
            this.unlocked = false;
            this.save.emit();
        }
        else {
            this.unlocked = true;
            this.unlock.emit();
        }
    };
    SaveCancelComponent.prototype.onSave = function () {
        if (!this.hideLock) {
            this.unlocked = false;
        }
        this.save.emit();
    };
    SaveCancelComponent.prototype.onCancel = function () {
        if (!this.hideLock) {
            this.unlocked = false;
        }
        this.cancel.emit();
    };
    return SaveCancelComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SaveCancelComponent.prototype, "unlocked", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SaveCancelComponent.prototype, "secondary", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], SaveCancelComponent.prototype, "hideLock", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], SaveCancelComponent.prototype, "saveButtonText", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SaveCancelComponent.prototype, "cancel", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SaveCancelComponent.prototype, "save", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SaveCancelComponent.prototype, "unlock", void 0);
SaveCancelComponent = __decorate([
    core_1.Component({
        selector: 'vgr-save-cancel',
        moduleId: module.id,
        templateUrl: './saveCancel.component.html'
    }),
    __metadata("design:paramtypes", [])
], SaveCancelComponent);
exports.SaveCancelComponent = SaveCancelComponent;
//# sourceMappingURL=saveCancel.component.js.map