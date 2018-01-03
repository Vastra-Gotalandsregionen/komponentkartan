import { Component, Input, EventEmitter, Output, AfterViewInit, ContentChild, ViewChild, HostBinding, HostListener, ElementRef } from '@angular/core';

@Component({
    selector: 'vgr-page-block',
    moduleId: module.id,
    templateUrl: './page-block.component.html'
})
export class PageBlockComponent {
    @HostBinding('class.page-block') hasClass = true;

}
