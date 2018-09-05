import { Component, OnInit, AfterViewChecked, OnDestroy, ContentChild, ViewChild, ElementRef } from '@angular/core';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vgr-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit, AfterViewChecked, OnDestroy {
  @ContentChild(PageHeaderComponent) pageHeader: PageHeaderComponent;
  @ViewChild('bodyContainer') bodyContainer: ElementRef;
  pageHeaderHeight = 0;
  private ngUnsubscribe = new Subject();

  ngOnInit() {
    if (this.pageHeader) {
      this.pageHeader.heightChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(
        value => this.bodyContainer.nativeElement.style.top = `${value}px`
      );
    }
  }

  ngAfterViewChecked() {
    if (this.pageHeader && this.pageHeaderHeight !== this.pageHeader.height) {
      this.bodyContainer.nativeElement.style.top = `${this.pageHeader.height}px`;
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
