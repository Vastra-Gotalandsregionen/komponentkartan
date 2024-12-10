import { Component, Input } from '@angular/core';

@Component({
    selector: 'vgr-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    standalone: false
})
export class IconComponent {
  @Input() color = 'primary';
  @Input() size = '';
  @Input() ariaLabel = '';
  @Input() icon: string;
  @Input() flip: string;
  @Input() pull: string;
  @Input() rotate: number;
  @Input() solid = true;
  @Input() fixedWidth = false;
  @Input() spin = false;
  @Input() pulse = false;
  @Input() border = false;
  @Input() disabled = false;

  get prefix(): string {
    return this.solid ? 'fas' : 'far';
  }
}
