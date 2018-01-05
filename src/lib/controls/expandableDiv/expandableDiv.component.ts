import { Input, Component, HostBinding, ContentChild, ElementRef, AfterContentInit } from '@angular/core';

@Component({
    selector: 'vgr-expandable-div',
    moduleId: module.id,
    templateUrl: './expandableDiv.component.html',
})
export class ExpandableDivComponent {
    @HostBinding('class.expandable-div--expanded') private _expanded: boolean;
    @HostBinding('class.expandable-div') private expandableDivClass = true;

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

    // ngAfterContentInit() {
    //     setTimeout(() => {
    //         this.setContentOpenOrClosed();
    //     }, 10);
    // }

    constructor(private elementRef: ElementRef) { }

    collapse() {
        this.collapseContent(() => {
            this._expanded = false;
        })
    }

    expand() {
        this._expanded = true;
        this.expandContent();
    }

    // setContentOpenOrClosed() {
    //     if (this._expanded) {
    //         this.collapseContent(() => {
    //             this._expanded = false;
    //         })
    //     } else {
    //         this._expanded = true;
    //         this.expandContent();
    //     }
    // }

    private collapseContent(callback?: any) {
        const header = $(this.elementRef.nativeElement).children('.expandable-div-header');
        if (!callback) {
            header.siblings('.expandable-div-content').slideUp(400);

        } else {
            header.siblings('.expandable-div-content').slideUp(400, callback);
        }
    }

    private expandContent() {
        const header = $(this.elementRef.nativeElement).children('.expandable-div-header');
        header.siblings('.expandable-div-content').slideToggle(400);
    }
}

