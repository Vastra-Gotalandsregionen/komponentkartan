
import { Routes } from '@angular/router';

import { KomponentkartaComponent } from './komponentkarta/komponentkarta.component';
import { FormatmallComponent } from './formatmall/formatmall.component';
import { ListsComponent } from './lists/lists.component';
import { CalendarsComponent } from './calendars/calendars.component';
import { FargkartaComponent } from './fargkarta/fargkarta.component';
import { InputFieldsComponent } from './inputFields/inputFields.component';
import { LoaderDemoComponent } from './loaderdemo/loaderdemo.component';
import { FormExampleComponent } from './formexample/formexample.component';
import { ExampleLayoutComponent } from './example-layout/example-layout.component';
import { ListColumnsComponent } from './list-columns/list-columns.component';
import { ReactiveformsComponent } from './reactiveforms/reactiveforms.component';


export const appRoutes: Routes = [
    { path: 'reactiveforms', component: ReactiveformsComponent },
    { path: 'formatmall', component: FormatmallComponent },
    { path: 'fargkarta', component: FargkartaComponent },
    { path: 'lists', component: ListsComponent },
    { path: 'calendars', component: CalendarsComponent },
    { path: 'inputFields', component: InputFieldsComponent },
    { path: 'loader', component: LoaderDemoComponent },
    { path: 'formexample', component: FormExampleComponent },
    { path: 'example-layout', component: ExampleLayoutComponent },
    { path: 'list-columns', component: ListColumnsComponent },
    { path: '**', component: KomponentkartaComponent }
];
