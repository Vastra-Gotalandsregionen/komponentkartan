import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {
  disabled = false;
  readonly = false;
  form = new FormControl();
  minDate = new Date(2017, 4, 10);
  maxDate = new Date(2018, 4, 10);

  changeFormValue() {
    this.form.setValue(new Date(2018, 5, 15));
  }

  toggleDisabled() {
    this.disabled = !this.disabled;
    if (this.disabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  toggleReadonly() {
    this.readonly = !this.readonly;
  }
}
