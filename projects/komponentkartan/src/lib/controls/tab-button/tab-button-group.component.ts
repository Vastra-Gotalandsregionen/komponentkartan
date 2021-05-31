import { AfterContentInit, Component, ContentChildren, HostBinding, Input, OnDestroy, QueryList } from '@angular/core';
import { Subject } from 'rxjs';
import { delay, takeUntil } from 'rxjs/operators';
import { TabButtonComponent } from './tab-button.component';

@Component({
  selector: 'vgr-tab-button-group',
  templateUrl: './tab-button-group.component.html',
  styleUrls: ['./tab-button-group.component.scss']
})
export class TabButtonGroupComponent implements AfterContentInit, OnDestroy {

  @Input() width = 'auto';
  @HostBinding('attr.id') @Input() id: string;
  @ContentChildren(TabButtonComponent) tabButtons: QueryList<TabButtonComponent>;
  tabButtonSubscriptions = [];
  lastSelectedIndex: number;
  private ngUnsubscribe = new Subject();

  ngAfterContentInit() {
    this.setTabButtonTabFocusability();
    this.addTabButtonSubscriptions();



    this.tabButtons.changes
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      _ => {
        this.setTabButtonTabFocusability();
        this.setTabButtonFocus();
        this.addTabButtonSubscriptions();
      }
    );

  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setTabButtonTabFocusability() {
    this.tabButtons.forEach((x, i) => {
      const focusable = i ? false : true;
      x.makeTabFocusable(focusable);
    });
  }

  setTabButtonFocus() {
    if (this.lastSelectedIndex >= 0) {
      if (this.lastSelectedIndex < this.tabButtons.length) {
        this.tabButtons[this.lastSelectedIndex].focus();
      } else if (this.tabButtons.length) {
        this.tabButtons[this.tabButtons.length - 1].focus();
      }
    }
  }

  addTabButtonSubscriptions() {

    this.tabButtonSubscriptions.forEach(x => x.unsubscribe());
    this.tabButtonSubscriptions = [];

    this.tabButtons.forEach((x, i) => {
      const previousSubscription = x.previous
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (i > 0) {
          this.tabButtons.toArray()[i - 1].focus();
        } else {
          this.tabButtons.last.focus();
        }
      });
      this.tabButtonSubscriptions.push(previousSubscription);

      const nextSubscription = x.next
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (i < this.tabButtons.length - 1) {
          this.tabButtons.toArray()[i + 1].focus();
        } else {
          this.tabButtons.first.focus();
        }
      });
      this.tabButtonSubscriptions.push(nextSubscription);

      const homeSubscription = x.home
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const notDisabledButtons = this.tabButtons.filter(x => x.disabled === false);
        notDisabledButtons[0].focus();
      });
      this.tabButtonSubscriptions.push(homeSubscription);

      const endSubscription = x.end
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const notDisabledButtons = this.tabButtons.filter(x => x.disabled === false);
        notDisabledButtons[notDisabledButtons.length - 1].focus();
      });
      this.tabButtonSubscriptions.push(endSubscription);

      const selectedChangedSubscription = x.selectedChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event) => {

        this.tabButtons.forEach( button => {
          if (button.tabId === event) {
            button.active = true;
          } else {
            button.active = false;
          }
          button.ariaPressed = button.active;

        });
      });
      this.tabButtonSubscriptions.push(selectedChangedSubscription);

    });
  }

  public focus() {
    if (this.tabButtons && this.tabButtons.length) {
      this.tabButtons.toArray()[0].focus();
    }
  }
}
