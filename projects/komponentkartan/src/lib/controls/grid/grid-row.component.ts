import { Component, ContentChildren, QueryList, Input, AfterContentInit, Output, EventEmitter, OnChanges, SimpleChanges, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GridContentComponent } from './grid-content.component';
import { GridService } from './grid.service';
import { toggleExpandedState } from '../../animation';
import { NotificationComponent } from '../notification/notification.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vgr-grid-row',
  templateUrl: './grid-row.component.html',
  animations: [toggleExpandedState]
})
export class GridRowComponent implements OnChanges, AfterContentInit, OnDestroy {

  @Input() expanded = false;
  @Input() preventCollapse = false;
  @Output() expandedChanged: EventEmitter<any> = new EventEmitter();
  @Output() expandPrevented: EventEmitter<any> = new EventEmitter();
  @Output() collapsePrevented: EventEmitter<any> = new EventEmitter();
  @ViewChild('gridRowHeader', { read: ElementRef, static: false }) gridRowHeader: ElementRef;

  @ContentChildren(GridContentComponent) content: QueryList<GridContentComponent>;
  @ContentChildren(NotificationComponent) notifications: QueryList<NotificationComponent>;
  zebraLayout = false;

  animationSpeed = '400ms ease';
  hasExpandablecontent = true;
  hasNotifications = false;
  isExpanded = false;
  notificationColor = 'default';
  overflow: boolean;

  private ngUnsubscribe: any = new Subject();
  constructor(private gridService: GridService, public el: ElementRef) { }

  get expandedState() {
    return {
      value: this.isExpanded,
      params: {
        speed: this.animationSpeed
      }
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    const expandedChange = changes['expanded'];
    if (expandedChange && expandedChange.currentValue !== this.isExpanded) {
      if (expandedChange.firstChange) {
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
          this.gridService.requestCollapseRow(this);
        }
      } else {
         this.gridService.requestExpandRow(this);
      }
    }
  }


  toggleState(state: 'start' | 'done', expanded: boolean) {
    setTimeout(() => {
      if (state === 'done' && expanded === true) {
        this.overflow = false;
      } else {
        this.overflow = true;
      }
    });
  }

  //Anropas från Grid
  setExpanded(expanded: boolean) {
    this.isExpanded = expanded;
    // this.expanded = expanded;
    this.expandedChanged.emit(this.isExpanded);

  }

  ngAfterContentInit() {
    this.hasExpandablecontent = this.content.length > 0;
    this.hasNotifications = this.notifications.length > 0;

    this.notifications.changes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(_ => {
        this.hasNotifications = _.length > 0;
      });

    if (this.hasNotifications) {
      this.notificationColor = this.notifications.toArray()[0].type;
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public focus() {
    this.gridRowHeader.nativeElement.focus();
  }
}
