import { Component, Input, EventEmitter, Output, ViewChild } from "@angular/core";
import { SaveCancelComponent } from "../saveCancel/saveCancel.component";

@Component({
    selector: "page-header",
    templateUrl: "component-package/controls/pageHeader/pageHeader.component.html",
    host: { 'class': 'page-header' }
})
export class PageHeaderComponent {
    @Input() saveCancel: boolean;
    @Input() title: string;
    @Input() enableActionsText: string;
    @Output() actionStarted: EventEmitter<any> = new EventEmitter();
    @Output() actionEnded: EventEmitter<any> = new EventEmitter();
    @ViewChild(SaveCancelComponent) saveCancelComponent: SaveCancelComponent;

    actionsVisible: boolean;

    enableActions() {
        this.actionsVisible = true;
        this.actionStarted.emit();
        this.saveCancelComponent.unlock();
    }

    disableActions() {
        this.actionsVisible = false;
        this.actionEnded.emit();
    }
}