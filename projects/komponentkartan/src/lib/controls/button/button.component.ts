import { Component, Input, OnChanges, AfterViewInit, ViewChild, ElementRef, HostBinding, ChangeDetectionStrategy } from '@angular/core';
import { mapToClassString } from '../../utils/map-to-class-string';
import { generateUniqueId } from '../../utils/generateUniqueId';

@Component({
    selector: 'vgr-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class ButtonComponent implements OnChanges, AfterViewInit {
  @HostBinding('attr.data-element-id') id: string;
  @Input() disabled = false;
  @Input() buttonStyle = 'primary';
  @Input() type = 'button';
  @Input() loadingState = false;
  @ViewChild('button', { static: true }) button: ElementRef;
  reenabled = false;
  private wasDisabled = false;
  private activated = false;

  constructor() {}

  ngOnChanges() {
    this.reenabled = this.wasDisabled && !this.disabled;
    this.wasDisabled = this.disabled;
  }

  ngAfterViewInit() {
    const button = this.button.nativeElement as HTMLButtonElement;
    const label = button.textContent?.trim() ?? '';

    // Use a timeout to ensure all components have been initialized and IDs assigned
    setTimeout(() => {
      this.id = generateUniqueId(label, button.ownerDocument, 'vgr-button');
    }, 0);
  }

  checkDisabled(event: Event) {
    if (this.disabled || this.loadingState) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  public focus() {
    this.button.nativeElement.focus();
  }

  onKeyboardActivation(e: KeyboardEvent): void {
    if (!this.disabled) {
      if (e.key === ' ' || e.key === 'Enter') {
        this.activated = true;
        setTimeout(() => {
          this.activated = false;
        }, 500);
      }
    }
  }

  calculateClasses() {
    const css = new Map([
      ['button--disabled', this.disabled || this.loadingState],
      ['button--enabling', this.reenabled],
      ['button--secondary', this.buttonStyle === 'secondary'],
      ['button--discreet', this.buttonStyle === 'discreet'],
      ['button--active', this.activated]
    ]);

    return mapToClassString(css);
  }
}
