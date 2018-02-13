import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-savecancel',
  templateUrl: './savecancel.component.html',
  styleUrls: ['./savecancel.component.scss']
})
export class SavecancelComponent implements OnInit {

  saveCancelMessage: string;

  constructor() { }

  ngOnInit() {
  }

}
