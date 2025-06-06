import {
  Component,
  forwardRef,
  ElementRef,
  Host,
  HostBinding,
  Input,
  OnChanges,
  Optional,
  AfterViewInit,
  SimpleChanges,
  SkipSelf,
  ChangeDetectorRef,
  OnDestroy,
  ViewChild
} from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Guid } from '../../utils/guid';
@Component({
    selector: 'vgr-textarea',
    templateUrl: './textarea.component.html',
    styleUrls: ['./textarea.component.scss'],
    providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextareaComponent),
            multi: true,
        }],
    standalone: false
})
export class TextareaComponent implements AfterViewInit, OnChanges, ControlValueAccessor, OnDestroy {

  @Input() showValidation = true;
  @Input() width: string;
  @Input() height: string;
  @Input() placeholder: string;
  @Input() formControlName: string;
  @Input() maxlength: number;
  @Input() value: string;
  @Input() labelId: string;
  @Input() disabled = false;

  @Input() @HostBinding('class.readonly') readonly?: boolean;

  @HostBinding('class.textarea-validation-error--active') get errorClass() {
    return this.showValidation && this.control && this.control.invalid && !this.hasFocus;
  }
  @HostBinding('class.textarea-validation-error--editing') get editingClass() {
    return this.showValidation && this.control && this.control.invalid && this.hasFocus;
  }

  @ViewChild('textareaElement') textareaElement: ElementRef;

  scrollHeight: string;
  control: AbstractControl;
  hasFocus = false;
  cancel: boolean;
  elementId: string;

  validationErrorMessage = 'Obligatoriskt';
  private ngUnsubscribe: any = new Subject();

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, private cdRef: ChangeDetectorRef, private el: ElementRef) {
    this.elementId = Guid.newGuid();
    this.width = '100%';
    this.height = '120px';
    this.placeholder = '';
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.formControlName) {
      this.control = this.controlContainer.control.get(this.formControlName);
      this.control.statusChanges
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe((status) => {
        });
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.scrollHeight = this.textareaElement.nativeElement.scrollHeight + 'px';
      this.cdRef.detectChanges();
    }, 25);
  }

  public focus() {
    this.textareaElement.nativeElement.focus();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(func: any) {
    this.onChange = func;
  }

  registerOnTouched(func: any) {
    this.onTouched = func;
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  onChange(input: any) {
    if (this.control) {
      this.control.setValue(input);
    }
  }

  onTouched(input: any) {
    if (this.control) {
      this.control.setValue(input);
    }
  }

  onBlur(event: Event) {
    event.stopPropagation();
    this.hasFocus = false;
    if (this.control) {
      this.control.markAsTouched();
      this.control.markAsDirty();
    }

    this.onTouched(this.value);
    this.scrollHeight = this.textareaElement.nativeElement.scrollHeight + 'px';
  }

  onFocus(event: Event): void {
    this.hasFocus = true;
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  get errorActive() {
    if (this.disabled || this.readonly) {
      return false;
    }
    const classes = this.el.nativeElement.classList;
    return this.showValidation && classes.contains('ng-invalid');
  }
}
