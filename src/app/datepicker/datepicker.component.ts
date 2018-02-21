import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent implements OnInit {

  minDate20160515: Date;
  maxDate20161225: Date;
  tomorrow: Date = new Date();
  lastselectedDate: Date;
  selectedDate: Date;
  isReadonlyAndDisabled: boolean;

  constructor() {
    const today = new Date();
    this.minDate20160515 = new Date(2016, 4, 15);
    this.maxDate20161225 = new Date(2016, 11, 25);
    this.tomorrow.setDate(today.getDate() + 1);
    this.selectedDate = new Date(2017, 6, 25);
    this.isReadonlyAndDisabled = true;
  }

  ngOnInit() { }
}
