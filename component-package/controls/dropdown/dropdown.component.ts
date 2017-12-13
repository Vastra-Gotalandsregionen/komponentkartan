import {
    Component, Input, AfterViewInit, ElementRef, OnChanges, Output, EventEmitter, ViewChild, HostBinding, ChangeDetectorRef, forwardRef, OnInit
} from '@angular/core';
import { IDropdownItem } from '../../models/dropdownItem.model';
import { FilterPipe } from '../../pipes/filterPipe';
import { DropdownItemToSelectedTextPipe } from '../../pipes/dropdownItemToSelectedTextPipe';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { DropdownBaseComponent } from '../dropdown-base/dropdown.base.component';
import { IValidationResult } from '../../models/validation.model';
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
    }]
})


export class DropdownComponent extends DropdownBaseComponent implements OnInit, OnChanges, ControlValueAccessor {

    get scrollLimit(): number {
        return this.filterVisible ? 7 : 8;
    }
    @Output() selectedItemChanged = new EventEmitter<IDropdownItem>();
    @Input() noItemSelectedLabel: string; // visas i dropdownboxen då man inte valt något

    @Input() set selectedValue(value: string) {
        console.log('selected value ', value);
        if (this.items) {
            const matchingItems = this.items.filter(x => x.id === value);
            if (matchingItems.length > 0) {
                this.handleInitiallySelectedItems(matchingItems);
            }
        }
    }

    selectedItem: IDropdownItem;

    constructor(elementRef: ElementRef, private changeDetectorRef: ChangeDetectorRef) {
        super(elementRef);
        this.noItemSelectedLabel = '';
    };

    ngOnInit() {
        //this.selectedValue = obj;
    }

    ngOnChanges() {
        this.showAllItem = {
            displayName: this.showAllItemText
        } as IDropdownItem;

        this.filterVisible = this.items && this.items.length > this.filterLimit;
        this.updateScrolled();
    }

    writeValue(obj: any): void {
        console.log('write value ', obj);
        this.selectedValue = obj;

    }

    registerOnChange(func: any): void {
        this.onChange = func;
    }

    registerOnTouched(func: any): void {
        this.onTouched = func;
    }

    onChange(input: any) {
        console.log('on change ', input);
    }

    onTouched() { }

    doValidate(): IValidationResult {
        const isValid = !this.required || this.selectedItem;
        return {
            isValid: isValid,
            validationError: isValid ? '' : 'Obligatoriskt'
        } as IValidationResult;
    }

    showAllItems() {

        this.preventCollapse = true;
        this.filter = '';
        this.filterTextboxComponent.clear();

    }


    selectItem(item: IDropdownItem) {
        if (!item) {
            return;
        }


        this.items.forEach(x => x.selected = false);
        item.selected = true;
        item.marked = true;

        this.selectedItemChanged.emit(item);

        // Utan detectchanges får man "Value was changed after is was checked" i browser console.
        this.selectedItem = item;
        this.changeDetectorRef.detectChanges();
        this.onChange(item.displayName);
        this.validate();
    }

    onMouseEnter(item: IDropdownItem) {
        this.items.forEach(x => x.marked = false);

        if (this.showAllItem) {
            this.showAllItem.marked = false;
        }

        item.marked = true;
    }

    onMouseLeave(item: IDropdownItem) {
        item.marked = false;
        if (this.selectedItem) {
            this.selectedItem.marked = true;
        }
    }

    protected handleInitiallySelectedItems(selectedItems: IDropdownItem[]): void {
        this.selectItem(selectedItems[0]);
    }
}
