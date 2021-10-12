﻿import { Component, Input, OnChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { mapToClassString } from '../../utils/map-to-class-string';

@Component({
  selector: 'vgr-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnChanges {
  @Input() disabled = false;
  @Input() buttonStyle = 'primary';
  @Input() type = 'button';
  @ViewChild('button', { static: true }) button: ElementRef;
  reenabled = false;
  private wasDisabled = false;
  private activated = false;

  constructor(private renderer: Renderer2) {}

  ngOnChanges() {
    this.reenabled = this.wasDisabled && !this.disabled;
    this.wasDisabled = this.disabled;
  }

  checkDisabled(event: MouseEvent) {
    if (this.disabled) {
      this.renderer.setAttribute(this.button.nativeElement, 'aria-disabled', 'false');
      event.stopPropagation();
      event.preventDefault();
    }
  }

  public focus() {
    this.button.nativeElement.focus();
  }

  onKeyboardActivation(e: KeyboardEvent): void {
    if (e.key === ' ' || e.key === 'Enter') {
      this.activated = true;
      setTimeout(() => {
        this.activated = false;
      }, 500);
    }
  }

  calculateClasses() {
    const css = new Map([
      ['button--disabled', this.disabled],
      ['button--enabling', this.reenabled],
      ['button--secondary', this.buttonStyle === 'secondary'],
      ['button--discreet', this.buttonStyle === 'discreet'],
      ['button--active', this.activated]
    ]);

    return mapToClassString(css);
  }
}
