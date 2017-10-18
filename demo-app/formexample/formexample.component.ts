import { Component, ViewChildren, QueryList } from '@angular/core';
import { IValidationResult, ValidationErrorState, IValidation } from '../../component-package/models/validation.model';
import { ISelectableItem } from '../../component-package/models/selectableItem.model';
import { MonthpickerComponent } from '../../component-package/controls/monthpicker/monthpicker.component';
import { DropdownBaseComponent } from '../../component-package/controls/dropdown-base/dropdown.base.component';
import { DropdownComponent } from '../../component-package/controls/dropdown/dropdown.component';

@Component({
    moduleId: module.id,
    selector: 'vgr-form-example',
    templateUrl: 'formexample.component.html'
})
export class FormExampleComponent {
    validationStatus: string;
    items: ISelectableItem[];
    multiItems: ISelectableItem[];
    @ViewChildren('validate') validatedComponents: QueryList<IValidation>;
    constructor() {
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
    }

    onSave() {
        this.validationStatus = 'Inga';
        let isValid = true;

        this.validatedComponents.forEach(validatedComponent => {
            if (validatedComponent.validate !== undefined) {
                const result = validatedComponent.validate();
                if (result.isValid) {
                    console.log('Component is valid');
                } else {
                    isValid = false;
                }
            } else {
                console.log('Component has no validation');
            }
        });
        if (!isValid) {
            this.validationStatus = 'Ett eller flera fält har fel, se markering';
        }
    }
}

