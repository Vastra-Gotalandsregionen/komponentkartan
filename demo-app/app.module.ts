

import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
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
import { FormExampleComponent } from './formexample/formexample.component'
import { ExampleLayoutComponent } from './example-layout/example-layout.component'
import { FakeAComponent } from './fake/fake-a.component';
import { FakeBComponent } from './fake/fake-b.component';
import { FakeCComponent } from './fake/fake-c.component';
import { FullWidthCardComponent } from './fake/full-width-card.component';
import { LoaderDemoComponent } from './loaderdemo/loaderdemo.component'
import { CityService } from './inputFields/cityService';
import { ListColumnsComponent } from './list-columns/list-columns.component';

import { RouterModule, Routes } from '@angular/router'
import { appRoutes } from './routes'


@NgModule({
    imports: [
        KomponentkartanModule,
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule
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
        LoaderDemoComponent,
        FormExampleComponent,
        ExampleLayoutComponent,
        FakeAComponent,
        FakeBComponent,
        FakeCComponent,
        FullWidthCardComponent,
        ListColumnsComponent

    ],
    providers: [
        CityService, { provide: LOCALE_ID, useValue: 'sv-SE' }
    ],

    bootstrap: [KomponentkartanApplicationComponent]
})
export class AppModule { }


