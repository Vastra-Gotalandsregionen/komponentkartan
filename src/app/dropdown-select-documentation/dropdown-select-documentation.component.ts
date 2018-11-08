import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-dropdown-select-documentation',
  templateUrl: './dropdown-select-documentation.component.html'
})
export class DropdownSelectDocumentationComponent {

  items5: string[];
  items10: string[];
  items50: string[];
  form: FormControl;
  itemLabel = 'Ett långt alternativ som skrivs ut i helhet';
  itemValue = 1;

  constructor() {
    this.items5 = this.getItems(5);
    this.items10 = this.getItems(10);
    this.items50 = this.getItems(50);
    this.form = new FormControl(this.itemValue);
  }

  getItems(length: number): string[] {
    const items = [];
    for (let item = 1; item <= length; item++) {
      items.push(`Val ${item}`);
    }
    return items;
  }

}
