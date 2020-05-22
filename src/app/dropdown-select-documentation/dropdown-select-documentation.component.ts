import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DropdownSelectComponent } from '../../../projects/komponentkartan/src/lib';

@Component({
  selector: 'app-dropdown-select-documentation',
  templateUrl: './dropdown-select-documentation.component.html'
})
export class DropdownSelectDocumentationComponent {
  @ViewChild('myDropdown', { read: DropdownSelectComponent }) myDropdown: DropdownSelectComponent;
  items5: string[];
  items10: string[];
  items50: string[];
  form: FormControl;
  formControl: FormControl;
  formControlDisabled = false;
  itemLabel = 'Ett långt alternativ som skrivs ut i helhet';
  itemValue = 1;
  readonly = false;
  disabled = false;

  constructor() {
    this.items5 = this.getItems(5);
    this.items10 = this.getItems(10);
    this.items50 = this.getItems(50);
    this.form = new FormControl(this.itemValue);
    this.formControl = new FormControl();
  }

  getItems(length: number): string[] {
    const items = [];
    for (let item = 1; item <= length; item++) {
      items.push(`Val ${item}`);
    }
    return items;
  }

  setFocus() {
    this.myDropdown.focus();
  }

  toggleReadonly() {
    this.readonly = !this.readonly;
  }

  toggleDisabled(value) {
    this.disabled = !this.disabled;
  }

  toggleDisabledFormControl(state) {
    this.formControlDisabled = !this.formControlDisabled;
    if (state) {
      this.formControl.enable();
    } else {
      this.formControl.disable();
    }
  }

}
