import { Component, Input } from '@angular/core';

@Component({
  selector: 'vgr-icon',
  templateUrl: './icon.component.html'
})
export class IconComponent {
  @Input() icon: string;
  @Input() solid = true;
  @Input() color: 'primary';
  @Input() size = '';
  @Input() fixedWidth = false;
  @Input() rotate: number;
  @Input() flip: string;
  @Input() pull: string;
  @Input() spin = false;
  @Input() pulse = false;
  @Input() border = false;
  @Input() disabled = false;
  @Input() focusable = false;
  @Input() ariaLabel = '';

  get tabindex(): number {
    return this.focusable ? 0 : -1;
  }

  get prefix(): string {
    return this.solid ? 'fas' : 'far';
  }
}
