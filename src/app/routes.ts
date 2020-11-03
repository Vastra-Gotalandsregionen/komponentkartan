// Core
import { Routes } from '@angular/router';

// Domain
import { InputfieldsComponent } from './inputfields/inputfields.component';
import { TextareafieldComponent } from './textareaField/textareafield.component';
import { DatepickerComponent } from './datepicker/datepicker.component';
import { ColoursComponent } from './colours/colours.component';
import { CheckboxComponent } from './checkbox/checkbox.component';
import { FormattemplateComponent } from './formattemplate/formattemplate.component';
import { HeadersComponent } from './headers/headers.component';
import { LoaderComponent } from './loader/loader.component';
import { LockbuttonComponent } from './lockbutton/lockbutton.component';
import { ClosebuttonComponent } from './closebutton/closebutton.component';
import { PanelsComponent } from './panels/panels.component';
import { RadiobuttonsComponent } from './radiobuttons/radiobuttons.component';
import { TextbuttonsComponent } from './textbuttons/textbuttons.component';
import { SavecancelComponent } from './savecancel/savecancel.component';
import { BacktotopComponent } from './backtotop/backtotop.component';
import { StartComponent } from './start/start.component';
import { ThemingComponent } from './theming/theming.component';
import { TitleValueComponent } from './title-value/title-value.component';
import { PageStructureComponent } from './page-structure/page-structure.component';
import { CardComponent } from './card/card.component';
import { SizesComponent } from './sizes/sizes.component';
import { MenuComponent } from './menu/menu.component';
import { ReactiveformsexampleComponent } from './reactiveforms-example/reactiveforms-example.component';
import { ExpandableDivComponent } from './expandable-div/expandable-div.component';
import { TableComponent } from './table/table.component';
import { FilterTagComponent } from './filter-tag/filter-tag.component';
import { IconsComponent } from './icons/icons.component';
import { ActionPanelsComponent } from './actionpanels/actionpanels.component';
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

export const appRoutes: Routes = [

    { path: 'inputFields', component: InputfieldsComponent },
    { path: 'textareaField', component: TextareafieldComponent },
    { path: 'icons-overview', component: IconsComponent },
    { path: 'textbuttons', component: TextbuttonsComponent },
    { path: 'radioButtons', component: RadiobuttonsComponent },
    { path: 'checkbox', component: CheckboxComponent },
    { path: 'closebutton', component: ClosebuttonComponent },
    { path: 'colours', component: ColoursComponent },
    { path: 'datepicker', component: DatepickerComponent },
    { path: 'formattemplate', component: FormattemplateComponent },
    { path: 'headers', component: HeadersComponent },
    { path: 'loader', component: LoaderComponent },
    { path: 'lockbutton', component: LockbuttonComponent },
    { path: 'panels', component: PanelsComponent },
    { path: 'savecancel', component: SavecancelComponent },
    { path: 'backtotop', component: BacktotopComponent },
    { path: '', component: StartComponent },
    { path: 'table', component: TableComponent },
    { path: 'theming', component: ThemingComponent },
    { path: 'titlevalue', component: TitleValueComponent },
    { path: 'pagestructure', component: PageStructureComponent },
    { path: 'card', component: CardComponent },
    { path: 'sizes', component: SizesComponent },
    {
        path: 'menu', component: MenuComponent,
        children: [{
            path: ':id',
            component: MenuComponent
        }]
    },
    { path: 'reactiveformsexample', component: ReactiveformsexampleComponent },
    { path: 'expandablediv', component: ExpandableDivComponent },
    { path: 'toggle-button', component: ToggleButtonComponent },
    { path: 'actionPanels', component: ActionPanelsComponent },
    { path: 'filter-tag', component: FilterTagComponent },
    { path: 'ring-with-text', component: RingWithTextComponent },
    { path: 'search-results', component: SearchResultsComponent },
    { path: 'page-block', component: PageBlockDocumentationComponent },
    { path: 'page-header', component: PageHeaderDocumentationComponent },
    { path: 'dropdown-select', component: DropdownSelectDocumentationComponent },
    { path: 'pagination-documentation', component: PaginationDocumentationComponent },
    { path: 'modaldialog', component: ModaldialogComponent },
    { path: 'grid', component: GridDocumentationComponent },
    { path: 'notification', component: NotificationDocumentationComponent },

    { path: '**', redirectTo: '/' }
];
