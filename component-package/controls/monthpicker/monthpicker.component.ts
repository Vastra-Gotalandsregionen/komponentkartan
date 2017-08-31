import { Component, Input, EventEmitter, Output, OnChanges, HostBinding } from '@angular/core';
import { DatePipe } from '@angular/common';
@Component({
    selector: 'vgr-monthpicker',
    moduleId: module.id,
    templateUrl: './monthpicker.component.html'
})
export class MonthpickerComponent {
    today: Date = new Date();

    @Output() selectedDateChanged = new EventEmitter<Date>();
    @Input() selectedDateFormat: string = 'MMM yyyy';
    @Input() minDate: Date = new Date(this.today.getFullYear(), 1, 1);
    @Input() maxDate: Date = new Date(this.today.getFullYear(), 12, 31);

    selectedDate?: Date;

    expanded: boolean;
    protected preventCollapse: boolean;

    constructor() {
        this.selectedDate = new Date();

        this.expanded = false;
    };

    onMouseDown(event: Event) {
        this.toggleCalendar(event);
    }

    onKeyDown(event: KeyboardEvent) {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.toggleCalendar(event);
        }
    }

    private toggleCalendar(event: Event) {
        if (this.preventCollapse) {
            event.cancelBubble = true;
            event.returnValue = false;
            this.preventCollapse = false;
        } else {
            this.toggleExpand(event);
        }

    }
    private toggleExpand(event: Event) {
        const target = event.target || event.srcElement || event.currentTarget;
        const element = $(target);
        if (!element.is('input')) {
            this.expanded = !this.expanded;
        }
    }


    selectDate(item: Date) {
        if (!item) {
            return;
        }

        /*   this.items.forEach(x => x.selected = false);
  
  
          item.selected = true;
          item.marked = true;
          this.selectedItem = item;
          this.selectedDateChanged.emit(item); */




    }


}
