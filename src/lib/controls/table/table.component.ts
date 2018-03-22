import { Input, Component, HostBinding, ContentChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { trigger, style, transition, animate, group, state, query } from '@angular/animations';

@Component({
    selector: 'vgr-table',
    moduleId: module.id,
    templateUrl: './table.component.html',
    animations: [
        trigger('slideTableContent', [
            state('collapsed', style({
                overflow: 'hidden',
                height: '0'
            })),
            state('expanded', style({
                overflow: 'visible',
                height: '*',
                "margin-bottom": '10px'
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
export class TableComponent {
    @HostBinding('class.table--collapsed') private collapsed = true;
    @HostBinding('class.table--expanded') private _expanded: boolean;
    @HostBinding('class.table') private tableClass = true;

    @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Input() set expanded(expandedValue: boolean) {
        console.log('set expanded');
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
        return 'table-chevron '.concat(this.expanded ? 'expanded' : 'collapsed');
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
        console.log('collapse');
        const expandedChanged = this._expanded;
        this._expanded = false;
        this.collapsed = true;
        if (expandedChanged) {
            this.expandedChanged.emit(this._expanded);
        }
    }

    expand() {
        console.log('expand');
        const expandedChanged = !this._expanded;
        this._expanded = true;
        this.collapsed = false;
        if (expandedChanged) {
            this.expandedChanged.emit(this._expanded);
        }
    }
}

