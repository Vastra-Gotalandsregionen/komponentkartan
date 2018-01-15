import {
    Component, Input, EventEmitter, Output, HostBinding, forwardRef, ElementRef, Renderer, OnChanges
} from '@angular/core';
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
export class RadioGroupComponent implements ControlValueAccessor, OnChanges {
    @HostBinding('class.radio-group') hasClass = true;
    @HostBinding('attr.role') role = 'radiogroup';
    @Input() @HostBinding('class.disabled') disabled: boolean;
    @Input() options: ISelectableItem[];
    @Output() selectedChanged: EventEmitter<ISelectableItem> = new EventEmitter<ISelectableItem>();

    noSelectionFlag: boolean;
    constructor(private elementRef: ElementRef, private renderer: Renderer) {
    }

    ngOnChanges() {
        if (this.options && this.options.length > 0) {
            const preSelectedOptions = this.options.filter(x => x.selected);
            if (preSelectedOptions.length > 0) {
                this.selectOption(preSelectedOptions[0]);
            }
        }
    }

    optionClicked(option: ISelectableItem) {
        if (this.disabled || option.disabled || option.selected) {
            return;
        }

        this.selectOption(option);
    }

    keyDown(event: KeyboardEvent, option: ISelectableItem): void {
        if (event.keyCode === 9) {
            this.setFocus();
        }

        if (event.keyCode === 13 || event.keyCode === 32) {
            this.optionClicked(option);
            event.preventDefault();
        }

        if (event.keyCode === 39 || event.keyCode === 38) {
            this.setFocus(option, 'forward');
            event.preventDefault();
        }

        if (event.keyCode === 37 || event.keyCode === 40) {
            this.setFocus(option, 'back');
            event.preventDefault();
        }

        if (event.keyCode === 13 || event.keyCode === 32) {
            this.optionClicked(option);
            event.preventDefault();
        }
    }

    setFocus(option?: ISelectableItem, direction?: string) {
        const position = this.options.indexOf(option);
        const nextItem = this.options[position + 1];
        const previousItem = this.options[position - 1];
        const elements = this.elementRef.nativeElement.querySelectorAll('.radio-button__icon');

        if (this.noSelectionFlag && option.selected === false) {
            this.renderer.invokeElementMethod(elements[0], 'focus');
            this.noSelectionFlag = false;
            return;
        }

        if (direction === 'forward') {
            if (position + 1 === this.options.length) {
                this.renderer.invokeElementMethod(elements[0], 'focus');
                this.optionClicked(this.options[0]);
            } else {
                this.renderer.invokeElementMethod(elements[position + 1], 'focus');
                this.optionClicked(nextItem);
            }
        } else if (direction === 'back') {
            if (position === 0) {
                this.renderer.invokeElementMethod(elements[this.options.length - 1], 'focus');
                this.optionClicked(this.options[this.options.length - 1]);
            } else {
                this.renderer.invokeElementMethod(elements[position - 1], 'focus');
                this.optionClicked(previousItem);
            }
        }
    }

    checkTabFocus(option: ISelectableItem) {
        const index = this.options.indexOf(option);
        return !option.disabled && (option.selected || (index === 0 && this.noSelectionFlag));
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
