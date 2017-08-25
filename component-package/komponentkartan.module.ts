import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { BrowserModule, Title } from '@angular/platform-browser'
import { RouterModule, Routes } from '@angular/router'

import { FormsModule } from '@angular/forms';
import { SafePipe } from './pipes/safePipe'
import { TruncatePipe } from './pipes/truncatePipe'
import { FilterPipe } from './pipes/filterPipe'
import { DropdownItemToSelectedTextPipe } from './pipes/dropdownItemToSelectedTextPipe'
import { DropdownComponent } from './controls/dropdown/dropdown.component'
import { DropdownMultiselectComponent } from './controls/dropdown-multiselect/dropdown-multiselect.component'
import { FilterTextboxComponent } from './controls/filterTextbox/filterTextbox.component'
import { ExpandableContainerComponent } from './controls/expandableContainer/expandableContainer.component'
import { ExpandableContainerListComponent } from './controls/expandableContainerList/expandableContainerList.component'
import { TextButtonComponent } from './controls/textButton/textButton.component'
import { LockButtonComponent } from './controls/lockButton/lockButton.component'
import { SaveCancelComponent } from './controls/saveCancel/saveCancel.component'
import { PageHeaderComponent } from './controls/pageHeader/pageHeader.component';
import { RadioGroupComponent } from './controls/radioGroup/radioGroup.component';
import { HeaderComponent } from './controls/header/header.component';
import { LoginInformationComponent } from './controls/loginInformation/loginInformation.component';
import { MenuComponent } from './controls/sidebar-menu/menu.component';
import { SidebarMenuComponent } from './controls/sidebar-menu/sidebarMenu.component';
import { HeaderMenuComponent } from './controls/headerMenu/headerMenu.component';
import { CheckboxComponent } from './controls/checkbox/checkbox.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ModalPlaceholderComponent } from './controls/modal/modal.component';
import { ModalService } from './services/modalService';

import * as $ from 'jquery';

const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule,
        PerfectScrollbarModule.forRoot(PERFECT_SCROLLBAR_CONFIG)
    ],

    declarations: [
        SafePipe,
        TruncatePipe,
        FilterPipe,
        DropdownItemToSelectedTextPipe,
        DropdownComponent,
        FilterTextboxComponent,
        ExpandableContainerComponent,
        ExpandableContainerListComponent,
        TextButtonComponent,
        LockButtonComponent,
        SaveCancelComponent,
        PageHeaderComponent,
        RadioGroupComponent,
        LoginInformationComponent,
        HeaderComponent,
        MenuComponent,
        SidebarMenuComponent,
        HeaderMenuComponent,
        CheckboxComponent,
        ModalPlaceholderComponent,
        DropdownMultiselectComponent
    ],
    exports: [
        SafePipe,
        TruncatePipe,
        FilterPipe,
        DropdownItemToSelectedTextPipe,
        DropdownComponent,
        FilterTextboxComponent,
        ExpandableContainerComponent,
        ExpandableContainerListComponent,
        TextButtonComponent,
        LockButtonComponent,
        SaveCancelComponent,
        PageHeaderComponent,
        RadioGroupComponent,
        HeaderComponent,
        MenuComponent,
        SidebarMenuComponent,
        LoginInformationComponent,
        HeaderMenuComponent,
        PerfectScrollbarModule,
        CheckboxComponent,
        ModalPlaceholderComponent,
        DropdownMultiselectComponent
    ],
    providers: [ModalService]
})



export class KomponentkartanModule { }
