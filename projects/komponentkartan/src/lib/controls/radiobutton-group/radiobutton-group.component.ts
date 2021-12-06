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
}
