import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'vgr-card-column',
  moduleId: module.id,
  template: `<ng-content></ng-content>`
})

export class CardColumnComponent {
  @HostBinding('class.card-column') cardTopClass = true;
  @HostBinding('class.card__left-container') left: boolean;
  @HostBinding('class.card__right-container') right: boolean;
  @HostBinding('class.card__fullwidth-container') fullwidth: boolean;

  constructor() {
  }
}