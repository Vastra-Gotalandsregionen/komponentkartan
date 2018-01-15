import { Component, ViewChildren, QueryList } from '@angular/core';
import {
    IValidationResult, ValidationErrorState, IValidation,
    SelectableItem, MonthpickerComponent,
    DropdownComponent, NotificationIcon,
    RowNotification, NotificationType
} from '../../lib/index';

import { DropdownBaseComponent } from '../../lib/controls/dropdown-base/dropdown.base.component';
import { ValidationComponent } from '../../lib/controls/validation/validation.component';

@Component({
    moduleId: module.id,
    selector: 'vgr-form-example',
    templateUrl: 'formexample.component.html'
})
export class FormExampleComponent {
    validationStatus: string;
    items: SelectableItem<string>[];
    multiItems: SelectableItem<string>[];
    notification: RowNotification;
    actionpanel: boolean;
    view: string;
    readonly: boolean;

    @ViewChildren(ValidationComponent) validatedComponents: QueryList<ValidationComponent>;
    constructor() {
        this.readonly = false;
        this.view = 'C';
        this.validationStatus = 'Inte validerad';
        this.items = [
            { displayName: 'Sverige', value: 'Sverige' } as SelectableItem<string>,
            { displayName: 'Danmark', value: 'Danmark' } as SelectableItem<string>,
        ] as SelectableItem<string>[];

        this.multiItems = [
            { displayName: 'Sverige', value: 'Sverige' } as SelectableItem<string>,
            { displayName: 'Danmark', value: 'Danmark' } as SelectableItem<string>,
            { displayName: 'Norge', value: 'Norge' } as SelectableItem<string>,
            { displayName: 'Finland', value: 'Finland' } as SelectableItem<string>,
            { displayName: 'Island', value: 'Island' } as SelectableItem<string>,
        ] as SelectableItem<string>[];

        this.notification = { message: 'Information saknas', icon: NotificationIcon.ExclamationRed, type: NotificationType.Permanent } as RowNotification;
    }

    onSave() {
        this.validationStatus = 'Inga fel (kontrollerar ' + this.validatedComponents.length + ' fält)';
        let isValid = true;

        this.validatedComponents.forEach(validatedComponent => {
            const result = validatedComponent.validate();
            if (result.isValid) {
            } else {
                isValid = false;
            }
        });
        if (!isValid) {
            this.validationStatus = 'Ett eller flera av ' + this.validatedComponents.length + ' fält har fel, se markering';
        }
    }
}

