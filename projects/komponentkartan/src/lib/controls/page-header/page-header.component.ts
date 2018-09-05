import { Component, Input, ViewChild, AfterViewChecked, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vgr-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent implements AfterViewChecked {
  @Input() title: string;
  @ViewChild('pageHeader') pageHeader: ElementRef;
  @Output() heightChanged = new EventEmitter<number>();
  private previousHeight = 0;

  ngAfterViewChecked() {
    this.setHeight();
  }

  setHeight() {
    const height = this.pageHeader.nativeElement.offsetTop
      ? this.pageHeader.nativeElement.offsetHeight
      : 0;

    if (height !== this.previousHeight) {
      this.previousHeight = height;
      this.heightChanged.emit(height);
    }
  }
}
