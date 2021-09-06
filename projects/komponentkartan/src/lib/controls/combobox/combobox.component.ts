import {
  Component, OnChanges, AfterContentInit, AfterViewInit, OnDestroy, ViewChild, ContentChildren, ElementRef, QueryList,
  Input, Output, EventEmitter, Optional, SimpleChanges, Self
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Guid } from '../../utils/guid';
import { ComboboxItemComponent } from './combobox-item.component';

function _defaultCompare(o1: any, o2: any): boolean {
  return o1 === o2;
}

const enum ScrollDirection {
  Up = 1,
  Down = 2
}

@Component({
  selector: 'vgr-combobox',
  templateUrl: './combobox.component.html',
  styleUrls: ['./combobox.component.scss']
})
export class ComboboxComponent implements OnChanges, AfterContentInit, AfterViewInit, OnDestroy, ControlValueAccessor {

  @Input() readonly = false;
  @Input() disabled = false;
  @Input() showValidation = true;
  @Input() errorMessage = {};
  @Input() value: any;
  @Input() labelId: string;
  @Input() width: string;
  @Input() small = false;
  @Input() showButton = true;
  @Input() placeholder = '';
  @Input() listAlignRight = false;
  @Input() compareWith = _defaultCompare;

  @Output() selectedChanged = new EventEmitter<any>();
  @Output() expandedChanged = new EventEmitter<boolean>();

  @ViewChild('combobox', { static: true }) combobox: ElementRef;
  @ViewChild('textInput', { static: false }) textInput: ElementRef;
  @ContentChildren(ComboboxItemComponent) items: QueryList<ComboboxItemComponent>;

  expanded = false;
  headerLabelId = Guid.newGuid();
  label = '';
  hasFocus: boolean;
  scrollbarConfig: PerfectScrollbarConfig;
  searchString = '';
  leftPosition = '0px';

  get combinedLabelIds() {
    return `${this.labelId} ${this.headerLabelId}`;
  }

  get highlightedItemIndex() {
    const item = this.items ? this.items.find(x => x.highlighted) : null;
    return item && item.index ? item.index : null;
  }

  get errorActive() {
    return this.showValidation && this.formControl && this.formControl.invalid;
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

    if (this.items && !this.items.some(item => item.selected) && !this.items.some(item => item.highlighted)) {
      this.label = '';
    }
  }

