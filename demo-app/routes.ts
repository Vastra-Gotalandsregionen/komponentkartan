
import { KomponentkartaComponent } from './komponentkarta/komponentkarta.component';
import { FormatmallComponent } from './formatmall/formatmall.component'
import { FargkartaComponent } from './fargkarta/fargkarta.component'

import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: 'formatmall', component: FormatmallComponent },
    { path: 'fargkarta', component: FargkartaComponent },
    { path: '**', component: KomponentkartaComponent }
];