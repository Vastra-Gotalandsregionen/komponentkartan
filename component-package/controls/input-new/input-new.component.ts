import { Component, Input, HostBinding, OnInit, forwardRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'vgr-input-new',
    moduleId: module.id,
    templateUrl: './input-new.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputNewComponent),
        multi: true
    }]

})
export class InputNewComponent implements OnInit, ControlValueAccessor {
    @HostBinding('class.validated-input') hasClass = true;
    @Input() @HostBinding('class.readonly') readonly?: boolean;
    @Input() @HostBinding('class.input--small') small: boolean;
    @Input() @HostBinding('class.align-right') alignRight: boolean;

    @Input() control: FormControl;

    @HostBinding('class.validation-error--active') get validationErrorActive() {
        // TODO
        return this.control['blur'] && this.control.invalid && this.control.dirty;
    }
    @HostBinding('class.validation-error--editing') get validationErrorEditing() {
        // TODO
        return false;
    }
    @HostBinding('class.validation-error--fixed') get validationErrorFixed() {
        // TODO
        return false;
    }

    @Input() suffix: string;
    @Input() value: any;
    @Input() maxlength?: number;

    get validationErrorMessage(): string {
        return 'Fältet är ifyllt felaktigt';
    }

    doValidate: boolean;

    constructor() { }

    ngOnInit() { }

    writeValue(value: any) {
        if (value !== undefined) {
            this.value = value;
        }
    }

    registerOnChange(fn: any) {
        this.onChange = fn;
    }

    registerOnTouched(fn: any) {
        this.onTouched = fn;
    }

    onChange(input: any) {
        this.value = input;
    }

    onTouched() {
    }

    onLeave(): void {
        if (this.readonly) {
            return;
        }
        this.control['blur'] = true;
    }

    onFocus(): void {
        if (this.readonly) {
            return;
        }
        this.control['blur'] = false;
    }
}

