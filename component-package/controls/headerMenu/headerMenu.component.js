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
var HeaderMenuComponent = (function () {
    function HeaderMenuComponent(elementRef) {
        this.elementRef = elementRef;
        this.hidden = true;
    }
    HeaderMenuComponent.prototype.toggleHeaderMenu = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var element = $(target);
        if (!element.is('.header-menu__submenu-header')) {
            this.hidden = !this.hidden;
        }
        if (!this.hidden) {
            event.cancelBubble = true;
        }
    };
    HeaderMenuComponent.prototype.toggleSubMenu = function (item) {
        item.expanded = !item.expanded;
    };
    HeaderMenuComponent.prototype.onDocumentClick = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        if (!this.elementRef.nativeElement.contains(target)) {
            this.hidden = true;
        }
    };
    HeaderMenuComponent.prototype.onMouseEnter = function (item) {
        this.menu.menuItems.forEach(function (x) { return x.marked = false; });
        item.marked = true;
    };
    HeaderMenuComponent.prototype.onMouseLeave = function (item) {
        item.marked = false;
        if (this.selectedItem) {
            this.selectedItem.marked = true;
        }
    };
    HeaderMenuComponent.prototype.selectItem = function (item) {
        if (!item) {
            return;
        }
        this.menu.menuItems.forEach(function (x) { return x.selected = false; });
        item.selected = true;
        item.marked = true;
        this.selectedItem = item;
    };
    return HeaderMenuComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeaderMenuComponent.prototype, "menu", void 0);
__decorate([
    core_1.HostListener('document:click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], HeaderMenuComponent.prototype, "onDocumentClick", null);
HeaderMenuComponent = __decorate([
    core_1.Component({
        selector: 'vgr-header-menu',
        moduleId: module.id,
        templateUrl: './headerMenu.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], HeaderMenuComponent);
exports.HeaderMenuComponent = HeaderMenuComponent;
//# sourceMappingURL=headerMenu.component.js.map