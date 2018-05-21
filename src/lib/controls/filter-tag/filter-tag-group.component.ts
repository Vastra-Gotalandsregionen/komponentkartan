import { Component, AfterContentInit, OnDestroy, ContentChildren, QueryList, Renderer } from '@angular/core';
import { FilterTagComponent } from './filter-tag.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'vgr-filter-tag-group',
  templateUrl: './filter-tag-group.component.html'
})
export class FilterTagGroupComponent implements AfterContentInit, OnDestroy {

  @ContentChildren(FilterTagComponent) filterTags: QueryList<FilterTagComponent>;
  filterTagSubscriptions = [];
  lastSelectedIndex: number;
  private ngUnsubscribe = new Subject();

  constructor(private renderer: Renderer) { }

  ngAfterContentInit() {
    this.setFilterTagTabIndexes();
    this.addFilterTagSubscriptions();

    this.filterTags.changes
    .takeUntil(this.ngUnsubscribe)
    .subscribe(
      _ => {
        this.setFilterTagTabIndexes();
        this.setFilterTagFocus();
        this.addFilterTagSubscriptions();
      }
    );
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  setFilterTagTabIndexes() {
    this.filterTags.forEach((x, i) => {
      const tabindex = i ? '-1' : '0';
      this.renderer.setElementAttribute(x.filtertag.nativeElement, 'tabindex', tabindex);
    });
  }

  setFilterTagFocus() {
    if (this.lastSelectedIndex >= 0) {
      const nonRemovedFilterTags = this.filterTags.filter(x => !x.removed);
      if (this.lastSelectedIndex < nonRemovedFilterTags.length) {
        nonRemovedFilterTags[this.lastSelectedIndex].setFocus();
      } else if (nonRemovedFilterTags.length) {
        nonRemovedFilterTags[nonRemovedFilterTags.length - 1].setFocus();
      }
    }
  }

  addFilterTagSubscriptions() {
    this.filterTagSubscriptions.forEach(x => x.unsubscribe());
    this.filterTagSubscriptions = [];

    this.filterTags.forEach((x, i) => {
      const previousSubscription = x.previous
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        if (i > 0) {
          this.filterTags.toArray()[i - 1].setFocus();
        } else {
          this.filterTags.last.setFocus();
        }
      });
      this.filterTagSubscriptions.push(previousSubscription);

      const nextSubscription = x.next
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        if (i < this.filterTags.length - 1) {
          this.filterTags.toArray()[i + 1].setFocus();
        } else {
          this.filterTags.first.setFocus();
        }
      });
      this.filterTagSubscriptions.push(nextSubscription);

      const removeSubscription = x.remove
      .takeUntil(this.ngUnsubscribe)
      .subscribe(() => {
        this.lastSelectedIndex = i;
        this.setFilterTagFocus();
      });
      this.filterTagSubscriptions.push(removeSubscription);
    });
  }
}
