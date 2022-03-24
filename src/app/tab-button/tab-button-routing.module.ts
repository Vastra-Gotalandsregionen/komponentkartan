import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FavoriterComponent } from './pages/favoriter.component';
import { TabStartComponent } from './pages/tab-start.component';
import { ValdaComponent } from './pages/valda.component';
import { TabButtonComponent } from './tab-button.component';

const routes: Routes = [

  { path: 'tab-button', component: TabButtonComponent,
  children: [
    { path: 'tab-start', component: TabStartComponent},
    { path: 'favoriter', component: FavoriterComponent},
    { path: 'valda', component: ValdaComponent},
    { path: '**', component: TabStartComponent }
  ]}
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
