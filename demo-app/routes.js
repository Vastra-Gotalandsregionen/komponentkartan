"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var komponentkarta_component_1 = require("./komponentkarta/komponentkarta.component");
var formatmall_component_1 = require("./formatmall/formatmall.component");
var lists_component_1 = require("./lists/lists.component");
var calendars_component_1 = require("./calendars/calendars.component");
var fargkarta_component_1 = require("./fargkarta/fargkarta.component");
var inputFields_component_1 = require("./inputFields/inputFields.component");
var loaderdemo_component_1 = require("./loaderdemo/loaderdemo.component");
var formexample_component_1 = require("./formexample/formexample.component");
var example_layout_component_1 = require("./example-layout/example-layout.component");
var list_columns_component_1 = require("./list-columns/list-columns.component");
exports.appRoutes = [
    { path: 'formatmall', component: formatmall_component_1.FormatmallComponent },
    { path: 'fargkarta', component: fargkarta_component_1.FargkartaComponent },
    { path: 'lists', component: lists_component_1.ListsComponent },
    { path: 'calendars', component: calendars_component_1.CalendarsComponent },
    { path: 'inputFields', component: inputFields_component_1.InputFieldsComponent },
    { path: 'loader', component: loaderdemo_component_1.LoaderDemoComponent },
    { path: 'formexample', component: formexample_component_1.FormExampleComponent },
    { path: 'example-layout', component: example_layout_component_1.ExampleLayoutComponent },
    { path: 'list-columns', component: list_columns_component_1.ListColumnsComponent },
    { path: '**', component: komponentkarta_component_1.KomponentkartaComponent }
];
//# sourceMappingURL=routes.js.map