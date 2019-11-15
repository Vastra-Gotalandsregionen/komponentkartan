import { Component, Input, Output, EventEmitter, ContentChildren, ContentChild, QueryList, AfterContentInit, forwardRef, OnDestroy, OnChanges, SimpleChanges, ElementRef, Renderer2 } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

import { NotificationType } from '../../models/notificationType.model';
import { RowNotification } from '../../models/rowNotification.model';
import { ListColumnComponent } from '../list/list-column.component';
import { ListItemHeaderComponent } from '../list-item/list-item-header.component';
import { ListItemContentComponent } from '../list-item/list-item-content.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ListService } from '../list/list.service';

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
        style({ opacity: 1, height: '*' }),
        animate('400ms ease', style({ opacity: 0, height: 0 })),
      ]),
    ]),
    trigger('toggleFadedState0ms', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0ms ease', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1, height: '*' }),
        animate('0ms ease', style({ opacity: 0, height: 0 })),
      ]),
    ]),
    trigger('deleted', [
      transition(':leave', [
        style({ opacity: 1, height: '*', overflow: 'hidden' }),
        animate('0.4s ease', style({ opacity: 0, height: 0, overflow: 'hidden' })),
      ]),
    ])
  ]
})

export class ListItemComponent implements AfterContentInit, OnDestroy, OnChanges {
  readonly showNotificationDurationMs = 1500;
  isExpanded = false;
  ngUnsubscribe = new Subject();
  temporaryNotification: RowNotification;
  permanentNotification: RowNotification;
  notificationColor: string;
  temporaryNotificationVisible = false;
  isDeleted = false;
  notInteractable = false;
  overflow = false;

  @Input() expanded = false;
  @Input() preventCollapse = false;
  @Input() notification: RowNotification;
  @Input() animationSpeed = 400;

  @ContentChild(ListItemHeaderComponent, /* TODO: add static flag */ {}) listItemHeader: ListItemHeaderComponent;
  @ContentChild(ListItemContentComponent, /* TODO: add static flag */ {}) listContent: ListItemContentComponent;

  @Output() expandedChanged: EventEmitter<any> = new EventEmitter();
  @Output() expandPrevented: EventEmitter<any> = new EventEmitter();
  @Output() collapsePrevented: EventEmitter<any> = new EventEmitter();
  @Output() notificationChanged: EventEmitter<RowNotification> = new EventEmitter<RowNotification>();
  @Output() deleted: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnFirstRow: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnLastRow: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnPreviousRow: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnNextRow: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnPreviousRowContent: EventEmitter<any> = new EventEmitter();
  @Output() setFocusOnNextRowContent: EventEmitter<any> = new EventEmitter();

  @ContentChildren(forwardRef(() => ListColumnComponent), { descendants: true }) columns: QueryList<ListColumnComponent>;

  constructor(private listService: ListService, private elementRef: ElementRef, private renderer: Renderer2) {
    this.expandedChanged.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.hideNotifications());
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.expanded && changes.expanded.currentValue !== this.isExpanded) {
      if (changes.expanded.isFirstChange()) {
        this.isExpanded = changes.expanded.currentValue;
      } else {
        this.toggleExpanded();
      }
    }

    if (changes.notification && changes.notification.currentValue) {
      const notificationType = changes.notification.currentValue.NotificationType;
      if (!this.preventCollapse || notificationType === NotificationType.Permanent) {
        this.handleNotifications(changes.notification.currentValue);
      }
    }
  }

  ngAfterContentInit() {
    if (this.listContent) {
      this.listContent.goUp.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnPreviousRowContent.emit());
      this.listContent.goDown.pipe(takeUntil(this.ngUnsubscribe)).subscribe(() => this.setFocusOnNextRowContent.emit());
    }
  }

  toggleExpanded() {
    if (this.isExpanded) {
      if (this.preventCollapse) {
        this.collapsePrevented.emit();
      } else if (!this.notInteractable) {
        this.setExpanded(false);
      }

    } else {
      this.listService.requestExpandListItem(this);
    }
  }
  keydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Spacebar' || event.key === ' ') {
      this.toggleExpanded();
      event.preventDefault();
    }
    if (event.key === 'Home') {
      this.setFocusOnFirstRow.emit();
      event.preventDefault();
    }
    if (event.key === 'End') {
      this.setFocusOnLastRow.emit();
      event.preventDefault();
    }
    if ((event.ctrlKey && event.key === 'PageUp') || event.key === 'ArrowUp' || event.key === 'Up') {
      this.setFocusOnPreviousRow.emit();
      event.preventDefault();
    }
    if ((event.ctrlKey && event.key === 'PageDown') || event.key === 'ArrowDown' || event.key === 'Down') {
      this.setFocusOnNextRow.emit();
      event.preventDefault();
    }
  }

  setExpanded(expanded: boolean) {
    if (!this.notInteractable) {
      this.isExpanded = expanded;
      this.expandedChanged.emit(this.isExpanded);

      this.notInteractable = true;
      setTimeout(() => { this.notInteractable = false; }, 400);
    }
  }

  setFocusOnRow() {
      const item = this.elementRef.nativeElement.querySelector('.list-item__header_wrapper');
      item.focus();
  }

  hideNotifications() {
    if (this.temporaryNotificationVisible) {
      this.setFocusOnRow();
      if (this.notification && this.notification.type === NotificationType.ShowOnRemove) {
        setTimeout(() => {
          this.isDeleted = true;
        }, this.showNotificationDurationMs);
      } else {
        setTimeout(() => {
          this.temporaryNotification = null;
        }, this.showNotificationDurationMs);
      }
    }
  }

  closeTemporary(notification: RowNotification) {
    const type = notification ? notification.type : null;
    if (!this.temporaryNotification) {
      this.temporaryNotificationVisible = false;
      this.handleNotificationColor();
      if (type && type === NotificationType.ShowOnCollapse) {
        this.notification = this.permanentNotification ? this.permanentNotification : null;
        this.notificationChanged.emit(this.notification);
      }
    }
  }

  /** Hantering av färg på vänsterkanten. Sätts till success/error om valt, annars fallback */
  handleNotificationColor() {
    const current = this.temporaryNotification ? this.temporaryNotification : this.permanentNotification;
    if (current && ('icon' in current)) {
      if (current.icon.color === 'success') {
        this.notificationColor = 'notification-success';
      } else if (current.icon.color === 'error') {
        this.notificationColor = 'notification-error';
      } else { this.notificationColor = null; }
    } else {
      this.notificationColor = null;
    }
  }


  triggerDeletedEvent() {
    if (this.isDeleted) {
      this.deleted.emit();
    }
  }

  handleNotifications(currentNotification: RowNotification) {
    if (currentNotification.type === NotificationType.Permanent) {
      this.permanentNotification = currentNotification;
    } else {
      this.temporaryNotification = currentNotification;
      this.temporaryNotificationVisible = true;
      if (currentNotification.removeWhenDone) {
        this.permanentNotification = null;
      }
      setTimeout(() => {
        this.setExpanded(false);
      }, this.showNotificationDurationMs);
    }
    this.handleNotificationColor();
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}