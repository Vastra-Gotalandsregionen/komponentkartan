import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'vgr-notification-documentation',
  templateUrl: './notification-documentation.component.html',
  styleUrls: ['./notification-documentation.component.css']
})
export class NotificationDocumentationComponent implements OnInit {

  showAlert = false;
  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.showAlert = true;
    }, 3000);
  }
}
