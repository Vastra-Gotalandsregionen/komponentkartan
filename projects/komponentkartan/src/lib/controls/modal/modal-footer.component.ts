import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-modal-footer',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class ModalFooterComponent {

  constructor() {
  }
}
