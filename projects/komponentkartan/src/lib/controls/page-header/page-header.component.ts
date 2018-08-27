import { Component, Input, ViewChild, AfterViewChecked, ElementRef } from '@angular/core';

@Component({
  selector: 'vgr-page-header',
  templateUrl: './page-header.component.html'
})
export class PageHeaderComponent implements AfterViewChecked {
  @Input() title: string;
  @ViewChild('pageHeader') pageHeader: ElementRef;
  height: number;

  ngAfterViewChecked() {
    this.height = this.pageHeader.nativeElement.offsetHeight;
  }
}
