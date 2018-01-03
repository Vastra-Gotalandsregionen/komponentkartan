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
var CardSectionComponent = (function () {
    function CardSectionComponent(elementRef) {
        this.elementRef = elementRef;
        this.cardSectionClass = true;
        this.readonly = true;
    }
    Object.defineProperty(CardSectionComponent.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (value) {
            this._expanded = value;
            this.setContentOpenOrClosed();
        },
        enumerable: true,
        configurable: true
    });
    CardSectionComponent.prototype.setContentOpenOrClosed = function () {
        if (this._expanded) {
            $(this.elementRef.nativeElement).children('.card-section__content').slideDown(400);
        }
        else {
            $(this.elementRef.nativeElement).children('.card-section__content').slideUp(400);
        }
    };
    CardSectionComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.setContentOpenOrClosed();
        }, 10);
    };
    return CardSectionComponent;
}());
__decorate([
    core_1.HostBinding('class.card-section'),
    __metadata("design:type", Object)
], CardSectionComponent.prototype, "cardSectionClass", void 0);
__decorate([
    core_1.HostBinding('class.card-section--expanded'),
    __metadata("design:type", Boolean)
], CardSectionComponent.prototype, "_expanded", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.card-section--readonly'),
    __metadata("design:type", Boolean)
], CardSectionComponent.prototype, "readonly", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CardSectionComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], CardSectionComponent.prototype, "subtitle", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], CardSectionComponent.prototype, "expanded", null);
CardSectionComponent = __decorate([
    core_1.Component({
        selector: 'vgr-card-section',
        moduleId: module.id,
        templateUrl: './cardSection.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], CardSectionComponent);
exports.CardSectionComponent = CardSectionComponent;
//# sourceMappingURL=cardSection.component.js.map