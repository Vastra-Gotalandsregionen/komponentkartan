import { Component, Input, ViewChild, AfterViewChecked, ElementRef, HostListener } from '@angular/core';
import { PageHeaderHeightService } from '../../services/page-header-height.service';

@Component({
    selector: 'vgr-page-header',
    templateUrl: './page-header.component.html',
    styleUrls: ['./page-header.component.scss'],
    standalone: false
})
export class PageHeaderComponent implements AfterViewChecked {
  @Input() title: string;
  @ViewChild('pageHeader', { static: true }) pageHeader: ElementRef;
  height = 0;
  private previousHeight = 0;

  visibleState = false;

  constructor(private pageHeaderHeightService: PageHeaderHeightService) {}

  ngAfterViewChecked() {
    this.setHeight();

  }

  setHeight() {
    this.height = this.pageHeader.nativeElement.offsetTop
      ? this.pageHeader.nativeElement.offsetHeight
      : 0;

    if (this.height !== this.previousHeight) {
      this.previousHeight = this.height;
      this.pageHeaderHeightService.setHeight(this.height);
    }
  }
}
