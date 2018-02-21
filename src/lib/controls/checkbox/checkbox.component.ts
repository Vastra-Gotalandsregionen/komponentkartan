import {
    Component, Input, EventEmitter, Output, OnChanges, HostBinding, forwardRef, SkipSelf,
    Optional, Host, ElementRef, Renderer, AfterViewInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer, AbstractControl } from '@angular/forms';
import { Guid } from '../../utils/guid';


@Component({
    selector: 'vgr-checkbox',
    moduleId: module.id,
    templateUrl: './checkbox.component.html',
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => CheckboxComponent),
        multi: true
    }]
})
export class CheckboxComponent implements ControlValueAccessor, OnChanges, AfterViewInit {
    @Input() disabled: boolean;
    @Input() checked: boolean;
    @Output() checkedChanged = new EventEmitter<boolean>();
    @Input() label: string;
    @Input() formControlName?: string;

    public control: AbstractControl;
    public labelledbyid: string = Guid.newGuid();
    public element: any;

    constructor( @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private elementRef: ElementRef, private renderer: Renderer) {
        this.disabled = false;
        this.checked = false;

    }

    ngOnChanges() {
        if (this.formControlName && this.controlContainer) {
            this.control = this.controlContainer.control.get(this.formControlName);
        }
    }

    ngAfterViewInit() {
        this.element = this.elementRef.nativeElement.querySelector(':not(.checkbox--disabled) .checkbox__image');
    }

    onClick(): void {
        if (!this.disabled) {
            this.checked = !this.checked;
            if (this.element) { this.renderer.invokeElementMethod(this.element, 'focus'); }
            this.onChange(this.checked);
            this.checkedChanged.emit(this.checked);
        }
    }

    onKeyDown(event: KeyboardEvent): void {
        if (event.keyCode === 13 || event.keyCode === 32) {
            this.onClick();
            event.preventDefault();
            event.cancelBubble = true;
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
