import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vgr-grid',
  templateUrl: './grid.component.html'
})
export class GridComponent implements OnInit {

  @Input() stickyHeader = false;
  @Input() allowMultipleExpandedRows = false;
  @Input() pages = 0;
  @Input() activePage = 1;
  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

}
