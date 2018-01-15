import { Component, Input, EventEmitter, Output, HostBinding, forwardRef } from '@angular/core';
import { ISelectableItem } from '../../models/selectableItem.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'vgr-radio-group',
    moduleId: module.id,
    templateUrl: './radioGroup.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => RadioGroupComponent),
        multi: true
    }]
})
export class RadioGroupComponent implements ControlValueAccessor {
    @HostBinding('class.radio-group') hasClass = true;
    @HostBinding('attr.role') role = 'radiogroup';
    @Input() @HostBinding('class.disabled') disabled: boolean;
    @Input() options: ISelectableItem[];
    @Output() selectedChanged: EventEmitter<ISelectableItem> = new EventEmitter<ISelectableItem>();

    constructor() { }

    optionClicked(option: ISelectableItem) {
        if (this.disabled || option.disabled || option.selected) {
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

    writeValue(option: ISelectableItem): void {
        if (option) {
            this.selectOption(option);
        }
    }

    registerOnChange(func: any): void {
        this.onChange = func;
    }

    registerOnTouched(func: any): void {
        this.onTouched = func;
    }

    onChange(input: ISelectableItem) {
    }

    onTouched() { }

    private selectOption(option: ISelectableItem) {
        this.options.forEach(o => {
            o.selected = (o.id === option.id);
        });
        option.selected = true;
        this.onChange(option);
        this.selectedChanged.emit(option);
    }
}
