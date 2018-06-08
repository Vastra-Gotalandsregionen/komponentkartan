import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'vgr-scroll-to-top',
  templateUrl: './scroll-to-top.component.html',
})
export class ScrollToTopComponent implements OnInit {

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

  ngOnInit() {
  }

  scrollToTop () {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

}
