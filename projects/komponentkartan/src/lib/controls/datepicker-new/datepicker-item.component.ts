import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'vgr-datepicker-item',
  templateUrl: './datepicker-item.component.html'
})
export class DatepickerItemComponent implements OnInit {
  @Input() date: Date;
  @Input() type: string;
  @Input() selected: boolean;
  @Input() isMinZoom: boolean;

  @Output() select = new EventEmitter<Date>();
  @Output() zoomIn = new EventEmitter<Date>();

  dateFormat: string;
  current: boolean;

  constructor() {
  }

  ngOnInit() {
    const today = new Date();

    switch (this.type) {
      case 'day':
        this.dateFormat = 'd';
        this.current =
          this.date.getFullYear() === today.getFullYear() &&
          this.date.getMonth() === today.getMonth() &&
          this.date.getDate() === today.getDate();
        break;
      case 'month':
        this.dateFormat = 'MMM';
        this.current =
          this.date.getFullYear() === today.getFullYear() &&
          this.date.getMonth() === today.getMonth();
        break;
      case 'year':
        this.dateFormat = 'yyyy';
        this.current = this.date.getFullYear() === today.getFullYear();
        break;
    }
  }

  onClick() {
    if (this.isMinZoom) {
      this.select.emit(this.date);
    } else {
      this.zoomIn.emit(this.date);
    }
  }

}
