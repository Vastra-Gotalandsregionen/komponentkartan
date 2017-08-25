import { Component, Input, EventEmitter, Output, AfterViewInit, OnChanges, HostBinding } from '@angular/core';
import { ISelectableItem } from '../../models/selectableItem.model';

@Component({
    selector: 'vgr-radio-group',
    moduleId: module.id,
    templateUrl: './radioGroup.component.html'
})
export class RadioGroupComponent implements OnChanges {
    @HostBinding('class.radio-group') hasClass = true;
    @HostBinding('attr.role') role = 'radiogroup';
    @Input() options: ISelectableItem[];
    @Input() name: string;
    @Input() noSelection: boolean;
    @Output() selectedChanged: EventEmitter<ISelectableItem> = new EventEmitter<ISelectableItem>();

    constructor() {
        this.name = 'group';
    }

    ngOnChanges() {
        if (!this.noSelection && this.options && this.options.length > 0) {
            const preSelectedOptions = this.options.filter(x => x.selected);
            if (preSelectedOptions.length > 0) {
                this.selectOption(preSelectedOptions[0]);
            } else {
                const enabledOptions = this.options.filter(x => !x.disabled)
                this.selectOption(enabledOptions[0]);
            }
        }
    }

    optionClicked(option: ISelectableItem) {
        if (option.disabled || option.selected) {
            return;
        }

        this.selectOption(option);
    }

    keyDown(event: KeyboardEvent, option: ISelectableItem): void {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.optionClicked(option);
            event.preventDefault();
        }
    }

    private selectOption(option: ISelectableItem) {
        option.selected = true;
        this.options.filter(x => x !== option).forEach(o => {
            o.selected = false;
        });

        this.selectedChanged.emit(option);
    }
}
