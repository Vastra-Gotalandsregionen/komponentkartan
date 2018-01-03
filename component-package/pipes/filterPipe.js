"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FilterPipe = (function () {
    function FilterPipe() {
    }
    FilterPipe.prototype.transform = function (valueList, filter, properties) {
        if (!filter) {
            return valueList;
        }
        var filteredItems = [];
        filter = filter.toLowerCase();
        for (var i = 0; i < valueList.length; i++) {
            var item = valueList[i];
            var _loop_1 = function (property) {
                if (item.hasOwnProperty(property)) {
                    if (!properties || properties.length === 0 || properties.some(function (x) { return x === property; })) {
                        var propertyValue = item[property];
                        if (propertyValue !== undefined && typeof (propertyValue) === 'string' &&
                            propertyValue.toLowerCase().indexOf(filter) >= 0) {
                            filteredItems.push(item);
                            return "break";
                        }
                    }
                }
            };
            for (var property in item) {
                var state_1 = _loop_1(property);
                if (state_1 === "break")
                    break;
            }
        }
        return filteredItems;
    };
    return FilterPipe;
}());
FilterPipe = __decorate([
    core_1.Pipe({
        name: 'filterByProperties'
    })
], FilterPipe);
exports.FilterPipe = FilterPipe;
//# sourceMappingURL=filterPipe.js.map