import { Component, HostBinding, ContentChildren, AfterViewInit, QueryList, Input, Output, EventEmitter } from '@angular/core';
import { ListColumnHeaderComponent } from './list-column-header.component';


@Component({
  templateUrl: './list-column-header-checkbox.component.html',
  selector: 'vgr-list-column-header-checkbox'
})
export class ListColumnHeaderCheckboxComponent extends ListColumnHeaderComponent {

  @Input() checked: boolean;
  @Input() disabled: boolean;
  @Output() checkedChanged = new EventEmitter<boolean>();
  @Input() text: string;

  onItemCheckChanged(event: boolean) {
    this.checked = event;
    this.checkedChanged.emit(this.checked);
  }
}
