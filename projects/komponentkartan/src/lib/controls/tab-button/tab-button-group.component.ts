import { AfterContentInit, Component, ContentChildren, HostBinding, Input, OnDestroy, QueryList } from '@angular/core';
import { Guid } from '../../utils/guid';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TabButtonComponent } from './tab-button.component';
import { TabManagementService } from './tab-management.service';

@Component({
  selector: 'vgr-tab-button-group',
  templateUrl: './tab-button-group.component.html',
  styleUrls: ['./tab-button-group.component.scss']
})
export class TabButtonGroupComponent implements AfterContentInit, OnDestroy {

  @Input() width = 'auto';

  @HostBinding('attr.id') @Input() id: string;
  @HostBinding('class.centrera')  @Input() alignCenter = false;
  @ContentChildren(TabButtonComponent) tabButtons: QueryList<TabButtonComponent>;
  tabButtonSubscriptions = [];
  lastSelectedIndex: number;
  activeTabId: string;
  previousActiveTabId: string = '';
  private ngUnsubscribe: any = new Subject();
  _navigationCancelled: boolean;
  get navigationCancelled() {
    return this._navigationCancelled;
  }

  constructor(private tabManagementService: TabManagementService) {
    if (!this.id) {
      this.id = Guid.newGuid();
    }
  }

  ngAfterContentInit() {
    this.setTabButtonTabFocusability();
    this.addTabButtonSubscriptions();



    this.tabButtons.changes
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      () => {
        this.setTabButtonTabFocusability();
        this.setTabButtonFocus();
        this.addTabButtonSubscriptions();
      }
    );

    this.tabManagementService.tabChanged
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe((res) => {
       if (res.tabGroupId === this.id) {
        let activeTabId;

        this.tabButtons.forEach(item => {

          if (res.tab.tabId === item.tabId) {
            activeTabId = item.tabId;
            item.active = true;
          }
          else {
            item.active = false;
          }

          item.ariaPressed = item.active;
        });

        this.setActiveTabId(res.tab.tabId);
      }
    })

    this.tabButtons.forEach(tab => {
      tab.parentId = this.id;
      if (tab.active === true) {
        this.setActiveTabId(tab.tabId);
      }
    });
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
        const notDisabledButtons = this.tabButtons.filter(tab => tab.disabled === false);
        notDisabledButtons[0].focus();
      });
      this.tabButtonSubscriptions.push(homeSubscription);

      const endSubscription = x.end
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        const notDisabledButtons = this.tabButtons.filter(tab => tab.disabled === false);
        notDisabledButtons[notDisabledButtons.length - 1].focus();
      });
      this.tabButtonSubscriptions.push(endSubscription);

      const selectedChangedSubscription = x.selectedChanged
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((event) => {
          this.tabButtons.forEach( button => {

          if (button.tabId === event) {
            button.active = true;
            this.tabManagementService.tabChangeRequested(button, this.id);
          }
        });
      });
      this.tabButtonSubscriptions.push(selectedChangedSubscription);

      this.tabManagementService.changeNavigation.subscribe(navigationCancelled => {
        if (this._navigationCancelled === navigationCancelled) {
          return;
        }

        this._navigationCancelled = navigationCancelled;
        if (navigationCancelled && this.tabButtons) {
          let activeTabId;
          this.tabButtons.forEach(tab => {
            if (tab.tabId === this.previousActiveTabId) {
              tab.active = true;
              activeTabId = tab.tabId;

            } else {
              tab.active = false;
            }
          });

            if (activeTabId) {
              this.previousActiveTabId = this.activeTabId;
              this.activeTabId = activeTabId;
            }
        }
      });


    });
  }
  setActiveTabId(tabId: string) {
      if (tabId === this.activeTabId) {
        return;
      }
      this.previousActiveTabId = this.activeTabId ? this.activeTabId : tabId;
      this.activeTabId = tabId;
  }

  public focus() {
    if (this.tabButtons && this.tabButtons.length) {
      this.tabButtons.toArray()[0].focus();
    }
  }
}
