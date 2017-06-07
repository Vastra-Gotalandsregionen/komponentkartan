import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core"
import { BrowserModule, Title } from "@angular/platform-browser"
import { RouterModule, Routes } from "@angular/router"
import { HttpModule } from "@angular/http";
import { FormsModule } from "@angular/forms";

import { appRoutes } from "./routes"

import { KomponentkartanApplicationComponent } from "./app.component"
import { HeaderComponent } from "./header/header.component"
import { HeaderMenuComponent } from "./header/header-menu.component"
import { SafePipe } from "./shared/pipes/safePipe"
import { TruncatePipe } from "./shared/pipes/truncatePipe"
import { FilterPipe } from "./shared/pipes/filterPipe"
import { DropdownItemToSelectedTextPipe } from "./shared/pipes/dropdownItemToSelectedTextPipe"
import { DropdownComponent } from "./shared/controls/dropdown/dropdown.component"
import { KomponentkartaComponent } from "./komponentkarta/komponentkarta.component"
import { FilterTextboxComponent } from "./shared/controls/filterTextbox/filterTextbox.component"
import { ExpandableContainerComponent } from "./shared/controls/expandableContainer/expandableContainer.component"
import { ExpandableContainerListComponent } from "./shared/controls/expandableContainerList/expandableContainerList.component"
import { TextButtonComponent } from "./shared/controls/textButton/textButton.component"
import { LockButtonComponent } from "./shared/controls/lockButton/lockButton.component"
import { SaveCancelComponent } from "./shared/controls/saveCancel/saveCancel.component"
import { PageHeaderComponent } from "./shared/controls/pageHeader/pageHeader.component";
import { RadioGroupComponent } from "./shared/controls/radioGroup/radioGroup.component";

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