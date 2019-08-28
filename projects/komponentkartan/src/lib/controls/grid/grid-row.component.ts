import { Component, OnInit, ContentChildren, QueryList, Input, AfterContentInit } from '@angular/core';
import { GridContentComponent } from './grid-content.component';

@Component({
  selector: 'vgr-grid-row',
  templateUrl: './grid-row.component.html'
})
export class GridRowComponent implements OnInit, AfterContentInit {

  @Input() expanded = false;

  hasExpandablecontent = false;

  @ContentChildren(GridContentComponent) content: QueryList<GridContentComponent>;

  constructor() { }

  ngOnInit() {
  }

  toggleExpanded() {
    if (this.hasExpandablecontent) {
      this.expanded = !this.expanded;
    }
  }

  ngAfterContentInit() {
    this.hasExpandablecontent = this.content.length !== 0;
  }

}
