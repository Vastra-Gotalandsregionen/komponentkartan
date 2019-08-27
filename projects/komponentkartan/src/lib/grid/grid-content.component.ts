import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vgr-grid-content',
  template: '<ng-content></ng-content>',
  styleUrls: ['./grid-content.component.css']
})
export class GridContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
