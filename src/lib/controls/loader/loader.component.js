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
var LoaderComponent = (function () {
    function LoaderComponent(changeDetector) {
        this.changeDetector = changeDetector;
        this._minimumTimeMs = 1000;
        this._active = false;
        this.visible = false;
        this.spinning = false;
    }
    Object.defineProperty(LoaderComponent.prototype, "active", {
        get: function () {
            return this._active;
        },
        set: function (value) {
            if ((this._active && !value) || (!this._active && value)) {
                this._active = value;
                if (!this._active) {
                    this.hideWhenMinimumTimeHasPassed();
                }
                else {
                    this.showForMinimumTime();
                }
            }
        },
        enumerable: true,
        configurable: true
    });
    LoaderComponent.prototype.startSpinning = function () {
        this.spinning = true;
        this.visible = true;
    };
    LoaderComponent.prototype.stopSpinning = function () {
        var _this = this;
        setTimeout(function () {
            if (_this._active) {
                _this.startSpinning();
            }
            else {
                _this.spinning = false;
            }
        }, 400);
        this.visible = false;
    };
    LoaderComponent.prototype.hideWhenMinimumTimeHasPassed = function () {
        var _this = this;
        var timeShown = new Date().getTime() - this.lastActivated.getTime();
        if (timeShown >= this._minimumTimeMs) {
            this.stopSpinning();
        }
        else {
            setTimeout(function () {
                _this.stopSpinning();
            }, this._minimumTimeMs - timeShown);
        }
    };
    LoaderComponent.prototype.showForMinimumTime = function () {
        this.lastActivated = new Date();
        this.startSpinning();
    };
    return LoaderComponent;
}());
__decorate([
    core_1.HostBinding('class.loader--visible'),
    __metadata("design:type", Object)
], LoaderComponent.prototype, "visible", void 0);
__decorate([
    core_1.HostBinding('class.loader--spinning'),
    __metadata("design:type", Object)
], LoaderComponent.prototype, "spinning", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], LoaderComponent.prototype, "active", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], LoaderComponent.prototype, "small", void 0);
LoaderComponent = __decorate([
    core_1.Component({
        selector: 'vgr-loader',
        moduleId: module.id,
        templateUrl: './loader.component.html'
    }),
    __metadata("design:paramtypes", [core_1.ChangeDetectorRef])
], LoaderComponent);
exports.LoaderComponent = LoaderComponent;
//# sourceMappingURL=loader.component.js.map