import { Component, AfterContentInit, HostListener, ContentChildren, QueryList, Renderer } from '@angular/core';
import { FilterTagComponent } from './filter-tag.component';

@Component({
    selector: 'vgr-filter-tag-group',
    moduleId: module.id,
    templateUrl: './filter-tag-group.component.html'
})
export class FilterTagGroupComponent implements AfterContentInit {

    @ContentChildren(FilterTagComponent) filterTags: QueryList<FilterTagComponent>;

    constructor(private renderer: Renderer) { }

    ngAfterContentInit() {
        if (this.filterTags.length) {
            this.renderer.setElementAttribute(this.filterTags.first.filtertag.nativeElement, 'tabindex', '0');
        }

        this.filterTags.forEach((x, i) => {
            x.previous.subscribe(() => {
                if (i > 0) {
                    this.filterTags.toArray()[i - 1].setFocus();
                } else {
                    this.filterTags.last.setFocus();
                }
            });

            x.next.subscribe(() => {
                if (i < this.filterTags.length - 1) {
                    this.filterTags.toArray()[i + 1].setFocus();
                } else {
                    this.filterTags.first.setFocus();
                }
            });
        });
    }
}
