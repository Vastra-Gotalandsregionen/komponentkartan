import { Component, Input, EventEmitter, Output, AfterViewInit, ContentChild, ViewChild, HostBinding, HostListener, ElementRef } from '@angular/core';
import { PageHeaderComponent } from '../pageHeader/pageHeader.component';
import { PageBodyComponent } from '../page-body/page-body.component';
import { ActionPanelComponent } from '../action-panel/action-panel.component';

@Component({
    selector: 'vgr-page',
    moduleId: module.id,
    templateUrl: './page.component.html'
})
export class PageComponent implements AfterViewInit {
    @HostBinding('class.page') hasClass = true;
    @ContentChild(PageHeaderComponent, { read: ElementRef }) pageHeader: ElementRef;
    @ContentChild(PageBodyComponent, { read: ElementRef }) pageBody: ElementRef;
    @ContentChild(ActionPanelComponent, { read: ElementRef }) actionPanel: ElementRef;

    ngAfterViewInit() {
        this.setTopPositionElementBasedOnHeaderHeight(this.pageBody);
        this.setTopPositionElementBasedOnHeaderHeight(this.actionPanel);
    }

    @HostListener('window:resize', ['$event'])
    onWindowResize(event: Event) {
        this.setTopPositionElementBasedOnHeaderHeight(this.pageBody);
        this.setTopPositionElementBasedOnHeaderHeight(this.actionPanel);
    }

    private setTopPositionElementBasedOnHeaderHeight(element: ElementRef) {
        if (element && this.pageHeader) {
            element.nativeElement.style.top = this.pageHeader.nativeElement.offsetHeight + 'px';
        }

    }

}
