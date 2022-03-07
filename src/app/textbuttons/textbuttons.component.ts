import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ButtonComponent } from '../../../projects/komponentkartan/src/lib';

@Component({
  selector: 'app-textbuttons',
  templateUrl: './textbuttons.component.html',
  styleUrls: ['./textbuttons.component.scss']
})
export class TextbuttonsComponent{
  @ViewChild('submitButton', { read: ButtonComponent, static: false }) submitButton: ButtonComponent;
  lastButtonPressed: string;
  buttonDisabled = true;
  buttonSecondaryDisabled = true;
  buttonDiscreetDisabled = true;
  form: FormGroup;
  loadingState = true;
  constructor(private fb: FormBuilder) {
    this.lastButtonPressed = '';
    this.form = fb.group({
      name: ['Namn']
    });
    this.form.disable();
  }

  toggleFormActive() {
    if (this.form.enabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  toggleLoadingState() {
    this.loadingState = !this.loadingState;
  }

  onSubmit() {
    alert('Form submitted!');
  }

  setFocusOnSubmit() {
    this.submitButton.focus();
  }
}
