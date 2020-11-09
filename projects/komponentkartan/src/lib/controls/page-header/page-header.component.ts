import { Component, Input, ViewChild, AfterViewChecked, ElementRef, HostListener } from '@angular/core';
import { PageHeaderHeightService } from '../../services/page-header-height.service';

@Component({
  selector: 'vgr-page-header',
  templateUrl: './page-header.component.html',
  styleUrls: ['./page-header.component.scss']
})
export class PageHeaderComponent implements AfterViewChecked {
  @Input() title: string;
  @ViewChild('pageHeader', { static: true }) pageHeader: ElementRef;
  height = 0;
  private previousHeight = 0;

  visibleState = false;

  // @HostListener('window:scroll', []) onWindowScroll() {
  //   if (window.scrollY) {
  //     this.visibleState = true;
  //   } else {
  //     this.visibleState = false;
  //   }
  // }

  constructor(private pageHeaderHeightService: PageHeaderHeightService) {}

  ngAfterViewChecked() {
    this.setHeight();
    this.setMargin();
    
  }

  setMargin() {
    let state;
    if (document.body.scrollHeight > document.body.clientHeight) {
      state = true;
    } else {
      state = false;
    }

    setTimeout(() => {
      this.visibleState = state;
    }, 0);
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
