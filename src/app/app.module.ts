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


// Domain
import { KomponentkartanApplicationComponent } from './app.component';

import { InputfieldsComponent } from './inputfields/inputfields.component';
import { CityService } from './inputfields/cityService';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ColoursComponent } from './colours/colours.component';
import { FormattemplateComponent } from './formattemplate/formattemplate.component';
import { HeadersComponent } from './headers/headers.component';
import { ListsComponent } from './lists/lists.component';
import { LockbuttonComponent } from './lockbutton/lockbutton.component';
import { ClosebuttonComponent } from './closebutton/closebutton.component';

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
import { ListwithpaginationcodeexampleComponent } from './lists/examples/withpagination/listwithpaginationcodeexample.component';
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
import { FilterTagComponent } from './filter-tag/filter-tag.component';
import { ListexamplewithexpandabledivComponent } from './lists/examples/withexpandablediv/listexamplewithexpandablediv.component';
import { TextareafieldComponent } from './textareaField/textareafield.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';
import { RingWithTextComponent } from './ring-with-text/ring-with-text.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PageBlockDocumentationComponent } from './page-block-documentation/page-block-documentation.component';
import { ExamplesListwithpageblockComponent } from './examples-listwithpageblock/examples-listwithpageblock.component';
import { PageHeaderDocumentationComponent } from './page-header-documentation/page-header-documentation.component';
import { DropdownSelectDocumentationComponent } from './dropdown-select-documentation/dropdown-select-documentation.component';
import { PaginationDocumentationComponent } from './pagination-documentation/pagination-documentation.component';
import { ModaldialogComponent } from './modaldialog/modaldialog.component';
import { ExamplesListwithcardsComponent } from './examples-listwithcards/examples-listwithcards.component';
import { UnitFilterPipe } from './examples-listwithcards/unitfilterpipe';
import { GridDocumentationComponent } from './grid-documentation/grid-documentation.component';
import { NotificationDocumentationComponent} from './notification-documentation/notification-documentation.component';

@NgModule({
    declarations: [
        KomponentkartanApplicationComponent,
        InputfieldsComponent,
        DatepickerComponent,
        BacktotopComponent,
        SavecancelComponent,
        CheckboxComponent,
        ColoursComponent,
        FormattemplateComponent,
        HeadersComponent,
        ListsComponent,
        LockbuttonComponent,
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
        ListwithpaginationcodeexampleComponent,
        ListExampleWithActionButtonsComponent,
        ReactiveformsexampleComponent,
        ExpandableDivComponent,
        ListexamplewithexpandabledivComponent,
        IconsComponent,
        ActionPanelsComponent,
        ClosebuttonComponent,
        TableComponent,
        TextareafieldComponent,
        FilterTagComponent,
        RingWithTextComponent,
        ToggleButtonComponent,
        SearchResultsComponent,
        PageBlockDocumentationComponent,
        PageHeaderDocumentationComponent,
        ExamplesListwithpageblockComponent,
        ExamplesListwithcardsComponent,
        DropdownSelectDocumentationComponent,
        PaginationDocumentationComponent,
        ModaldialogComponent,
        UnitFilterPipe,
        GridDocumentationComponent,
        NotificationDocumentationComponent
    ],
    imports: [
        KomponentkartanModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HighlightJsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        CityService,
        HighlightJsService,
        HtmlEncodeService,
        {
            provide: LOCALE_ID, useValue: 'sv-SE'
        },
    ],
    bootstrap: [KomponentkartanApplicationComponent]
})
export class AppModule { }
