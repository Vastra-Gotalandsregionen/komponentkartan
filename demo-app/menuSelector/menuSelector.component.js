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
var MenuSelectorComponent = (function () {
    function MenuSelectorComponent() {
        this.hasClass = true;
        this.menuSelected = new core_1.EventEmitter();
        this.menuOptions = [
            { id: '1', displayName: 'En' },
            { id: '3', displayName: 'Flera' }
        ];
    }
    MenuSelectorComponent.prototype.onSelectedMenuChanged = function (selectedMenu) {
        this.menuSelected.emit(parseInt(selectedMenu.id));
    };
    return MenuSelectorComponent;
}());
__decorate([
    core_1.HostBinding('class.menu-selector'),
    __metadata("design:type", Object)
], MenuSelectorComponent.prototype, "hasClass", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], MenuSelectorComponent.prototype, "menuSelected", void 0);
MenuSelectorComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'menu-selector',
        templateUrl: './menuSelector.component.html'
    }),
    __metadata("design:paramtypes", [])
], MenuSelectorComponent);
exports.MenuSelectorComponent = MenuSelectorComponent;
//# sourceMappingURL=menuSelector.component.js.map