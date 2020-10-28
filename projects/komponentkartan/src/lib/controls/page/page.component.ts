import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PageHeaderHeightService } from '../../services/page-header-height.service';

@Component({
  selector: 'vgr-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss'],
  providers: [PageHeaderHeightService]
})
export class PageComponent implements OnInit, OnDestroy {
  @ViewChild('bodyContainer', { static: true }) bodyContainer: ElementRef;
  private ngUnsubscribe = new Subject();

  constructor(private pageHeaderHeightService: PageHeaderHeightService) { }

  ngOnInit() {
    this.bodyContainer.nativeElement.style.top = `${this.pageHeaderHeightService.height}px`;
    this.pageHeaderHeightService.heightChanged
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
