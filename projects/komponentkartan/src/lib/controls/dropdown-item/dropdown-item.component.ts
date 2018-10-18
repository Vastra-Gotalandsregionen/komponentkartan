import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'vgr-dropdown-item',
  templateUrl: './dropdown-item.component.html'
})
export class DropdownItemComponent {

  @Input() label: string;
  @Input() selectedLabel: string;
  @Input() value: any;
  @Output() selectedChanged = new EventEmitter<boolean>();
  selected = false;
  visible = true;

  select() {
    this.selected = !this.selected;
    this.selectedChanged.emit(this.selected);
  }

}
