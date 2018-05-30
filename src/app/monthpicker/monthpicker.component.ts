import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-monthpicker',
  templateUrl: './monthpicker.component.html',
  styleUrls: ['./monthpicker.component.scss']
})
export class MonthpickerComponent implements OnInit {
  lastSelectedDate: Date;
  preselectedDate: Date;
  maxDate: Date = new Date(2018, 7, 1);
  firstOfMay2015: Date = new Date();
  lastOfMarch2016: Date = new Date();
  minDate20160515: Date;
  maxDate20170326: Date;
  isReadonlyAndDisabled: boolean;

  constructor() {
    this.minDate20160515 = new Date(2016, 4, 15);
    this.maxDate20170326 = new Date(2017, 2, 25);
    this.isReadonlyAndDisabled = true;
  }

  ngOnInit() {
    setTimeout(() => {
      this.firstOfMay2015 = new Date(2015, 4, 1);
      this.lastOfMarch2016 = new Date(2016, 2, 31);
    }, 5000);
  }

}
