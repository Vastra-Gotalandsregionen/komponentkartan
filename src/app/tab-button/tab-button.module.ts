import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Komponentkartan lib
import { KomponentkartanModule } from '../../../projects/komponentkartan/src/lib/komponentkartan.module';
import { TabButtonComponent } from './tab-button.component';
import { TabbuttonRoutingModule } from './tab-button-routing.module';
import { ValdaComponent } from './pages/valda.component';

@NgModule({
  declarations: [
    TabButtonComponent,
    ValdaComponent,
  ],
  imports: [
    CommonModule,
    KomponentkartanModule,
    TabbuttonRoutingModule
  ]
})
export class TabButtonModule { }
