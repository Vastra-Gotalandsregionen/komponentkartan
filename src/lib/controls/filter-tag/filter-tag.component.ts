import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer, AfterViewInit } from '@angular/core';

@Component({
  selector: 'vgr-filter-tag',
  templateUrl: './filter-tag.component.html'
})
export class FilterTagComponent implements AfterViewInit {
  @Input() disabled = false;
  @Input() label: string;
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() remove = new EventEmitter();
  @ViewChild('filtertag') filtertag: ElementRef;
  @ViewChild('content') content: ElementRef;
  removed = false;
  private removing = false;

  constructor(private renderer: Renderer) {}

  ngAfterViewInit() {
    if (!this.label) {
      Promise.resolve(null).then(() =>
        this.label = `Ta bort filtrering ${this.content.nativeElement.innerText}`);
    }
  }

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

  emitRemove() {
    if (this.disabled || this.removing || this.removed) {
      return;
    }

    this.removing = true;
    setTimeout(
      () => {
        this.removing = false;
        this.removed = true;
        this.remove.emit();
      },
      200);
  }

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }
}
