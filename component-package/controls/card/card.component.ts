import { Component, HostBinding } from '@angular/core';

@Component({
    selector: 'vgr-card',
    moduleId: module.id,
    templateUrl: './card.component.html'
})
export class CardComponent {
    @HostBinding('class.card') cardClass = true;
    constructor() {
    }
}
