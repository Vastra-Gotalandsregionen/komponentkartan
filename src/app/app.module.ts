// Core
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { appRoutes } from './routes';

// Komponentkartan
import { KomponentkartanModule } from '@komponentkartan-module';

// Vendors
import { HighlightJsModule, HighlightJsService } from 'angular2-highlight-js';

// Pipe
import { UnitFilterPipe } from './examples-listwithcards/UnitFilterPipe';
import { UnitFilter2Pipe } from './examples-listwithlists/UnitFilterPipe';


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
import { ClosebuttonComponent } from './closebutton/closebutton.component';

import { ModaldialogComponent } from './modaldialog/modaldialog.component';
import { PanelsComponent } from './panels/panels.component';
import { RadiobuttonsComponent } from './radiobuttons/radiobuttons.component';
import { TextbuttonsComponent } from './textbuttons/textbuttons.component';
import { SavecancelComponent } from './savecancel/savecancel.component';
import { BacktotopComponent } from './backtotop/backtotop.component';
import { LoaderComponent } from './loader/loader.component';
import { StartComponent } from './start/start.component';
import { ThemingComponent } from './theming/theming.component';
import { ListexampleComponent } from './lists/examples/withnotification/listexample.component';
import { ListexamplewithrownotificationComponent } from './lists/examples/withrownotifications/listexamplewithrownotification.component';
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
import { ActionPanelsComponent } from './actionpanels/actionpanels.component';

import { ListexamplewithexpandabledivComponent } from './lists/examples/withexpandablediv/listexamplewithexpandablediv.component';
import { ExamplesListwithcardsComponent } from './examples-listwithcards/examples-listwithcards.component';
import { ExamplesListwithlistsComponent } from './examples-listwithlists/examples-listwithlists.component';
import { UnitService } from './examples-listwithlists/unitService';
import { TextareafieldComponent } from './textareaField/textareafield.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';

@NgModule({
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
        ListexamplewithrownotificationComponent,
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
        ExamplesListwithlistsComponent,
        IconsComponent,
        UnitFilterPipe,
        UnitFilter2Pipe,
        ActionPanelsComponent,
        ClosebuttonComponent,
        TableComponent,
        TextareafieldComponent
    ],
    imports: [
        KomponentkartanModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightJsModule,
        RouterModule.forRoot(appRoutes)
    ],
    exports: [UnitFilterPipe],
    providers: [
        CityService,
        HighlightJsService,
        HtmlEncodeService,
        UnitService
    ],
    bootstrap: [KomponentkartanApplicationComponent]
})
export class AppModule { }


