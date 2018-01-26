import {
    Component, Input, AfterViewInit, ElementRef, OnChanges, Output, SimpleChange,
    EventEmitter, ViewChild, HostBinding, ChangeDetectorRef, forwardRef, OnInit,
    SkipSelf, Optional, Host
} from '@angular/core';
import { DropdownItem } from '../../models/dropdownItem.model';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { DropdownBaseComponent } from '../dropdown-base/dropdown.base.component';
import { IValidationResult } from '../../models/validation.model';
import { ValidationComponent } from '../../controls/validation/validation.component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ControlContainer } from '@angular/forms';

@Component({
    selector: 'vgr-dropdown',
    moduleId: module.id,
    templateUrl: './dropdown.component.html',
    styleUrls: ['../dropdown-base/dropdown.scrollbar.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => DropdownComponent),
        multi: true
    }, {
        provide: ValidationComponent,
        useExisting: forwardRef(() => DropdownComponent)
    }]
})

export class DropdownComponent extends DropdownBaseComponent implements OnChanges, OnInit, ControlValueAccessor {
    @Output() selectedChanged = new EventEmitter<DropdownItem<any>>();
    // @Input() showValidation: boolean;
    @Input() noItemSelectedLabel: string; // visas i dropdownboxen då man inte valt något

    @HostBinding('class.validation-error--active') get errorClass() {
        return this.control.invalid && this.control.touched && !this.hasFocus;
    }
    @HostBinding('class.validation-error--editing') get editingClass() {
        return this.control.invalid && this.control.touched && this.hasFocus;
    }

    selectedItem: DropdownItem<any>;
    hasFocus: boolean;
    validationErrorMessage: string;

    constructor( @Optional() @Host() @SkipSelf() private controlContainer: ControlContainer, elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
        super(elementRef);
        this.noItemSelectedLabel = '';
        this.validationErrorMessage = 'Obligatorisk';
        this.hasFocus = false;
    }

    ngOnChanges() {
        this.showAllItem = {
            displayName: this.showAllItemText
        } as DropdownItem<any>;

        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();
    }

    ngOnInit() {
        this.control = this.controlContainer.control.get(this.formControlName);
    }

    onLeave() {
        this.hasFocus = false;
    }

    onEnter() {
        this.control.markAsTouched();
        this.hasFocus = true;
    }

    writeValue(value: any): void {
        if (value && this.items) {
            const matchingItems = this.items.filter(x => x.value === value);
            if (matchingItems.length > 0) {
                this.handleInitiallySelectedItems(matchingItems);
            }
            this.onChange(value);
        }
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

    showAllItems() {
        this.preventCollapse = true;
        this.filter = '';
        this.filterTextboxComponent.clear();
    }

    selectItem(item: DropdownItem<any>) {
        if (!item) {
            return;
        }

        this.items.forEach(x => x.selected = false);
        item.selected = true;
        item.marked = true;

        this.selectedChanged.emit(item.value);

        // Utan detectchanges får man "Value was changed after is was checked" i browser console.
        this.selectedItem = item;
        this.control.setValue(item);
        this.changeDetectorRef.detectChanges();
        this.onChange(item.value);
    }

    onMouseEnter(item: DropdownItem<any>) {
        this.items.forEach(x => x.marked = false);

        if (this.showAllItem) {
            this.showAllItem.marked = false;
        }

        item.marked = true;
    }

    onMouseLeave(item: DropdownItem<any>) {
        item.marked = false;
        if (this.selectedItem) {
            this.selectedItem.marked = true;
        }
    }

    protected handleInitiallySelectedItems(selectedItems: DropdownItem<any>[]): void {
        this.selectItem(selectedItems[0]);
    }
}
