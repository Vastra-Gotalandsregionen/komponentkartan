import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RadiobuttonItemComponent } from './radiobutton-item.component';

@Component({
  selector: 'vgr-radiobutton-group',
  templateUrl: './radiobutton-group.component.html',
  styleUrls: ['./radiobutton-group.component.scss']
})
export class RadiobuttonGroupComponent implements AfterContentInit, OnDestroy {

  @Input() @HostBinding('class.disabled') disabled: boolean;
  @Input() @HostBinding('class.vertical') vertical = false;
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter<any>();
  @ContentChildren(RadiobuttonItemComponent) items: QueryList<RadiobuttonItemComponent>;

  ngUnsubscribeItems = new Subject();

  constructor(private elementRef: ElementRef) { }

  ngAfterContentInit() {
    this.items.forEach(item => {
      item.itemSelected.pipe(
        takeUntil(this.ngUnsubscribeItems)
      ).subscribe(() => {
        this.unSelectItems(item);
      });

      item.itemDisabled.pipe(
        takeUntil(this.ngUnsubscribeItems)
      ).subscribe(() => {
        this.disabledItems();
      });
    });
  }

  ngOnDestroy() {
    this.ngUnsubscribeItems.next();
    this.ngUnsubscribeItems.complete();
  }

  unSelectItems(itemToExclude: RadiobuttonItemComponent) {
    this.items.forEach(item => {
      if (item !== itemToExclude) {
        item.selected = false;
      }
    });
  }

  disabledItems() {
    this.items.forEach(item => {
      if (this.disabled) {
        item.disabled = true;
      }
    });
  }

  keyDown(event: KeyboardEvent): void {
    const selectedItem = this.items.filter(item => item.selected === true)[0];


    if (['Enter', 'Spacebar', ' '].includes(event.key)) {
      const positionArray = this.items.toArray();
      const position = positionArray.indexOf(selectedItem)
      this.items.get(position).itemClicked();
      event.preventDefault();
      event.stopPropagation();
    }

    if (['ArrowRight', 'Right', 'ArrowDown', 'Down'].includes(event.key)) {
      this.setFocus(selectedItem, 'forward');
      event.preventDefault();
    }

    if (['ArrowLeft', 'Left', 'ArrowUp', 'Up'].includes(event.key)) {
      this.setFocus(selectedItem, 'back');
      event.preventDefault();
    }
  }

  setFocus(option: any, direction?: string) {
    let positionArray = this.items.toArray();
    let position = positionArray.indexOf(option);

    const enabledOptions = this.items;
    if (direction === 'forward') {
      if (position + 1 === enabledOptions.length) {
        if (this.items.get(0)) {
          this.items.get(0).focus();
        }
        this.items.get(0).itemClicked();
        // this.optionClicked(enabledOptions[0]);
      } else {
        if (this.items.get(position + 1)) {

          this.items.get(position + 1).focus();
        }
        this.items.get(position + 1).itemClicked();
        // this.optionClicked(nextItem);
      }
    } else if (direction === 'back') {
      if (position === 0) {
        if (this.items.get(this.items.length - 1)) {
          this.items.get(this.items.length - 1).focus();
        }
        this.items.get(enabledOptions.length - 1).itemClicked();
        // this.optionClicked(this.items[enabledOptions.length - 1]);
      } else {
        if (this.items.get(position - 1)) {
          this.items.get(position - 1).focus();
        }
        this.items.get(position - 1).itemClicked();
        // this.optionClicked(previousItem);
      }
    }
  }
}
