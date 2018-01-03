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
var CardColumnComponent = (function () {
    function CardColumnComponent() {
        this.cardTopClass = true;
    }
    return CardColumnComponent;
}());
__decorate([
    core_1.HostBinding('class.card-column'),
    __metadata("design:type", Object)
], CardColumnComponent.prototype, "cardTopClass", void 0);
__decorate([
    core_1.HostBinding('class.card__left-container'),
    __metadata("design:type", Boolean)
], CardColumnComponent.prototype, "left", void 0);
__decorate([
    core_1.HostBinding('class.card__right-container'),
    __metadata("design:type", Boolean)
], CardColumnComponent.prototype, "right", void 0);
__decorate([
    core_1.HostBinding('class.card__fullwidth-container'),
    __metadata("design:type", Boolean)
], CardColumnComponent.prototype, "fullwidth", void 0);
CardColumnComponent = __decorate([
    core_1.Component({
        selector: 'vgr-card-column',
        moduleId: module.id,
        template: "<ng-content></ng-content>"
    }),
    __metadata("design:paramtypes", [])
], CardColumnComponent);
exports.CardColumnComponent = CardColumnComponent;
//# sourceMappingURL=card-column.component.js.map