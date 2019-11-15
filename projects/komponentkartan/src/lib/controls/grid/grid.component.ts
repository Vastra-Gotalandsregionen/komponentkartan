import { Component, OnInit, Input, Output, EventEmitter, AfterContentInit, ContentChild, ContentChildren, QueryList, OnDestroy, HostListener } from '@angular/core';
import { GridHeaderComponent, GridSortChangedArgs } from './grid-header.component';
import { GridRowComponent } from './grid-row.component';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { PageHeaderHeightService } from '../../services/page-header-height.service';
import { GridService } from './grid.service';
import { remove } from '../../animation';
import { GridHeaderToolbarComponent } from './grid-header-toolbar.component';

@Component({
  selector: 'vgr-grid',
  templateUrl: './grid.component.html',
  providers: [GridService],
  animations: [remove]
})
export class GridComponent implements OnInit, AfterContentInit, OnDestroy {

  @Input() allowMultipleExpandedRows = false;
  @Input() stickyHeader = false;
  @Input() toggleAnimation: 'none' | 'slow' | 'medium' | 'fast' = 'medium';
  @Input() pages = 1;
  @Input() activePage = 1;
  @Input() showLoader = false;
  @Input() ariaLabel = 'Lista';

  @Output() pageChanged: EventEmitter<number> = new EventEmitter();
  @Output() sortChanged: EventEmitter<GridSortChangedArgs> = new EventEmitter<GridSortChangedArgs>();

  @ContentChild(GridHeaderToolbarComponent, { static: false }) gridHeaderToolbar: GridHeaderToolbarComponent;
  @ContentChild(GridHeaderComponent, { static: false }) gridHeader: GridHeaderComponent;
  @ContentChildren(GridRowComponent) rows: QueryList<GridRowComponent>;

  headerOffset: string; // dynamic offset depending on the heightof the page header + header height.
  hasToolbar = false;
  public animationSpeed: string;
  private headerHeight = 79; // vgr-header height (same value as $header-height _setting.sizes.scss)
  private ngUnsubscribe = new Subject();

  @HostListener('keydown', ['$event']) keydown(event: any) {
    if (!event.target.className.includes('grid-row-header-focus') || event.key === 'Tab') {
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
    const elem = this.rows.toArray()[index].el.nativeElement.querySelector('.grid-row-header-focus');
    elem.focus();
  }

  constructor(private pageHeaderHeightService: PageHeaderHeightService,
    private gridService: GridService) { }

  ngOnInit() {
    this.headerOffset = `${this.headerHeight + this.pageHeaderHeightService.height}px`;
    this.pageHeaderHeightService.heightChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(value => {
        setTimeout(() => {
          this.headerOffset = `${this.headerHeight + value }px`;
        });
      });
    const animationSpeeds = {
      none: '0ms',
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
    if (this.gridHeaderToolbar) {
      this.hasToolbar = true;
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

    this.rows.changes.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => {
      this.setAnimationSpeed();
    });
    this.setAnimationSpeed();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setAnimationSpeed() {
    this.rows.forEach(row => {
      row.animationSpeed = this.animationSpeed;
    });
  }

  onPageChanged(event: number) {
    setTimeout(() => {
      this.pageChanged.emit(event);
    });
  }
}
