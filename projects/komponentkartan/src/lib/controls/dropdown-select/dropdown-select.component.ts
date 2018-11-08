import {
  Component, OnChanges, AfterContentInit, AfterViewInit, OnDestroy, ViewChild, ContentChildren, ElementRef, QueryList,
  Input, Output, EventEmitter, Optional, Host, SkipSelf, SimpleChanges, forwardRef
} from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PerfectScrollbarComponent, PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DropdownItemComponent } from './dropdown-item.component';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { ButtonComponent } from '../button/button.component';
import { Guid } from '../../utils/guid';

function _defaultCompare(o1: any, o2: any): boolean {
  return o1 === o2;
}

@Component({
  selector: 'vgr-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DropdownSelectComponent),
    multi: true
  }]
})
export class DropdownSelectComponent implements OnChanges, AfterContentInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  @Input() multi = false;
  @Input() small = false;
  @Input() deselectable = false;
  @Input() simpleLabel = false;
  @Input() noItemSelectedLabel = 'Välj';
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() showValidation = true;
  @Input() compareWith = _defaultCompare;
  @Input() formControl: AbstractControl;
  @Input() formControlName: string;

  @Output() selectedChanged = new EventEmitter<any>();

  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('header') header: ElementRef;
  @ViewChild('selectAll') selectAll: ElementRef;
  @ViewChild('deselectButton') deselectButton: ButtonComponent;
  @ViewChild(FilterTextboxComponent) filterTextbox: FilterTextboxComponent;
  @ContentChildren(DropdownItemComponent) items: QueryList<DropdownItemComponent>;

  expanded = false;
  filterVisible = false;
  allSelected = false;
  validationErrorMessage = 'Obligatorisk';
  labelledbyid: string = Guid.newGuid();
  label = this.noItemSelectedLabel;

  hasFocus: boolean;
  scrollbarConfig: PerfectScrollbarConfig;

  get errorActive() {
    return this.showValidation && this.formControl && this.formControl.invalid && !this.hasFocus;
  }

  get errorEditing() {
    return this.showValidation && this.formControl && this.formControl.invalid && this.hasFocus;
  }

  private ngUnsubscribe = new Subject();
  private ngUnsubscribeItems = new Subject();

  constructor(@Optional() @Host() @SkipSelf() private controlContainer: ControlContainer) {
    this.scrollbarConfig = new PerfectScrollbarConfig({ minScrollbarLength: 40 } as PerfectScrollbarConfigInterface);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['formControlName']) {
      if (this.formControlName && this.controlContainer) {
        this.formControl = this.controlContainer.control.get(this.formControlName);
      } else {
        this.formControl = null;
      }
    }
  }

  ngAfterContentInit() {
    this.setFilterVisibility();
    this.subscribeToItems();

    this.items.changes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(_ => {
        this.setFilterVisibility();
        this.subscribeToItems();
      });
  }

  ngAfterViewInit() {
    if (this.formControl) {
      setTimeout(() => {
        this.writeValue(this.formControl.value);
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
  }

  writeValue(value: any) {
    if (!this.items) {
      return;
    }

    if (this.multi) {
      const selectedItems: DropdownItemComponent[] = [];
      const values = value as any[];
      this.items.forEach(i => {
        if (values.some(v => this.compareWith(v, i.value))) {
          i.selected = true;
          selectedItems.push(i);
        } else {
          i.selected = false;
        }
      });
      this.setLabel(selectedItems);
    } else {
      let selectedItem: DropdownItemComponent;
      this.items.forEach(i => {
        if (this.compareWith(value, i.value)) {
          i.selected = true;
          selectedItem = i;
        } else {
          i.selected = false;
        }
      });
      this.label = selectedItem ? selectedItem.selectedLabel || selectedItem.label : this.noItemSelectedLabel;
    }
  }

  registerOnChange(func: (value: any) => any) {
    this.onChange = (value: any) => {
      this.selectedChanged.emit(value);
      func(value);
    };
  }

  registerOnTouched(func: () => any) {
    this.onTouched = func;
  }

  onChange(value: any) {
    this.selectedChanged.emit(value);
  }

  onTouched() { }

  toggleExpanded() {
    if (this.readonly || this.disabled) {
      return;
    }

    if (this.expanded) {
      this.collapse();
    } else {
      this.expand();
    }
  }

  filterItems(filterValue: string) {
    if (this.items) {
      this.items.forEach(item => {
        item.visible = item.label.toLowerCase().includes(filterValue.toLowerCase());
      });
    }

    // Scroll to top when filter is changed
    this.dropdown.nativeElement.querySelector('.ps').scrollTop = 0;
  }

  deselectItems() {
    const selecedItem = this.items.find(x => x.selected);
    if (selecedItem) {
      selecedItem.selected = false;
      this.label = this.noItemSelectedLabel;
      this.onChange(null);
    }
  }

  toggleSelectAll() {
    if (this.allSelected) {
      this.allSelected = false;
      this.items.forEach(x => x.selected = false);
      this.label = this.noItemSelectedLabel;
      this.onChange(null);
    } else {
      this.allSelected = true;
      this.items.forEach(x => x.selected = true);
      this.setLabel(this.items.toArray());
      const values = this.items.map(x => x.value);
      this.onChange(values);
    }
  }

  onFocus() {
    this.hasFocus = true;
  }

  onBlur(event: FocusEvent) {
    const dropdownElement = this.dropdown.nativeElement as HTMLElement;
    const focusedNode = event.relatedTarget as Node;
    if (dropdownElement.contains(focusedNode)) {
      return;
    }

    this.hasFocus = false;
    this.collapse(false);

    if (this.formControl) {
      setTimeout(() => {
        this.onTouched();
      });
    }
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'Down' || event.key === 'ArrowUp' || event.key === 'Up') {
      event.preventDefault();
    }

    if (event.altKey && (event.key === 'ArrowDown' || event.key === 'Down')) {
      this.expand();
    } else if (event.key === 'Escape' || event.key === 'Esc' ||
      event.altKey && (event.key === 'ArrowUp' || event.key === 'Up')) {
      this.collapse();
    } else if (event.key === 'Tab') {
      this.collapse(false);
    }
  }

  onHeaderKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      this.toggleExpanded();
    }
  }

  onFilterKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.stopPropagation();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      if (this.multi) {
        this.selectAll.nativeElement.focus();
      } else if (this.deselectable) {
        this.deselectButton.focus();
      } else if (this.items.length) {
        this.items.toArray()[0].focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      if (this.items.length) {
        this.items.toArray()[this.items.length - 1].focus();
      } else if (this.multi) {
        this.selectAll.nativeElement.focus();
      } else if (this.deselectable) {
        this.deselectButton.focus();
      }
    }
  }

  onDeselectKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'Down') {
      if (this.items.length) {
        this.items.toArray()[0].focus();
      } else if (this.filterVisible) {
        this.filterTextbox.focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      if (this.filterVisible) {
        this.filterTextbox.focus();
      } else if (this.items.length) {
        this.items.toArray()[this.items.length - 1].focus();
      }
    }
  }

  onSelectAllKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'Down') {
      if (this.items.length) {
        this.items.toArray()[0].focus();
      } else if (this.filterVisible) {
        this.filterTextbox.focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      if (this.filterVisible) {
        this.filterTextbox.focus();
      } else if (this.items.length) {
        this.items.toArray()[this.items.length - 1].focus();
      }
    }
  }

  private expand() {
    this.expanded = true;

    const selectedItems = this.items.filter(x => x.selected);
    if (selectedItems.length) {
      setTimeout(() => {
        selectedItems[0].focus();
      });
    } else if (this.items.length) {
      setTimeout(() => {
        this.items.toArray()[0].focus();
      });
    }
  }

  private collapse(focusHeader = true) {
    this.expanded = false;

    if (this.filterTextbox) {
      this.filterTextbox.clear();
    }

    if (focusHeader) {
      this.header.nativeElement.focus();
    }
  }

  private setFilterVisibility() {
    this.filterVisible = this.items && this.items.length > 20;
  }

  private subscribeToItems() {
    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
    this.ngUnsubscribeItems = new Subject();

    this.items.forEach((item, index) => {
      item.previous
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(() => this.focusPreviousItem(index));

      item.next
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(() => this.focusNextItem(index));

      item.selectedChanged
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(selected => {
          if (this.multi) {
            const selectedItems = this.items.filter(x => x.selected);
            if (selectedItems.length) {
              this.allSelected = selectedItems.length === this.items.length;
              this.setLabel(selectedItems);
              const values = selectedItems.map(x => x.value);
              this.onChange(values);
            } else {
              this.allSelected = false;
              this.label = this.noItemSelectedLabel;
              this.onChange(null);
            }
          } else {
            if (selected) {
              this.items.forEach(x => {
                if (x !== item) {
                  x.selected = false;
                }
              });
              this.label = item.selectedLabel || item.label;
              this.onChange(item.value);
            } else {
              item.selected = true;
            }
            this.collapse();
          }
        });
    });
  }

  private focusPreviousItem(itemIndex: number) {
    if (itemIndex > 0) {
      this.items.toArray()[itemIndex - 1].focus();
    } else if (this.multi) {
      this.selectAll.nativeElement.focus();
    } else if (this.deselectable) {
      this.deselectButton.focus();
    } else if (this.filterVisible) {
      this.filterTextbox.focus();
    } else {
      this.items.toArray()[this.items.length - 1].focus();
    }
  }

  private focusNextItem(itemIndex: number) {
    if (itemIndex < (this.items.length - 1)) {
      this.items.toArray()[itemIndex + 1].focus();
    } else if (this.filterVisible) {
      this.filterTextbox.focus();
    } else if (this.multi) {
      this.selectAll.nativeElement.focus();
    } else if (this.deselectable) {
      this.deselectButton.focus();
    } else {
      this.items.toArray()[0].focus();
    }
  }

  private setLabel(selectedItems: DropdownItemComponent[]) {
    if (this.simpleLabel) {
      if (!selectedItems.length) {
        this.label = this.noItemSelectedLabel;
      } else if (selectedItems.length === this.items.length) {
        this.label = 'Alla';
      } else if (selectedItems.length === 1) {
        this.label = '1 vald';
      } else {
        this.label = `${selectedItems.length} valda`;
      }
    } else {
      this.label = selectedItems
        .map(x => x.selectedLabel || x.label)
        .reduce((xs, x) => xs = `${xs}, ${x}`)
        || this.noItemSelectedLabel;
    }
  }
}
