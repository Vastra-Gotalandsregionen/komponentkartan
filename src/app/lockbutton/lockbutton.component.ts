import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lockbutton',
  templateUrl: './lockbutton.component.html',
  styleUrls: ['./lockbutton.component.scss']
})
export class LockbuttonComponent implements OnInit {
  lockMessage: string;
  constructor() { }

  ngOnInit() {
  }

}
