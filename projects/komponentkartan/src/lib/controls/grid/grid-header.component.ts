import { Component, ContentChildren, Output, EventEmitter, QueryList, AfterContentInit, OnDestroy, Input, HostBinding, HostListener, ElementRef } from '@angular/core';
import { GridHeaderColumnComponent } from './grid-header-column.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { GridSortDirection } from '../sort-arrow/sort-arrow.component';


export interface GridSortChangedArgs {
  key: string;
  direction: GridSortDirection;
}
@Component({
  selector: 'vgr-grid-header',
  templateUrl: './grid-header.component.html'
})
export class GridHeaderComponent implements AfterContentInit, OnDestroy {
  @ContentChildren(GridHeaderColumnComponent) gridHeaderColumns: QueryList<GridHeaderColumnComponent>;
  @Output() sortChanged: EventEmitter<GridSortChangedArgs> = new EventEmitter<GridSortChangedArgs>();
  @Output() focusChanged: EventEmitter<number> = new EventEmitter<number>();
  private ngUnsubscribe = new Subject();

  @HostListener('keydown', ['$event']) onKeydownHandler(event: any) {
    if (event.key === 'Tab' || event.shiftKey) {
      event.preventDefault();
      this.focusChanged.emit(0);
      return;
    }

    let currentColumn = event.target.closest('vgr-grid-header-column');
    let parent = event.target.closest('vgr-grid-header');
    let index = (Array.from(parent.children).indexOf(currentColumn));

    switch (event.key) {
      case 'ArrowRight':
      case 'Right':
        if (index === -1) {
          // sätt till första sorterbara kolumn
            index = 0;
            if (this.gridHeaderColumns.get(index).sortKey === undefined) {
            index = this.nextSortableColumn(0); 
            }
          } else if (index === this.gridHeaderColumns.length-1) {
            // sätt till första sorterbara kolumnen
            index = 0
            if (this.gridHeaderColumns.get(index).sortKey === undefined) {
              index = this.nextSortableColumn(0); 
             }
          } else if (index => 0) {
            // sätt till nästa sorterbara kolumn (om finnes, annars första igen)
            index = index+1;
            if (this.gridHeaderColumns.get( index).sortKey === undefined) {
              index = this.nextSortableColumn(index); 
             }
        }
        event.preventDefault();
        this.gridHeaderColumns.get(index).focus();
        break;
      case 'ArrowLeft':
      case 'Left':
        if (index === -1) {
          // sätt till första sorterbara kolumn
          index = 0;
          if (this.gridHeaderColumns.get(index).sortKey === undefined) {
          index = this.previousSortableColumn(0); 
          }
        } else if ( index > 0 || index === this.gridHeaderColumns.length) {
          index = index-1;
          if (this.gridHeaderColumns.get( index).sortKey === undefined) {
            index = this.previousSortableColumn(index); 
           }
        } else if (index === 0) {
          index = this.gridHeaderColumns.length - 1
      }
      event.preventDefault();
      this.gridHeaderColumns.get(index).focus();
        break;
      case 'Home':
        event.preventDefault();
        this.gridHeaderColumns.get(0).focus();
        break;
      case 'End':
        event.preventDefault();
        this.gridHeaderColumns.get(this.gridHeaderColumns.length - 1).focus();
        break;
    }
  }

  previousSortableColumn(startIndex: number): number {
    if (startIndex === -1) {
      return;
    }
    for (let index = startIndex; index < this.gridHeaderColumns.length; index--) {
      if (index === -1) {
        // gå till sista
        index = this.gridHeaderColumns.length-1;
      }
      if (this.gridHeaderColumns.get(index).sortKey !== undefined) {
      return index;
      }
    }
    return startIndex;

  }
  nextSortableColumn(startIndex: number): number {
    if (startIndex === -1) {
      return;
    }
    for (let index = startIndex; index < this.gridHeaderColumns.length; index++) {
      if (this.gridHeaderColumns.get(index).sortKey !== undefined) {
      return index;
      }
    }
    return startIndex;
  }

  constructor(public el: ElementRef) { }


  ngAfterContentInit() {
    this.gridHeaderColumns.forEach(column => column.sortChanged.pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (direction: GridSortDirection) => this.onColumnSortChanged(column, direction)));
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onColumnSortChanged(column: GridHeaderColumnComponent, direction: GridSortDirection) {
    this.gridHeaderColumns.filter(otherCol => otherCol !== column).forEach(otherCol => otherCol.sortDirection = GridSortDirection.None);
    this.sortChanged.emit({ key: column.sortKey, direction: direction } as GridSortChangedArgs);
  }

}


