import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, AfterViewInit } from '@angular/core';

@Component({
  selector: 'vgr-toggle-button',
  templateUrl: './toggle-button.component.html'
})
export class ToggleButtonComponent implements AfterViewInit {
  @Input() disabled = false;
  @Input() pressed = false;
  @Input() ariaLabel: string;
  @Output() next = new EventEmitter();
  @Output() previous = new EventEmitter();
  @ViewChild('togglebutton') togglebutton: ElementRef;
  @ViewChild('content') content: ElementRef;

  tabindex = 0;
  ariaPressed: boolean;

  ngAfterViewInit() {
    if (!this.ariaLabel) {
      Promise.resolve(null).then(() =>
        this.ariaLabel = `${this.content.nativeElement.innerText}`
      );
    }
    if (!this.ariaPressed) {
      Promise.resolve(null).then(() =>
        this.ariaPressed = this.pressed
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
    } else if (event.key === 'ArrowRight' || event.key === 'Right' || event.key === 'ArrowDown' || event.key === 'Down') {
      this.next.emit();
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
