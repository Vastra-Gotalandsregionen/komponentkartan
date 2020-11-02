import {
  Component, OnChanges, AfterContentInit, AfterViewInit, OnDestroy, ViewChild, ContentChildren, ElementRef, QueryList,
  Input, Output, EventEmitter, Optional, SimpleChanges, Self
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { DropdownItemComponent } from './dropdown-item.component';
import { ButtonComponent } from '../button/button.component';
import { Guid } from '../../utils/guid';
import { InputComponent } from '../input/input.component';

function _defaultCompare(o1: any, o2: any): boolean {
  return o1 === o2;
}

@Component({
  selector: 'vgr-dropdown-select',
  templateUrl: './dropdown-select.component.html',
  styleUrls: ['./dropdown-select.component.scss']
})
export class DropdownSelectComponent implements OnChanges, AfterContentInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  @Input() multi = false;
  @Input() deselectable = false;
  @Input() simpleLabel = false;
  @Input() noItemSelectedLabel = 'Välj';
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() showValidation = true;
  @Input() errorMessage = {};
  @Input() compareWith = _defaultCompare;
  @Input() labelId: string;
  @Input() value: any;
  @Input() width: string;
  @Input() small = false;

  @Output() selectedChanged = new EventEmitter<any>();
  @Output() expandedChanged = new EventEmitter<boolean>();

  @ViewChild('dropdown', { static: true }) dropdown: ElementRef;
  @ViewChild('header', { static: true }) header: ElementRef;
  @ViewChild('selectAll', { static: false }) selectAll: ElementRef;
  @ViewChild('deselectButton', { static: false }) deselectButton: ButtonComponent;
  @ViewChild(InputComponent, { static: false }) filter: InputComponent;
  @ContentChildren(DropdownItemComponent) items: QueryList<DropdownItemComponent>;

  expanded = false;
  filterVisible = false;
  allSelected = false;
  deselectDisabled = true;
  headerLabelId = Guid.newGuid();
  label = this.noItemSelectedLabel;

  hasFocus: boolean;
  filterHasFocus: boolean;
  scrollbarConfig: PerfectScrollbarConfig;
  visibleCount: number;
  searchString = '';

  private matchQuery = '';

  get combinedLabelIds() {
    return `${this.labelId} ${this.headerLabelId}`;
  }

  get errorActive() {
    return this.showValidation && this.formControl && this.formControl.invalid && !this.hasFocus;
  }

  get errorEditing() {
    return this.showValidation && this.formControl && this.formControl.invalid && this.hasFocus;
  }

  private ngUnsubscribe = new Subject();
  private ngUnsubscribeItems = new Subject();

  constructor(@Optional() @Self() public formControl: NgControl) {
    if (this.formControl != null) {
      this.formControl.valueAccessor = this;
    }
    this.scrollbarConfig = new PerfectScrollbarConfig(
      {
        minScrollbarLength: 40,
        wheelPropagation: false
      } as PerfectScrollbarConfigInterface
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.value && !changes.value.firstChange) {
      this.onChange(changes.value.currentValue);
      this.setSelectedState(changes.value.currentValue);
    }

    if (changes.multi && this.items) {
      this.setMultiOnItems();
    }

    if (changes.noItemSelectedLabel && changes.noItemSelectedLabel.firstChange || (this.items && !this.items.some(item => item.selected))) {
      this.label = this.noItemSelectedLabel;
    }
  }

  ngAfterContentInit() {
    this.setFilterVisibility();
    this.subscribeToItems();
    if (this.multi) {
      this.setMultiOnItems();
    }

    this.items.changes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(_ => {
        this.setFilterVisibility();
        this.subscribeToItems();
        if (this.multi) {
          this.setMultiOnItems();
        }
        setTimeout(() => {
          this.setSelectedState(this.value);
        });
      });
  }

  ngAfterViewInit() {
    if (this.formControl) {
      setTimeout(() => {
        this.setSelectedState(this.formControl.value);
      });
    } else {
      setTimeout(() => {
        this.setSelectedState(this.value);
      });
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
  }

  public focus() {
    this.header.nativeElement.focus();
  }

  writeValue(value: any) {
    this.value = value;
    this.selectedChanged.emit(this.value);

    if (!this.items) {
      return;
    }

    this.setSelectedState(this.value);
  }

  registerOnChange(func: (value: any) => any) {
    this.onChange = (value: any) => {
      this.value = value;
      this.selectedChanged.emit(value);
      func(value);
    };
  }

  registerOnTouched(func: () => any) {
    this.onTouched = func;
  }

  onChange(value: any) {
    this.value = value;
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

  filterItems() {
    const value = this.searchString;

    if (this.items) {
      this.items.forEach(item => {
        item.visible = item.label.toLowerCase().includes(value.toLowerCase());
      });
      this.visibleCount = this.items.filter(e => e.visible).length;
      this.updateAllCheckedStatus();
    }

    // Scroll to top when filter is changed
    this.dropdown.nativeElement.querySelector('.ps').scrollTop = 0;
  }

  deselectItems() {
    const selecedItem = this.items.find(item => item.selected);
    if (selecedItem) {
      selecedItem.selected = false;
      this.label = this.noItemSelectedLabel;
      this.deselectDisabled = true;
      this.onChange(null);
    }
    this.collapse();
  }

  toggleSelectAll() {
    if (!this.multi) {
      return;
    }
    this.items.filter(i => i.visible).forEach(item => item.selected = !this.allSelected);
    this.setLabel(Array.from(this.items.filter(i => i.selected)));
    this.updateAllCheckedStatus();
    let values;
    if (this.items) {
      values = this.items.filter(i => i.selected).map(item => item.value).length > 0 ? this.items.filter(i => i.selected).map(item => item.value) : null;
    } else {
      values = null;
    }
    this.onChange(values);
  }

  updateAllCheckedStatus() {
    if (this.items) {
      const selected = Array.from(this.items.filter(i => i.selected));
      const visible = Array.from(this.items.filter(i => i.visible));
      this.allSelected = visible.every(i => selected.includes(i));
    } else {
      this.allSelected = false;
    }
    // this.allSelected = this.items && this.items.filter(i => i.visible).length === this.items.filter(i => i.selected).length;
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
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'ArrowDown' || event.key === 'Down' ||
      event.key === 'ArrowUp' || event.key === 'Up' ||
      event.key === ' ' || event.key === 'Spacebar') {
      event.preventDefault();
    }

    if (event.key === 'Escape' || event.key === 'Esc') {
      this.collapse();
    } else if (event.key === 'Tab') {
      this.collapse();
    } else if (this.multi && event.ctrlKey && event.key === 'a') {
      event.preventDefault();
      this.toggleSelectAll();
    } else if (event.key === 'Home') {
      event.preventDefault();
      if (this.filterVisible) {
        setTimeout(() => {
          this.filter.focus();
        });
      } else {
        const filteredItems = this.items.filter(item => item.visible);
        if (filteredItems.length) {
          setTimeout(() => {
            filteredItems[0].focus();
          });
        }
      }
    } else if (event.key === 'End') {
      event.preventDefault();
      const filteredItems = this.items.filter(item => item.visible);
      if (filteredItems.length) {
        setTimeout(() => {
          filteredItems[filteredItems.length - 1].focus();
        });
      }
    }
  }

  onHeaderKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.expand();

      const selectedItems = this.items.filter(item => item.selected);
      if (selectedItems.length) {
        setTimeout(() => {
          selectedItems[0].focus();
        });
      } else if (this.filterVisible) {
        setTimeout(() => {
          this.filter.focus();
        });
      } else if (this.items.length) {
        setTimeout(() => {
          this.items.toArray()[0].focus();
        });
      }
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      this.expand();

      let lastSelectedIndex = -1;
      const itemsArray = this.items.toArray();
      for (let index = itemsArray.length - 1; index >= 0; index--) {
        if (itemsArray[index].selected) {
          lastSelectedIndex = index;
          break;
        }
      }
      if (lastSelectedIndex >= 0) {
        const focusedIndex = lastSelectedIndex < this.items.length - 1
          ? lastSelectedIndex + 1
          : lastSelectedIndex;
        setTimeout(() => {
          itemsArray[focusedIndex].focus();
        });
      } else if (this.filterVisible) {
        setTimeout(() => {
          this.filter.focus();
        });
      } else if (this.items.length) {
        setTimeout(() => {
          itemsArray[0].focus();
        });
      }
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      this.expand();

      let firstSelectedIndex = -1;
      const itemsArray = this.items.toArray();
      for (let index = 0; index < itemsArray.length; index++) {
        if (itemsArray[index].selected) {
          firstSelectedIndex = index;
          break;
        }
      }
      if (firstSelectedIndex >= 0) {
        const focusedIndex = firstSelectedIndex > 0
          ? firstSelectedIndex - 1
          : 0;
        setTimeout(() => {
          itemsArray[focusedIndex].focus();
        });
      } else if (this.filterVisible) {
        setTimeout(() => {
          this.filter.focus();
        });
      } else if (this.items.length) {
        setTimeout(() => {
          itemsArray[0].focus();
        });
      }
    }
  }

  onFilterFocus() {
    this.filterHasFocus = true;
  }

  onFilterBlur() {
    this.filterHasFocus = false;
  }

  onFilterKeydown(event: KeyboardEvent) {
    const filteredItems = this.items.filter(item => item.visible);

    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.stopPropagation();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      if (this.multi) {
        this.selectAll.nativeElement.focus();
      } else if (this.deselectable) {
        this.deselectButton.focus();
      } else if (filteredItems.length) {
        filteredItems[0].focus();
      }
    }
  }

  onDeselectKeydown(event: KeyboardEvent) {
    const filteredItems = this.items.filter(item => item.visible);

    if (event.key === ' ' || event.key === 'Spacebar') {
      this.deselectItems();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      if (filteredItems.length) {
        filteredItems[0].focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      if (this.filterVisible) {
        this.filter.focus();
      }
    }
  }

  onSelectAllKeydown(event: KeyboardEvent) {
    const filteredItems = this.items.filter(item => item.visible);

    if (event.key === 'ArrowDown' || event.key === 'Down') {
      if (filteredItems.length) {
        filteredItems[0].focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      if (this.filterVisible) {
        this.filter.focus();
      }
    } else if (event.key === ' ' || event.key === 'Spacebar') {
      this.toggleSelectAll();
    } else if (event.key === 'Enter') {
      this.toggleSelectAll();
      this.collapse();
    }
  }

  private expand() {
    this.expanded = true;
    this.expandedChanged.emit(true);
  }

  private collapse(focusHeader = true) {
    this.expanded = false;

    if (this.filter) {
      this.filter.value = '';
      this.filterItems();
    }

    if (focusHeader) {
      this.header.nativeElement.focus();
    }

    if (this.formControl) {
      this.onTouched();
    }

    this.expandedChanged.emit(false);
  }

  private setFilterVisibility() {
    this.filterVisible = this.items && this.items.length > 20;
    this.visibleCount = this.items.length;
  }

  private setMultiOnItems() {
    this.items.forEach(item => item.multi = this.multi);
  }

  private subscribeToItems() {
    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
    this.ngUnsubscribeItems = new Subject();

    this.items.forEach(item => {
      item.previous
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(() => this.focusPreviousItem(item));

      item.next
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(() => this.focusNextItem(item));

      item.nextMatch
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(value => this.focusNextMatchingItem(item, value));

      item.toggle
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(() => {
          const selectedItems = this.items.filter(i => i.selected);
          if (selectedItems.length) {
            this.updateAllCheckedStatus();
            this.setLabel(selectedItems);
            const values = selectedItems.map(i => i.value);
            this.onChange(values);
          } else {
            this.allSelected = false;
            this.label = this.noItemSelectedLabel;
            this.onChange(null);
          }
        });

      item.confirm
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(() => {
          if (this.multi) {
            const selectedItems = this.items.filter(i => i.selected);
            this.updateAllCheckedStatus();
            this.setLabel(selectedItems);
            const values = selectedItems.map(i => i.value);
            this.onChange(values);
          } else {
            this.items.forEach(x => {
              if (x !== item) {
                x.selected = false;
              }
            });
            this.label = item.selectedLabel || item.label;
            this.deselectDisabled = false;
            this.onChange(item.value);
          }
          this.collapse();
        });
    });
  }

  private focusPreviousItem(item: DropdownItemComponent) {
    const filteredItems = this.items.filter(i => i.visible);
    const itemIndex = filteredItems.findIndex(i => i === item);

    if (itemIndex > 0) {
      filteredItems[itemIndex - 1].focus();
    } else if (this.multi) {
      this.selectAll.nativeElement.focus();
    } else if (this.deselectable) {
      this.deselectButton.focus();
    } else if (this.filterVisible) {
      this.filter.focus();
    }
  }

  private focusNextItem(item: DropdownItemComponent) {
    const filteredItems = this.items.filter(i => i.visible);
    const itemIndex = filteredItems.findIndex(i => i === item);

    if (itemIndex < (filteredItems.length - 1)) {
      filteredItems[itemIndex + 1].focus();
    }
  }

  private focusNextMatchingItem(item: DropdownItemComponent, query: string) {
    if (!this.matchQuery) {
      setTimeout(() => {
        const filteredItems = this.items.filter(i => i.visible);
        const itemIndex = filteredItems.findIndex(i => i === item);

        const match =
          filteredItems.slice(itemIndex + 1)
            .concat(filteredItems.slice(0, itemIndex))
            .find(i => i.label.toLowerCase().startsWith(this.matchQuery));

        if (match) {
          const matchIndex = filteredItems.findIndex(i => i === match);
          filteredItems[matchIndex].focus();
        }

        this.matchQuery = '';
      }, 300);
    }

    this.matchQuery += query;
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
      const labels = selectedItems.map(item => item.selectedLabel || item.label);
      if (labels.length) {
        this.label = labels.reduce((xs, x) => xs = `${xs}, ${x}`);
      } else {
        this.label = this.noItemSelectedLabel;
      }
    }
  }

  private setSelectedState(value: any) {
    if (this.multi) {
      const selectedItems: DropdownItemComponent[] = [];
      const values = value as any[] || [];
      this.items.forEach(i => {
        if (values.some(v => this.compareWith(v, i.value))) {
          i.selected = true;
          selectedItems.push(i);
        } else {
          i.selected = false;
        }
      });
      this.updateAllCheckedStatus();
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
      if (value) {
        this.deselectDisabled = false;
      } else {
        this.deselectDisabled = true;
      }
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }
}
