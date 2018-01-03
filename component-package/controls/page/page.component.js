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
var pageHeader_component_1 = require("../pageHeader/pageHeader.component");
var page_body_component_1 = require("../page-body/page-body.component");
var action_panel_component_1 = require("../action-panel/action-panel.component");
var PageComponent = (function () {
    function PageComponent() {
        this.hasClass = true;
    }
    PageComponent.prototype.ngAfterContentInit = function () {
        this.updateComponentHeights();
    };
    PageComponent.prototype.ngAfterViewInit = function () {
        this.updateComponentHeights();
    };
    PageComponent.prototype.onWindowResize = function (event) {
        this.updateComponentHeights();
    };
    PageComponent.prototype.updateComponentHeights = function () {
        var pageHeaderHeight = this.getPageHeaderHeight();
        if (this.pageBody) {
            this.pageBody.nativeElement.style.top = pageHeaderHeight + 'px';
        }
        if (this.actionPanelComponent) {
            this.actionPanelComponent.setPageHeaderHeight(pageHeaderHeight);
        }
    };
    PageComponent.prototype.getPageHeaderHeight = function () {
        return this.pageHeader ? this.pageHeader.nativeElement.offsetHeight : 0;
    };
    return PageComponent;
}());
__decorate([
    core_1.HostBinding('class.page'),
    __metadata("design:type", Object)
], PageComponent.prototype, "hasClass", void 0);
__decorate([
    core_1.ContentChild(pageHeader_component_1.PageHeaderComponent, { read: core_1.ElementRef }),
    __metadata("design:type", core_1.ElementRef)
], PageComponent.prototype, "pageHeader", void 0);
__decorate([
    core_1.ContentChild(page_body_component_1.PageBodyComponent, { read: core_1.ElementRef }),
    __metadata("design:type", core_1.ElementRef)
], PageComponent.prototype, "pageBody", void 0);
__decorate([
    core_1.ContentChild(action_panel_component_1.ActionPanelComponent),
    __metadata("design:type", action_panel_component_1.ActionPanelComponent)
], PageComponent.prototype, "actionPanelComponent", void 0);
__decorate([
    core_1.HostListener('window:resize', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], PageComponent.prototype, "onWindowResize", null);
PageComponent = __decorate([
    core_1.Component({
        selector: 'vgr-page',
        moduleId: module.id,
        templateUrl: './page.component.html'
    })
], PageComponent);
exports.PageComponent = PageComponent;
//# sourceMappingURL=page.component.js.map