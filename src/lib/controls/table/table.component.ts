import { Input, Component, HostBinding, ContentChild, ElementRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'vgr-table',
    moduleId: module.id,
    templateUrl: './table.component.html',
})
export class TableComponent {
    @HostBinding('class.table--collapsed') private collapsed = true;
    @HostBinding('class.table--expanded') private _expanded: boolean;
    @HostBinding('class.table') private expandableDivClass = true;

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
        return 'table-chevron '.concat(this.expanded ? 'expanded' : 'collapsed');
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

