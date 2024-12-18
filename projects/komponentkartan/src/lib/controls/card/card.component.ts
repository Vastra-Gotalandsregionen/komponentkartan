import { Component, ContentChildren, QueryList, AfterContentInit } from '@angular/core';
import { CardColumnComponent } from './card-column.component';



@Component({
    selector: 'vgr-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    standalone: false
})
export class CardComponent implements AfterContentInit {
    @ContentChildren(CardColumnComponent) columns: QueryList<CardColumnComponent>;

    constructor() {
    }

    ngAfterContentInit() {
        if (this.columns.length === 1) {
            this.columns.first.fullwidth = true;
        } else if (this.columns.length === 2) {
            this.columns.first.left = true;
            this.columns.last.right = true;
        }
    }
}
