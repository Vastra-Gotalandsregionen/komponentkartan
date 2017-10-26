import { Component, Input, EventEmitter, Output, AfterViewInit, ContentChild, ViewChild, HostBinding, HostListener, ElementRef } from '@angular/core';
import { PageHeaderComponent } from '../pageHeader/pageHeader.component';

@Component({
    selector: 'vgr-page-body',
    moduleId: module.id,
    templateUrl: './page-body.component.html'
})
export class PageBodyComponent {
    @HostBinding('class.page__body') hasClass = true;

}
