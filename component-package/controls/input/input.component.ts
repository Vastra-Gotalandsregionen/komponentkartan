import { Component, Input, HostBinding, forwardRef, Host, EventEmitter, Output } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { DecimalPipe } from '@angular/common'
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { concat } from 'rxjs/observable/concat';

@Component({
    selector: 'vgr-input',
    moduleId: module.id,
    templateUrl: './input.component.html',

    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => InputComponent),
        multi: true
    }]

})
export class InputComponent implements ControlValueAccessor {
    @Input() isInvalid: boolean;

    @Input() @HostBinding('class.readonly') readonly?: boolean;
    @Input() @HostBinding('class.input--small') small: boolean;
    @Input() @HostBinding('class.align-right') alignRight: boolean;

    @Input() suffix: string;
    @Input() value: any;
    @Input() maxlength?: number;
    @Input() errormessage: string;

    @Output() blur: EventEmitter<any>;
    @Output() focus: EventEmitter<any>;

    @HostBinding('class.validated-input') hasClass = true;
    @HostBinding('class.validation-error--active') get errorClass() {
        return this.touched && this.isInvalid && !this.hasFocus;
    }
    @HostBinding('class.validation-error--editing') get editingClass() {
        return this.touched && this.isInvalid && this.hasFocus;
    }
    @HostBinding('class.validation-error--fixed') get fixedClass() {
        return this.invalidOnFocus && this.touched && !this.isInvalid && !this.hasFocus;
    }

    control: AbstractControl;
    hasFocus = false;
    touched = false;
    invalidOnFocus = false;

    constructor() {
        this.blur = new EventEmitter<any>();
        this.focus = new EventEmitter<any>();
    }

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

    onBlur(event: any): void {
        if (this.readonly) {
            return;
        }

        this.touched = true;
        this.hasFocus = false;
        this.blur.emit(event);
    }

    onFocus(): void {
        if (this.readonly) {
            return;
        }
        this.invalidOnFocus = this.isInvalid && this.touched;
        this.hasFocus = true;
        this.focus.emit(event);
    }
}
