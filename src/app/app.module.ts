// Core
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { appRoutes } from './routes';

// Komponentkartan
import { KomponentkartanModule } from '../../projects/komponentkartan/src/lib/komponentkartan.module';

// Vendors
import { AngularHighlightJsModule } from 'angular2-highlight-js';
import hljs from 'highlight.js/lib/highlight';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import xml from 'highlight.js/lib/languages/xml';
hljs.registerLanguage('typescript', typescript);
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('xml', xml);

// Domain
import { KomponentkartanApplicationComponent } from './app.component';

import { InputfieldsComponent } from './inputfields/inputfields.component';
import { CityService } from './inputfields/cityService';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { ColoursComponent } from './colours/colours.component';
import { FormattemplateComponent } from './formattemplate/formattemplate.component';
import { HeadersComponent } from './headers/headers.component';
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
import { ReactiveformsexampleComponent } from './reactiveforms-example/reactiveforms-example.component';
import { ComponentDocsComponent } from './component-docs/component-docs.component';
import { TitleValueComponent } from './title-value/title-value.component';
import { PageStructureComponent } from './page-structure/page-structure.component';
import { CardComponent } from './card/card.component';
import { HtmlEncodeService } from './html-encode.service';
import { SizesComponent } from './sizes/sizes.component';
import { MenuComponent } from './menu/menu.component';
import { ExpandableDivComponent } from './expandable-div/expandable-div.component';
import { ActionPanelsComponent } from './actionpanels/actionpanels.component';
import { FilterTagComponent } from './filter-tag/filter-tag.component';
import { TextareafieldComponent } from './textareaField/textareafield.component';
import { IconsComponent } from './icons/icons.component';
import { TableComponent } from './table/table.component';
import { RingWithTextComponent } from './ring-with-text/ring-with-text.component';
import { ToggleButtonComponent } from './toggle-button/toggle-button.component';
import { SearchResultsComponent } from './search-results/search-results.component';
import { PageBlockDocumentationComponent } from './page-block-documentation/page-block-documentation.component';
import { PageHeaderDocumentationComponent } from './page-header-documentation/page-header-documentation.component';
import { DropdownSelectDocumentationComponent } from './dropdown-select-documentation/dropdown-select-documentation.component';
import { PaginationDocumentationComponent } from './pagination-documentation/pagination-documentation.component';
import { ModaldialogComponent } from './modaldialog/modaldialog.component';
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
        LockbuttonComponent,
        PanelsComponent,
        RadiobuttonsComponent,
        TextbuttonsComponent,
        LoaderComponent,
        StartComponent,
        ThemingComponent,
        ComponentDocsComponent,
        TitleValueComponent,
        PageStructureComponent,
        CardComponent,
        SizesComponent,
        MenuComponent,
        ReactiveformsexampleComponent,
        ExpandableDivComponent,
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
        DropdownSelectDocumentationComponent,
        PaginationDocumentationComponent,
        ModaldialogComponent,
        GridDocumentationComponent,
        NotificationDocumentationComponent
    ],
    imports: [
        KomponentkartanModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        AngularHighlightJsModule,
        RouterModule.forRoot(appRoutes)
    ],
    providers: [
        CityService,
        HtmlEncodeService,
        {
            provide: LOCALE_ID, useValue: 'sv-SE'
        },
    ],
    bootstrap: [KomponentkartanApplicationComponent]
})
export class AppModule { }
