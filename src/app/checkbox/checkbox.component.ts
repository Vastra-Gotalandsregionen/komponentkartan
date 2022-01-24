import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CheckboxComponent as CheckboxComponentElement } from '../../../projects/komponentkartan/src/lib';
import { TableComponent as TableComponentElement } from '../../../projects/komponentkartan/src/lib';


@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit {
  @ViewChild('myCheckbox', { read: CheckboxComponentElement }) myCheckbox: CheckboxComponentElement;
  @ViewChild('myTable', { read: TableComponentElement }) myTable: TableComponentElement;
  form: FormGroup;
  // checkbox = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      checkbox: [false, [Validators.required]]
    }, { updateOn: 'submit' });

    console.log(this.form)
  }

  submitForm() {
    this.form.controls.checkbox.markAsTouched();
  }

  setFocus() {
    this.myCheckbox.focus();
  }
}
