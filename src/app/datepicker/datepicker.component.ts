import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormControl, Validators } from '@angular/forms';
import { DatepickerComponent as Datepicker } from '../../../projects/komponentkartan/src/lib';


@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss']
})
export class DatepickerComponent {
  @ViewChild('myDatepicker', { read: Datepicker }) myDatepicker: Datepicker;
  @ViewChild('myDatepickerWithoutInput', { read: Datepicker }) myDatepickerWithoutInput: Datepicker;

  disabled = false;
  readonly = false;
  form = new FormControl<string|Date>('', Validators.required);


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

  setFocus1() {
    this.myDatepicker.focus();
  }

  setFocus2() {
    this.myDatepickerWithoutInput.focus();
  }
}
