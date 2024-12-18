import { Component } from '@angular/core';

@Component({
    selector: 'vgr-modal-content',
    template: `<ng-content></ng-content>`,
    standalone: false
})

export class ModalContentComponent {
  constructor() {
  }
}
