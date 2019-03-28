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

function _defaultCompare(o1: any, o2: any): boolean {
  return o1 === o2;
}

@Component({
  selector: 'vgr-dropdown-select',
  templateUrl: './dropdown-select.component.html'
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
  @Input() labelId: string;

  @Output() selectedChanged = new EventEmitter<any>();

  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('header') header: ElementRef;
  @ViewChild('selectAll') selectAll: ElementRef;
  @ViewChild('deselectButton') deselectButton: ButtonComponent;
  @ViewChild('filter') filter: ElementRef;
  @ContentChildren(DropdownItemComponent) items: QueryList<DropdownItemComponent>;

  expanded = false;
  filterVisible = false;
  allSelected = false;
  deselectDisabled = true;
  validationErrorMessage = 'Obligatorisk';
  headerLabelId = Guid.newGuid();
  label = this.noItemSelectedLabel;
  selectAllLabel = 'Markera alla';
  deselectAllLabel = 'Avmarkera alla';
  toggleSelectAllLabel = this.selectAllLabel;

  hasFocus: boolean;
  filterHasFocus: boolean;
  scrollbarConfig: PerfectScrollbarConfig;

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

  constructor(@Optional() @Self() private formControl: NgControl) {
    if (this.formControl != null) {
      this.formControl.valueAccessor = this;
    }
    this.scrollbarConfig = new PerfectScrollbarConfig({ minScrollbarLength: 40 } as PerfectScrollbarConfigInterface);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['multi'] && this.items) {
      this.setMultiOnItems();
    }

    if (changes['noItemSelectedLabel'] && changes['noItemSelectedLabel'].firstChange || (this.items && !this.items.some(x => x.selected))) {
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
        if (this.formControl) {
          setTimeout(() => {
            this.writeValue(this.formControl.value);
          });
        } else {
          setTimeout(() => {
            this.selectDefaultItems();
          });
        }
      });
  }

  ngAfterViewInit() {
    if (this.formControl) {
      setTimeout(() => {
        this.writeValue(this.formControl.value);
      });
    } else {
      setTimeout(() => {
        this.selectDefaultItems();
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
      const values = value as any[] || [];
      this.items.forEach(i => {
        if (values.some(v => this.compareWith(v, i.value))) {
          i.selected = true;
          selectedItems.push(i);
        } else {
          i.selected = false;
        }
      });
      this.allSelected = this.items.length && this.items.length === selectedItems.length;
      this.toggleSelectAllLabel = this.allSelected ? this.deselectAllLabel : this.selectAllLabel;
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
      this.expanded = true;
    }
  }

  filterItems() {
    const value = this.filter.nativeElement.value;

    if (this.items) {
      this.items.forEach(item => {
        item.visible = item.label.toLowerCase().includes(value.toLowerCase());
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
      this.deselectDisabled = true;
      this.onChange(null);
    }
    this.collapse();
  }

  toggleSelectAll() {
    if (this.allSelected) {
      this.allSelected = false;
      this.items.forEach(x => x.selected = false);
      this.label = this.noItemSelectedLabel;
      this.toggleSelectAllLabel = this.selectAllLabel;
      this.onChange(null);
    } else {
      this.allSelected = true;
      this.items.forEach(x => x.selected = true);
      this.setLabel(this.items.toArray());
      this.toggleSelectAllLabel = this.deselectAllLabel;
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
          this.filter.nativeElement.focus();
        });
      } else {
        const filteredItems = this.items.filter(x => x.visible);
        if (filteredItems.length) {
          setTimeout(() => {
            filteredItems[0].focus();
          });
        }
      }
    } else if (event.key === 'End') {
      event.preventDefault();
      const filteredItems = this.items.filter(x => x.visible);
      if (filteredItems.length) {
        setTimeout(() => {
          filteredItems[filteredItems.length - 1].focus();
        });
      }
    }
  }

  onHeaderKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.expanded = true;

      const selectedItems = this.items.filter(x => x.selected);
      if (selectedItems.length) {
        setTimeout(() => {
          selectedItems[0].focus();
        });
      } else if (this.filterVisible) {
        setTimeout(() => {
          this.filter.nativeElement.focus();
        });
      } else if (this.items.length) {
        setTimeout(() => {
          this.items.toArray()[0].focus();
        });
      }
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      this.expanded = true;

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
          this.filter.nativeElement.focus();
        });
      } else if (this.items.length) {
        setTimeout(() => {
          itemsArray[0].focus();
        });
      }
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      this.expanded = true;

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
          this.filter.nativeElement.focus();
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
    const filteredItems = this.items.filter(x => x.visible);

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
    const filteredItems = this.items.filter(x => x.visible);

    if (event.key === ' ' || event.key === 'Spacebar') {
      this.deselectItems();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      if (filteredItems.length) {
        filteredItems[0].focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      if (this.filterVisible) {
        this.filter.nativeElement.focus();
      }
    }
  }

  onSelectAllKeydown(event: KeyboardEvent) {
    const filteredItems = this.items.filter(x => x.visible);

    if (event.key === 'ArrowDown' || event.key === 'Down') {
      if (filteredItems.length) {
        filteredItems[0].focus();
      }
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      if (this.filterVisible) {
        this.filter.nativeElement.focus();
      }
    } else if (event.key === ' ' || event.key === 'Spacebar') {
      this.toggleSelectAll();
    } else if (event.key === 'Enter') {
      this.toggleSelectAll();
      this.collapse();
    }
  }

  private collapse(focusHeader = true) {
    this.expanded = false;

    if (this.filter) {
      this.filter.nativeElement.value = '';
      this.filterItems();
    }

    if (focusHeader) {
      this.header.nativeElement.focus();
    }

    if (this.formControl) {
      this.onTouched();
    }
  }

  private setFilterVisibility() {
    this.filterVisible = this.items && this.items.length > 20;
  }

  private setMultiOnItems() {
    this.items.forEach(x => x.multi = this.multi);
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
          const selectedItems = this.items.filter(x => x.selected);
          if (selectedItems.length) {
            this.allSelected = selectedItems.length === this.items.length;
            this.toggleSelectAllLabel = this.allSelected ? this.deselectAllLabel : this.selectAllLabel;
            this.setLabel(selectedItems);
            const values = selectedItems.map(x => x.value);
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
            const selectedItems = this.items.filter(x => x.selected);
            this.allSelected = selectedItems.length === this.items.length;
            this.toggleSelectAllLabel = this.allSelected ? this.deselectAllLabel : this.selectAllLabel;
            this.setLabel(selectedItems);
            const values = selectedItems.map(x => x.value);
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
    const filteredItems = this.items.filter(x => x.visible);
    const itemIndex = filteredItems.findIndex(x => x === item);

    if (itemIndex > 0) {
      filteredItems[itemIndex - 1].focus();
    } else if (this.multi) {
      this.selectAll.nativeElement.focus();
    } else if (this.deselectable) {
      this.deselectButton.focus();
    } else if (this.filterVisible) {
      this.filter.nativeElement.focus();
    }
  }

  private focusNextItem(item: DropdownItemComponent) {
    const filteredItems = this.items.filter(x => x.visible);
    const itemIndex = filteredItems.findIndex(x => x === item);

    if (itemIndex < (filteredItems.length - 1)) {
      filteredItems[itemIndex + 1].focus();
    }
  }

  private focusNextMatchingItem(item: DropdownItemComponent, query: string) {
    if (!this.matchQuery) {
      setTimeout(() => {
        const filteredItems = this.items.filter(x => x.visible);
        const itemIndex = filteredItems.findIndex(x => x === item);

        const match =
          filteredItems.slice(itemIndex + 1)
            .concat(filteredItems.slice(0, itemIndex))
            .find(x => x.label.toLowerCase().startsWith(this.matchQuery));

        if (match) {
          const matchIndex = filteredItems.findIndex(x => x === match);
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
      const labels = selectedItems.map(x => x.selectedLabel || x.label);
      if (labels.length) {
        this.label = labels.reduce((xs, x) => xs = `${xs}, ${x}`);
      } else {
        this.label = this.noItemSelectedLabel;
      }
    }
  }

  private selectDefaultItems() {
    if (this.multi) {
      const defaultItems = this.items.filter(x => x.default);
      defaultItems.forEach(x => x.selected = true);
      this.allSelected = defaultItems.length === this.items.length;
      this.toggleSelectAllLabel = this.allSelected ? this.deselectAllLabel : this.selectAllLabel;
      this.setLabel(defaultItems);
      const values = defaultItems.map(x => x.value);
      this.onChange(values);
    } else {
      const defaultItems = this.items.filter(x => x.default);
      if (defaultItems.length) {
        defaultItems[0].selected = true;
        this.label = defaultItems[0].selectedLabel || defaultItems[0].label;
        this.deselectDisabled = false;
        this.onChange(defaultItems[0].value);
      }
    }
  }
}
