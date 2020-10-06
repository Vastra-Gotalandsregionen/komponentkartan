import { Component, Input, HostBinding, OnInit, ElementRef } from '@angular/core';
import { toggleFadedState } from '../../animation';

@Component({
  selector: 'vgr-notification',
  templateUrl: './notification.component.html',
  animations: [toggleFadedState]
})
export class NotificationComponent implements OnInit {
  @Input() standalone = false;
  /**
   * @deprecated
   */
  @Input() borderColor: string = null;
  @Input() @HostBinding('attr.class') type: string = null;
  @Input() @HostBinding('style.width') width = null;
  @Input() @HostBinding('style.min-height') height = null;
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

