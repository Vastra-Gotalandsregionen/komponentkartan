import { Component, AfterContentInit, AfterViewInit, AfterViewChecked, ContentChild, HostListener, ElementRef } from '@angular/core';
import { PageHeaderComponent } from '../pageHeader/pageHeader.component';

@Component({
  selector: 'vgr-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements AfterViewChecked {
  @ContentChild(PageHeaderComponent) pageHeader: PageHeaderComponent;
  pageHeaderHeight = 0;

  ngAfterViewChecked() {
    if (this.pageHeader && this.pageHeaderHeight !== this.pageHeader.height) {
      setTimeout(() => this.pageHeaderHeight = this.pageHeader.height);
    }
  }

}
