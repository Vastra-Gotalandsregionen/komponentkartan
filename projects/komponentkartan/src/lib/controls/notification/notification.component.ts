import { Component, Input, HostBinding, OnInit, ElementRef } from '@angular/core';
import { toggleFadedState } from '../../animation';

@Component({
  selector: 'vgr-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [toggleFadedState]
})
export class NotificationComponent implements OnInit {
  @HostBinding('@toggleFadedState') animate = true;
  @Input() @HostBinding('attr.class') borderColor: string = null;
  @Input() type: string = null;
  @HostBinding('class.list-notification') listNotification = false;

  constructor(public el: ElementRef) {
  }

  ngOnInit() {
    if (this.el.nativeElement.parentElement && this.el.nativeElement.parentElement.localName === 'vgr-grid') {
      this.listNotification = true;
    }
    if (this.type) {
      this.borderColor = this.type;
    }
  }
}
