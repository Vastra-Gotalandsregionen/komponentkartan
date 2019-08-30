import { Component, ContentChildren, QueryList, Input, AfterContentInit, Output, EventEmitter, HostBinding, OnChanges, SimpleChanges, ElementRef } from '@angular/core';
import { GridContentComponent } from './grid-content.component';
import { GridService } from './grid.service';
import { toggleExpandedState } from '../../animation';

@Component({
  selector: 'vgr-grid-row',
  templateUrl: './grid-row.component.html',
  animations: [toggleExpandedState]
})
export class GridRowComponent implements OnChanges, AfterContentInit {

  @Input() @HostBinding('class.grid-row-expanded') expanded = false;
  @Input() preventCollapse = false;
  @Input() animationSpeed = '0.4s';
  @Output() expandedChanged: EventEmitter<any> = new EventEmitter();
  @Output() expandPrevented: EventEmitter<any> = new EventEmitter();
  @Output() collapsePrevented: EventEmitter<any> = new EventEmitter();

  isExpanded = false;
  hasExpandablecontent = false;

  @ContentChildren(GridContentComponent) content: QueryList<GridContentComponent>;

  constructor(private gridService: GridService, public el: ElementRef) { }

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
