import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'vgr-card-header',
  template: `<ng-content></ng-content>`
})

export class CardHeaderComponent {
  @HostBinding('class.card__top') cardTopClass = true;
  @HostBinding('class.card-header') cardHeaderClass = true;

  constructor() {
  }
}
