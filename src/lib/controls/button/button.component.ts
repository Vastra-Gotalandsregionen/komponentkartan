import { Component, Input, OnChanges } from '@angular/core';
import { ButtonBaseComponent } from '../button-base/button-base.component';

@Component({
    selector: 'vgr-button',
    moduleId: module.id,
    templateUrl: './button.component.html'
})
export class ButtonComponent extends ButtonBaseComponent implements OnChanges {

    @Input() secondary: boolean;
    @Input() type = 'button';

    lastDisabledStatus: boolean;
    reenabled: boolean;

    ngOnChanges() {
        this.reenabled = this.lastDisabledStatus === true && this.disabled === false;
        this.lastDisabledStatus = this.disabled;
    }
}
