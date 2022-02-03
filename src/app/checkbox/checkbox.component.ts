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
  checkboxForm: FormGroup;
  showValidFormText: boolean = false;

  // checkbox = new FormControl('', Validators.required);

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      checkbox: ['', [Validators.requiredTrue]]
    }, { updateOn: 'submit' });

    this.checkboxForm = this.fb.group({
      checkboxValues: ['']
    }, { updateOn: 'submit' });
  }

  submitForm() {
    this.form.controls.checkbox.markAsTouched();

    
    if (this.form.valid) {
      this.showValidFormText = true;
    } else {
      this.showValidFormText = false;
    }

  }

  submitCheckboxForm() {
    this.checkboxForm.controls.checkboxValues.markAsTouched();
    // Do nothing...
    // this.checkboxForm.reset();
  }

  setFocus() {
    this.myCheckbox.focus();
  }
}
