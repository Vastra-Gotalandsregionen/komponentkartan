import { Input, Component, HostBinding, ContentChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vgr-expandable-div',
    moduleId: module.id,
    templateUrl: './expandableDiv.component.html',
})
export class ExpandableDivComponent {
    @HostBinding('class.expandable-div--collapsed') private collapsed = true;
    @HostBinding('class.expandable-div--expanded') private _expanded: boolean;
    @HostBinding('class.expandable-div') private expandableDivClass = true;

    @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() set expanded(expandedValue: boolean) {
        if (expandedValue && !this._expanded) {
            this.expand();
        } else if (!expandedValue && this._expanded) {
            this.collapse();
        }
    }

    get expanded(): boolean {
        return this._expanded;
    }

    get chevron_class() {
        return 'expandable-div-chevron '.concat(this.expanded ? 'expanded' : 'collapsed');
    }

    constructor(private elementRef: ElementRef) { }

    collapse() {
        this.collapseContent(() => {
            const expandedChanged = this._expanded;
            this._expanded = false;
            this.collapsed = true;
            if (expandedChanged) {
                this.expandedChanged.emit(this._expanded);
            }
        });
    }

    expand() {
        this.expandContent();
        const expandedChanged = !this._expanded;
        this._expanded = true;
        this.collapsed = false;
        if (expandedChanged) {
            this.expandedChanged.emit(this._expanded);
        }
    }

    private collapseContent(callback?: any) {
        const header = $(this.elementRef.nativeElement).children('.expandable-div-header');
        header.siblings('.expandable-div-content').slideUp(400, callback);
    }

    private expandContent() {
        const header = $(this.elementRef.nativeElement).children('.expandable-div-header');
        header.siblings('.expandable-div-content').slideDown(400);
    }
}

