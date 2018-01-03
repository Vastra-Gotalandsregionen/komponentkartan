"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var list_column_component_1 = require("./list-column.component");
var ListColumnTrashcanComponent = ListColumnTrashcanComponent_1 = (function (_super) {
    __extends(ListColumnTrashcanComponent, _super);
    function ListColumnTrashcanComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.listColumnTrashcanClass = true;
        _this.delete = new core_1.EventEmitter();
        _this.disabled = false;
        return _this;
    }
    Object.defineProperty(ListColumnTrashcanComponent.prototype, "disabledClass", {
        get: function () {
            return this.disabled;
        },
        enumerable: true,
        configurable: true
    });
    ListColumnTrashcanComponent.prototype.onDelete = function (e) {
        e.cancelBubble = true;
        if (this.disabled) {
            return;
        }
        this.delete.emit();
    };
    return ListColumnTrashcanComponent;
}(list_column_component_1.ListColumnComponent));
__decorate([
    core_1.HostBinding('class.list__column--trashcan'),
    __metadata("design:type", Object)
], ListColumnTrashcanComponent.prototype, "listColumnTrashcanClass", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], ListColumnTrashcanComponent.prototype, "delete", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListColumnTrashcanComponent.prototype, "disabled", void 0);
__decorate([
    core_1.HostBinding('class.disabled'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ListColumnTrashcanComponent.prototype, "disabledClass", null);
ListColumnTrashcanComponent = ListColumnTrashcanComponent_1 = __decorate([
    core_1.Component({
        templateUrl: './list-column-trashcan.component.html',
        moduleId: module.id,
        selector: 'vgr-list-column-trashcan',
        providers: [{
                provide: list_column_component_1.ListColumnComponent,
                useExisting: core_1.forwardRef(function () { return ListColumnTrashcanComponent_1; })
            }]
    })
], ListColumnTrashcanComponent);
exports.ListColumnTrashcanComponent = ListColumnTrashcanComponent;
var ListColumnTrashcanComponent_1;
//# sourceMappingURL=list-column-trashcan.component.js.map