import { Component, OnInit, ContentChildren, QueryList, Input, AfterContentInit, Output, EventEmitter, HostBinding, OnChanges, SimpleChanges } from '@angular/core';
import { GridContentComponent } from './grid-content.component';
import { GridService } from '../../grid/grid.service';

@Component({
  selector: 'vgr-grid-row',
  templateUrl: './grid-row.component.html'
})
export class GridRowComponent implements OnChanges, AfterContentInit {

  @Input() @HostBinding('class.grid-row-expanded') expanded = false;
  @Input() preventCollapse = false;
  @Output() expandedChanged: EventEmitter<any> = new EventEmitter();
  @Output() expandPrevented: EventEmitter<any> = new EventEmitter();
  @Output() collapsePrevented: EventEmitter<any> = new EventEmitter();

  isExpanded = false;
  hasExpandablecontent = false;

  @ContentChildren(GridContentComponent) content: QueryList<GridContentComponent>;

  constructor(private gridService: GridService) { }

  ngOnChanges(changes: SimpleChanges) {
    const expandedChange = changes['expanded'];
    if (expandedChange && expandedChange.currentValue !== this.isExpanded) {
      if (expandedChange.isFirstChange()) {
        this.isExpanded = expandedChange.currentValue;
      } else {
        this.toggleExpanded();
      }
    }
  }

  toggleExpanded() {
    if (this.hasExpandablecontent) {
      if (this.isExpanded) {
        if (this.preventCollapse) {
          this.collapsePrevented.emit();
        } else {
          this.setExpanded(false);
        }
      } else {
        this.gridService.requestExpandRow(this);
      }
    }
  }

  setExpanded(expanded: boolean) {
    this.isExpanded = expanded;
    this.expandedChanged.emit(this.isExpanded);
  }

  ngAfterContentInit() {
    this.hasExpandablecontent = this.content.length !== 0;
  }

}
