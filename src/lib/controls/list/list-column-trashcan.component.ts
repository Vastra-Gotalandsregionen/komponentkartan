import { Component, EventEmitter, HostBinding, HostListener, Output, Input, forwardRef } from '@angular/core';

import { ListColumnHeaderComponent } from './list-column-header.component';
import { ListColumnComponent } from './list-column.component';

@Component({
    templateUrl: './list-column-trashcan.component.html',
    moduleId: module.id,
    selector: 'vgr-list-column-trashcan',
    providers: [{
        provide: ListColumnComponent,
        useExisting: forwardRef(() => ListColumnTrashcanComponent)
    }]
})
export class ListColumnTrashcanComponent extends ListColumnComponent {
    @HostBinding('class.list__column--trashcan') listColumnTrashcanClass = true;
    @HostBinding('tabIndex') tabIndexTrashcan = 0;
    @Output() delete = new EventEmitter();
    @Input() disabled = false;
    @HostBinding('class.disabled') get disabledClass() {
        return this.disabled;
    }

    @HostListener('keydown', ['$event'])
    deleteRow(event: KeyboardEvent) {
        if (event.keyCode === 13 || event.keyCode === 32) { // enter & space
            this.onDelete(event);
            event.preventDefault();
        }
    }

    onDelete(e: Event) {

        e.cancelBubble = true;
        if (this.disabled) {
            return;
        }
        this.delete.emit();
    }
}

