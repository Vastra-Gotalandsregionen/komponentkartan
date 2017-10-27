import { Component, ViewChildren, QueryList } from '@angular/core';
import { IValidationResult, ValidationErrorState, IValidation } from '../../component-package/models/validation.model';
import { ISelectableItem } from '../../component-package/models/selectableItem.model';
import { MonthpickerComponent } from '../../component-package/controls/monthpicker/monthpicker.component';
import { DropdownBaseComponent } from '../../component-package/controls/dropdown-base/dropdown.base.component';
import { DropdownComponent } from '../../component-package/controls/dropdown/dropdown.component';
import { ValidationComponent } from '../../component-package/controls/validation/validation.component';


import { NotificationIcon } from '../../component-package/models/notificationIcon.model';
import { RowNotification } from '../../component-package/models/rowNotification.model';
import { NotificationType } from '../../component-package/models/notificationType.model';


@Component({
    moduleId: module.id,
    selector: 'vgr-form-example',
    templateUrl: 'formexample.component.html'
})
export class FormExampleComponent {
    validationStatus: string;
    items: ISelectableItem[];
    multiItems: ISelectableItem[];
    notification: RowNotification;
    actionpanel: boolean;
    view: string;
    @ViewChildren(ValidationComponent) validatedComponents: QueryList<ValidationComponent>;
    constructor() {
        this.view = 'A';
        this.validationStatus = 'Inte validerad';
        this.items = [
            { displayName: 'Sverige' } as ISelectableItem,
            { displayName: 'Danmark' } as ISelectableItem,
        ] as ISelectableItem[];

        this.multiItems = [
            { displayName: 'Sverige' } as ISelectableItem,
            { displayName: 'Danmark' } as ISelectableItem,
            { displayName: 'Norge' } as ISelectableItem,
            { displayName: 'Finland' } as ISelectableItem,
            { displayName: 'Island' } as ISelectableItem,
        ] as ISelectableItem[];



        this.notification = { message: 'Information saknas', icon: NotificationIcon.ExclamationRed, type: NotificationType.Permanent } as RowNotification;
    }

    onSave() {
        this.validationStatus = 'Inga fel (kontrollerar ' + this.validatedComponents.length + ' fält)';
        let isValid = true;

        this.validatedComponents.forEach(validatedComponent => {
            const result = validatedComponent.validate();
            if (result.isValid) {
                console.log('Component is valid');
            } else {
                isValid = false;
            }
        });
        if (!isValid) {
            this.validationStatus = 'Ett eller flera av ' + this.validatedComponents.length + ' fält har fel, se markering';
        }
    }
}

