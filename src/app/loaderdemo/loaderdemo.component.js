"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var LoaderDemoComponent = (function () {
    function LoaderDemoComponent() {
        this.title = 'app';
        this.actionInProgress = false;
    }
    Object.defineProperty(LoaderDemoComponent.prototype, "buttonText", {
        get: function () {
            if (!this.actionInProgress) {
                return 'Start';
            }
            else {
                return 'Stop';
            }
        },
        enumerable: true,
        configurable: true
    });
    LoaderDemoComponent.prototype.onClick = function (event) {
        console.log('Click! ');
        this.actionInProgress = !this.actionInProgress;
    };
    return LoaderDemoComponent;
}());
LoaderDemoComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'vgr-loader-demo',
        templateUrl: 'loaderdemo.component.html'
    })
], LoaderDemoComponent);
exports.LoaderDemoComponent = LoaderDemoComponent;
//# sourceMappingURL=loaderdemo.component.js.map