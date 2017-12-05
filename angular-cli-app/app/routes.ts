
import { KomponentkartaComponent } from '../../demo-app/komponentkarta/komponentkarta.component';
import { FormatmallComponent } from '../../demo-app/formatmall/formatmall.component'
import { FargkartaComponent } from '../../demo-app/fargkarta/fargkarta.component'
import { ListColumnsComponent } from '../../demo-app/list-columns/list-columns.component'

import { Routes } from '@angular/router';

export const appRoutes: Routes = [
    { path: 'formatmall', component: FormatmallComponent },
    { path: 'fargkarta', component: FargkartaComponent },
    { path: 'fargkarta', component: FargkartaComponent },
    { path: 'list-columns', component: ListColumnsComponent },
    { path: '**', component: KomponentkartaComponent }
];
