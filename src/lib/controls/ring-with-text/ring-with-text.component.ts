import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'vgr-ring-with-text',
  moduleId: module.id,
  templateUrl: './ring-with-text.component.html',
})
export class RingWithTextComponent implements OnInit {

  @Input() size: string;
  @Input() text: string;
  @Input() textColor: string;
  @Input() circleColor: string;
  private ringSize: string;

  constructor() { }

  ngOnInit() {
    if (this.text) {
      this.text = this.text.substr(0, 2);
    }
    this.ringSize = this.size === 'large'  ? 'ring-with-text--large' : 'ring-with-text--small';
  }
}
