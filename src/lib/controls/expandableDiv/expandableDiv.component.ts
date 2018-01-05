import { Input, Component, HostBinding, ContentChild, ElementRef, OnInit } from '@angular/core';

@Component({
    selector: 'vgr-expandable-div',
    moduleId: module.id,
    templateUrl: './expandableDiv.component.html',
})
export class ExpandableDivComponent {
    @HostBinding('class.expandable-div') private expandableDivClass = true;

    @Input() expanded: boolean;

    get chevron_class() {
        return 'expandable-div-chevron '.concat(this.expanded ? 'expanded' : 'collapsed');
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
        const chevron = $(this.elementRef.nativeElement).children('.expandable-div-chevron');
        if (!callback) {
            chevron.siblings('.expandable-content').slideUp(400);

        } else {
            chevron.siblings('.expandable-content').slideUp(400, callback);
        }
    }

    private expandContent() {
        const chevron = $(this.elementRef.nativeElement).children('.expandable-div-chevron');
        chevron.siblings('.expandable-content').slideToggle(400);
    }
}

