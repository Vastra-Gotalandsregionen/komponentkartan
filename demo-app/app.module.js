"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var animations_1 = require("@angular/platform-browser/animations");
var forms_1 = require("@angular/forms");
var forms_2 = require("@angular/forms");
var app_component_1 = require("./app.component");
var komponentkarta_component_1 = require("./komponentkarta/komponentkarta.component");
var formatmall_component_1 = require("./formatmall/formatmall.component");
var fargkarta_component_1 = require("./fargkarta/fargkarta.component");
var menuSelector_component_1 = require("./menuSelector/menuSelector.component");
var komponentkartan_module_1 = require("../component-package/komponentkartan.module");
var lists_component_1 = require("./lists/lists.component");
var calendars_component_1 = require("./calendars/calendars.component");
var inputFields_component_1 = require("./inputFields/inputFields.component");
var formexample_component_1 = require("./formexample/formexample.component");
var example_layout_component_1 = require("./example-layout/example-layout.component");
var fake_a_component_1 = require("./fake/fake-a.component");
var fake_b_component_1 = require("./fake/fake-b.component");
var fake_c_component_1 = require("./fake/fake-c.component");
var full_width_card_component_1 = require("./fake/full-width-card.component");
var loaderdemo_component_1 = require("./loaderdemo/loaderdemo.component");
var cityService_1 = require("./inputFields/cityService");
var list_columns_component_1 = require("./list-columns/list-columns.component");
var router_1 = require("@angular/router");
var routes_1 = require("./routes");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            komponentkartan_module_1.KomponentkartanModule,
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            router_1.RouterModule.forRoot(routes_1.appRoutes),
            animations_1.BrowserAnimationsModule,
            forms_2.ReactiveFormsModule
        ],
        declarations: [
            app_component_1.KomponentkartanApplicationComponent,
            komponentkarta_component_1.KomponentkartaComponent,
            formatmall_component_1.FormatmallComponent,
            fargkarta_component_1.FargkartaComponent,
            menuSelector_component_1.MenuSelectorComponent,
            lists_component_1.ListsComponent,
            calendars_component_1.CalendarsComponent,
            inputFields_component_1.InputFieldsComponent,
            loaderdemo_component_1.LoaderDemoComponent,
            formexample_component_1.FormExampleComponent,
            example_layout_component_1.ExampleLayoutComponent,
            fake_a_component_1.FakeAComponent,
            fake_b_component_1.FakeBComponent,
            fake_c_component_1.FakeCComponent,
            full_width_card_component_1.FullWidthCardComponent,
            list_columns_component_1.ListColumnsComponent
        ],
        providers: [
            cityService_1.CityService,
            { provide: core_1.LOCALE_ID, useValue: 'sv-SE' }
        ],
        bootstrap: [app_component_1.KomponentkartanApplicationComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map