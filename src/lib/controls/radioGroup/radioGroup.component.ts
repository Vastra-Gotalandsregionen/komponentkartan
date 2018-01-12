import {
    Component, Input, EventEmitter, Output, AfterViewInit,
    OnChanges, HostBinding, forwardRef, ElementRef, Renderer
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
export class RadioGroupComponent implements OnChanges, ControlValueAccessor {
    @HostBinding('class.radio-group') hasClass = true;
    @HostBinding('attr.role') role = 'radiogroup';
    @Input() @HostBinding('class.disabled') disabled: boolean;
    @Input() options: ISelectableItem[];
    @Input() noSelection: boolean;
    @Output() selectedChanged: EventEmitter<ISelectableItem> = new EventEmitter<ISelectableItem>();

    noSelectionFlag: boolean;

    constructor(private elementRef: ElementRef, private renderer: Renderer) {
    }

    ngOnChanges(changes) {
        const noSelectedItems = this.options.every((x) => x.selected === false);
        this.noSelectionFlag = this.noSelection || noSelectedItems;

        if (!this.noSelectionFlag && this.options && this.options.length > 0) {
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
        if (event.keyCode === 9) {
            this.setFocus();
            // event.preventDefault();
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

        if (this.noSelectionFlag) {
            this.renderer.invokeElementMethod(elements[0], 'focus');
            this.optionClicked(this.options[0]);
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
