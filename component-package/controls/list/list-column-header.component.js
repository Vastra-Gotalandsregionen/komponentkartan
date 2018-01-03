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
var ListColumnHeaderComponent = (function () {
    function ListColumnHeaderComponent() {
        this.sortChanged = new core_1.EventEmitter();
        this.sortDirection = SortDirection.None;
    }
    Object.defineProperty(ListColumnHeaderComponent.prototype, "classes", {
        get: function () {
            return 'list__column-header flex-column ' + this.getColumnWidthClass() + ' ' + this.getAlignClass();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListColumnHeaderComponent.prototype, "isSortDescending", {
        get: function () {
            return this.sortDirection === SortDirection.Descending;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(ListColumnHeaderComponent.prototype, "isSortAscending", {
        get: function () {
            return this.sortDirection === SortDirection.Ascending;
        },
        enumerable: true,
        configurable: true
    });
    ;
    ListColumnHeaderComponent.prototype.getColumnWidthClass = function () {
        return 'flex-column--' + (this.width ? this.width : 1);
    };
    ListColumnHeaderComponent.prototype.getAlignClass = function () {
        if (this.align !== "right" &&
            this.align !== "left" &&
            this.align !== "center")
            this.align = "left";
        return 'column--align-' + (this.align ? this.align : "left");
    };
    ListColumnHeaderComponent.prototype.onClick = function () {
        if (this.sortDirection === SortDirection.None) {
            this.sortDirection = SortDirection.Ascending;
        }
        else if (this.sortDirection === SortDirection.Ascending) {
            this.sortDirection = SortDirection.Descending;
        }
        else if (this.sortDirection === SortDirection.Descending) {
            this.sortDirection = SortDirection.Ascending;
        }
        this.sortChanged.emit(this.sortDirection);
    };
    return ListColumnHeaderComponent;
}());
__decorate([
    core_1.HostBinding('class'),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [])
], ListColumnHeaderComponent.prototype, "classes", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListColumnHeaderComponent.prototype, "text", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ListColumnHeaderComponent.prototype, "sortDirection", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number)
], ListColumnHeaderComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListColumnHeaderComponent.prototype, "sortKey", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ListColumnHeaderComponent.prototype, "align", void 0);
__decorate([
    core_1.HostBinding('class.list__column-header--sorted-desc'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ListColumnHeaderComponent.prototype, "isSortDescending", null);
__decorate([
    core_1.HostBinding('class.list__column-header--sorted-asc'),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [])
], ListColumnHeaderComponent.prototype, "isSortAscending", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ListColumnHeaderComponent.prototype, "sortChanged", void 0);
ListColumnHeaderComponent = __decorate([
    core_1.Component({
        templateUrl: './list-column-header.component.html',
        moduleId: module.id,
        selector: 'vgr-list-column-header'
    }),
    __metadata("design:paramtypes", [])
], ListColumnHeaderComponent);
exports.ListColumnHeaderComponent = ListColumnHeaderComponent;
var SortDirection;
(function (SortDirection) {
    SortDirection[SortDirection["None"] = 0] = "None";
    SortDirection[SortDirection["Ascending"] = 1] = "Ascending";
    SortDirection[SortDirection["Descending"] = 2] = "Descending";
})(SortDirection = exports.SortDirection || (exports.SortDirection = {}));
//# sourceMappingURL=list-column-header.component.js.map