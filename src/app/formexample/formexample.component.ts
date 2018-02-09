import { Component, ViewChildren, QueryList } from '@angular/core';
import {
    SelectableItem, RowNotification, NotificationType
} from '../../lib/index';

import { DropdownBaseComponent } from '../../lib/controls/dropdown-base/dropdown.base.component';

@Component({
    moduleId: module.id,
    selector: 'vgr-form-example',
    templateUrl: 'formexample.component.html'
})
export class FormExampleComponent {
    validationStatus: string;
    notification: RowNotification;
    actionpanel: boolean;
    view: string;
    readonly: boolean;

    constructor() {
        this.readonly = false;
        this.view = 'A';
        this.notification = { message: 'Information saknas', icon: 'vgr-icon-exclamation--red', type: NotificationType.Permanent } as RowNotification;
    }
}

