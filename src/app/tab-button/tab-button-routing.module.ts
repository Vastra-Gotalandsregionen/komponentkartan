import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OversiktComponent } from './pages/oversikt.component';
import { TabButtonComponent } from './tab-button.component';

const routes: Routes = [

  { path: '', component: TabButtonComponent, pathMatch: 'full' },
  { path: 'oversikt', component: OversiktComponent },
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
