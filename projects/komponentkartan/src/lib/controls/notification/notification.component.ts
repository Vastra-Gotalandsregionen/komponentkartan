import { Component, Input } from '@angular/core';

@Component({
  selector: 'vgr-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent {
  @Input() type = 'default';

}
