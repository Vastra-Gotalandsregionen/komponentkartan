import { Component, Input, HostBinding } from '@angular/core';
import { toggleFadedState } from '../../animation';

@Component({
  selector: 'vgr-notification',
  templateUrl: './notification.component.html',
  animations: [toggleFadedState]
})
export class NotificationComponent {
  @Input() @HostBinding('@toggleFadedState') animate = true;
  @Input() @HostBinding('attr.class') type = 'default';

}
