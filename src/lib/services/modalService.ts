import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

    // Observable string sources
    private modalOpenedSource = new Subject<ModalConfiguration>();

    // Observable string streams
    modalOpened$ = this.modalOpenedSource.asObservable();

    openDialog(elementId: string,
        button1Config: ModalButtonConfiguration,
        button2Config?: ModalButtonConfiguration,
        button3Config?: ModalButtonConfiguration,
        ) {
        let buttonConfigs = [button1Config];
        if (button2Config && button3Config) {
            buttonConfigs = [button1Config, button2Config, button3Config];
        } else if (button2Config) {
            buttonConfigs = [button1Config, button2Config];
        }

        this.modalOpenedSource.next(new ModalConfiguration(elementId, buttonConfigs));
    }

    openOneButtonDialog(elementId:string, buttonText: string, callback: () => void) {
        this.openDialog(elementId, new ModalButtonConfiguration(buttonText, callback));
    }

    openSaveDontSaveCancelDialog(elementId: string,
        saveCallback: () => void, dontSaveCallback: () => void, cancelCallback: () => void) {
        this.openDialog(elementId, new ModalButtonConfiguration('Spara', saveCallback),
            new ModalButtonConfiguration('Spara inte', dontSaveCallback), new ModalButtonConfiguration('Avbryt', cancelCallback, true));

    }
}

export class ModalConfiguration {
    constructor( public elementId: string, public buttons: ModalButtonConfiguration[]) {
    }
}

export class ModalButtonConfiguration {
    constructor(public text: string, public callback: () => void, public isDefault = false) {
    }
}

