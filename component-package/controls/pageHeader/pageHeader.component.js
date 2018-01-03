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
var saveCancel_component_1 = require("../saveCancel/saveCancel.component");
var PageHeaderComponent = (function () {
    function PageHeaderComponent() {
        this.hasClass = true;
        this.actionStarted = new core_1.EventEmitter();
        this.actionEnded = new core_1.EventEmitter();
        this.expanded = false;
    }
    PageHeaderComponent.prototype.enableActions = function () {
        this.expanded = true;
        this.actionStarted.emit();
        if (this.saveCancelComponent) {
            this.saveCancelComponent.unlocked = true;
        }
    };
    PageHeaderComponent.prototype.disableActions = function () {
        this.expanded = false;
        this.actionEnded.emit();
    };
    return PageHeaderComponent;
}());
__decorate([
    core_1.HostBinding('class.page-header'),
    __metadata("design:type", Object)
], PageHeaderComponent.prototype, "hasClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PageHeaderComponent.prototype, "saveCancel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PageHeaderComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PageHeaderComponent.prototype, "enableActionsText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], PageHeaderComponent.prototype, "disableActionsText", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PageHeaderComponent.prototype, "actionStarted", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PageHeaderComponent.prototype, "actionEnded", void 0);
__decorate([
    core_1.ViewChild(saveCancel_component_1.SaveCancelComponent),
    __metadata("design:type", saveCancel_component_1.SaveCancelComponent)
], PageHeaderComponent.prototype, "saveCancelComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PageHeaderComponent.prototype, "expanded", void 0);
PageHeaderComponent = __decorate([
    core_1.Component({
        selector: 'vgr-page-header',
        moduleId: module.id,
        templateUrl: './pageHeader.component.html'
    })
], PageHeaderComponent);
exports.PageHeaderComponent = PageHeaderComponent;
//# sourceMappingURL=pageHeader.component.js.map