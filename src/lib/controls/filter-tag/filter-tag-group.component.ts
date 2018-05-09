import { Component, AfterContentInit, HostListener, ContentChildren, QueryList, Renderer } from '@angular/core';
import { FilterTagComponent } from './filter-tag.component';

@Component({
    selector: 'vgr-filter-tag-group',
    templateUrl: './filter-tag-group.component.html'
})
export class FilterTagGroupComponent implements AfterContentInit {

    @ContentChildren(FilterTagComponent) filterTags: QueryList<FilterTagComponent>;
    filterTagSubscriptions = [];

    constructor(private renderer: Renderer) { }

    ngAfterContentInit() {
        this.setFilterTagTabIndexes();
        this.addFilterTagSubscriptions();

        this.filterTags.changes.subscribe(
            _ => {
                this.setFilterTagTabIndexes();
                this.addFilterTagSubscriptions();
            }
        );
    }

    setFilterTagTabIndexes() {
        this.filterTags.forEach((x, i) => {
            const tabindex = i ? '-1' : '0';
            this.renderer.setElementAttribute(x.filtertag.nativeElement, 'tabindex', tabindex);
        });
    }

    addFilterTagSubscriptions() {
        this.filterTagSubscriptions.forEach(x => x.unsubscribe());
        this.filterTagSubscriptions = [];

        this.filterTags.forEach((x, i) => {
            const previousSubscription = x.previous.subscribe(() => {
                if (i > 0) {
                    this.filterTags.toArray()[i - 1].setFocus();
                } else {
                    this.filterTags.last.setFocus();
                }
            });
            this.filterTagSubscriptions.push(previousSubscription);

            const nextSubscription = x.next.subscribe(() => {
                if (i < this.filterTags.length - 1) {
                    this.filterTags.toArray()[i + 1].setFocus();
                } else {
                    this.filterTags.first.setFocus();
                }
            });
            this.filterTagSubscriptions.push(nextSubscription);
        });
    }
}
