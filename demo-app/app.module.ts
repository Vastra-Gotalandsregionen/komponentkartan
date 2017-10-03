

import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'

import { FormsModule } from '@angular/forms';

import { KomponentkartanApplicationComponent } from './app.component';
import { KomponentkartaComponent } from './komponentkarta/komponentkarta.component'
import { FormatmallComponent } from './formatmall/formatmall.component'
import { FargkartaComponent } from './fargkarta/fargkarta.component'
import { MenuSelectorComponent } from './menuSelector/menuSelector.component'

import { KomponentkartanModule } from '../component-package/komponentkartan.module';
import { ListsComponent } from './lists/lists.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { InputFieldsComponent } from './inputFields/inputFields.component'
import { LoaderComponent } from './loader/loader.component';
import { CityService } from './inputFields/cityService';

import { RouterModule, Routes } from '@angular/router'
import { appRoutes } from './routes'


@NgModule({
    imports: [
        KomponentkartanModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        KomponentkartanApplicationComponent,
        KomponentkartaComponent,
        FormatmallComponent,
        FargkartaComponent,
        MenuSelectorComponent,
        ListsComponent,
        CalendarsComponent,
        InputFieldsComponent,
        LoaderComponent
    ],
    providers: [
        CityService, { provide: LOCALE_ID, useValue: 'sv-SE' }
    ],

    bootstrap: [KomponentkartanApplicationComponent]
})
export class AppModule { }


