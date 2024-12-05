import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CheckboxComponent as CheckboxComponentElement } from '../../../projects/komponentkartan/src/lib';
import { TableComponent as TableComponentElement } from '../../../projects/komponentkartan/src/lib';


@Component({
    selector: 'app-checkbox',
    templateUrl: './checkbox.component.html',
    styleUrls: ['./checkbox.component.scss'],
    standalone: false
})
export class CheckboxComponent implements OnInit {
  @ViewChild('myCheckbox', { read: CheckboxComponentElement }) myCheckbox: CheckboxComponentElement;
  @ViewChild('myTable', { read: TableComponentElement }) myTable: TableComponentElement;
  form: FormGroup;
  checkboxForm: FormGroup;
  showValidFormText: boolean = false;
  formSubmittedCheckboxGroup: boolean;
  formSubmittedCheckbox: boolean;
  // checkbox = new FormControl('', Validators.required);
  klarmarkerad = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      checkbox: [false, { validators: [Validators.pattern('true')] }]
    }, { updateOn: 'submit' });

    this.checkboxForm = this.fb.group({
      checkboxValues: [['Vald'], { validators: [Validators.required]}]
    }, { updateOn: 'submit' });
  }

  submitForm() {
    this.formSubmittedCheckbox = true;
  }

  submitCheckboxForm() {
    this.formSubmittedCheckboxGroup = true;
    // this.checkboxForm.controls.checkboxValues.markAsTouched();
    // Do nothing...
    // this.checkboxForm.reset();
  }

  resetCheckboxForm() {
    this.formSubmittedCheckboxGroup = false;
  }

  setFocus() {
    this.myCheckbox.focus();
  }

  changed(event: any) {
  }
}
