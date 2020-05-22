import { Component, Input, EventEmitter, Output, OnChanges, forwardRef, SkipSelf, Optional, Host, ElementRef, AfterViewInit, SimpleChanges } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';
import { Guid } from '../../utils/guid';


@Component({
    selector: 'vgr-checkbox',
    templateUrl: './checkbox.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }]
})
export class CheckboxComponent implements ControlValueAccessor, OnChanges, AfterViewInit {
    @Input() disabled = false;
    @Input() checked = false;
    @Output() checkedChanged = new EventEmitter<boolean>();
    @Input() label: string;
    @Input() formControlName?: string;

    public control: AbstractControl;
    public labelledbyid: string = Guid.newGuid();
    public element: any;

    constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private elementRef: ElementRef) { }

    ngOnChanges(changes: SimpleChanges) {
        if (this.formControlName && this.controlContainer) {
            this.control = this.controlContainer.control.get(this.formControlName);
            this.setDisabledState(this.controlContainer.control.get(this.formControlName).disabled);
        }
    }
    setDisabledState(isDisabled: boolean) {
        this.disabled = isDisabled;
    }

    ngAfterViewInit() {
        this.element = this.elementRef.nativeElement.querySelector(':not(.checkbox--disabled) .checkbox__image');
    }

    onClick(event: Event): void {
        if (!this.disabled) {
            this.checked = !this.checked;
            if (this.element) { this.element.focus(); }
            this.onChange(this.checked);
            this.checkedChanged.emit(this.checked);
            event.stopPropagation();
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        if ([' ', 'Spacebar', 'Enter'].includes(event.key)) {
            this.onClick(event);
            event.preventDefault();
            event.stopPropagation();
        }
    }

    onLeave() {
        if (this.control) {
            this.control.markAsTouched();
            this.control.markAsDirty();
            if (this.control.updateOn === 'blur') {
                this.control.setValue(this.checked);
            }
        }
    }

    writeValue(value: any): void {
        this.checked = value;
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
}
