"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Core
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var animations_1 = require("@angular/platform-browser/animations");
var common_1 = require("@angular/common");
// Common
var index_1 = require("./services/index");
var index_2 = require("./pipes/index");
// UI Components,
var index_3 = require("./pipes/index");
var control = require("./controls/index");
var ngx_perfect_scrollbar_1 = require("ngx-perfect-scrollbar");
var PERFECT_SCROLLBAR_CONFIG = {
    suppressScrollX: true
};
var KomponentkartanModule = (function () {
    function KomponentkartanModule() {
    }
    return KomponentkartanModule;
}());
KomponentkartanModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            router_1.RouterModule,
            ngx_perfect_scrollbar_1.PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
            animations_1.BrowserAnimationsModule,
            forms_1.ReactiveFormsModule
        ],
        declarations: [
            index_2.SafePipe,
            index_2.TruncatePipe,
            index_2.FilterPipe,
            index_2.ErrorMessagePipe,
            index_3.DropdownItemToSelectedTextPipe,
            control.ActionPanelComponent,
            control.DropdownComponent,
            control.FilterTextboxComponent,
            control.ButtonComponent,
            control.LockButtonComponent,
            control.SaveCancelComponent,
            control.PageHeaderComponent,
            control.RadioGroupComponent,
            control.LoginInformationComponent,
            control.HeaderComponent,
            control.MenuComponent,
            control.SidebarMenuComponent,
            control.HeaderMenuComponent,
            control.CheckboxComponent,
            control.ModalPlaceholderComponent,
            control.DropdownMultiselectComponent,
            control.MonthpickerComponent,
            control.DatepickerComponent,
            control.InputComponent,
            control.CardComponent,
            control.CardHeaderComponent,
            control.CardColumnComponent,
            control.CardSectionComponent,
            control.TitleValueComponent,
            control.LoaderComponent,
            control.ListComponent,
            control.ListItemComponent,
            control.PageComponent,
            control.PageBodyComponent,
            control.PageBlockComponent,
            control.ListColumnHeaderComponent,
            control.ListColumnComponent,
            control.ListColumnCheckboxComponent,
            control.ListColumnTrashcanComponent,
            control.ListHeaderComponent,
            control.ListItemContentComponent,
            control.ListItemHeaderComponent
        ],
        exports: [
            index_2.SafePipe,
            index_2.TruncatePipe,
            index_2.FilterPipe,
            index_2.ErrorMessagePipe,
            index_3.DropdownItemToSelectedTextPipe,
            control.ActionPanelComponent,
            control.DropdownComponent,
            control.FilterTextboxComponent,
            control.ButtonComponent,
            control.LockButtonComponent,
            control.SaveCancelComponent,
            control.PageHeaderComponent,
            control.RadioGroupComponent,
            control.HeaderComponent,
            control.MenuComponent,
            control.SidebarMenuComponent,
            control.LoginInformationComponent,
            control.HeaderMenuComponent,
            ngx_perfect_scrollbar_1.PerfectScrollbarModule,
            control.CheckboxComponent,
            control.ModalPlaceholderComponent,
            control.DropdownMultiselectComponent,
            control.MonthpickerComponent,
            control.DatepickerComponent,
            control.InputComponent,
            control.CardComponent,
            control.CardHeaderComponent,
            control.CardColumnComponent,
            control.CardSectionComponent,
            control.TitleValueComponent,
            control.LoaderComponent,
            control.ListComponent,
            control.ListItemComponent,
            control.PageComponent,
            control.PageBodyComponent,
            control.PageBlockComponent,
            control.ListColumnHeaderComponent,
            control.ListColumnComponent,
            control.ListColumnCheckboxComponent,
            control.ListColumnTrashcanComponent,
            control.ListHeaderComponent,
            control.ListItemContentComponent,
            control.ListItemHeaderComponent
        ],
        providers: [index_1.ModalService, control.ActionPanelJqeuryHelper, control.ListItemJqeuryHelper, index_1.BrowserDetector, common_1.DecimalPipe, index_1.ErrorHandler]
    })
], KomponentkartanModule);
exports.KomponentkartanModule = KomponentkartanModule;
//# sourceMappingURL=komponentkartan.module.js.map