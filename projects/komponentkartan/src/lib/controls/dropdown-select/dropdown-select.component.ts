import {
  Component,
  OnChanges,
  AfterContentInit,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ContentChildren,
  ElementRef,
  QueryList,
  Input,
  Output,
  EventEmitter,
  HostListener,
  HostBinding,
  forwardRef,
  Optional,
  Host,
  SkipSelf,
  SimpleChanges
} from '@angular/core';
import { DropdownItemComponent } from '../dropdown-item/dropdown-item.component';
import { FilterTextboxComponent } from '../filterTextbox/filterTextbox.component';
import { Guid } from '../../utils/guid';
import { PerfectScrollbarComponent, PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  @ViewChild('deselect') deselect: ElementRef;
  @ViewChild(FilterTextboxComponent) filterTextbox: FilterTextboxComponent;
  @ContentChildren(DropdownItemComponent) items: QueryList<DropdownItemComponent>;

  expanded = false;
  filterVisible = false;
  validationErrorMessage = 'Obligatorisk';
  labelledbyid: string = Guid.newGuid();

  label: string;
  hasFocus: boolean;
  scrollbarConfig: PerfectScrollbarConfig;

  get errorActive() {
    return this.showValidation && this.formControl && this.formControl.invalid && !this.hasFocus;
  }

  get errorEditing() {
    return this.showValidation && this.formControl && this.formControl.invalid && this.hasFocus;
  }

  private ngUnsubscribe = new Subject();

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
  }

  writeValue(value: any) {
    if (!this.items) {
      return;
    }

    if (this.multi) {
      const items: DropdownItemComponent[] = [];
      const values = value as any[];
      this.items.forEach(i => {
        if (values.some(v => this.compareWith(v, i.value))) {
          i.selected = true;
          items.push(i);
        } else {
          i.selected = false;
        }
      });
      this.setLabel(items);
    } else {
      let item: DropdownItemComponent;
      this.items.forEach(i => {
        if (this.compareWith(value, i.value)) {
          i.selected = true;
          item = i;
        } else {
          i.selected = false;
        }
      });
      this.label = item ? item.selectedLabel || item.label : this.noItemSelectedLabel;
    }
  }

  registerOnChange(func: any) {
    this.onChange = func;
  }

  registerOnTouched(func: any) {
    this.onTouched = func;
  }

  onChange(_: any) { }

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
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      if (this.expanded) {
        if (this.filterVisible) {
          this.filterTextbox.focus();
        } else if (this.deselectable) {
          this.deselect.nativeElement.focus();
        } else if (this.items.length) {
          this.items.toArray()[0].focus();
        }
      }
    }
  }

  onFilterKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.stopPropagation();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      if (this.deselectable) {
        this.deselect.nativeElement.focus();
      } else if (this.items.length) {
        this.items.toArray()[0].focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      if (this.items.length) {
        this.items.toArray()[this.items.length - 1].focus();
      } else if (this.deselectable) {
        this.deselect.nativeElement.focus();
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

  private expand() {
    this.expanded = true;

    const selectedItems = this.items.filter(x => x.selected);
    if (selectedItems.length) {
      setTimeout(() => {
        selectedItems[0].focus();
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
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe = new Subject();

    this.items.forEach((item, index) => {
      item.previous
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => this.focusPreviousItem(index));

      item.next
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(() => this.focusNextItem(index));

      item.selectedChanged
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(selected => {
          if (this.multi) {
            const selectedItems = this.items.filter(x => x.selected);
            if (selectedItems.length) {
              this.setLabel(selectedItems);
              const values = selectedItems.map(x => x.value);
              this.onChange(values);
            } else {
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
              this.label = this.noItemSelectedLabel;
              this.onChange(null);
            }
            this.collapse();
          }
        });
    });
  }

  private focusPreviousItem(itemIndex: number) {
    if (itemIndex > 0) {
      this.items.toArray()[itemIndex - 1].focus();
    } else if (this.deselectable) {
      this.deselect.nativeElement.focus();
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
    } else if (this.deselectable) {
      this.deselect.nativeElement.focus();
    } else {
      this.items.toArray()[0].focus();
    }
  }

  private setLabel(items: DropdownItemComponent[]) {
    if (this.simpleLabel) {
      this.label = items.length
        ? items.length === 1
          ? `${items.length} vald`
          : `${items.length} valda`
        : this.noItemSelectedLabel;
    } else {
      this.label = items
        .map(x => x.selectedLabel || x.label)
        .reduce((xs, x) => xs = `${xs}, ${x}`)
        || this.noItemSelectedLabel;
    }
  }
}
