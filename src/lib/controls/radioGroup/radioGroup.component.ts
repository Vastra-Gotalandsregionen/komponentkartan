import {
    Component, Input, EventEmitter, Output, HostBinding, forwardRef, ElementRef, Renderer, OnChanges, AfterViewInit,
    SkipSelf, Optional, Host
} from '@angular/core';
import { SelectableItem } from '../../models/selectableItem.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';
import { Guid } from '../../utils/guid';

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


export class RadioGroupComponent implements ControlValueAccessor, OnChanges, AfterViewInit {
    @HostBinding('class.radio-group') hasClass = true;
    @HostBinding('attr.role') role = 'radiogroup';
    @Input() @HostBinding('class.disabled') disabled: boolean;
    @Input() formControlName?: string;
    @Input() set options(items: SelectableItem<any>[]) {
        const _items = JSON.parse(JSON.stringify(items));

        let newItem: RadioGroupItem<any>;
        _items.forEach(item => {
            newItem = item as RadioGroupItem<any>;
            newItem.ariaid = Guid.newGuid();
            this.radiogroupItems.push(newItem);
        });
    }

    @Output() selectedChanged: EventEmitter<any> = new EventEmitter<any>();
    public radiogroupItems: RadioGroupItem<any>[] = [];
    public control: AbstractControl;
    public elements: any;
    public selectedOption: RadioGroupItem<any>;

    get noSelectionFlag(): boolean {
        return this.radiogroupItems.every((x) => (x.selected === false || x.selected === undefined));
    }

    get classRenderer(): Renderer {
        return this.renderer;
    }

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private elementRef: ElementRef, private renderer: Renderer) {
    }

    ngOnChanges() {
        if (this.radiogroupItems && this.radiogroupItems.length > 0) {
            const preSelectedOption = this.radiogroupItems.find(x => x.selected);
            if (preSelectedOption) {
                this.selectOption(preSelectedOption);
            }
        }

        if (this.formControlName && this.controlContainer) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
    }

    ngAfterViewInit() {
        this.elements = this.elementRef.nativeElement.querySelectorAll(':not(.radio-button--disabled) .radio-button__icon');
    }

    optionClicked(option: RadioGroupItem<any>) {
        if (this.disabled || option.disabled) {
            return;
        }

        if (!option.selected) {
            this.selectOption(option);
        }

        if (this.renderer) {
            const position = this.radiogroupItems.indexOf(option);
            this.renderer.invokeElementMethod(this.elements[position], 'focus');
        }
    }

    keyDown(event: KeyboardEvent, option: RadioGroupItem<any>): void {

        if (event.keyCode === 13 || event.keyCode === 32) {
            this.optionClicked(option);
            event.preventDefault();
        }

        if (event.keyCode === 39 || event.keyCode === 40) {
            this.setFocus(option, 'forward');
            event.preventDefault();
        }

        if (event.keyCode === 37 || event.keyCode === 38) {
            this.setFocus(option, 'back');
            event.preventDefault();
        }
    }

    setFocus(option: RadioGroupItem<any>, direction?: string) {
        const position = this.radiogroupItems.indexOf(option);
        const nextItem = this.radiogroupItems[position + 1];
        const previousItem = this.radiogroupItems[position - 1];

        const enabledOptions = this.radiogroupItems.filter(x => !x.disabled);
        if (direction === 'forward') {
            if (position + 1 === enabledOptions.length) {
                this.renderer.invokeElementMethod(this.elements[0], 'focus');
                this.optionClicked(enabledOptions[0]);
            } else {
                this.renderer.invokeElementMethod(this.elements[position + 1], 'focus');
                this.optionClicked(nextItem);
            }
        } else if (direction === 'back') {
            if (position === 0) {
                this.renderer.invokeElementMethod(this.elements[this.radiogroupItems.length - 1], 'focus');
                this.optionClicked(this.radiogroupItems[enabledOptions.length - 1]);
            } else {
                this.renderer.invokeElementMethod(this.elements[position - 1], 'focus');
                this.optionClicked(previousItem);
            }
        }
    }

    checkTabFocus(index: number) {
        return !this.radiogroupItems[index].disabled && (this.radiogroupItems[index].selected || (index === 0 && this.noSelectionFlag));
    }

    writeValue(option: any): void {
        if (option) {
            const preSelectedOption = this.radiogroupItems.find(x => x.value === option);
            if (preSelectedOption) {
                this.selectOption(preSelectedOption);
            }
        } else {
            this.radiogroupItems.forEach(o => {
                o.selected = false;
            });
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

    onLeave() {
        if (this.control) {
            this.control.markAsTouched();
            this.control.markAsDirty();
            if (this.control.updateOn === 'blur' && this.selectedOption && this.selectedOption.value) {
                this.control.setValue(this.selectedOption.value);
            }
        }
    }

    private selectOption(option: RadioGroupItem<any>) {
        this.selectedOption = option;
        this.radiogroupItems.forEach(o => {
            o.selected = (o === option);
        });
        option.selected = true;
        this.onChange(option.value);
        this.selectedChanged.emit(option.value);
    }
}

export interface RadioGroupItem<TValue> extends SelectableItem<TValue> {
    ariaid?: string;
}


