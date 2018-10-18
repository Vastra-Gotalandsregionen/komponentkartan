import {
  Component,
  OnChanges,
  AfterContentInit,
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
import { PerfectScrollbarComponent, PerfectScrollbarConfig, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Guid } from '../../utils/guid';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vgr-declarative-dropdown',
  templateUrl: './declarative-dropdown.component.html',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => DeclarativeDropdownComponent),
    multi: true
  }]
})
export class DeclarativeDropdownComponent implements OnChanges, AfterContentInit, OnDestroy, ControlValueAccessor {

  @Input() noItemSelectedLabel = 'Välj';
  @Input() showAllItemText = 'Visa alla';
  @Input() readonly = false;
  @Input() disabled = false;
  @Input() formControl: AbstractControl;
  @Input() formControlName: string;
  @Input() showValidation = true;
  @Output() selectedChanged = new EventEmitter<any>();

  @ViewChild('dropdown') dropdown: ElementRef;
  @ViewChild('scrollbar') scrollbar: ElementRef;
  @ViewChild(FilterTextboxComponent) filterTextboxComponent: FilterTextboxComponent;
  @ViewChild(PerfectScrollbarComponent) scrollbarComponent: PerfectScrollbarComponent;
  @ContentChildren(DropdownItemComponent) items: QueryList<DropdownItemComponent>;

  expanded = false;
  filterVisible = false;
  validationErrorMessage = 'Obligatorisk';
  labelledbyid: string = Guid.newGuid();

  label: string;
  hasFocus: boolean;
  scrollbarConfig: PerfectScrollbarConfig;
  dimmerTopVisible = true;
  dimmerBottomVisible = true;
  // focusableItems = [];

  get errorActive() {
    return this.showValidation && this.formControl && this.formControl.invalid && !this.hasFocus;
  }

  get editingEditing() {
    return this.showValidation && this.formControl && this.formControl.invalid && this.hasFocus;
  }

  private filterLimit = 20;
  private focusedItemIndex = -1;
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
    if (this.formControl) {
      this.writeValue(this.formControl.value);
    }

    this.filterVisible = this.items && this.items.length > this.filterLimit;
    this.subscribeToItems();

