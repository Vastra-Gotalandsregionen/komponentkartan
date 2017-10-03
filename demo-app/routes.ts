
import { Routes } from '@angular/router';

import { KomponentkartaComponent } from './komponentkarta/komponentkarta.component';
import { FormatmallComponent } from './formatmall/formatmall.component'
import { ListsComponent } from './lists/lists.component'
import { CalendarsComponent } from './calendars/calendars.component'
import { FargkartaComponent } from './fargkarta/fargkarta.component'
import { InputFieldsComponent } from './inputFields/inputFields.component'
import { LaddningsSnurraComponent } from './laddningssnurra/laddningssnurra.component'

export const appRoutes: Routes = [
    { path: 'formatmall', component: FormatmallComponent },
    { path: 'fargkarta', component: FargkartaComponent },
    { path: 'lists', component: ListsComponent },
    { path: 'calendars', component: CalendarsComponent },
    { path: 'inputFields', component: InputFieldsComponent },    
    { path: 'loader', component: LaddningsSnurraComponent },
    { path: '**', component: KomponentkartaComponent }
];