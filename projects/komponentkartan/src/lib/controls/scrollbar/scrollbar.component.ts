import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vgr-scrollbar',
  templateUrl: './scrollbar.component.html',
  styleUrls: ['./scrollbar.component.scss']
})
export class ScrollbarComponent implements OnInit {
  // @Input() height = '100%';
@Input() autoheightDisabled = 'false';
  constructor() { }

  ngOnInit(): void {
  }

}
