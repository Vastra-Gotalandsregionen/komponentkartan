import { Component, OnInit, Input, HostBinding } from '@angular/core';

@Component({
  selector: 'vgr-grid-column',
  templateUrl: './grid-column.component.html'
})
export class GridColumnComponent implements OnInit {

  @Input() @HostBinding('style.flex') width = 1;
  @Input() align = 'left';

  constructor() { }

  ngOnInit() {
  }

}
