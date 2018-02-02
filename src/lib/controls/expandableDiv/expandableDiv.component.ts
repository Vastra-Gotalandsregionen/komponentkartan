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
        this._expanded = expandedValue;
        this.collapsed = !expandedValue;
    }

    get expanded(): boolean {
        return this._expanded;
    }

    get chevron_class() {
        return 'expandable-div-chevron '.concat(this.expanded ? 'expanded' : 'collapsed');
    }

    constructor(private elementRef: ElementRef) { }

}

