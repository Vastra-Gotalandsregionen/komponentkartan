import { Component, OnInit, Input, Output, EventEmitter, HostBinding, ViewChild, ElementRef, HostListener, Injector } from '@angular/core';
import { GridComponent } from '../grid/grid.component'
import { GridSortDirection } from '../sort-arrow/sort-arrow.component';


@Component({
  selector: 'vgr-grid-header-column',
  templateUrl: './grid-header-column.component.html'
})
export class GridHeaderColumnComponent {
  @Input() @HostBinding('style.flex') width = 1;
  @Input() align = 'left';
  @Input() sortKey: string;
  @Input() sortDirection = GridSortDirection.None;
  @Output() sortChanged: EventEmitter<GridSortDirection> = new EventEmitter<GridSortDirection>();
  @ViewChild('gridHeaderColumn', { read: ElementRef, static: false }) gridHeaderColumn: ElementRef;

  constructor(private injector: Injector) { }

  @HostListener('keydown', ['$event']) keydown(event: any) {
    const parent: GridComponent = this.injector.get<GridComponent>(GridComponent);  
    if (event.key === 'ArrowDown') {
      event.preventDefault();
      parent.setFocusOnRow(0);
    }
  } 

  changeSort() {
    if (this.sortKey) {
      if (this.sortDirection === GridSortDirection.None) {
        this.sortDirection = GridSortDirection.Ascending;
      } else if (this.sortDirection === GridSortDirection.Ascending) {
        this.sortDirection = GridSortDirection.Descending;
      } else if (this.sortDirection === GridSortDirection.Descending) {
        this.sortDirection = GridSortDirection.Ascending;
      }
      this.sortChanged.emit(this.sortDirection);
    }
  }

  public focus() {
    if (this.sortKey) {
      this.gridHeaderColumn.nativeElement.focus();
    }
  }

}
