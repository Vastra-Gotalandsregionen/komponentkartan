import { Component, EventEmitter, HostBinding, Output, Input } from '@angular/core';

import { ListColumnHeaderComponent } from './list-column-header.component';
import { ListColumnComponent } from './list-column.component';

@Component({
    templateUrl: './list-column-trashcan.component.html',
    moduleId: module.id,
    selector: 'vgr-list-column-trashcan'
})
export class ListColumnTrashcanComponent extends ListColumnComponent {
    @HostBinding('class.list__column--trashcan') listColumnTrashcanClass = true;
    @Output() delete = new EventEmitter();
    @Input() disabled = false;
    @HostBinding('class.disabled') get disabledClass() {
        return this.disabled;
    }

    onDelete(e: Event) {
        e.cancelBubble = true;
        if (this.disabled) {
            return;
        }
        this.delete.emit();
    }
}

