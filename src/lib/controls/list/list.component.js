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
var list_item_component_1 = require("../list-item/list-item.component");
var list_header_component_1 = require("../list/list-header.component");
var ListComponent = (function () {
    function ListComponent() {
        this.hasClass = true;
        this.items = new core_1.QueryList();
        this.allowMultipleExpandedItems = false;
        this.sortChanged = new core_1.EventEmitter();
    }
    ListComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.listHeader.sortChanged.subscribe(function (args) { return _this.sortChanged.emit(args); });
        this.copyItemWidthsFromHeader();
        if (!this.allowMultipleExpandedItems) {
            this.items.forEach(function (changedContainer) {
                changedContainer.expandedChanged.subscribe(function (expanded) {
                    if (expanded) {
                        _this.items.filter(function (container) { return container !== changedContainer; }).forEach(function (otherContainer) { return otherContainer.expanded = false; });
                    }
                });
            });
        }
        this.items.changes.subscribe(function () {
            _this.copyItemWidthsFromHeader();
        });
    };
    ListComponent.prototype.copyItemWidthsFromHeader = function () {
        var _this = this;
        this.items.forEach(function (item) {
            item.copyPropertiesFromHeader(_this.listHeader);
        });
    };
    return ListComponent;
}());
__decorate([
    core_1.HostBinding('class.list'),
    __metadata("design:type", Object)
], ListComponent.prototype, "hasClass", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.list--inline'),
    __metadata("design:type", Boolean)
], ListComponent.prototype, "flexibleHeader", void 0);
__decorate([
    core_1.ContentChildren(list_item_component_1.ListItemComponent),
    __metadata("design:type", core_1.QueryList)
], ListComponent.prototype, "items", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ListComponent.prototype, "allowMultipleExpandedItems", void 0);
__decorate([
    core_1.ContentChild(list_header_component_1.ListHeaderComponent),
    __metadata("design:type", list_header_component_1.ListHeaderComponent)
], ListComponent.prototype, "listHeader", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ListComponent.prototype, "sortChanged", void 0);
ListComponent = __decorate([
    core_1.Component({
        templateUrl: './list.component.html',
        moduleId: module.id,
        selector: 'vgr-list'
    }),
    __metadata("design:paramtypes", [])
], ListComponent);
exports.ListComponent = ListComponent;
//# sourceMappingURL=list.component.js.map