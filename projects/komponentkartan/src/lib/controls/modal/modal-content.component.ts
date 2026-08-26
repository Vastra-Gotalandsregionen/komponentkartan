import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-modal-content',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class ModalContentComponent {
  constructor() {
  }
}
