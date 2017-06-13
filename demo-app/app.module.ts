import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core"
import { BrowserModule, Title } from "@angular/platform-browser"


import { FormsModule } from "@angular/forms";


import { KomponentkartanApplicationComponent } from "./app.component"
import { HeaderComponent } from "./header/header.component"
import { HeaderMenuComponent } from "./header/header-menu.component"

import { KomponentkartaComponent } from "./komponentkarta/komponentkarta.component"

import { KomponentkartanModule } from "../component-package/komponentkartan.module";


@NgModule({
    imports: [
        KomponentkartanModule,
        BrowserModule,
        FormsModule
    ],
    providers: [
    ],
    declarations: [
        KomponentkartanApplicationComponent,
        HeaderComponent,
        HeaderMenuComponent,
        KomponentkartaComponent
    ],

    bootstrap: [KomponentkartanApplicationComponent]
})
export class AppModule { }