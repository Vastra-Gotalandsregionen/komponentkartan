import { Component, ContentChildren, QueryList, Input, AfterContentInit, Output, EventEmitter, HostBinding, OnChanges, SimpleChanges, ElementRef, OnDestroy } from '@angular/core';
import { GridContentComponent } from './grid-content.component';
import { GridService } from './grid.service';
import { toggleExpandedState, remove } from '../../animation';
import { NotificationComponent } from '../notification/notification.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vgr-grid-row',
  templateUrl: './grid-row.component.html',
  animations: [toggleExpandedState, remove]
})
export class GridRowComponent implements OnChanges, AfterContentInit, OnDestroy {

  @HostBinding('@remove') removeAnimation = true;

  @HostBinding('class.grid-row--has-notifications') hasNotifications = false;
  @HostBinding('class.grid-row--expanded') isExpanded = false;
  @Input() expanded = false;
  @Input() preventCollapse = false;
  @Input() animationSpeed = '0.4s';
  @Output() expandedChanged: EventEmitter<any> = new EventEmitter();
  @Output() expandPrevented: EventEmitter<any> = new EventEmitter();
  @Output() collapsePrevented: EventEmitter<any> = new EventEmitter();

  @ContentChildren(GridContentComponent) content: QueryList<GridContentComponent>;
  @ContentChildren(NotificationComponent) notifications: QueryList<NotificationComponent>;

  hasExpandablecontent = true;
  notificationColor = 'default';

  private ngUnsubscribe = new Subject();
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
    this.hasExpandablecontent = this.content.length > 0;
    this.hasNotifications = this.notifications.length > 0;

    if (this.hasNotifications) {
      console.log(this.notifications);
      this.notificationColor = this.notifications.toArray()[0].type;
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
