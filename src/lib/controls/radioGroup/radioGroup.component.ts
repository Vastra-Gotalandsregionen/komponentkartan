import {
    Component, Input, EventEmitter, Output, HostBinding, forwardRef, ElementRef, Renderer, OnChanges
} from '@angular/core';
import { SelectableItem } from '../../models/selectableItem.model';
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
    @Input() options: SelectableItem<any>[];
    @Output() selectedChanged: EventEmitter<any> = new EventEmitter<any>();

    noSelectionFlag: boolean;

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
    }

    ngOnChanges() {
        // this.noSelectionFlag = true;
        this.noSelectionFlag = this.options.every((x) => (x.selected === false || x.selected === undefined));

        if (this.options && this.options.length > 0) {
            const preSelectedOption = this.options.find(x => x.selected);
            if (preSelectedOption) {
                this.selectOption(preSelectedOption);
            }
        }
    }

    optionClicked(option: SelectableItem<any>) {
        if (this.disabled || option.disabled || option.selected) {
            return;
        }

        this.selectOption(option);
    }

    keyDown(event: KeyboardEvent, option: SelectableItem<any>): void {

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
    }

    setFocus(option?: SelectableItem<any>, direction?: string) {
        const position = this.options.indexOf(option);
        const nextItem = this.options[position + 1];
        const previousItem = this.options[position - 1];

        const elements = this.elementRef.nativeElement.querySelectorAll('.radio-button__icon');
        const enabledOptions = this.options.filter(x => !x.disabled);

        if (direction === 'forward') {
            if (position + 1 === enabledOptions.length) {
                this.renderer.invokeElementMethod(elements[0], 'focus');
                this.optionClicked(enabledOptions[0]);
            } else {
                this.renderer.invokeElementMethod(elements[position + 1], 'focus');
                this.optionClicked(nextItem);
            }
        } else if (direction === 'back') {
            if (position === 0) {
                this.renderer.invokeElementMethod(elements[this.options.length - 1], 'focus');
                this.optionClicked(this.options[enabledOptions.length - 1]);
            } else {
                this.renderer.invokeElementMethod(elements[position - 1], 'focus');
                this.optionClicked(previousItem);
            }
        }
    }

    checkTabFocus(index: number) {
        return !this.options[index].disabled && (this.options[index].selected || (index === 0 && this.noSelectionFlag));
    }

    writeValue(option: any): void {
        if (option) {
            const preSelectedOption = this.options.find(x => x.value === option);
            if (preSelectedOption) {
                this.selectOption(preSelectedOption);
            }
        }
    }

    registerOnChange(func: any): void {
        this.onChange = func;
    }

    registerOnTouched(func: any): void {
        this.onTouched = func;
    }

    onChange(input: SelectableItem<any>) {
    }

    onTouched() { }

    private selectOption(option: SelectableItem<any>) {
        this.options.forEach(o => {
            o.selected = (o === option);
        });
        option.selected = true;
        this.noSelectionFlag = false;
        this.onChange(option.value);
        this.selectedChanged.emit(option.value);
    }
}
