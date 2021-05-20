import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriterComponent } from './pages/favoriter.component';
import { ValdaComponent } from './pages/valda.component';
import { TabButtonComponent } from './tab-button.component';

const routes: Routes = [

  { path: '', component: TabButtonComponent, pathMatch: 'full' },
  { path: 'favoriter', component: FavoriterComponent },
  { path: 'valda', component: ValdaComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class TabbuttonRoutingModule { }
