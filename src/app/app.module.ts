// Core
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

// Core
import { appRoutes } from './routes';

// Komponentkartan
import { KomponentkartanModule } from '@komponentkartan/komponentkartan.module';

// Vendors
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

// Pipe
import { UnitFilterPipe } from './examples-listwithcards/UnitFilterPipe';

// Domain
import { KomponentkartanApplicationComponent } from './app.component';

import { InputfieldsComponent } from './inputfields/inputfields.component';
import { CityService } from './inputfields/cityservice';
import { MonthpickerComponent } from './monthpicker/monthpicker.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ColoursComponent } from './colours/colours.component';
import { DropdownmultiselectComponent } from './dropdownmultiselect/dropdownmultiselect.component';
import { DropdownsComponent } from './dropdowns/dropdowns.component';
import { FormattemplateComponent } from './formattemplate/formattemplate.component';
import { HeadersComponent } from './headers/headers.component';
import { ListsComponent } from './lists/lists.component';
import { LockbuttonComponent } from './lockbutton/lockbutton.component';
import { ModaldialogComponent } from './modaldialog/modaldialog.component';
import { PanelsComponent } from './panels/panels.component';
import { RadiobuttonsComponent } from './radiobuttons/radiobuttons.component';
import { TextbuttonsComponent } from './textbuttons/textbuttons.component';
import { SavecancelComponent } from './savecancel/savecancel.component';
import { BacktotopComponent } from './backtotop/backtotop.component';
import { LoaderComponent } from './loader/loader.component';
import { StartComponent } from './start/start.component';
import { ThemingComponent } from './theming/theming.component';
import { ListexampleComponent } from './lists/examples/withnotifications/listexample.component';
import { ListcodeexampleComponent } from './lists/examples/simple/listcodeexample.component';
import { ListExampleWithActionButtonsComponent } from './lists/examples/withactionbuttons/listexamplewithactionbuttons.component';
import { ReactiveformsexampleComponent } from './reactiveforms-example/reactiveforms-example.component';
import { ComponentDocsComponent } from './component-docs/component-docs.component';
import { TitleValueComponent } from './title-value/title-value.component';
import { FiltertexboxComponent } from './filtertexbox/filtertexbox.component';
import { PageStructureComponent } from './page-structure/page-structure.component';
import { CardComponent } from './card/card.component';
import { HtmlEncodeService } from './html-encode.service';
import { SizesComponent } from './sizes/sizes.component';
import { MenuComponent } from './menu/menu.component';
import { ExpandableDivComponent } from './expandable-div/expandable-div.component';

import { ListexamplewithexpandabledivComponent } from './lists/examples/withexpandablediv/listexamplewithexpandablediv.component';
import { ExamplesListwithcardsComponent } from './examples-listwithcards/examples-listwithcards.component';
import { IconsComponent } from './icons/icons.component';

@NgModule({
    imports: [
        KomponentkartanModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightJsModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        KomponentkartanApplicationComponent,
        InputfieldsComponent,
        MonthpickerComponent,
        DatepickerComponent,
        BacktotopComponent,
        SavecancelComponent,
        CheckboxComponent,
        ColoursComponent,
        DropdownmultiselectComponent,
        DropdownsComponent,
        FormattemplateComponent,
        HeadersComponent,
        ListsComponent,
        LockbuttonComponent,
        ModaldialogComponent,
        PanelsComponent,
        RadiobuttonsComponent,
        TextbuttonsComponent,
        LoaderComponent,
        StartComponent,
        ThemingComponent,
        ListexampleComponent,
        ComponentDocsComponent,
        TitleValueComponent,
        FiltertexboxComponent,
        PageStructureComponent,
        CardComponent,
        SizesComponent,
        MenuComponent,
        ListcodeexampleComponent,
        ListExampleWithActionButtonsComponent,
        ReactiveformsexampleComponent,
        ExpandableDivComponent,
        ListexamplewithexpandabledivComponent,
        ExamplesListwithcardsComponent,
        IconsComponent,
        UnitFilterPipe
    ],
    exports: [UnitFilterPipe],
    providers: [
        CityService,
        HighlightJsService,
        HtmlEncodeService
    ],
    schemas: [NO_ERRORS_SCHEMA],

    bootstrap: [KomponentkartanApplicationComponent]
})
export class AppModule { }


