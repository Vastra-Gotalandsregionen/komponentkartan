import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'vgr-notification',
  templateUrl: './notification.component.html'
})
export class NotificationComponent implements OnInit {
  @Input() temporary = false;
  @Output() visibilityChanged: EventEmitter<boolean> = new EventEmitter();

  visible = true;

  ngOnInit() {
    if (this.temporary) {
      this.visible = false;
    }
  }

  hide() {
    setTimeout(() => {
      this.visible = false;
      this.visibilityChanged.emit(this.visible);
    });
  }

  show() {
    this.visible = true;
    setTimeout(() => {
      this.visible = false;
      this.visibilityChanged.emit(this.visible);
    }, 2000);
  }

}
