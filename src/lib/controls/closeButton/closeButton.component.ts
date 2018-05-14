import { Component } from '@angular/core';
import { ButtonBase } from '../button-base/button-base';

@Component({
    selector: 'vgr-close-button',
    templateUrl: './closeButton.component.html'
})
export class CloseButtonComponent extends ButtonBase {
    label = 'stäng';
}
