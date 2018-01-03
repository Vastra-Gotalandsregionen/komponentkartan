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
var headerMenu_component_1 = require("../headerMenu/headerMenu.component");
var HeaderComponent = (function () {
    function HeaderComponent(elementRef) {
        this.elementRef = elementRef;
        this.systemColor = 'neutral';
    }
    HeaderComponent.prototype.toggleHeaderMenu = function (event) {
        this.headerMenuComponent.toggleHeaderMenu(event);
    };
    HeaderComponent.prototype.keyDown = function (event) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.headerMenuComponent.toggleHeaderMenu(event);
        }
    };
    return HeaderComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeaderComponent.prototype, "headerMenu", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], HeaderComponent.prototype, "userName", void 0);
__decorate([
    core_1.ViewChild(headerMenu_component_1.HeaderMenuComponent),
    __metadata("design:type", headerMenu_component_1.HeaderMenuComponent)
], HeaderComponent.prototype, "headerMenuComponent", void 0);
HeaderComponent = __decorate([
    core_1.Component({
        selector: 'vgr-header',
        moduleId: module.id,
        templateUrl: './header.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], HeaderComponent);
exports.HeaderComponent = HeaderComponent;
//# sourceMappingURL=header.component.js.map