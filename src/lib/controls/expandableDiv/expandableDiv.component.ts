import { Input, Component, HostBinding, ContentChild, ElementRef } from '@angular/core';

@Component({
    selector: 'vgr-expandable-div',
    moduleId: module.id,
    templateUrl: './expandableDiv.component.html',
})
export class ExpandableDivComponent {
    @HostBinding('class.expandable-div') private expandableDivClass = true;

    @Input() expanded: boolean;

    get chevron_class() {
        return this.expanded ? 'chevron-expanded' : 'chevron-collapsed';
    }

    constructor(private elementRef: ElementRef) { }

    toggleExpand() {
        if (this.expanded) {
            this.collapseContent(() => {
                this.expanded = false;
            })
        } else {
            this.expanded = true;
            this.expandContent();
        }
    }

    private collapseContent(callback?: any) {
        const chevron = $(this.elementRef.nativeElement).children('.chevron-expanded');
        if (!callback) {
            chevron.siblings('.expandable-content').slideUp(400);

        } else {
            chevron.siblings('.expandable-content').slideUp(400, callback);
        }
    }

    private expandContent() {
        const chevron = $(this.elementRef.nativeElement).children('.chevron-collapsed');
        chevron.siblings('.expandable-content').slideToggle(400);
    }
}

