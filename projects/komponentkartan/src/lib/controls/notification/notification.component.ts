import { Component, Input, HostBinding, OnInit, ElementRef } from '@angular/core';
import { toggleFadedState } from '../../animation';

@Component({
  selector: 'vgr-notification',
  templateUrl: './notification.component.html',
  animations: [toggleFadedState]
})
export class NotificationComponent implements OnInit {
  /**
   * Option to use Notification as standalone.
   * If true, no margin will be set or any border on parent-element.
   * This is for use outside of <vgr-grid />
   */
  @Input() standalone = false;
  /**
   * This is deprecated and you're encouraged to use "type" instead.
   *
   * @deprecated
   */
  @Input() borderColor: 'success' | 'error' | 'warning' | 'info' = null;
  /**
   * Set icon and background-color of notification
   */
  @Input() @HostBinding('attr.class') type: 'success' | 'error' | 'warning' | 'info'  = null;
  /**
   * Set width of notification
   */
  @Input() @HostBinding('style.width') width = null;
  /**
   * Set min-height of notification.
   */
  @Input() @HostBinding('style.min-height') height = null;
  /**
   * Remove icon that's otherwise automatically added
   */
  @Input() @HostBinding('class.no-icon') noIcon = false;

  @HostBinding('class.list-notification') listNotification = false;
  @HostBinding('class.standalone-notification') standaloneNotification = false;
  @HostBinding('@toggleFadedState') animate = true;

  constructor(public el: ElementRef) {}

  ngOnInit() {
    // Is <vgr-grid /> direct parent; Add class "list-notification"
    if (this.el.nativeElement?.parentElement?.localName === 'vgr-grid') {
      this.listNotification = true;
    }

    // Not list-notification & standalone passed to component; Add class "standalone-notification"
    if (!this.listNotification && this.standalone) {
      this.standaloneNotification = true;
    }

    // TODO: Remove this later on...
    if (this.borderColor) {
      console.warn('"borderColor" is deprecated, please use "type" instead');
      if (this.type === null) {
        this.type = this.borderColor;
      }
    }
  }
}