    this.items.changes.subscribe(_ => {
      this.filterVisible = this.items && this.items.length > this.filterLimit;
      this.subscribeToItems();
    });
  }

  subscribeToItems() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
    this.ngUnsubscribe = new Subject();

    this.items.forEach((item, index) => {
      item.selectedChanged
        .pipe(takeUntil(this.ngUnsubscribe))
        .subscribe(selected => {
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
          this.expanded = false;
        });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  writeValue(value: any) {
    if (!this.items) {
      return;
    }

    let item: DropdownItemComponent;
    this.items.forEach(x => {
      if (value === x.value) {
        x.selected = true;
        item = x;
      } else {
        x.selected = false;
      }
    });

    this.label = item ? item.selectedLabel || item.label : this.noItemSelectedLabel;
  }

  registerOnChange(func: any) {
    this.onChange = func;
  }

  registerOnTouched(func: any) {
    this.onTouched = func;
  }

  onChange(_: any) { }

  onTouched() { }

  showTopScrollDimmer() {
    this.dimmerTopVisible = true;
  }

  hideTopScrollDimmer() {
    this.dimmerTopVisible = false;
  }

  showBottomScrollDimmer() {
    this.dimmerBottomVisible = true;
  }

  hideBottomScrollDimmer() {
    this.dimmerBottomVisible = false;
  }

  // private hideDimmersIfScrollIsAtBottomOrTop(scrollElement: Element) {
  //   const marginTolerance = 20;

  //   const scrollHeight = scrollElement.scrollHeight - marginTolerance;
  //   const clientHeight = scrollElement.clientHeight;
  //   const scrollTop = scrollElement.scrollTop;

  //   if (clientHeight + scrollTop >= scrollHeight) {
  //     this.dimmerBottomVisible = false;
  //   } else {
  //     this.dimmerBottomVisible = true;
  //   }
  //   if (scrollTop === 0) {
  //     this.dimmerTopVisible = false;
  //   } else {
  //     this.dimmerTopVisible = true;
  //   }
  // }

  filterItems(filterValue: string) {
    if (this.items) {
      this.items.forEach(item => {
        item.visible = item.label.toLowerCase().includes(filterValue.toLowerCase());
      });
    }

    // setTimeout(() => {
    //   this.setFocusableItems();
    // }, 100);

    // Scroll to top when filter is changed
    this.scrollbar.nativeElement.querySelector('.ps').scrollTop = 0;
    this.dimmerBottomVisible = false;
  }

  // setFocusableItems() {
  //   const nodes: NodeList = this.filterVisible ? this.elementRef.nativeElement.getElementsByTagName('input') : [];
  //   const nodes2: NodeList = this.elementRef.nativeElement.getElementsByTagName('li');
  //   this.focusableItems = [...Array.from(nodes), ...Array.from(nodes2)];
  // }

  onKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      this.toggleExpand();
      this.focusDropdown();
      event.preventDefault();
      event.stopPropagation();
    } else if (event.altKey && (event.key === 'ArrowDown' || event.key === 'Down')) {
      this.expanded = true;
      event.preventDefault();
    } else if (event.key === 'Escape' ||
      event.altKey && (event.key === 'ArrowUp' || event.key === 'Up')) {
      this.expanded = false;
      this.focusDropdown();
      event.preventDefault();
    } else if (event.key === 'ArrowDown' || event.key === 'Down') {
      // this.setFocusOnNextItem();
      event.preventDefault();
    } else if (event.key === 'ArrowUp' || event.key === 'Up') {
      // this.setFocusOnPreviousItem();
      event.preventDefault();
    } else if (event.key === 'Tab') {
      this.expanded = false;
    }
  }

  onMenuMousedown() {
    event.stopPropagation();
  }

  onFilterKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      event.stopPropagation();
    }
  }

  private focusDropdown() {
    this.dropdown.nativeElement.focus();
  }

  // private setFocusOnNextItem() {
  //   this.focusedItemIndex = this.focusedItemIndex < this.focusableItems.length - 1 ? this.focusedItemIndex + 1 : 0;
  //   this.focusableItems[this.focusedItemIndex].focus();
  // }

  // private setFocusOnPreviousItem() {
  //   this.focusedItemIndex = this.focusedItemIndex > 0 ? this.focusedItemIndex - 1 : this.focusableItems.length - 1;
  //   this.focusableItems[this.focusedItemIndex].focus();
  // }

  toggleExpand() {
    if (this.readonly || this.disabled) {
      return;
    }

    this.expanded = !this.expanded;

    // if (this.expanded) {
    //   setTimeout(() => {
    //     this.hideDimmersIfScrollIsAtBottomOrTop(this.scrollbarComponent.directiveRef.elementRef.nativeElement);
    //   });
    // }
  }

  onFocus() {
    this.hasFocus = true;
  }

  onBlur() {
    this.hasFocus = false;
    // this.expanded = false;
    if (this.formControl) {
      this.onTouched();
    }
  }

  onSelectAllKeydown(event: KeyboardEvent) {
    if (event.key === ' ' || event.key === 'Spacebar' || event.key === 'Enter') {
      this.showAllItems();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  // keyDownDropdownItem(event: KeyboardEvent, item: DropdownItem<any>) {
  //   // enter, tab & space
  //   if (event.keyCode === 13 || event.keyCode === 9 || event.keyCode === 32) {
  //     this.selectItem(item);
  //   }
  // }

  showAllItems() {
    if (this.filterTextboxComponent) {
      this.filterTextboxComponent.clear();
    }

    // this.setFocusableItems();
    // this.focusedItemIndex = 1;
    // this.focusableItems[this.focusedItemIndex].focus();
  }

  // selectItem(item: DropdownItem<any>) {
  //   if (!item) {
  //     return;
  //   }

  //   this.items.forEach(x => { x.selected = false; x.marked = false; });

  //   item.selected = true;
  //   item.marked = true;

  //   this.selectedChanged.emit(item.value);
  //   this.selectedItem = item;
  //   this.onChange(item.value);
  // }

  // protected handleInitiallySelectedItems(selectedItems: DropdownItem<any>[]): void {
  //   this.selectItem(selectedItems[0]);
  // }
}
