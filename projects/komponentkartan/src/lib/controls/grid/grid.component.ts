import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, ContentChild, ContentChildren, QueryList, OnDestroy, SimpleChanges, OnChanges, HostListener } from '@angular/core';
import { GridHeaderComponent, GridSortChangedArgs } from './grid-header.component';
import { GridRowComponent } from './grid-row.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PageHeaderHeightService } from '../../services/page-header-height.service';
import { GridService } from './grid.service';
import { remove } from '../../animation';

@Component({
  selector: 'vgr-grid',
  templateUrl: './grid.component.html',
  providers: [GridService],
  animations: [remove]
})
export class GridComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input() stickyHeader = false;
  @Input() allowMultipleExpandedRows = false;
  @Input() pages = 0;
  @Input() activePage = 1;
  @Input() showLoader = false;
  @Input() toggleAnimation: 'none' | 'slow' | 'medium' | 'fast' = 'medium';
  @Input() ariaLabel = 'Lista';

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() sortChanged: EventEmitter<GridSortChangedArgs> = new EventEmitter<GridSortChangedArgs>();

  @ContentChild(GridHeaderComponent) gridHeader: GridHeaderComponent;
  @ContentChildren(GridRowComponent) rows: QueryList<GridRowComponent>;

  headerOffset: string;
  public animationSpeed: string;
  private headerHeight = 79;
  private ngUnsubscribe = new Subject();

  @HostListener('keydown', ['$event']) keydown(event: any) {
    if (!event.target.className.includes('grid-row-header') || event.key === 'Tab') {
      return;
    }
    const row = event.target.closest('vgr-grid-row');
    const parent = row.closest('.grid-rows');
    const index = Array.from(parent.children).indexOf(row);
    if (event.key === 'Enter' || event.key === 'Spacebar' || event.key === ' ') {
      this.rows.toArray()[index].toggleExpanded();
      event.preventDefault();
    }
    if (event.key === 'Home') {
      this.setFocusOnRow(0);
      event.preventDefault();
    }
    if (event.key === 'End') {
      this.setFocusOnRow(this.rows.length - 1);
      event.preventDefault();
    }
    if (event.key === 'ArrowUp' || event.key === 'Up') {
      event.preventDefault();
      if (index > 0) {
        this.setFocusOnRow(index - 1);
      } else {
        this.setFocusOnRow(this.rows.length - 1);
      }
    }
    if (event.key === 'ArrowDown' || event.key === 'Down') {
      event.preventDefault();
      if (index < this.rows.length - 1) {
        this.setFocusOnRow(index + 1);
      } else {
        this.setFocusOnRow(0);
      }
    }
  }

  setFocusOnRow(index) {
    const elem = this.rows.toArray()[index].el.nativeElement.querySelector('.grid-row-header');
    elem.focus();
  }

  constructor(private pageHeaderHeightService: PageHeaderHeightService,
    private gridService: GridService) { }

  ngOnInit() {
    this.headerOffset = `${this.headerHeight}px`;
    this.pageHeaderHeightService.height
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        setTimeout(() => {
          this.headerOffset = `${this.headerHeight + value}px`;
        });
      });
    const animationSpeeds = {
      none: '1ms',
      slow: '.6s ease',
      medium: '.4s ease',
      fast: '.2s ease'
    };
    this.animationSpeed = animationSpeeds[this.toggleAnimation];
  }

  ngAfterContentInit() {
    if (this.gridHeader) {
      this.gridHeader.sortChanged
        .pipe(takeUntil(this.ngUnsubscribe)).subscribe((args: GridSortChangedArgs) => this.sortChanged.emit(args));
    }

    this.gridService.expandRowRequested
      .pipe(takeUntil(this.ngUnsubscribe)).subscribe((rowToExpand: GridRowComponent) => {
        if (this.allowMultipleExpandedRows) {
          rowToExpand.setExpanded(true);
        } else {
          const expandedRows = this.rows.filter(x => x.isExpanded);

          if (expandedRows.length) {
            const preventedRows = expandedRows.filter(x => x.preventCollapse);

            if (preventedRows.length) {
              preventedRows.forEach(x => x.collapsePrevented.emit());
              rowToExpand.expandPrevented.emit();

            } else {
              expandedRows.forEach(x => x.setExpanded(false));
              rowToExpand.setExpanded(true);
            }

          } else {
            rowToExpand.setExpanded(true);
          }
        }
      });
    this.rows.forEach(row => row.animationSpeed = this.animationSpeed);


  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  onPageChanged(event: number) {
    this.pageChanged.emit(event);
  }
}
