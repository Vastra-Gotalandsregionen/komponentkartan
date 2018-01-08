// Core
import { NgModule, NO_ERRORS_SCHEMA, LOCALE_ID } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DecimalPipe } from '@angular/common';

// Common
import * as type from './index';

// UI Components,
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

// Locale registration
import { registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';
registerLocaleData(localeSv);

// jquery
import * as $ from 'jquery';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule,
    PerfectScrollbarModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  declarations: [
    type.SafePipe,
    type.TruncatePipe,
    type.FilterPipe,
    type.ErrorMessagePipe,
    type.DropdownItemToSelectedTextPipe,
    type.ActionPanelComponent,
    type.DropdownComponent,
    type.FilterTextboxComponent,
    type.ButtonComponent,
    type.LockButtonComponent,
    type.SaveCancelComponent,
    type.PageHeaderComponent,
    type.RadioGroupComponent,
    type.HeaderComponent,
    type.MenuComponent,
    type.SidebarMenuComponent,
    type.LoginInformationComponent,
    type.HeaderMenuComponent,
    type.CheckboxComponent,
    type.ModalPlaceholderComponent,
    type.DropdownMultiselectComponent,
    type.MonthpickerComponent,
    type.DatepickerComponent,
    type.InputComponent,
    type.CardComponent,
    type.CardHeaderComponent,
    type.CardColumnComponent,
    type.CardSectionComponent,
    type.TitleValueComponent,
    type.LoaderComponent,
    type.ListComponent,
    type.ListItemComponent,
    type.PageComponent,
    type.PageBodyComponent,
    type.PageBlockComponent,
    type.ListColumnHeaderComponent,
    type.ListColumnComponent,
    type.ListColumnCheckboxComponent,
    type.ListColumnTrashcanComponent,
    type.ListHeaderComponent,
    type.ListItemContentComponent,
    type.ListItemHeaderComponent,
    type.ExpandableDivComponent,
    type.ExpandableDivHeaderComponent,
    type.ExpandableDivContentComponent
  ],
  exports: [
    type.SafePipe,
    type.TruncatePipe,
    type.FilterPipe,
    type.ErrorMessagePipe,
    type.DropdownItemToSelectedTextPipe,
    type.ActionPanelComponent,
    type.DropdownComponent,
    type.FilterTextboxComponent,
    type.ButtonComponent,
    type.LockButtonComponent,
    type.SaveCancelComponent,
    type.PageHeaderComponent,
    type.RadioGroupComponent,
    type.HeaderComponent,
    type.MenuComponent,
    type.SidebarMenuComponent,
    type.LoginInformationComponent,
    type.HeaderMenuComponent,
    type.CheckboxComponent,
    type.ModalPlaceholderComponent,
    type.DropdownMultiselectComponent,
    type.MonthpickerComponent,
    type.DatepickerComponent,
    type.InputComponent,
    type.CardComponent,
    type.CardHeaderComponent,
    type.CardColumnComponent,
    type.CardSectionComponent,
    type.TitleValueComponent,
    type.LoaderComponent,
    type.ListComponent,
    type.ListItemComponent,
    type.PageComponent,
    type.PageBodyComponent,
    type.PageBlockComponent,
    type.ListColumnHeaderComponent,
    type.ListColumnComponent,
    type.ListColumnCheckboxComponent,
    type.ListColumnTrashcanComponent,
    type.ListHeaderComponent,
    type.ListItemContentComponent,
    type.ListItemHeaderComponent,
    type.ExpandableDivComponent,
    type.ExpandableDivHeaderComponent,
    type.ExpandableDivContentComponent
  ],
  providers: [
    type.ModalService,
    type.ActionPanelJqeuryHelper,
    type.ListItemJqeuryHelper,
    type.BrowserDetector,
    DecimalPipe,
    type.ErrorHandler
  ]
})
export class KomponentkartanModule { }
