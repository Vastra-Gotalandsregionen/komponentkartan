import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit, OnChanges } from '@angular/core';

@Component({
  selector: 'vgr-toggle-button',
  templateUrl: './toggle-button.component.html'
})
export class ToggleButtonComponent implements AfterViewInit, OnChanges {
  @Input() disabled = false;
  @Input() pressed = false;
  @Input() ariaLabel: string;
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @ViewChild('togglebutton', { static: true }) togglebutton: ElementRef;
  @ViewChild('content', { static: true }) content: ElementRef;

  tabindex = 0;
  ariaPressed: boolean;

  ngOnChanges() {
    Promise.resolve(null).then(() =>
      this.ariaPressed = this.pressed
    );
  }

  ngAfterViewInit() {
    if (!this.ariaLabel) {
      Promise.resolve(null).then(() =>
        this.ariaLabel = `${this.content.nativeElement.innerHTML} toggle button`
      );
    }

    Promise.resolve(null).then(() =>
      this.ariaPressed = this.pressed
    );
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
    } else if (event.keyCode === 13 || event.keyCode === 32) {
      event.stopPropagation();
    }
  }

  focus() {
    this.togglebutton.nativeElement.focus();
  }

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      event.stopPropagation();
    }
  }

}
