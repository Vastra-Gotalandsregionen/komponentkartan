import { Component, Input } from '@angular/core';

@Component({
  selector: 'vgr-icon',
  templateUrl: './icon.component.html'
})
export class IconComponent {
  @Input() prefix: string;
  @Input() faIcon: string;
  @Input() size: string;
  @Input() neutral = false;
  @Input() disabled = false;
}
