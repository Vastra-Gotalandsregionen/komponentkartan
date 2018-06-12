import { Component, AfterContentInit, OnDestroy, ContentChildren, QueryList, Input } from '@angular/core';
import { ToggleButtonComponent } from './toggle-button.component';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vgr-toggle-button-group',
  templateUrl: './toggle-button-group.component.html'
})
export class ToggleButtonGroupComponent implements AfterContentInit, OnDestroy {

  @Input() width: string;
  @ContentChildren(ToggleButtonComponent) toggleButtons: QueryList<ToggleButtonComponent>;
  toggleButtonSubscriptions = [];
  lastSelectedIndex: number;
  private ngUnsubscribe = new Subject();

  ngAfterContentInit() {
    this.setToggleButtonTabFocusability();
    this.addToggleButtonSubscriptions();

    this.toggleButtons.changes
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      _ => {
        this.setToggleButtonTabFocusability();
        this.setToggleButtonFocus();
        this.addToggleButtonSubscriptions();
      }
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
  setToggleButtonTabFocusability() {
    this.toggleButtons.forEach((x, i) => {
      const focusable = i ? false : true;
      x.makeTabFocusable(focusable);
    });
  }

  setToggleButtonFocus() {
    if (this.lastSelectedIndex >= 0) {
      if (this.lastSelectedIndex < this.toggleButtons.length) {
        this.toggleButtons[this.lastSelectedIndex].focus();
      } else if (this.toggleButtons.length) {
        this.toggleButtons[this.toggleButtons.length - 1].focus();
      }
    }
  }

  addToggleButtonSubscriptions() {
    this.toggleButtonSubscriptions.forEach(x => x.unsubscribe());
    this.toggleButtonSubscriptions = [];

    this.toggleButtons.forEach((x, i) => {
      const previousSubscription = x.previous
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (i > 0) {
          this.toggleButtons.toArray()[i - 1].focus();
        } else {
          this.toggleButtons.last.focus();
        }
      });
      this.toggleButtonSubscriptions.push(previousSubscription);

      const nextSubscription = x.next
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (i < this.toggleButtons.length - 1) {
          this.toggleButtons.toArray()[i + 1].focus();
        } else {
          this.toggleButtons.first.focus();
        }
      });
      this.toggleButtonSubscriptions.push(nextSubscription);
    });
  }
}
