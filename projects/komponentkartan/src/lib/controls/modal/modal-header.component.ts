import { Component } from '@angular/core';

@Component({
    selector: 'vgr-modal-header',
    template: `<ng-content></ng-content>`,
    standalone: false
})

export class ModalHeaderComponent {
  constructor() { }
}
