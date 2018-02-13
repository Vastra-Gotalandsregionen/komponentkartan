

// Core
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Domain
import { KomponentkartanModule } from '../lib/komponentkartan.module';

import { AppComponent } from './app.component';
import { KomponentkartaComponent } from './komponentkarta/komponentkarta.component';
import { FormatmallComponent } from './formatmall/formatmall.component';
import { FargkartaComponent } from './fargkarta/fargkarta.component';
import { ListsComponent } from './lists/lists.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { InputFieldsComponent } from './inputFields/inputFields.component';
import { FormExampleComponent } from './formexample/formexample.component';
import { ExampleLayoutComponent } from './example-layout/example-layout.component';
import { FakeAComponent } from './fake/fake-a.component';
import { FakeBComponent } from './fake/fake-b.component';
import { FakeCComponent } from './fake/fake-c.component';
import { FullWidthCardComponent } from './fake/full-width-card.component';
import { LoaderDemoComponent } from './loaderdemo/loaderdemo.component';
import { CityService } from './inputFields/cityService';
import { ListColumnsComponent } from './list-columns/list-columns.component';
import { ExampleMenuComponent } from './example-menu/example-menu.component';

import { appRoutes } from './routes';
import { ReactiveformsComponent } from './reactiveforms/reactiveforms.component';
import { ExamplesListwithcardsComponent } from './examples-listwithcards/examples-listwithcards.component';

import { UnitFilterPipe } from './examples-listwithcards/UnitFilterPipe';


@NgModule({
  imports: [
    KomponentkartanModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    KomponentkartaComponent,
    FormatmallComponent,
    FargkartaComponent,
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
    ListColumnsComponent,
    ReactiveformsComponent,
    ExamplesListwithcardsComponent,
    UnitFilterPipe,
    ExampleMenuComponent
  ],
  exports: [UnitFilterPipe],
  providers: [
    CityService
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }


