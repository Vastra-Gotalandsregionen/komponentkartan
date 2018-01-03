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
var validation_component_1 = require("../../controls/validation/validation.component");
var filterPipe_1 = require("../../pipes/filterPipe");
var filterTextbox_component_1 = require("../filterTextbox/filterTextbox.component");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var DropdownBaseComponent = (function (_super) {
    __extends(DropdownBaseComponent, _super);
    function DropdownBaseComponent(elementRef) {
        var _this = _super.call(this) || this;
        _this.elementRef = elementRef;
        _this.dropdownClass = true;
        _this.filterLimit = 20;
        _this.expanded = false;
        _this.filterVisible = false;
        _this.filterPipe = new filterPipe_1.FilterPipe();
        _this.scrollbarConfig = new ngx_perfect_scrollbar_1.PerfectScrollbarConfig({ minScrollbarLength: 40 });
        _this.showAllItemText = 'Visa alla';
        _this.showAllItem = {
            displayName: _this.showAllItemText,
        };
        return _this;
    }
    Object.defineProperty(DropdownBaseComponent.prototype, "items", {
        get: function () {
            return this._items;
        },
        set: function (value) {
            var _this = this;
            // The scrollbar component would not refresh when items were changed unless we added a timeout...
            // Ugly solution for sure, but until a better one comes along it will have to do :(
            this._items = value;
            var selectedItems = this._items.filter(function (x) { return x.selected; });
            if (selectedItems.length > 0) {
                this.handleInitiallySelectedItems(selectedItems);
            }
            setTimeout(function () {
                if (!_this.readonly && !_this.disabled) {
                    _this.scrollbarComponent.update();
                    _this.listenToScrollbarEvents();
                }
            }, 500);
            this.dimmerTopVisible = false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownBaseComponent.prototype, "values", {
        set: function (values) {
            this.items = values.map(function (value) {
                return { displayName: value, id: value };
            });
        },
        enumerable: true,
        configurable: true
    });
    DropdownBaseComponent.prototype.listenToScrollbarEvents = function () {
        var _this = this;
        $(this.scrollbarComponent.elementRef.nativeElement).scroll(function (e) {
            _this.hideDimmersIfScrollIsAtBottomOrTop(e.target);
        });
    };
    DropdownBaseComponent.prototype.hideDimmersIfScrollIsAtBottomOrTop = function (scrollElement) {
        var scrollbar = $(scrollElement);
        var margintolerance = 20;
        var scrollHeight = scrollElement.scrollHeight - margintolerance;
        var clientHeight = scrollElement.clientHeight;
        var scrollTop = scrollElement.scrollTop;
        if (clientHeight + scrollTop >= scrollHeight) {
            this.dimmerBottomVisible = false;
        }
        else {
            this.dimmerBottomVisible = true;
        }
        if (scrollTop === 0) {
            this.dimmerTopVisible = false;
        }
        else {
            this.dimmerTopVisible = true;
        }
    };
    DropdownBaseComponent.prototype.filterItems = function (filterValue) {
        this.filter = filterValue;
        this.updateScrolled();
        // Scroll to top when filter is changed
        $('.container.ps').scrollTop(0);
        this.dimmerBottomVisible = false;
    };
    DropdownBaseComponent.prototype.updateScrolled = function () {
        if (!this.items) {
            return;
        }
        var visibleItemCount = this.filterPipe.transform(this.items, this.filter, ['displayName']).length;
    };
    DropdownBaseComponent.prototype.onDropdownMouseDown = function (event) {
        if (this.readonly || this.disabled) {
            return;
        }
        if (this.preventCollapse) {
            event.returnValue = false;
            this.preventCollapse = false;
        }
        else {
            this.toggleExpand(event);
        }
    };
    DropdownBaseComponent.prototype.onEnter = function () {
        this.setValidationStateEditing();
    };
    DropdownBaseComponent.prototype.onLeave = function (event) {
        if (!event) {
            this.validate();
            return;
        }
        var focusedElement = event.relatedTarget;
        if (focusedElement === null || !this.elementRef.nativeElement.contains(focusedElement)) {
            // validera endast om vi är påväg från komponenten
            this.validate();
        }
    };
    DropdownBaseComponent.prototype.toggleExpand = function (event) {
        var _this = this;
        var target = event.target || event.srcElement || event.currentTarget;
        var element = $(target);
        if (!element.is('input') && !element.is('.scroll-bar')) {
            this.expanded = !this.expanded;
            if (!this.expanded) {
                this.validate();
            }
            else {
                setTimeout(function () {
                    _this.hideDimmersIfScrollIsAtBottomOrTop(_this.scrollbarComponent.elementRef.nativeElement);
                }, 10);
            }
        }
    };
    DropdownBaseComponent.prototype.onDocumentClick = function (event) {
        var target = event.target || event.srcElement || event.currentTarget;
        if (!this.elementRef.nativeElement.contains(target)) {
            this.expanded = false;
        }
    };
    return DropdownBaseComponent;
}(validation_component_1.ValidationComponent));
__decorate([
    core_1.ViewChild(filterTextbox_component_1.FilterTextboxComponent),
    __metadata("design:type", filterTextbox_component_1.FilterTextboxComponent)
], DropdownBaseComponent.prototype, "filterTextboxComponent", void 0);
__decorate([
    core_1.ViewChild(ngx_perfect_scrollbar_1.PerfectScrollbarComponent),
    __metadata("design:type", ngx_perfect_scrollbar_1.PerfectScrollbarComponent)
], DropdownBaseComponent.prototype, "scrollbarComponent", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DropdownBaseComponent.prototype, "formControlName", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DropdownBaseComponent.prototype, "noItemSelectedLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DropdownBaseComponent.prototype, "showAllItemText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], DropdownBaseComponent.prototype, "required", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.readonly'),
    __metadata("design:type", Boolean)
], DropdownBaseComponent.prototype, "readonly", void 0);
__decorate([
    core_1.Input(), core_1.HostBinding('class.disabled'),
    __metadata("design:type", Boolean)
], DropdownBaseComponent.prototype, "disabled", void 0);
__decorate([
    core_1.HostBinding('class.dropdown'),
    __metadata("design:type", Object)
], DropdownBaseComponent.prototype, "dropdownClass", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DropdownBaseComponent.prototype, "items", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DropdownBaseComponent.prototype, "values", null);
__decorate([
    core_1.HostListener('document:click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], DropdownBaseComponent.prototype, "onDocumentClick", null);
exports.DropdownBaseComponent = DropdownBaseComponent;
//# sourceMappingURL=dropdown.base.component.js.map