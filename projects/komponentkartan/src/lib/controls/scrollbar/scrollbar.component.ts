import { Component, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'vgr-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrls: ['./scrollbar.component.scss']
})
export class ScrollbarComponent implements OnInit {
  @ViewChild(NgScrollbar) scrollable: NgScrollbar;
  @Input() autoheightDisabled = 'false';

  constructor() { }

  ngOnInit(): void {
  }

}
