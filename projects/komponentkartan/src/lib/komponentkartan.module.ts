// Core
import { NgModule, LOCALE_ID } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Common
import * as type from './index';

// Locale registration
import { registerLocaleData } from '@angular/common';
import localeSv from '@angular/common/locales/sv';
registerLocaleData(localeSv);

// Perfect Scrollbar
import { PerfectScrollbarModule, PerfectScrollbarConfigInterface, PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { IconModule } from './controls/icon/icon.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  imports: [
    FormsModule,
    RouterModule,
    PerfectScrollbarModule,
    CommonModule,
    ReactiveFormsModule,
    IconModule,
    FontAwesomeModule
  ],
  declarations: [
    type.SafePipe,
    type.TruncatePipe,
    type.FilterPipe,
    type.ErrorMessagePipe,
    type.ActionPanelComponent,
    type.FilterTextboxComponent,
    type.ButtonComponent,
    type.LockButtonComponent,
    type.SaveCancelComponent,
    type.PageHeaderComponent,
    type.RadioGroupComponent,
    type.HeaderComponent,
    type.LoginInformationComponent,
    type.HeaderMenuComponent,
    type.CheckboxComponent,
    type.ModalPlaceholderComponent,
    type.ModalContentComponent,
    type.ModalHeaderComponent,
    type.ModalFooterComponent,
    type.InputComponent,
    type.CardComponent,
    type.CardHeaderComponent,
    type.CardColumnComponent,
    type.CardSectionComponent,
    type.TitleValueComponent,
    type.TitleValueLayoutComponent,
    type.LoaderComponent,
    type.ListComponent,
    type.ListItemComponent,
    type.PageComponent,
    type.PageBodyComponent,
    type.PageBlockComponent,
    type.ListColumnHeaderComponent,
    type.ListColumnHeaderCheckboxComponent,
    type.ListColumnComponent,
    type.ListColumnCheckboxComponent,
    type.ListColumnTrashcanComponent,
    type.ListHeaderComponent,
    type.ListItemContentComponent,
    type.ListItemHeaderComponent,
    type.SidebarMenuComponent,
    type.MenuComponent,
    type.MenuItemComponent,
    type.MenuSeparatorComponent,
    type.ExpandableDivComponent,
    type.ExpandableDivHeaderComponent,
    type.ExpandableDivContentComponent,
    type.PanelComponent,
    type.PanelContainerComponent,
    type.SubmenuComponent,
    type.CloseButtonComponent,
    type.TableRowColumnComponent,
    type.TableHeaderColumnComponent,
    type.TableHeaderComponent,
    type.TableRowComponent,
    type.TableComponent,
    type.TextareaComponent,
    type.FilterTagComponent,
    type.FilterTagGroupComponent,
    type.RingWithTextComponent,
    type.ScrollToTopComponent,
    type.ToggleButtonComponent,
    type.ToggleButtonGroupComponent,
    type.SearchResultComponent,
    type.DropdownItemComponent,
    type.PaginationComponent,
    type.DropdownSelectComponent,
    type.IconComponent,
    type.DatepickerComponent,
    type.DatepickerItemComponent
  ],
  exports: [
    type.SafePipe,
    type.TruncatePipe,
    type.FilterPipe,
    type.ErrorMessagePipe,
    type.ActionPanelComponent,
    type.FilterTextboxComponent,
    type.ButtonComponent,
    type.LockButtonComponent,
    type.SaveCancelComponent,
    type.PageHeaderComponent,
    type.RadioGroupComponent,
    type.HeaderComponent,
    type.LoginInformationComponent,
    type.HeaderMenuComponent,
    type.CheckboxComponent,
    type.ModalPlaceholderComponent,
    type.ModalContentComponent,
    type.ModalHeaderComponent,
    type.ModalFooterComponent,
    type.InputComponent,
    type.CardComponent,
    type.CardHeaderComponent,
    type.CardColumnComponent,
    type.CardSectionComponent,
    type.TitleValueComponent,
    type.TitleValueLayoutComponent,
    type.LoaderComponent,
    type.ListComponent,
    type.ListItemComponent,
    type.PageComponent,
    type.PageBodyComponent,
    type.PageBlockComponent,
    type.ListColumnHeaderComponent,
    type.ListColumnHeaderCheckboxComponent,
    type.ListColumnComponent,
    type.ListColumnCheckboxComponent,
    type.ListColumnTrashcanComponent,
    type.ListHeaderComponent,
    type.ListItemContentComponent,
    type.ListItemHeaderComponent,
    type.MenuComponent,
    type.SidebarMenuComponent,
    type.MenuItemComponent,
    type.MenuSeparatorComponent,
    type.ExpandableDivComponent,
    type.ExpandableDivHeaderComponent,
    type.ExpandableDivContentComponent,
    type.PanelComponent,
    type.PanelContainerComponent,
    type.SubmenuComponent,
    type.CloseButtonComponent,
    type.TableComponent,
    type.TableRowColumnComponent,
    type.TableHeaderColumnComponent,
    type.TableHeaderComponent,
    type.TableRowComponent,
    type.TextareaComponent,
    type.FilterTagComponent,
    type.RingWithTextComponent,
    type.FilterTagGroupComponent,
    type.ScrollToTopComponent,
    type.ToggleButtonComponent,
    type.ToggleButtonGroupComponent,
    type.SearchResultComponent,
    type.DropdownItemComponent,
    type.PaginationComponent,
    type.DropdownSelectComponent,
    type.IconComponent,
    type.DatepickerComponent,
    type.DatepickerItemComponent
  ],
  providers: [
    type.ModalService,
    type.BrowserDetector,
    type.ErrorHandler,
    { provide: LOCALE_ID, useValue: 'sv-SE' },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ]
})
export class KomponentkartanModule {
  constructor() { }
 }
