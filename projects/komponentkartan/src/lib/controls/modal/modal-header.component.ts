import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'vgr-modal-header',
    template: `<ng-content></ng-content>`,
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class ModalHeaderComponent {
  constructor() { }
}
