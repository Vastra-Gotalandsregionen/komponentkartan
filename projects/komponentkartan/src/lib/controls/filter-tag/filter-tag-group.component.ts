import { Component, AfterContentInit, OnDestroy, ContentChildren, QueryList } from '@angular/core';
import { FilterTagComponent } from './filter-tag.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'vgr-filter-tag-group',
  templateUrl: './filter-tag-group.component.html'
})
export class FilterTagGroupComponent implements AfterContentInit, OnDestroy {

  @ContentChildren(FilterTagComponent) filterTags: QueryList<FilterTagComponent>;
  filterTagSubscriptions = [];
  lastSelectedIndex: number;
  private ngUnsubscribe = new Subject();

  ngAfterContentInit() {
    this.setFilterTagTabFocusability();
    this.addFilterTagSubscriptions();

    this.filterTags.changes
    .pipe(takeUntil(this.ngUnsubscribe))
    .subscribe(
      _ => {
        this.setFilterTagTabFocusability();
        this.setFilterTagFocus();
        this.addFilterTagSubscriptions();
      }
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setFilterTagTabFocusability() {
    this.filterTags.forEach((x) => {
      x.makeTabFocusable(true);
    });
  }

  setFilterTagFocus() {
    if (this.lastSelectedIndex >= 0) {
      const nonRemovedFilterTags = this.filterTags.filter(x => !x.removed);
      if (this.lastSelectedIndex < nonRemovedFilterTags.length) {
        nonRemovedFilterTags[this.lastSelectedIndex].focus();
      } else if (nonRemovedFilterTags.length) {
        this.lastSelectedIndex = nonRemovedFilterTags.length - 1;
        nonRemovedFilterTags[nonRemovedFilterTags.length - 1].focus();
      }
    }
  }

  addFilterTagSubscriptions() {
    this.filterTagSubscriptions.forEach(x => x.unsubscribe());
    this.filterTagSubscriptions = [];

    this.filterTags.forEach((x, i) => {
      const previousSubscription = x.previous
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (i > 0) {
          this.filterTags.toArray()[i - 1].focus();
        } else {
          this.filterTags.last.focus();
        }
      });
      this.filterTagSubscriptions.push(previousSubscription);

      const nextSubscription = x.next
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        if (i < this.filterTags.length - 1) {
          this.filterTags.toArray()[i + 1].focus();
        } else {
          this.filterTags.first.focus();
        }
      });
      this.filterTagSubscriptions.push(nextSubscription);

      const removeSubscription = x.remove
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(() => {
        this.lastSelectedIndex = i;
        this.setFilterTagFocus();
      });
      this.filterTagSubscriptions.push(removeSubscription);
    });
  }
}
