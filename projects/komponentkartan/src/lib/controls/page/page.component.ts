import { Component, AfterViewInit, OnDestroy, ContentChild } from '@angular/core';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vgr-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements AfterViewInit, OnDestroy {
  @ContentChild(PageHeaderComponent) pageHeader: PageHeaderComponent;
  pageHeaderHeight = 0;
  private ngUnsubscribe = new Subject();

  ngAfterViewInit() {
    if (this.pageHeader) {
      this.pageHeader.heightChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        value =>  this.pageHeaderHeight = value
      );
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
