import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer } from '@angular/core';

@Component({
  selector: 'vgr-filter-tag',
  templateUrl: './filter-tag.component.html'
})
export class FilterTagComponent {
  @Input() disabled = false;
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() click = new EventEmitter();
  @ViewChild('filtertag') filtertag: ElementRef;

  constructor(private renderer: Renderer) {}

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'Left' || event.key === 'ArrowUp' || event.key === 'Up') {
      this.previous.emit();
    } else if (event.key === 'ArrowRight' || event.key === 'Right' || event.key === 'ArrowDown' || event.key === 'Down') {
      this.next.emit();
    }
  }

  setFocus() {
    this.renderer.invokeElementMethod(this.filtertag.nativeElement, 'focus');
  }

  emitClick() {
    this.click.emit();
  }

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
