import { Component, OnInit, ContentChildren, QueryList, Input, AfterContentInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { GridContentComponent } from './grid-content.component';

@Component({
  selector: 'vgr-grid-row',
  templateUrl: './grid-row.component.html'
})
export class GridRowComponent implements OnInit, AfterContentInit {

  @Input() @HostBinding('class.grid-row-expanded') expanded = false;
  @Output() expandedChanged: EventEmitter<any> = new EventEmitter();

  hasExpandablecontent = false;

  @ContentChildren(GridContentComponent) content: QueryList<GridContentComponent>;

  constructor() { }

  ngOnInit() {
  }

  toggleExpanded() {
    if (this.hasExpandablecontent) {
      this.expandedChanged.emit(this.expanded);
    }
  }

  ngAfterContentInit() {
    this.hasExpandablecontent = this.content.length !== 0;
  }

}
