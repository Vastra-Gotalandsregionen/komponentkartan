import { Output, EventEmitter, Directive } from '@angular/core';
@Directive()
export abstract class MenuItemBaseDirective {
    @Output()
    home: EventEmitter<null> = new EventEmitter();
    @Output()
    end: EventEmitter<null> = new EventEmitter();
    @Output()
    escape: EventEmitter<null> = new EventEmitter();
    @Output()
    arrowUp: EventEmitter<null> = new EventEmitter();
    @Output()
    arrowDown: EventEmitter<null> = new EventEmitter();
    @Output()
    tab: EventEmitter<null> = new EventEmitter();
    @Output() showExpanded: boolean;
    constructor() { }
    setFocus(movingUp: boolean = false) { }
}
