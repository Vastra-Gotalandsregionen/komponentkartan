import { Component, Input, HostBinding, OnInit } from '@angular/core';
import { toggleFadedState } from '../../animation';

@Component({
  selector: 'vgr-notification',
  templateUrl: './notification.component.html',
  animations: [toggleFadedState]
})
export class NotificationComponent implements OnInit {
  @HostBinding('@toggleFadedState') animate = true;
  @Input() @HostBinding('attr.class') type = 'default';
  @Input() autoAddTypeIcons = false;
  ngOnInit() {
    if (!this.autoAddTypeIcons) {
      this.type = 'none';
    }
  }

}
