"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ListItemJqeuryHelper = (function () {
    function ListItemJqeuryHelper() {
    }
    ListItemJqeuryHelper.prototype.collapseContent = function (header, callback) {
        if (!callback) {
            header.siblings('.list-item__content').slideUp(400);
        }
        else {
            header.siblings('.list-item__content').slideUp(400, callback);
        }
    };
    ListItemJqeuryHelper.prototype.toggleContent = function (elementRef) {
        var header = this.getHeader(elementRef);
        header.siblings('.list-item__content').slideToggle(400);
    };
    ListItemJqeuryHelper.prototype.getHeader = function (elementRef) {
        return $(elementRef.nativeElement).children('.list-item__header');
    };
    ListItemJqeuryHelper.prototype.isClickEventHeader = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        var clickedElement = $(target);
        if (clickedElement.hasClass('list-item__header')) {
            return true;
        }
        if (clickedElement.hasClass('list-item__notification')) {
            return true;
        }
        if (clickedElement.parent('.list-item__header').length > 0) {
            return true;
        }
        if (clickedElement.parent('.list-item__notification').length > 0) {
            return true;
        }
        if (clickedElement.parent('.flex-column').length > 0) {
            return true;
        }
        return false;
    };
    return ListItemJqeuryHelper;
}());
ListItemJqeuryHelper = __decorate([
    core_1.Injectable()
], ListItemJqeuryHelper);
exports.ListItemJqeuryHelper = ListItemJqeuryHelper;
//# sourceMappingURL=listItemJqueryHelper.js.map