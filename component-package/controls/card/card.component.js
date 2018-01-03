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
var card_column_component_1 = require("./card-column.component");
var CardComponent = (function () {
    function CardComponent() {
    }
    CardComponent.prototype.ngOnInit = function () {
    };
    CardComponent.prototype.ngAfterContentInit = function () {
        if (this.columns.length === 1) {
            this.columns.first.fullwidth = true;
        }
        else if (this.columns.length === 2) {
            this.columns.first.left = true;
            this.columns.last.right = true;
        }
    };
    return CardComponent;
}());
__decorate([
    core_1.ContentChildren(card_column_component_1.CardColumnComponent),
    __metadata("design:type", core_1.QueryList)
], CardComponent.prototype, "columns", void 0);
CardComponent = __decorate([
    core_1.Component({
        selector: 'vgr-card',
        moduleId: module.id,
        templateUrl: './card.component.html'
    }),
    __metadata("design:paramtypes", [])
], CardComponent);
exports.CardComponent = CardComponent;
//# sourceMappingURL=card.component.js.map