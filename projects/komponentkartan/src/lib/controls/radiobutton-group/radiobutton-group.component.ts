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

  _disabled: boolean;
  // @Input() @HostBinding('class.disabled') disabled: boolean;
  @Input() @HostBinding('class.disabled') set disabled(val) {

    this._disabled = val;
    if (val !== undefined) {
      this.setGroupDisabledOverride(val);
    }
  }
  @Input() @HostBinding('class.vertical') vertical = false;
  @Output() selectedChanged: EventEmitter<any> = new EventEmitter<any>();
  @ContentChildren(RadiobuttonItemComponent) items: QueryList<RadiobuttonItemComponent>;

  ngUnsubscribeItems = new Subject();

  internalDisabled: boolean;
  constructor(private elementRef: ElementRef) { }

  ngAfterContentInit() {
    this.items.forEach(item => {
      item.itemSelected.pipe(
        takeUntil(this.ngUnsubscribeItems)
      ).subscribe(() => {
        this.unSelectItems(item);
      });

     });

    this.setGroupDisabledOverride(this._disabled);

    // Om ingen är vald, tabba in till första enablade elementet
    if(!this.items.some(x => x.selected)) {
      this.items.filter(x => !x.disabled)[0].isTabEnabled = true;
    }
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
      // if (this.disabled) {
        item.disabled = true;
      // }
    });
  }

  setGroupDisabledOverride(groupDisabledState: boolean) {
    this.items?.forEach(item => {
        item.groupDisabledOverride = groupDisabledState;
    });
  }

  keyDown(event: KeyboardEvent): void {
    const selectedItem = this.items.filter(item => item.radioButton.nativeElement === event.target)[0];


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
      } else {
        if (this.items.get(position + 1)) {

          this.items.get(position + 1).focus();
        }
      }
    } else if (direction === 'back') {
      if (position === 0) {
        if (this.items.get(this.items.length - 1)) {
          this.items.get(this.items.length - 1).focus();
        }
      } else {
        if (this.items.get(position - 1)) {
          this.items.get(position - 1).focus();
        }
      }
    }
  }
}
