import { Component, Input, EventEmitter, Output, ViewChild, HostBinding } from '@angular/core';
import { SaveCancelComponent } from '../saveCancel/saveCancel.component';

@Component({
    selector: 'vgr-page-header',
    moduleId: module.id,
    templateUrl: './pageHeader.component.html'
})
export class PageHeaderComponent {
    @HostBinding('class.page-header') hasClass = true;
    @Input() saveCancel: boolean;
    @Input() title: string;
    @Input() enableActionsText: string;
    @Input() disableActionsText: string;
    @Output() actionStarted: EventEmitter<any> = new EventEmitter();
    @Output() actionEnded: EventEmitter<any> = new EventEmitter();
    @ViewChild(SaveCancelComponent) saveCancelComponent: SaveCancelComponent;
    @Input() expanded = false;

    enableActions() {
        this.expanded = true;
        this.actionStarted.emit();
        if (this.saveCancelComponent) {
            this.saveCancelComponent.unlock();
        }
    }

    disableActions() {
        this.expanded = false;
        this.actionEnded.emit();
    }
}
