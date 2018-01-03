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
var validation_component_1 = require("../../controls/validation/validation.component");
var forms_1 = require("@angular/forms");
var DropdownComponent = DropdownComponent_1 = (function (_super) {
    __extends(DropdownComponent, _super);
    function DropdownComponent(controlContainer, elementRef, changeDetectorRef) {
        var _this = _super.call(this, elementRef) || this;
        _this.controlContainer = controlContainer;
        _this.changeDetectorRef = changeDetectorRef;
        _this.selectedItemChanged = new core_1.EventEmitter();
        _this.noItemSelectedLabel = '';
        return _this;
    }
    Object.defineProperty(DropdownComponent.prototype, "scrollLimit", {
        get: function () {
            return this.filterVisible ? 7 : 8;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(DropdownComponent.prototype, "selectedValue", {
        set: function (value) {
            if (this.items) {
                var matchingItems = this.items.filter(function (x) { return x.id === value; });
                if (matchingItems.length > 0) {
                    this.handleInitiallySelectedItems(matchingItems);
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    ;
    DropdownComponent.prototype.ngOnChanges = function () {
        if (this.formControlName) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
        this.showAllItem = {
            displayName: this.showAllItemText
        };
        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();
    };
    DropdownComponent.prototype.writeValue = function (value) {
        this.selectedValue = value;
    };
    DropdownComponent.prototype.registerOnChange = function (func) {
        this.onChange = func;
    };
    DropdownComponent.prototype.registerOnTouched = function (func) {
        this.onTouched = func;
    };
    DropdownComponent.prototype.onChange = function (input) {
    };
    DropdownComponent.prototype.onTouched = function () { };
    DropdownComponent.prototype.doValidate = function () {
        var isValid = (!this.required || this.selectedItem) && !this.controlHasErrors();
        return {
            isValid: isValid,
            validationError: isValid ? '' : 'Obligatoriskt'
        };
    };
    DropdownComponent.prototype.controlHasErrors = function () {
        return (this.control && this.control.errors ? this.control.errors['required'] : false);
    };
    DropdownComponent.prototype.showAllItems = function () {
        this.preventCollapse = true;
        this.filter = '';
        this.filterTextboxComponent.clear();
    };
    DropdownComponent.prototype.selectItem = function (item) {
        if (!item) {
            return;
        }
        this.items.forEach(function (x) { return x.selected = false; });
        item.selected = true;
        item.marked = true;
        this.selectedItemChanged.emit(item);
        // Utan detectchanges får man "Value was changed after is was checked" i browser console.
        this.selectedItem = item;
        this.changeDetectorRef.detectChanges();
        this.onChange(item.displayName);
        this.validate();
    };
    DropdownComponent.prototype.onMouseEnter = function (item) {
        this.items.forEach(function (x) { return x.marked = false; });
        if (this.showAllItem) {
            this.showAllItem.marked = false;
        }
        item.marked = true;
    };
    DropdownComponent.prototype.onMouseLeave = function (item) {
        item.marked = false;
        if (this.selectedItem) {
            this.selectedItem.marked = true;
        }
    };
    DropdownComponent.prototype.handleInitiallySelectedItems = function (selectedItems) {
        this.selectItem(selectedItems[0]);
    };
    return DropdownComponent;
}(dropdown_base_component_1.DropdownBaseComponent));
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DropdownComponent.prototype, "selectedItemChanged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DropdownComponent.prototype, "noItemSelectedLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], DropdownComponent.prototype, "selectedValue", null);
DropdownComponent = DropdownComponent_1 = __decorate([
    core_1.Component({
        selector: 'vgr-dropdown',
        moduleId: module.id,
        templateUrl: './dropdown.component.html',
        styleUrls: ['../dropdown-base/dropdown.scrollbar.css'],
        providers: [{
                provide: forms_1.NG_VALUE_ACCESSOR,
                useExisting: core_1.forwardRef(function () { return DropdownComponent_1; }),
                multi: true
            }, {
                provide: validation_component_1.ValidationComponent,
                useExisting: core_1.forwardRef(function () { return DropdownComponent_1; })
            }]
    }),
    __param(0, core_1.Optional()), __param(0, core_1.Host()), __param(0, core_1.SkipSelf()),
    __metadata("design:paramtypes", [forms_1.ControlContainer, core_1.ElementRef, core_1.ChangeDetectorRef])
], DropdownComponent);
exports.DropdownComponent = DropdownComponent;
var DropdownComponent_1;
//# sourceMappingURL=dropdown.component.js.map