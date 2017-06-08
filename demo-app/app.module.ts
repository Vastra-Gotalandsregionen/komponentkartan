import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core"
import { BrowserModule, Title } from "@angular/platform-browser"
import { RouterModule, Routes } from "@angular/router"
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { appRoutes } from "./routes"

import { KomponentkartanApplicationComponent } from "./app.component"
import { HeaderComponent } from "./header/header.component"
import { HeaderMenuComponent } from "./header/header-menu.component"
import { SafePipe } from "../component-package/pipes/safePipe"
import { TruncatePipe } from "../component-package/pipes/truncatePipe"
import { FilterPipe } from "../component-package/pipes/filterPipe"
import { DropdownItemToSelectedTextPipe } from "../component-package/pipes/dropdownItemToSelectedTextPipe"
import { DropdownComponent } from "../component-package/controls/dropdown/dropdown.component"
import { KomponentkartaComponent } from "./komponentkarta/komponentkarta.component"
import { FilterTextboxComponent } from "../component-package/controls/filterTextbox/filterTextbox.component"
import { ExpandableContainerComponent } from "../component-package/controls/expandableContainer/expandableContainer.component"
import { ExpandableContainerListComponent } from "../component-package/controls/expandableContainerList/expandableContainerList.component"
import { TextButtonComponent } from "../component-package/controls/textButton/textButton.component"
import { LockButtonComponent } from "../component-package/controls/lockButton/lockButton.component"
import { SaveCancelComponent } from "../component-package/controls/saveCancel/saveCancel.component"
import { PageHeaderComponent } from "../component-package/controls/pageHeader/pageHeader.component";
import { RadioGroupComponent } from "../component-package/controls/radioGroup/radioGroup.component";

@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpModule,
        FormsModule
    ],
    providers: [
    ],
    declarations: [
        KomponentkartanApplicationComponent,
        SafePipe,
        TruncatePipe,
        FilterPipe,
        DropdownItemToSelectedTextPipe,
        HeaderComponent,
        HeaderMenuComponent,
        DropdownComponent,
        FilterTextboxComponent,
        KomponentkartaComponent,
        ExpandableContainerComponent,
        ExpandableContainerListComponent,
        TextButtonComponent,
        LockButtonComponent,
        SaveCancelComponent,
        PageHeaderComponent,
        RadioGroupComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA],

    bootstrap: [KomponentkartanApplicationComponent]
})
export class AppModule { }