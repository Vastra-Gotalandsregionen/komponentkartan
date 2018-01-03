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
var list_column_header_component_1 = require("./list-column-header.component");
var ListHeaderComponent = (function () {
    function ListHeaderComponent() {
        this.listHeaderClass = true;
        this.sortChanged = new core_1.EventEmitter();
    }
    ListHeaderComponent.prototype.ngAfterContentInit = function () {
        var _this = this;
        this.headerColumns.forEach(function (column) { return column.sortChanged.subscribe(function (sort) { return _this.onColumnSortChanged(column, sort); }); });
    };
    ListHeaderComponent.prototype.onColumnSortChanged = function (column, sort) {
        this.headerColumns.filter(function (otherCol) { return otherCol !== column; }).forEach(function (otherCol) { return otherCol.sortDirection = list_column_header_component_1.SortDirection.None; });
        this.sortChanged.emit({ key: column.sortKey ? column.sortKey : column.text, direction: sort });
    };
    ListHeaderComponent.prototype.applyToColumn = function (column, index) {
        var _this = this;
        setTimeout(function () {
            var headerColumnArray = _this.headerColumns.toArray();
            if (headerColumnArray.length > index) {
                column.setWidth(headerColumnArray[index].width);
                column.setAlignment(headerColumnArray[index].align);
            }
        }, 1);
    };
    return ListHeaderComponent;
}());
__decorate([
    core_1.HostBinding('class.list__header'),
    __metadata("design:type", Object)
], ListHeaderComponent.prototype, "listHeaderClass", void 0);
__decorate([
    core_1.ContentChildren(list_column_header_component_1.ListColumnHeaderComponent),
    __metadata("design:type", core_1.QueryList)
], ListHeaderComponent.prototype, "headerColumns", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ListHeaderComponent.prototype, "sortChanged", void 0);
ListHeaderComponent = __decorate([
    core_1.Component({
        templateUrl: './list-header.component.html',
        moduleId: module.id,
        selector: 'vgr-list-header'
    })
], ListHeaderComponent);
exports.ListHeaderComponent = ListHeaderComponent;
//# sourceMappingURL=list-header.component.js.map