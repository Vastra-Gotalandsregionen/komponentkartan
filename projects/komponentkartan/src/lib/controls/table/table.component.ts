import { Component, HostBinding, Output, EventEmitter, HostListener } from '@angular/core';
import { ExpandableDivComponent } from '../expandableDiv/expandableDiv.component';
import { trigger, style, transition, animate, group, state, query } from '@angular/animations';
@Component({
    selector: 'vgr-table',
    templateUrl: './table.component.html',
    animations: [
        trigger('toggleExpandedState', [
            transition(':enter', [
                style({ height: '0'}),
                animate('0.4s ease', style({ height: '*' })),
            ]),
            transition(':leave', [
                style({ height: '*'}),
                animate('0.4s ease', style({ height: '0' })),
            ]),
        ])
    ]
})
export class TableComponent extends ExpandableDivComponent {
    @HostBinding('class') tableClass = 'table';

    @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    rowExpanded = false;
    @HostListener('keydown', ['$event']) toggleRow(event: KeyboardEvent) {
        if (event.keyCode === 13 || event.keyCode === 32) { // enter & space
            event.preventDefault();
            event.stopPropagation();
            if (!this.rowExpanded) {
                this.expand();
            } else {
                this.collapse();
            }
        }
    }

    onExpandedChanged(expanded: boolean) {
        this.rowExpanded = expanded;
        this.expandedChanged.emit(expanded);
    }
}

