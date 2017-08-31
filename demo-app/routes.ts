
import { KomponentkartaComponent } from './komponentkarta/komponentkarta.component';
import { FormatmallComponent } from './formatmall/formatmall.component'
import { ListsComponent } from './lists/lists.component'
import { CalendarsComponent } from './calendars/calendars.component'
import { FargkartaComponent } from './fargkarta/fargkarta.component'

import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: 'formatmall', component: FormatmallComponent },
    { path: 'fargkarta', component: FargkartaComponent },
    { path: 'lists', component: ListsComponent },
    { path: 'calendars', component: CalendarsComponent },
    { path: '**', component: KomponentkartaComponent }
];