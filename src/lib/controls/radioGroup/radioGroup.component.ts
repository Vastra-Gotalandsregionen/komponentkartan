import { Component, Input, EventEmitter, Output, AfterViewInit, OnChanges, HostBinding, forwardRef, ElementRef, Renderer2 } from '@angular/core';
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
export class RadioGroupComponent implements OnChanges, ControlValueAccessor {
    @HostBinding('class.radio-group') hasClass = true;
    @HostBinding('attr.role') role = 'radiogroup';
    @Input() @HostBinding('class.disabled') disabled: boolean;
    @Input() options: ISelectableItem[];
    @Input() noSelection: boolean;
    @Output() selectedChanged: EventEmitter<ISelectableItem> = new EventEmitter<ISelectableItem>();

    constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

    ngOnChanges() {
        if (!this.noSelection && this.options && this.options.length > 0) {
            const preSelectedOptions = this.options.filter(x => x.selected);
            if (preSelectedOptions.length > 0) {
                this.selectOption(preSelectedOptions[0]);
            } else {
                const enabledOptions = this.options.filter(x => !x.disabled);
                this.selectOption(enabledOptions[0]);
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
        if (event.keyCode === 39 || event.keyCode === 38) {
            console.log('keyDown', event.keyCode);
            const position = this.options.indexOf(option);
            console.log(position);
            const nextItem = this.options[position + 1];
            console.log(event);
            const elements = this.elementRef.nativeElement.querySelectorAll('.radio-button__icon');
            const test = elements[position + 1];
            this.renderer.setAttribute(elements[position], 'focus', 'false');
            this.renderer.setAttribute(test, 'focus', 'true');

            console.log(elements);

            // this.renderer.setAttribute(event.srcElement, 'focus', 'true');
            // event.srcElement.console.log(position);
            this.optionClicked(nextItem);
            // event.preventDefault();
        }

        if (event.keyCode === 13 || event.keyCode === 32) {
            this.optionClicked(option);
            event.preventDefault();
        }
    }

    writeValue(optionValue: any): void {
        this.options.forEach(o => {
            o.selected = o.displayName === optionValue;
        });
    }

    registerOnChange(func: any): void {
        this.onChange = func;
    }

    registerOnTouched(func: any): void {
        this.onTouched = func;
    }

    onChange(input: any) {
    }

    onTouched() { }

    private selectOption(option: ISelectableItem) {
        option.selected = true;
        this.options.filter(x => x !== option).forEach(o => {
            o.selected = false;
        });

        this.selectedChanged.emit(option);
        this.onChange(option.displayName);
    }
}
