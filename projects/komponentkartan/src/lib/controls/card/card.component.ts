import { Component, HostBinding, Input, OnInit, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CardColumnComponent } from './card-column.component';



@Component({
    selector: 'vgr-card',
    moduleId: module.id,
    templateUrl: './card.component.html'
})
export class CardComponent implements OnInit, AfterContentInit {
    @ContentChildren(CardColumnComponent) columns: QueryList<CardColumnComponent>;

    constructor() {
    }

    ngOnInit() { }

    ngAfterContentInit() {
        if (this.columns.length === 1) {
            this.columns.first.fullwidth = true;
        } else if (this.columns.length === 2) {
            this.columns.first.left = true;
            this.columns.last.right = true;
        }
    }
}
