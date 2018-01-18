import {
    Component, Input, EventEmitter, Output, HostBinding, forwardRef, ElementRef, Renderer, OnChanges, AfterViewInit
} from '@angular/core';
import { SelectableItem } from '../../models/selectableItem.model';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
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

    public radiogroupItems: RadioGroupItem<any>[] = [];
    @Input() set options(items: SelectableItem<any>[]) {
        let newItem: RadioGroupItem<any>;
        items.forEach(item => {
            newItem = item as RadioGroupItem<any>;
            newItem.ariaid = Guid.newGuid();
            this.radiogroupItems.push(newItem);
        });
    }



    @Output() selectedChanged: EventEmitter<any> = new EventEmitter<any>();

    elements: any;
    get noSelectionFlag(): boolean {
        return this.radiogroupItems.every((x) => (x.selected === false || x.selected === undefined));
    }
    constructor(private elementRef: ElementRef, private renderer: Renderer) {
    }


    ngOnChanges() {
        if (this.radiogroupItems && this.radiogroupItems.length > 0) {
            const preSelectedOption = this.radiogroupItems.find(x => x.selected);
            if (preSelectedOption) {
                this.selectOption(preSelectedOption);
            }
        }
    }

    ngAfterViewInit() {
        this.elements = this.elementRef.nativeElement.querySelectorAll(':not(.radio-button--disabled) .radio-button__icon');

    }

    optionClicked(option: RadioGroupItem<any>) {
        if (this.disabled || option.disabled || option.selected) {
            return;
        }

        this.selectOption(option);
    }

    keyDown(event: KeyboardEvent, option: RadioGroupItem<any>): void {

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

    setFocus(option: RadioGroupItem<any>, direction?: string) {
        console.log('hej');
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

    private selectOption(option: RadioGroupItem<any>) {
        this.radiogroupItems.forEach(o => {
            o.selected = (o === option);
        });
        option.selected = true;
        //this.noSelectionFlag = false;
        this.onChange(option.value);
        this.selectedChanged.emit(option.value);
    }
}


export interface RadioGroupItem<TValue> extends SelectableItem<TValue> {
    ariaid?: string;
}


