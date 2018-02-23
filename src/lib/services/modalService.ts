import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

    // Observable string sources
    private modalOpenedSource = new Subject<ModalConfiguration>();
    private modalClosedSource = new Subject<ModalConfiguration>();

    // Observable string streams
    modalOpened$ = this.modalOpenedSource.asObservable();
    modalClosed$ = this.modalClosedSource.asObservable();

    openDialog(elementId: string) {
        this.modalOpenedSource.next(new ModalConfiguration(elementId));
    }

    closeDialog(){
        this.modalClosedSource.next();
    }

    openOneButtonDialog(elementId:string, buttonText: string, callback: () => void) {
        this.openDialog(elementId);
    }

    openSaveDontSaveCancelDialog(elementId: string) {
        this.openDialog(elementId);
    }
}

export class ModalConfiguration {
    constructor( public elementId: string) {
    }
}

