import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-card-header',
    template: `<ng-content></ng-content>`,
    styleUrls: ['./card.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class CardHeaderComponent {
  @HostBinding('class.card__top') cardTopClass = true;
  @HostBinding('class.card-header') cardHeaderClass = true;

  constructor() {
  }
}
