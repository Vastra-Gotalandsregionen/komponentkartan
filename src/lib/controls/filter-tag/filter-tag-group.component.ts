import { Component, AfterContentInit, HostListener, ContentChildren, QueryList, Renderer } from '@angular/core';
import { FilterTagComponent } from './filter-tag.component';

@Component({
    selector: 'vgr-filter-tag-group',
    templateUrl: './filter-tag-group.component.html'
})
export class FilterTagGroupComponent implements AfterContentInit {

    selectedIndex = 0;
    @ContentChildren(FilterTagComponent) filterTags: QueryList<FilterTagComponent>;

    constructor(private renderer: Renderer) { }

    ngAfterContentInit() {
        if (this.filterTags.length) {
            this.renderer.setElementAttribute(this.filterTags.first.filtertag.nativeElement, 'tabindex', '0');
        }
    }

    @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
        if (!this.filterTags.length) {
            return;
        }

        if (event.keyCode === 37 || event.keyCode === 38) { // Arrow Left, Arrow Up
            event.preventDefault();
            if (this.selectedIndex > 0) {
                this.selectedIndex--;
                this.filterTags.toArray()[this.selectedIndex].setFocus();
            }
        }
        if (event.keyCode === 39 || event.keyCode === 40) { // Arrow Right, Arrow Down
            event.preventDefault();
            if (this.selectedIndex < this.filterTags.length - 1) {
                this.selectedIndex++;
                this.filterTags.toArray()[this.selectedIndex].setFocus();
            }
        }
    }
}
