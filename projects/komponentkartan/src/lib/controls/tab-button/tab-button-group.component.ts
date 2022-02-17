import { AfterContentInit, Component, ContentChildren, HostBinding, Input, OnDestroy, QueryList } from '@angular/core';
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
  private ngUnsubscribe = new Subject();
  _navigationCancelled: boolean;
  get navigationCancelled() {
    return this._navigationCancelled;
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
    .subscribe((tab) => {
      console.log('service.tabChanged: ', tab.tabId, tab.active, this.navigationCancelled)
      setTimeout(() => {
        if (this.navigationCancelled) {
          console.log('navigering cancellerad, återställ till föregående tab: ', this.activeTabId, this.previousActiveTabId, event)

          this.tabButtons.forEach( button => {
            if (button.tabId === this.activeTabId) {
              button.active = true;
              this.setActiveTabId(button.tabId);
              this.tabManagementService.tabChangeRequested(button);
            } else {
              button.active = false;
            }
            button.ariaPressed = button.active;
          })
          this._navigationCancelled = false;
          return;
        }

        this.setActiveTabId(tab.tabId);

        this.tabButtons.forEach(tab => {
          tab.active = false;
          if (tab.tabId === this.activeTabId) {
            tab.active = true;
          }

          tab.ariaPressed = tab.active;
        });

      });

    })

    this.tabButtons.forEach(tab => {if (tab.active === true) { this.setActiveTabId(tab.tabId); console.log('Sätter tabid första gången: ', this.activeTabId)}})
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  constructor(private tabManagementService: TabManagementService) { }

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


          // if (this.navigationCancelled) {
          //   console.log('navigering cancellerad, återställ till föregående tab: ', this.activeTabId, this.previousActiveTabId, event)

          //   this.tabButtons.forEach( button => {
          //     if (button.tabId === this.activeTabId) {
          //       button.active = true;
          //       this.setActiveTabId(button.tabId);
          //       this.tabManagementService.tabChangeRequested(button);
          //     } else {
          //       button.active = false;
          //     }
          //     button.ariaPressed = button.active;
          //   })
          //   this._navigationCancelled = false;
          //   return;
          // }
          this.tabButtons.forEach( button => {
          console.log('selectedChanged', event)
          if (button.tabId === event) {
            this.tabManagementService.tabChangeRequested(button);
          }
          // else {
          //   button.active = false;
          // }
          // button.ariaPressed = button.active;

        });
      });
      this.tabButtonSubscriptions.push(selectedChangedSubscription);


      /* kod från klienten */
      this.tabManagementService.changeNavigation.subscribe(navigationCancelled => {
        console.log('navigationCancelled', navigationCancelled, 'go to', this.previousActiveTabId)
        this._navigationCancelled = navigationCancelled;
        if (navigationCancelled && this.tabButtons) {


          if (!this.activeTabId) {
            return;
          }
          this.tabButtons.forEach(tab => {
            tab.active = false;
          })
          // this.tabButtons.filter(tab => tab.active === true)[0].active = false; // hämta aktiv tab och sätt den till false

          this.tabButtons.forEach(tab => {
            if (tab.tabId === this.previousActiveTabId) {
              tab.active = true;
              console.log('satt till true: ', tab.tabId, tab.active)
            }
          });
          // switch (this.router.url) {
          //   case '/filuppladdning/registervard' : this.tabs.filter(tab => tab.id === Tab.Registervård )[0].active = true; break;
          //   case '/filuppladdning/undantag' : this.tabs.filter(tab => tab.id === Tab.Undantag )[0].active = true; break;
          //   default: break;
          // }
        }
      });


    });
  }
  setActiveTabId(tabId: string) {
    // setTimeout(() => {
      this.previousActiveTabId = this.activeTabId ? this.activeTabId : tabId;
      this.activeTabId = tabId;

      console.log('Tidigare tab: ', this.previousActiveTabId, ' > Till tab: ',  this.activeTabId)

    // }, 100);
  }

  public focus() {
    if (this.tabButtons && this.tabButtons.length) {
      this.tabButtons.toArray()[0].focus();
    }
  }
}
