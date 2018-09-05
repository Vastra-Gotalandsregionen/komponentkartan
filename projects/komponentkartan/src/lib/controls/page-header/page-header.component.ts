import { Component, Input, ViewChild, AfterViewChecked, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vgr-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent implements AfterViewChecked {
  @Input() title: string;
  @ViewChild('pageHeader') pageHeader: ElementRef;
  @Output() heightChanged = new EventEmitter<number>();
  height = 0;
  private previousHeight = 0;

  ngAfterViewChecked() {
    this.setHeight(false);
  }

  setHeight(emit = true) {
    this.height = this.pageHeader.nativeElement.offsetTop
      ? this.pageHeader.nativeElement.offsetHeight
      : 0;

    if (this.height !== this.previousHeight) {
      this.previousHeight = this.height;
      if (emit) {
        this.heightChanged.emit(this.height);
      }
    }
  }
}
