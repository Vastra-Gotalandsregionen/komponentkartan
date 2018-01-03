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
var ListColumnComponent = (function () {
    function ListColumnComponent() {
    }
    Object.defineProperty(ListColumnComponent.prototype, "classes", {
        get: function () {
            return 'list__column flex-column ' + this.getColumnWidthClass() + ' ' + this.getAlignClass();
        },
        enumerable: true,
        configurable: true
    });
    ListColumnComponent.prototype.getColumnWidthClass = function () {
        return 'flex-column--' + (this.width ? this.width : 1);
    };
    ListColumnComponent.prototype.getAlignClass = function () {
        return 'column--align-' + (this.align ? this.align : 'left');
    };
    ListColumnComponent.prototype.setWidth = function (width) {
        this.width = width;
    };
    ListColumnComponent.prototype.setAlignment = function (alignment) {
        this.align = alignment;
    };
    return ListColumnComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], ListColumnComponent.prototype, "classes", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListColumnComponent.prototype, "text", void 0);
ListColumnComponent = __decorate([
    core_1.Component({
        templateUrl: './list-column.component.html',
        moduleId: module.id,
        selector: 'vgr-list-column'
    })
], ListColumnComponent);
exports.ListColumnComponent = ListColumnComponent;
//# sourceMappingURL=list-column.component.js.map