import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/rx';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

    // Observable string sources
    private modalOpenedSource = new Subject<ModalConfiguration>();

    // Observable string streams
    modalOpened$ = this.modalOpenedSource.asObservable();

    openDialog(title: string,
        message: string,
        button1Config: ModalButtonConfiguration,
        button2Config?: ModalButtonConfiguration,
        button3Config?: ModalButtonConfiguration) {
        let buttonConfigs = [button1Config];
        if (button2Config && button3Config) {
            buttonConfigs = [button1Config, button2Config, button3Config];
        } else if (button2Config) {
            buttonConfigs = [button1Config, button2Config];
        }

        this.modalOpenedSource.next(new ModalConfiguration(title, message, buttonConfigs));
    }

    openOneButtonDialog(title: string, message: string, buttonText: string, callback: () => void) {
        this.openDialog(title, message, new ModalButtonConfiguration(buttonText, callback))
    }

    openSaveDontSaveCancelDialog(title: string, message: string,
        saveCallback: () => void, dontSaveCallback: () => void, cancelCallback: () => void) {
        this.openDialog(title, message, new ModalButtonConfiguration('Spara', saveCallback),
            new ModalButtonConfiguration('Spara inte', dontSaveCallback), new ModalButtonConfiguration('Avbryt', cancelCallback));

    }
}

export class ModalConfiguration {
    constructor(public title: string, public message: string, public buttons: ModalButtonConfiguration[]) {
    }
}

export class ModalButtonConfiguration {
    constructor(public text: string, public callback: () => void) {
    }
}

