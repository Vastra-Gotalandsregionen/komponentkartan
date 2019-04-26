import { Output, EventEmitter } from '@angular/core';

export abstract class MenuItemBase {
    @Output() home: EventEmitter<null> = new EventEmitter();
    @Output() end: EventEmitter<null> = new EventEmitter();
    @Output() escape: EventEmitter<null> = new EventEmitter();
    @Output() arrowUp: EventEmitter<null> = new EventEmitter();
    @Output() arrowDown: EventEmitter<null> = new EventEmitter();

    constructor() { }

    setFocus(movingUp: boolean = false) { }
}