import { Component, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'vgr-filter-tag',
  templateUrl: './filter-tag.component.html',
  styleUrls: ['./filter-tag.component.scss']
})
export class FilterTagComponent implements AfterViewInit {
  @Input() disabled = false;
  @Input() ariaLabel: string;
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @Output() remove = new EventEmitter();
  @ViewChild('filtertag', { static: true }) filtertag: ElementRef;
  @ViewChild('content', { static: true }) content: ElementRef;
  tabindex = 0;
  removed = false;
  removing = false;

  ngAfterViewInit() {
    if (!this.ariaLabel) {
      Promise.resolve(null).then(() =>
        this.ariaLabel = `Ta bort filtrering ${this.content.nativeElement.innerText}`
      );
    }
  }

  makeTabFocusable(focusable: boolean) {
    Promise.resolve(null).then(() =>
      this.tabindex = focusable ? 0 : -1
    );
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft' || event.key === 'Left' || event.key === 'ArrowUp' || event.key === 'Up') {
      this.previous.emit();
      event.preventDefault();
    } else if (event.key === 'ArrowRight' || event.key === 'Right' || event.key === 'ArrowDown' || event.key === 'Down') {
      this.next.emit();
      event.preventDefault();
    }
  }

  focus() {
    this.filtertag.nativeElement.focus();
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
