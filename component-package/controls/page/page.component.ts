import { Component, Input, EventEmitter, Output, AfterViewInit, ContentChild, ViewChild, HostBinding, HostListener, ElementRef } from '@angular/core';
import { PageHeaderComponent } from '../pageHeader/pageHeader.component';

@Component({
    selector: 'vgr-page',
    moduleId: module.id,
    templateUrl: './page.component.html'
})
export class PageComponent implements AfterViewInit {
    @HostBinding('class.page') hasClass = true;
    @ContentChild(PageHeaderComponent, { read: ElementRef }) pageHeader: ElementRef;
    @ViewChild('pagebody') pageBody: ElementRef;

    ngAfterViewInit() {
        this.pageBody.nativeElement.style.top = this.pageHeader.nativeElement.offsetHeight + 'px';
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event: Event) {
        this.pageBody.nativeElement.style.top = this.pageHeader.nativeElement.offsetHeight + 'px';
    }

}
