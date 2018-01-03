"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var TruncatePipe = (function () {
    function TruncatePipe() {
    }
    TruncatePipe.prototype.transform = function (value, maxLength) {
        var trail = '...';
        if (!value) {
            return '';
        }
        if (!maxLength) {
            return value;
        }
        var limit = parseInt(maxLength);
        if (!limit) {
            return value;
        }
        if (value.length <= limit) {
            return value;
        }
        limit = limit - trail.length;
        return value.substring(0, limit) + trail;
    };
    return TruncatePipe;
}());
TruncatePipe = __decorate([
    core_1.Pipe({ name: 'truncate' })
], TruncatePipe);
exports.TruncatePipe = TruncatePipe;
//# sourceMappingURL=truncatePipe.js.map