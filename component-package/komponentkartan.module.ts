// Core
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

// Common
import { ModalService } from './services';
import { SafePipe, TruncatePipe, FilterPipe } from './pipes';
import * as $ from 'jquery';

// UI Components
import { DropdownItemToSelectedTextPipe } from './pipes';
import * as control from './controls';

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
        BrowserAnimationsModule
    ],

    declarations: [
        SafePipe,
        TruncatePipe,
        FilterPipe,
        DropdownItemToSelectedTextPipe,
        control.DropdownComponent,
        control.FilterTextboxComponent,
        control.ExpandableContainerComponent,
        control.ExpandableContainerListComponent,
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
        control.CardComponent,
        control.CardSectionComponent,
        control.TitleValueComponent,
        control.LoaderComponent
    ],
    exports: [
        SafePipe,
        TruncatePipe,
        FilterPipe,
        DropdownItemToSelectedTextPipe,
        control.DropdownComponent,
        control.FilterTextboxComponent,
        control.ExpandableContainerComponent,
        control.ExpandableContainerListComponent,
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
        control.CardComponent,
        control.CardSectionComponent,
        control.TitleValueComponent,
        control.LoaderComponent
            ],
    providers: [ModalService, control.ExpandableContainerJqeuryHelper]
})

export class KomponentkartanModule { }
