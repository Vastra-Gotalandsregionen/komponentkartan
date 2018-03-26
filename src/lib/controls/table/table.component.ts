import { Component, HostBinding, Output, EventEmitter } from '@angular/core';
import { ExpandableDivComponent } from '../expandableDiv/expandableDiv.component';
@Component({
    selector: 'vgr-table',
    moduleId: module.id,
    templateUrl: './table.component.html'
})
export class TableComponent extends ExpandableDivComponent {
    @HostBinding('class') tableClass = 'table';

    @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

    onExpandedChanged(expanded: boolean) {
        this.expandedChanged.emit(expanded);
    }
}

