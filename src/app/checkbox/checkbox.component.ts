import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, FormControl, UntypedFormGroup, Validators } from '@angular/forms';
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
  form: UntypedFormGroup;
  checkboxForm: UntypedFormGroup;
  showValidFormText: boolean = false;
  formSubmittedCheckboxGroup: boolean;
  formSubmittedCheckbox: boolean;
  // checkbox = new FormControl('', Validators.required);
  klarmarkerad = false;

  constructor(private fb: UntypedFormBuilder) { }

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