  ngAfterContentInit() {
    this.subscribeToItems();

    for (let index = 0; index < this.items.length; index++) {
      setTimeout(() => {
        this.items.toArray()[index].setIndex(index + 1);
      });
    }

    this.items.changes
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(_ => {
        this.subscribeToItems();

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

    if (this.listAlignRight) {
      const width = getComputedStyle(this.combobox.nativeElement).width;
      if (width) {
        this.leftPosition = `calc(${width} - 330px)`;
      }
    } else {
      this.leftPosition = '0px';
    }
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();

    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
  }

  public focus() {
    const index = this.value ? (this.value as string).length : 0;
    this.textInput.nativeElement.setSelectionRange(index, index);
    this.textInput.nativeElement.focus();
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

  expandListbox() {
    if (this.readonly || this.disabled) {
      return;
    }

    if (!this.expanded) {

      this.filterItems();
      this.expand();

      const selectedItem = this.items.find(x => x.selected);
      if (selectedItem) {
        this.setHighlightedItem(selectedItem.value);
      } else {
        if (!this.searchString.length) {
          this.setHighlightedItem(this.items.toArray()[0].value);
        }
      }

      this.focus();
    }
  }

  filterItems() {
    const value = this.searchString;

    if (value) {
      if (this.items) {
        this.items.forEach(item => {
          item.visible = item.label.toLowerCase().startsWith(value.toLowerCase());
        })
      }
    } else {
      this.items.forEach(item => {
        item.visible = true;
      });
    }

    // Scroll to top when filter is changed
    if (this.combobox.nativeElement.querySelector('.ps')) {
      this.combobox.nativeElement.querySelector('.ps').scrollTop = 0;
    }
  }

  deselectItems() {
    const selecedItem = this.items.find(item => item.selected || item.highlighted);
    if (selecedItem) {
      selecedItem.selected = false;
      selecedItem.highlighted = false;
      this.label = '';
      this.searchString = this.label;
    }
  }

  onFocus() {
    this.hasFocus = true;
  }

  onBlur(event: FocusEvent) {
    const comboboxElement = this.combobox.nativeElement as HTMLElement;
    const focusedNode = event.relatedTarget as Node;
    if (comboboxElement.contains(focusedNode)) {
      return;
    }

    this.hasFocus = false;
    if (this.searchString.length) {
      const highlighted = this.items.find(x => x.highlighted);

      if (highlighted) {
        this.setSelectedState(highlighted.value);
      } else {
        this.setSelectedState(this.value);
      }

      this.collapse(false);
    } else {
      this.deselectItems();
      this.onChange(null);
      this.collapse(false);
    }
  }

  onKeydown(event: KeyboardEvent) {

    if (event.key === 'Tab' || (event.shiftKey && event.key === 'Tab')) {
      this.collapse(false);

    } else if (event.key === 'Enter') {
      event.stopPropagation();
      if (this.searchString.length) {
        const highlighted = this.items.find(x => x.highlighted);

        if (highlighted) {
          this.setSelectedState(highlighted.value);
        } else {
          this.setSelectedState(this.value);
        }
        this.collapse(true);
      } else {
        this.expand();

        setTimeout(() => {
          this.focusNextItem();
        });
      }

    } else if (event.key === 'Escape' || event.key === 'Esc') {
      if (this.value) {
        this.setSelectedState(this.value);
        this.setHighlightedItem(this.value);
        this.collapse();
      } else {
        this.deselectItems();
        this.collapse();
      }

    } else if (event.altKey && (event.key === 'ArrowDown' || event.key === 'Down')) {
      event.stopPropagation();
      event.preventDefault();
      this.expand();

    } else if (event.altKey && (event.key === 'ArrowUp' || event.key === 'Up')) {
      event.stopPropagation();
      event.preventDefault();
      this.collapse();

    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      event.stopPropagation();
      event.preventDefault();
      this.expand();

      setTimeout(() => {
        const filteredItems = this.items.filter(i => i.visible);
        if (filteredItems.length) {
          this.focusNextItem();
        }
      });

    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      event.stopPropagation();
      event.preventDefault();
      this.expand();

      const filteredItems = this.items.filter(i => i.visible);
      if (filteredItems.length) {
        this.focusPreviousItem();
      }

    } else if (event.key === 'Backspace') {
      setTimeout(() => {
        this.setHighligthState();
        if (this.searchString.length) {
          this.expand();
        } else {
          this.deselectItems();
          this.collapse();
        }
      });

    } else if (/^[\wåäöÅÄÖ ]$/.test(event.key) && !event.ctrlKey && !event.altKey) {

      setTimeout(() => {
        this.setHighligthState();
        this.setInputText();

        const filteredItems = this.items.filter(i => i.visible);
        if (filteredItems.length) {
          this.expand();
        } else {
          this.collapse();
        }
      });
    }
  }

  setDisabledState(isDisabled: boolean) {
    this.disabled = isDisabled;
  }

  private expand() {
    const filteredItems = this.items.filter(x => x.visible);

    if (filteredItems.length) {
      this.expanded = true;
      this.expandedChanged.emit(true);
    }
  }

  private collapse(focusFilter = true) {
    this.expanded = false;

    if (this.textInput) {
      this.filterItems();
    }

    if (focusFilter) {
      this.textInput.nativeElement.focus();
    }

    if (this.formControl) {
      this.onTouched();
    }

    this.expandedChanged.emit(false);
  }

  private subscribeToItems() {
    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
    this.ngUnsubscribeItems = new Subject();

    this.items.forEach(item => {
      item.select
        .pipe(takeUntil(this.ngUnsubscribeItems))
        .subscribe(() => {
          if (item.selected) {
            this.setHighlightedItem(item.value);
            this.setSelectedState(item.value);
          } else {
            this.label = '';
            this.searchString = this.label;
          }
          this.collapse();
        });
    });
  }

  private focusPreviousItem() {
    const filteredItems = this.items.filter(i => i.visible);
    const highlightedItem = this.items.find(x => x.highlighted);
    const itemIndex = highlightedItem ? filteredItems.findIndex(i => i === highlightedItem) : 0;

    if (itemIndex > 0) {
      this.setHighlightedItem(filteredItems[itemIndex - 1].value);
      this.scrollToItem(highlightedItem, ScrollDirection.Up);

    } else {
      if (!highlightedItem) {
        this.setHighlightedItem(filteredItems[filteredItems.length - 1].value);

        setTimeout(() => {
          this.scrollToItem(filteredItems[filteredItems.length - 1], ScrollDirection.Up);
        });
      }
    }
  }

  private focusNextItem() {
    const filteredItems = this.items.filter(i => i.visible);
    const highlightedItem = this.items.find(x => x.highlighted);
    const itemIndex = highlightedItem ? filteredItems.findIndex(i => i === highlightedItem) : -1;

    if (itemIndex < (filteredItems.length - 1)) {
      this.setHighlightedItem(filteredItems[itemIndex + 1].value);

      setTimeout(() => {
        this.scrollToItem(filteredItems[itemIndex + 1], ScrollDirection.Down);
      });

    } else {
      if (filteredItems.length && !highlightedItem) {

        this.setHighlightedItem(filteredItems[0].value);

        setTimeout(() => {
          this.scrollToItem(filteredItems[0], ScrollDirection.Down);
        });
      }
    }
  }

  private scrollToItem(item: ComboboxItemComponent, direction: ScrollDirection) {
    const listBox = this.combobox.nativeElement.querySelector('.combobox__menu');
    if (listBox && listBox.offsetHeight >= 285) { // scroll viewport 285px or 340px

      const itemElement = item.item.nativeElement;
      const filteredItems = this.items.filter(i => i.visible);
      const itemIndex = filteredItems.findIndex(i => i === item);
      const itemsHight = itemElement.offsetHeight;
      const steps = itemsHight ? Math.floor(listBox.offsetHeight / itemsHight) - 1 : 0;
      const itemIsOutOfBounds = (itemElement.getBoundingClientRect().top < listBox.getBoundingClientRect().top + 20) || (itemElement.getBoundingClientRect().bottom > listBox.getBoundingClientRect().bottom);

      if (direction === ScrollDirection.Up) {
        if ((steps && ((itemIndex - 1) % steps) === 0) || itemIsOutOfBounds) {
          const scrollPosition = itemElement.offsetTop - (itemsHight * steps);
          this.combobox.nativeElement.querySelector('.ps').scrollTop = scrollPosition;
        }

      } else {
        if ((steps && (itemIndex % steps) === 0 && itemIndex !== 0) || itemIsOutOfBounds) {
          this.combobox.nativeElement.querySelector('.ps').scrollTop = itemElement.offsetTop;
        }
      }
    }
  }

  private setSelectedState(value: any) {
    let selectedItem: ComboboxItemComponent;
    let itemFound = false;

    this.items.forEach(i => (i.selected = false));
    this.items.forEach(i => {
      if (this.compareWith(value, i.value) && !itemFound) {
        i.selected = true;
        selectedItem = i;
        itemFound = true;
      }
    });

    this.label = selectedItem ? selectedItem.selectedLabel || selectedItem.label : '';
    this.searchString = this.label;
    if (selectedItem) {
      this.onChange(selectedItem.value);
    }
  }

  private setHighligthState() {
    let highligthedItem: ComboboxItemComponent;

    this.items.forEach(i => (i.highlighted = false));
    this.items.forEach(item => {
      if (item.label.toLowerCase().startsWith(this.searchString.toLowerCase()) && !highligthedItem) {
        item.highlighted = true;
        highligthedItem = item;
        return;
      }
    });

  }

  private setHighlightedItem(value: any) {
    this.items.forEach(i => (i.highlighted = false));
    this.items.forEach(item => {
      if (this.compareWith(value, item.value)) {
        item.highlighted = true;
        this.label = item.selectedLabel || item.label;
        this.searchString = this.label;
        return;
      }
    });
  }


  private setInputText() {
    const item: ComboboxItemComponent = this.items.find(x => x.highlighted);

    if (item) {
      if (this.searchString.length) {

        const autocompleteText = item.label.substring(this.searchString.length);
        this.textInput.nativeElement.setRangeText(autocompleteText, this.searchString.length, item.label.length + 1);

        setTimeout(() => {
          this.textInput.nativeElement.focus();
          this.textInput.nativeElement.setSelectionRange(this.searchString.length, item.label.length, 'backward');
        });
      } else {
        setTimeout(() => {
          this.textInput.nativeElement.focus();
          this.textInput.nativeElement.setRangeText(item.label);
          this.focus();
        });
      }
    }
  }
}
