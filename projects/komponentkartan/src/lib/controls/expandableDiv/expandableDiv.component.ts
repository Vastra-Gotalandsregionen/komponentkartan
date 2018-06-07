import { Input, Component, HostBinding, ContentChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { trigger, style, transition, animate, state } from '@angular/animations';

@Component({
    selector: 'vgr-expandable-div',
    templateUrl: './expandableDiv.component.html',
    animations: [
        trigger('slideExpandableContent', [
            state('collapsed', style({
                overflow: 'hidden',
                height: '0'
            })),
            state('expanded', style({
                overflow: 'visible',
                height: '*',
            })),
            transition('expanded => collapsed',
                animate('400ms ease-out')
            ),
            transition('collapsed => expanded',
                animate('400ms ease-in')
            ),
        ])
    ]
})
export class ExpandableDivComponent {
    @HostBinding('class.expandable-div--collapsed') collapsed = true;
    @HostBinding('class.expandable-div--expanded') _expanded: boolean;
    @HostBinding('class.expandable-div') expandableDivClass = true;

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

    get stateName() {
        return this.expanded ? 'expanded' : 'collapsed';
    }


    constructor(private elementRef: ElementRef) { }

    animationDone($event) {
        this.elementRef.nativeElement.style['overflow'] = 'visible';

    }
    animationStart($event) {
        this.elementRef.nativeElement.style['overflow'] = 'hidden';
    }

    collapse() {
        const expandedChanged = this._expanded;
        this._expanded = false;
        this.collapsed = true;
        if (expandedChanged) {
            this.expandedChanged.emit(this._expanded);
        }
    }

    expand() {
        const expandedChanged = !this._expanded;
        this._expanded = true;
        this.collapsed = false;
        if (expandedChanged) {
            this.expandedChanged.emit(this._expanded);
        }
    }
}

