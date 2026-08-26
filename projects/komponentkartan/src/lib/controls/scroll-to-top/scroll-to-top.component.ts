import { Component, OnInit, HostListener, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-scroll-to-top',
    templateUrl: './scroll-to-top.component.html',
    styleUrls: ['./scroll-to-top.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ScrollToTopComponent {

  visibleState = false;

  @HostListener('window:scroll', []) onWindowScroll() {
    if (window.scrollY && window.scrollY > 0) {
      this.visibleState = true;
    } else if (document.documentElement.scrollTop > 0) {
      this.visibleState = true;
    } else {
      this.visibleState = false;
    }
  }

  constructor() { }

  scrollToTop () {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

}
