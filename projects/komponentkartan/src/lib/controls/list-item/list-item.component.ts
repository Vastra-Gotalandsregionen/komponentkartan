import {
  Component, Input, Output, EventEmitter, ContentChildren, ContentChild, QueryList,
  AfterContentInit, forwardRef, OnDestroy, OnChanges, SimpleChanges, SimpleChange
} from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

import { NotificationType } from '../../models/notificationType.model';
import { RowNotification } from '../../models/rowNotification.model';
import { ListColumnComponent } from '../list/list-column.component';
import { ListItemHeaderComponent } from '../list-item/list-item-header.component';
import { ListItemContentComponent } from '../list-item/list-item-content.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './list-item.component.html',
  selector: 'vgr-list-item',
  animations: [
    trigger('toggleState', [
      state('*', style({
        height: 0,
        display: 'none'
      })),
      state('true', style({
        height: '*',
        display: 'block'
      })),
      state('false', style({
        height: 0,
        display: 'none'
      })),
      transition('* <=> true', [
        animate('{{animationSpeed}}ms ease')
      ])
    ]),
    trigger('toggleFadedState', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('400ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('400ms ease', style({ opacity: 0 })),
      ]),
    ]),
    trigger('deleted', [
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('0.4s ease', style({ opacity: 0, height: 0 })),
      ]),
    ])
  ]
})

export class ListItemComponent implements AfterContentInit, OnDestroy, OnChanges {
  readonly showNotificationDurationMs = 1500;
  ngUnsubscribe = new Subject();
  temporaryNotification: RowNotification;
  permanentNotification: RowNotification;
  notificationColor: string;
  temporaryNotificationVisible = false;
  isDeleted = false;
  notInteractable = false;
  overflow = false;

  @Input() expanded = false;
  @Input() notification: RowNotification;
  @Input() animationSpeed = 400;

  @ContentChild(ListItemHeaderComponent) listItemHeader: ListItemHeaderComponent;
  @ContentChild(ListItemContentComponent) listContent: ListItemContentComponent;

  @Output() expandedChanged: EventEmitter<any> = new EventEmitter();
  @Output() notificationChanged: EventEmitter<RowNotification> = new EventEmitter<RowNotification>();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnFirstRow: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnLastRow: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnPreviousRow: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnNextRow: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnPreviousRowContent: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnNextRowContent: EventEmitter<any> = new EventEmitter();

  @ContentChildren(forwardRef(() => ListColumnComponent), { descendants: true }) columns: QueryList<ListColumnComponent>;

  constructor() {
    this.expandedChanged.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.hideNotifications());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.notification && changes.notification.currentValue) {
      this.handleNotifications(changes.notification);
    }
  }

  ngAfterContentInit() {
    if (this.listItemHeader) {
      this.listItemHeader.expandedChanged.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.toggleExpand());
      this.listItemHeader.goToFirst.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnFirstRow.emit());
      this.listItemHeader.goToLast.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnLastRow.emit());
      this.listItemHeader.goUp.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnPreviousRow.emit());
      this.listItemHeader.goDown.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnNextRow.emit());
    }
    if (this.listContent) {
      this.listContent.goUp.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnPreviousRowContent.emit());
      this.listContent.goDown.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnNextRowContent.emit());
    }
  }

  toggleExpand(forceclose = false) {
    if (!this.notInteractable) {
      this.expanded = forceclose ? false : !this.expanded;
      this.expandedChanged.emit(this.expanded);
      this.notInteractable = true;
      setTimeout(() => { this.notInteractable = false; }, 400);
    }
  }

  setFocusOnRow() {
    this.listItemHeader.setFocus();
  }

  hideNotifications() {
    if (this.temporaryNotificationVisible) {
      setTimeout(() => {
        this.temporaryNotification = null;
      }, this.showNotificationDurationMs);
    }
  }

  closeTemporary(type) {
    if (!this.temporaryNotification) {
      this.temporaryNotificationVisible = false;
      this.handleNotificatonColor();
      if (type === NotificationType.ShowOnCollapse) {
        this.toggleExpand(true);
        this.notification = this.permanentNotification ? this.permanentNotification : null;
        this.notificationChanged.emit(this.notification);
      } else if (type === NotificationType.ShowOnRemove) {
        this.isDeleted = true;
      }
    }
  }

  handleNotificatonColor() {
    const current = this.temporaryNotification ? this.temporaryNotification : this.permanentNotification;
    if (current) {
      // Hantera färg på vänsterkanten
      if (current.icon === 'vgr-icon-exclamation--red' || current.icon === 'vgr-icon-ok-check-green') {
        this.notificationColor = current.icon === 'vgr-icon-exclamation--red' ? 'notification-error' : 'notification-success';
      } else {
        this.notificationColor = null;
      }
    } else {
      this.notificationColor = null;
    }
  }


  handleNotifications(notification: SimpleChange) {
    // Hantera de olika notifieringstyperna
    const current = notification.currentValue;
    if (current.type === NotificationType.Permanent) {
      this.permanentNotification = current;
    } else if (current.type === NotificationType.ShowOnCollapse) {
      this.temporaryNotification = current;
      this.temporaryNotificationVisible = true;
      if (current.removeWhenDone) {
        this.permanentNotification = null;
      }
      setTimeout(() => {
        this.toggleExpand(true);
      }, this.showNotificationDurationMs);
    } else if (current.type === NotificationType.ShowOnRemove) {
      this.temporaryNotification = current;
      this.temporaryNotificationVisible = true;
      setTimeout(() => {
        this.toggleExpand(true);
      }, this.showNotificationDurationMs);
    }
    this.handleNotificatonColor();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
