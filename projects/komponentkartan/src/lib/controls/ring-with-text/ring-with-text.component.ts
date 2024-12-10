import { Component, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'vgr-ring-with-text',
    templateUrl: './ring-with-text.component.html',
    styleUrls: ['./ring-with-text.component.scss'],
    standalone: false
})
export class RingWithTextComponent implements OnChanges {

  @Input() size: string;
  @Input() text: string;
  @Input() textColor: string;
  @Input() circleColor: string;
  ringSize = 'ring-with-text--small';

  constructor() { }

  ngOnChanges() {
    if (this.text) {
      this.text = this.text.substr(0, 2);
    }
    this.ringSize = this.size === 'large'  ? 'ring-with-text--large' : 'ring-with-text--small';
  }


}
