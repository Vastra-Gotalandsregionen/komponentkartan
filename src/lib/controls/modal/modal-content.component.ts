import { Component, HostBinding, Input } from '@angular/core';

@Component({
  selector: 'vgr-modal-content',
  moduleId: module.id,
  template: `<ng-content></ng-content>`
})

export class ModalContentComponent {
//   @HostBinding('class.card__top') cardTopClass = true;
//   @HostBinding('class.card-header') cardHeaderClass = true;

  constructor() {
  }
}
