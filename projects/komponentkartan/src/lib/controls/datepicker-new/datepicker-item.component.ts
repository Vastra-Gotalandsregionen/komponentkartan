import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'vgr-datepicker-item',
  templateUrl: './datepicker-item.component.html'
})
export class DatepickerItemComponent implements OnInit {
  @Input() date: Date;
  @Input() type: string;
  @Input() selected: boolean;
  @Input() disabled: boolean;
  @Input() isMinZoom: boolean;

  @Output() select = new EventEmitter<Date>();
  @Output() zoomIn = new EventEmitter<Date>();
  @Output() previousColumn = new EventEmitter<Date>();
  @Output() nextColumn = new EventEmitter<Date>();
  @Output() previousRow = new EventEmitter<Date>();
  @Output() nextRow = new EventEmitter<Date>();

  @ViewChild('item') item: ElementRef;
  dateFormat: string;
  current: boolean;
  focused: boolean;

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
    this.activate();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === 'Space' || event.key === ' ') {
      event.stopPropagation();
      this.activate();
    } else if (event.key === 'ArrowLeft' || event.key === 'Left') {
      event.stopPropagation();
      this.previousColumn.emit(this.date);
    } else if (event.key === 'ArrowRight' || event.key === 'Right') {
      event.stopPropagation();
      this.nextColumn.emit(this.date);
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      event.stopPropagation();
      this.previousRow.emit(this.date);
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      event.stopPropagation();
      this.nextRow.emit(this.date);
    }
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    this.focused = false;
  }

  focus() {
    this.item.nativeElement.focus();
  }

  private activate() {
    if (this.disabled) {
      return;
    }

    if (this.isMinZoom) {
      this.select.emit(this.date);
    } else {
      this.zoomIn.emit(this.date);
    }
  }

}
