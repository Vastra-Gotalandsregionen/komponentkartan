import { Component } from '@angular/core';
import { ButtonBaseComponent } from '../button-base/button-base.component';

@Component({
    selector: 'vgr-close-button',
    moduleId: module.id,
    templateUrl: './closeButton.component.html'
})
export class CloseButtonComponent extends ButtonBaseComponent {
    label = 'stäng';
}
