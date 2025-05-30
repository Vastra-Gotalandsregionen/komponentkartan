import {
  Component, OnChanges, AfterContentInit, AfterViewInit, OnDestroy, ViewChild, ContentChildren, ElementRef, QueryList,
  Input, Output, EventEmitter, Optional, SimpleChanges, Self, HostListener
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ScrollbarComponent } from '../scrollbar/scrollbar.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Guid } from '../../utils/guid';
import { ComboboxItemComponent } from './combobox-item.component';

function _defaultCompare(o1: any, o2: any): boolean {
  return o1 === o2;
}


@Component({
    selector: 'vgr-combobox',
    templateUrl: './combobox.component.html',
    styleUrls: ['./combobox.component.scss'],
    standalone: false
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
  @ViewChild('readonlyLabel', { static: false }) readonlyLabel: ElementRef;
  @ViewChild('header', { static: false }) header: ElementRef;
  @ViewChild(ScrollbarComponent) scrollable: ScrollbarComponent;
  @ContentChildren(ComboboxItemComponent) items: QueryList<ComboboxItemComponent>;

  expanded = false;
  headerLabelId = Guid.newGuid();
  label = '';
  hasFocus: boolean;
  searchString = '';
  leftPosition = '0px';
  elementId: string;
  mouseDown: boolean;

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

  private ngUnsubscribe: any = new Subject();
  private ngUnsubscribeItems: any = new Subject();

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any) {

    const target = event.target || event.srcElement || event.currentTarget;

    if ((this.elementRef.nativeElement && !this.elementRef.nativeElement.contains(target)) && this.expanded) {
      this.onChange(null);
      this.collapse(false);
    }
  }

  constructor(@Optional() @Self() public formControl: NgControl, private elementRef: ElementRef) {
    this.elementId = Guid.newGuid();
    if (this.formControl != null) {
      this.formControl.valueAccessor = this;
    }
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
    //to make sure that combobox is not highlighted on focus
    this.mouseDown = true;
    if (this.readonly) {
      this.readonlyLabel.nativeElement.focus();
    } else if (this.disabled) {
      this.header.nativeElement.focus();
    } else {
      const index = this.value ? (this.value as string).length : 0;
      this.textInput.nativeElement.setSelectionRange(index, index);
      this.textInput.nativeElement.focus();
    }
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
        });
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

  onMouseDownClick() {
    this.mouseDown = true;
    this.hasFocus = false;
  }

  onFocus() {
    if (this.mouseDown) {
      this.mouseDown = false;
      return;
    }
    this.hasFocus = true;
    this.mouseDown = false;
  }

  onBlur(event: FocusEvent) {
    const comboboxElement = this.combobox.nativeElement as HTMLElement;
    const focusedNode = event.relatedTarget as Node;
    if (comboboxElement.contains(focusedNode) || event.relatedTarget === null ) {
      return;
    } else if (event.relatedTarget !== null  && (event.relatedTarget as HTMLElement).id === 'page-content-focus') { // otherwise the pagefocus will steal event and collapse
      return;
    } else if (event.relatedTarget !== null  && (event.relatedTarget as HTMLElement).tagName === 'VGR-EDITABLE-TABLE-COLUMN') { // otherwise the the combobox in an editable-table will alway collapse on click
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
      this.expand();

    } else if (event.altKey && (event.key === 'ArrowUp' || event.key === 'Up')) {
      this.collapse();

    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      this.expand();

      setTimeout(() => {
        const filteredItems = this.items.filter(i => i.visible);
        if (filteredItems.length) {
          this.focusNextItem();
        }
      });

    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
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
      this.scrollToItem(highlightedItem);

    } else {
      if (!highlightedItem) {
        this.setHighlightedItem(filteredItems[filteredItems.length - 1].value);

        setTimeout(() => {
          this.scrollToItem(filteredItems[filteredItems.length - 1]);
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
        this.scrollToItem(filteredItems[itemIndex + 1]);
      });

    } else {
      if (filteredItems.length && !highlightedItem) {

        this.setHighlightedItem(filteredItems[0].value);

        setTimeout(() => {
          this.scrollToItem(filteredItems[0]);
        });
      }
    }
  }

  private scrollToItem(item: ComboboxItemComponent) {
    if (this.scrollable.scrollable) {
      const filteredItems = this.items.filter(i => i.visible);
      const itemIndex = filteredItems.findIndex(i => i === item);

      if (itemIndex > 3 || itemIndex === 1) {
        const scrollToItem = filteredItems[itemIndex > 3 ? itemIndex - 3 : itemIndex ];
        if (itemIndex === 1) {
          this.scrollable.scrollable.scrollTo({top: 0});
        } else {
          this.scrollable.scrollable.scrollToElement(scrollToItem.item.nativeElement, {duration: 0} );
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

  getLabelFromId() {
    // return window.document.getElementById(this.idForLabel)
    let labels = document.getElementsByTagName('label');
    for( var i = 0; i < labels.length; i++ ) {
      if (labels[i].htmlFor == this.labelId)
           return labels[i];
   }
  }
}
