import { Injectable, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/rx";
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ModalService {

    // Observable string sources
    private modalOpenedSource = new Subject<ModalConfiguration>();

    // Observable string streams
    modalOpened$ = this.modalOpenedSource.asObservable();

    openDialog(title: string, message: string, button1Config: ModalButtonConfig, button2Config?: ModalButtonConfig, button3Config?: ModalButtonConfig) {
        let buttonConfigs = [button1Config];
        if (button2Config && button3Config)
            buttonConfigs = [button1Config, button2Config, button3Config];
        else if (button2Config)
            buttonConfigs = [button1Config, button2Config];

        this.modalOpenedSource.next(new ModalConfiguration(title, message, buttonConfigs));
    }

    openOneButtonDialog(title: string, message: string, buttonText: string, callback: () => void) {
        this.openDialog(title, message, new ModalButtonConfig(buttonText, callback))
    }

    openSaveDontSaveCancelDialog(title: string, message: string,
        saveCallback: () => void, dontSaveCallback: () => void, cancelCallback: () => void) {
        this.openDialog(title, message, new ModalButtonConfig("Spara", saveCallback),
            new ModalButtonConfig("Spara inte", dontSaveCallback), new ModalButtonConfig("Avbryt", cancelCallback));

    }
}

export class ModalConfiguration {
    constructor(public title: string, public message: string, public buttons: ModalButtonConfig[]) {
    }
}

export class ModalButtonConfig {
    constructor(public text: string, public callback: () => void) {
    }
}

