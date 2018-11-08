import { Component, OnInit, Input, EventEmitter, Output, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'vgr-dropdown-item',
  templateUrl: './dropdown-item.component.html'
})
export class DropdownItemComponent implements AfterViewInit {

  @Input() selectedLabel: string;
  @Input() value: any;
  @Output() selectedChanged = new EventEmitter<boolean>();
  @Output() previous = new EventEmitter();
  @Output() next = new EventEmitter();
  @ViewChild('item') item: ElementRef;
  label: string;
  selected = false;
  visible = true;

  ngAfterViewInit() {
    this.label = this.item.nativeElement.textContent;
  }

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
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      this.next.emit();
    } else if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      this.toggleSelect();
    }
  }

}
