import { Component, Input, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'vgr-dropdown-item',
  templateUrl: './dropdown-item.component.html'
})
export class DropdownItemComponent {

  @Input() selectedLabel: string;
  @Input() value: any;
  @Output() toggle = new EventEmitter();
  @Output() confirm = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @Output() nextMatch = new EventEmitter<string>();
  @ViewChild('item') item: ElementRef;

  get label(): string {
    return this.value;
  };

  multi = false;
  selected = false;
  visible = true;
  hasFocus = false;

  toggleSelect() {
    if (this.multi) {
      this.selected = !this.selected;
      this.toggle.emit();
    } else if (!this.selected) {
      this.selected = true;
      this.confirm.emit();
    }
  }

  focus() {
    if (this.item) {
      this.item.nativeElement.focus();
    }
  }

  // IE specific hack, since IE sets focus on internal elements when clicked.
  onFocus() {
    this.hasFocus = true;
  }

  onBlur() {
    this.hasFocus = false;
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowUp' || event.key === 'Up') {
      this.previous.emit();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      this.next.emit();
    } else if (event.key === ' ' || event.key === 'Spacebar') {
      if (this.multi) {
        this.toggleSelect();
      }
    } else if (event.key === 'Enter') {
      this.selected = true;
      this.confirm.emit();
    } else if (/^[\wåäöÅÄÖ]$/.test(event.key) && !event.ctrlKey && !event.altKey) {
      this.nextMatch.emit(event.key);
    }
  }

}
