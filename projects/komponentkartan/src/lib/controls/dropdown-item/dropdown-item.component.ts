import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'vgr-dropdown-item',
  templateUrl: './dropdown-item.component.html'
})
export class DropdownItemComponent {

  @Input() label: string;
  @Input() selectedLabel: string;
  @Input() value: any;
  @Output() selectedChanged = new EventEmitter<boolean>();
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @ViewChild('item') item: ElementRef;
  selected = false;
  visible = true;

  toggleSelect() {
    this.selected = !this.selected;
    this.selectedChanged.emit(this.selected);
  }

  focus() {
    this.item.nativeElement.focus();
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'Up') {
      this.previous.emit();
      event.preventDefault();
      event.stopPropagation();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      this.next.emit();
      event.preventDefault();
      event.stopPropagation();
    } else if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      this.toggleSelect();
      event.preventDefault();
      event.stopPropagation();
    }
  }

}
