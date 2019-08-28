import { Component, OnInit, AfterViewChecked, OnDestroy, ContentChild, ViewChild, ElementRef } from '@angular/core';
import { PageHeaderComponent } from '../page-header/page-header.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageHeaderHeightService } from '../../services/page-header-height.service';

@Component({
  selector: 'vgr-page',
  templateUrl: './page.component.html'
})
export class PageComponent implements OnInit, OnDestroy {
  @ViewChild('bodyContainer') bodyContainer: ElementRef;
  private ngUnsubscribe = new Subject();

  constructor(private pageHeaderHeightService: PageHeaderHeightService) { }

  ngOnInit() {
    this.pageHeaderHeightService.height
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        this.bodyContainer.nativeElement.style.top = `${value}px`;
      });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
