import { Input, Component, HostBinding, ContentChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vgr-expandable-div',
    moduleId: module.id,
    templateUrl: './expandableDiv.component.html',
})
export class ExpandableDivComponent {
    private expanded_chevron: boolean;

    @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    @HostBinding('class.expandable-div--expanded') private _expanded: boolean;
    @HostBinding('class.expandable-div') private expandableDivClass = true;
    @HostBinding('class.expandable-div--collapsed') isCollapsed() { return !this._expanded; }

    @Input() set expanded(expandedValue: boolean) {
        if (expandedValue && !this._expanded) {
            this._expanded = true;
            this.expanded_chevron = true;
        } else if (!expandedValue && this._expanded) {
            this._expanded = false;
            setTimeout(() => {
                this.expanded_chevron = false;
            }, 400);
        }
    }

    get expanded(): boolean {
        return this._expanded;
    }

    get chevron_class() {
        return 'expandable-div-chevron '.concat(this.expanded_chevron ? 'expanded' : 'collapsed');
    }

    constructor(private elementRef: ElementRef) { }
}

