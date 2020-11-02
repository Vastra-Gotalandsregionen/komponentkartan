import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'vgr-card-column',
  template: `<ng-content></ng-content>`
})

export class CardColumnComponent {
  @HostBinding('class.card-column') cardTopClass = true;
  @HostBinding('class.card__section-container') cardSectionContainer = true;
  @HostBinding('class.card__left-container') left: boolean;
  @HostBinding('class.card__right-container') right: boolean;
  @HostBinding('class.card__fullwidth-container') fullwidth: boolean;

  constructor() {
  }
}
