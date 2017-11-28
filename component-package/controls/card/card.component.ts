import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
    selector: 'vgr-card',
    moduleId: module.id,
    templateUrl: './card.component.html'
})
export class CardComponent implements OnInit {
    // @HostBinding('class.card') cardClass = true;
    @Input() mode: CardMode;
    constructor() {
    }

    ngOnInit() {
        this.mode = this.mode === null || this.mode === undefined ? CardMode.fullWidth : this.mode;
    }
}

enum CardMode {
    fullWidth = 1,
    twoCollumns = 2
}