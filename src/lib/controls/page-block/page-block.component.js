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
var PageBlockComponent = (function () {
    function PageBlockComponent() {
        this.hasClass = true;
    }
    return PageBlockComponent;
}());
__decorate([
    core_1.HostBinding('class.page-block'),
    __metadata("design:type", Object)
], PageBlockComponent.prototype, "hasClass", void 0);
PageBlockComponent = __decorate([
    core_1.Component({
        selector: 'vgr-page-block',
        moduleId: module.id,
        templateUrl: './page-block.component.html'
    })
], PageBlockComponent);
exports.PageBlockComponent = PageBlockComponent;
//# sourceMappingURL=page-block.component.js.map