import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()
export class ModalService {

    // Observable string sources
    private modalOpenedSource = new Subject<string>();
    private modalClosedSource = new Subject<string>();

    // Observable string streams
    modalOpened$ = this.modalOpenedSource.asObservable();
    modalClosed$ = this.modalClosedSource.asObservable();

    openDialog(elementId: string) {
        this.modalOpenedSource.next(elementId);
    }

    closeDialog(elementId: string) {
        this.modalClosedSource.next(elementId);
    }
}

