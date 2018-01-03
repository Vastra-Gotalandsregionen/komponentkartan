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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var dropdown_base_component_1 = require("../dropdown-base/dropdown.base.component");
var validation_component_1 = require("../validation/validation.component");
var forms_1 = require("@angular/forms");
var DropdownMultiselectComponent = DropdownMultiselectComponent_1 = (function (_super) {
    __extends(DropdownMultiselectComponent, _super);
    function DropdownMultiselectComponent(controlContainer, elementRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.controlContainer = controlContainer;
        _this.selectionChanged = new core_1.EventEmitter();
        _this.allItemsSelectedLabel = 'Alla';
        _this.noItemSelectedLabel = 'Välj';
        _this.showAllItemText = 'Visa alla';
        _this.selectAllItemText = 'Välj alla';
        _this.selectAllItem = {
            displayName: _this.selectAllItemText,
            displayNameWhenSelected: _this.allItemsSelectedLabel,
            selected: false
        };
        return _this;
    }
    Object.defineProperty(DropdownMultiselectComponent.prototype, "filterActive", {
        get: function () {
            return this.filterTextboxComponent && this.filterTextboxComponent.value && this.filterTextboxComponent.value !== '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownMultiselectComponent.prototype, "selectedItems", {
        get: function () {
            return this._items.filter(function (x) { return x.selected; });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownMultiselectComponent.prototype, "selectedValues", {
        set: function (values) {
            if (this.items) {
                var matchingItems = this.items.filter(function (x) { return values.find(function (val) { return val === x.id; }); });
                if (matchingItems.length > 0) {
                    matchingItems.forEach(function (x) { return x.selected = true; });
                    this.handleInitiallySelectedItems(matchingItems);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    DropdownMultiselectComponent.prototype.doValidate = function () {
        var isValid = (!this.required || this.selectedItems && this.selectedItems.length > 0) && !this.controlHasErrors();
        return {
            isValid: isValid,
            validationError: isValid ? '' : 'Obligatoriskt'
        };
    };
    DropdownMultiselectComponent.prototype.controlHasErrors = function () {
        return (this.control && this.control.errors ? this.control.errors['required'] : false);
    };
    DropdownMultiselectComponent.prototype.ngOnChanges = function () {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
        this.showAllItem.displayName = this.showAllItemText;
        this.selectAllItem.displayName = this.selectAllItemText;
        this.selectAllItem.displayNameWhenSelected = this.allItemsSelectedLabel;
        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();
        this.updateDropdownLabel();
    };
    DropdownMultiselectComponent.prototype.writeValue = function (values) {
        if (values) {
            this.selectedValues = values;
        }
    };
    DropdownMultiselectComponent.prototype.registerOnChange = function (func) {
        this.onChange = func;
    };
    DropdownMultiselectComponent.prototype.registerOnTouched = function (func) {
        this.onTouched = func;
    };
    DropdownMultiselectComponent.prototype.onChange = function (input) {
    };
    DropdownMultiselectComponent.prototype.onTouched = function () { };
    DropdownMultiselectComponent.prototype.clearFilter = function () {
        this.filter = '';
        this.filterTextboxComponent.clear();
        this.preventCollapse = true;
    };
    DropdownMultiselectComponent.prototype.onItemCheckChanged = function (item) {
        if (!item) {
            return;
        }
        if (item.selected) {
            this.deselectItem(item);
        }
        else {
            this.selectItem(item);
        }
    };
    DropdownMultiselectComponent.prototype.onItemClicked = function (item) {
        this.preventCollapse = true;
    };
    DropdownMultiselectComponent.prototype.selectAllItems = function () {
        this.selectItem(this.selectAllItem);
    };
    DropdownMultiselectComponent.prototype.selectItem = function (item) {
        if (!item) {
            return;
        }
        item.selected = true;
        if (item === this.selectAllItem) {
            this.items.forEach(function (x) { return x.selected = true; });
            this.selectionChanged.emit(this._items);
            this.onChange(this._items.map(function (x) { return x.displayName; }));
        }
        else {
            this.selectAllItem.selected = this._items.filter(function (x) { return !x.selected; }).length === 0;
            this.selectionChanged.emit(this.selectedItems);
            this.onChange(this.selectedItems.map(function (x) { return x.displayName; }));
        }
        this.updateDropdownLabel();
    };
    DropdownMultiselectComponent.prototype.deselectItem = function (item) {
        if (!item) {
            return;
        }
        item.selected = false;
        if (item === this.selectAllItem) {
            this.items.forEach(function (x) { return x.selected = false; });
        }
        this.selectionChanged.emit(this._items.filter(function (x) { return x.selected; }));
        this.onChange(this._items.filter(function (x) { return x.selected; }).map(function (x) { return x.displayName; }));
        this.selectAllItem.selected = false;
        this.updateDropdownLabel();
    };
    DropdownMultiselectComponent.prototype.updateDropdownLabel = function () {
        if (this.selectAllItem.selected) {
            this.dropdownLabel = this.selectAllItem.displayNameWhenSelected;
        }
        else {
            var selectedCount = this.items.filter(function (x) { return x.selected; }).length;
            if (selectedCount === 1) {
                this.dropdownLabel = '1 vald';
            }
            else if (selectedCount === 0) {
                this.dropdownLabel = this.noItemSelectedLabel;
            }
            else {
                this.dropdownLabel = selectedCount + ' valda';
            }
        }
    };
    DropdownMultiselectComponent.prototype.onMouseEnter = function (item) {
        item.marked = true;
    };
    DropdownMultiselectComponent.prototype.onMouseLeave = function (item) {
        item.marked = false;
    };
    DropdownMultiselectComponent.prototype.handleInitiallySelectedItems = function (selectedItems) {
        this.selectAllItem.selected = this.items.length === selectedItems.length;
        this.selectionChanged.emit(selectedItems);
        this.updateDropdownLabel();
    };
    return DropdownMultiselectComponent;
}(dropdown_base_component_1.DropdownBaseComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DropdownMultiselectComponent.prototype, "showAllItemText", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DropdownMultiselectComponent.prototype, "allItemsSelectedLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DropdownMultiselectComponent.prototype, "selectAllItemText", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DropdownMultiselectComponent.prototype, "selectionChanged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], DropdownMultiselectComponent.prototype, "selectedValues", null);
DropdownMultiselectComponent = DropdownMultiselectComponent_1 = __decorate([
    core_1.Component({
        selector: 'vgr-dropdown-multiselect',
        moduleId: module.id,
        templateUrl: './dropdown-multiselect.component.html',
        styleUrls: ['../dropdown-base/dropdown.scrollbar.css'],
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return DropdownMultiselectComponent_1; }),
                multi: true
            },
            {
                provide: validation_component_1.ValidationComponent,
                useExisting: core_1.forwardRef(function () { return DropdownMultiselectComponent_1; })
            }]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.Host()), __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [forms_1.ControlContainer, core_1.ElementRef])
], DropdownMultiselectComponent);
exports.DropdownMultiselectComponent = DropdownMultiselectComponent;
var DropdownMultiselectComponent_1;
//# sourceMappingURL=dropdown-multiselect.component.js.map