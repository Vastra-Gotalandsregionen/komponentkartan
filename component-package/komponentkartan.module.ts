// Core
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Common
import { ModalService, BrowserDetector } from './services/index';
import { SafePipe, TruncatePipe, FilterPipe } from './pipes/index';
import * as $ from 'jquery';

// UI Components
import { DropdownItemToSelectedTextPipe } from './pipes/index';
import * as control from './controls/index';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG),
        BrowserAnimationsModule,
        ReactiveFormsModule
    ],

    declarations: [
        SafePipe,
        TruncatePipe,
        FilterPipe,
        DropdownItemToSelectedTextPipe,
        control.ActionPanelComponent,
        control.DropdownComponent,
        control.FilterTextboxComponent,
        control.ButtonComponent,
        control.LockButtonComponent,
        control.SaveCancelComponent,
        control.PageHeaderComponent,
        control.RadioGroupComponent,
        control.LoginInformationComponent,
        control.HeaderComponent,
        control.MenuComponent,
        control.SidebarMenuComponent,
        control.HeaderMenuComponent,
        control.CheckboxComponent,
        control.ModalPlaceholderComponent,
        control.DropdownMultiselectComponent,
        control.MonthpickerComponent,
        control.DatepickerComponent,
        control.InputComponent,
        control.InputNewComponent,
        control.CardComponent,
        control.CardHeaderComponent,
        control.CardColumnComponent,
        control.CardSectionComponent,
        control.TitleValueComponent,
        control.LoaderComponent,
        control.ListComponent,
        control.ListItemComponent,
        control.PageComponent,
        control.PageBodyComponent,
        control.PageBlockComponent,
        control.ListColumnHeaderComponent,
        control.ListColumnComponent,
        control.ListColumnCheckboxComponent,
        control.ListColumnTrashcanComponent,
        control.ListHeaderComponent
    ],
    exports: [
        SafePipe,
        TruncatePipe,
        FilterPipe,
        DropdownItemToSelectedTextPipe,
        control.ActionPanelComponent,
        control.DropdownComponent,
        control.FilterTextboxComponent,
        control.ButtonComponent,
        control.LockButtonComponent,
        control.SaveCancelComponent,
        control.PageHeaderComponent,
        control.RadioGroupComponent,
        control.HeaderComponent,
        control.MenuComponent,
        control.SidebarMenuComponent,
        control.LoginInformationComponent,
        control.HeaderMenuComponent,
        PerfectScrollbarModule,
        control.CheckboxComponent,
        control.ModalPlaceholderComponent,
        control.DropdownMultiselectComponent,
        control.MonthpickerComponent,
        control.DatepickerComponent,
        control.InputComponent,
        control.InputNewComponent,
        control.CardComponent,
        control.CardHeaderComponent,
        control.CardColumnComponent,
        control.CardSectionComponent,
        control.TitleValueComponent,
        control.LoaderComponent,
        control.ListComponent,
        control.ListItemComponent,
        control.PageComponent,
        control.PageBodyComponent,
        control.PageBlockComponent,
        control.ListColumnHeaderComponent,
        control.ListColumnComponent,
        control.ListColumnCheckboxComponent,
        control.ListColumnTrashcanComponent,
        control.ListHeaderComponent
    ],

    providers: [ModalService, control.ActionPanelJqeuryHelper, control.ListItemJqeuryHelper, BrowserDetector]

})

export class KomponentkartanModule { }
