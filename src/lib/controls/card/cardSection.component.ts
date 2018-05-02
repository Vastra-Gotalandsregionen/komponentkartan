import { Component, HostBinding, Input, ElementRef, AnimationTransitionEvent, OnInit } from '@angular/core';
import { trigger, style, transition, animate, group, state, query } from '@angular/animations';

@Component({
    selector: 'vgr-card-section',
    moduleId: module.id,
    templateUrl: './cardSection.component.html',
    animations: [
        trigger('toggleContent', [
            state('void', style({
                height: '0',
                overflow: 'hidden',
            })),
            state('collapsed', style({
                height: '0',
                overflow: 'hidden',
            })),
            state('expanded', style({
                height: '*'
            })),
            transition('* => expanded', [animate('600ms  ease-in')]),
            transition('* => collapsed', [animate('600ms ease-out')])
        ])
    ]
})
export class CardSectionComponent implements OnInit {
    @HostBinding('class.card-section') cardSectionClass = true;
    @HostBinding('class.card-section--expanded') private _expanded = false;
    @Input() @HostBinding('class.card-section--readonly') readonly: boolean;
    @Input() title: string;
    @Input() subtitle: string;
    @Input() set expanded(value: boolean) {
        this._expanded = value;
    }
    get expanded(): boolean {
        return this._expanded;
    }
    private _showExpanded: boolean;

    get showExpanded() {
        return this._showExpanded;
    }

    set showExpanded(show: boolean) {
        if (show) {
            this._showExpanded = true;
            this.expanded = true;
            this.state = 'expanded';
        } else {
            this.state = 'collapsed';
        }
    }

    state: string;

    constructor(private elementRef: ElementRef) {
        this.readonly = true;
    }

    ngOnInit() {
        this._showExpanded = this.expanded;
    }

    animationDone(event: AnimationTransitionEvent) {
        if (event.toState === 'collapsed') {
            this._showExpanded = false;
            this.expanded = false;
        }
        this.elementRef.nativeElement.style['overflow'] = 'visible';
    }

    animationStart($event) {
        this.elementRef.nativeElement.style['overflow'] = 'hidden';
    }

}
