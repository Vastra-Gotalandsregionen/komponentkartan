import { CardComponent } from '../../component-package/controls/card/card.component';
import { CardColumnComponent } from '../../component-package/controls/card/card-column.component';
import { QueryList } from '@angular/core';



describe('[CardComponent]', () => {
    const card = new CardComponent();
    describe('When card contains two columns', () => {
        beforeEach(() => {
            card.columns = {
                length: 2,
                first: {},
                last: {}
            } as QueryList<CardColumnComponent>;
            card.ngAfterContentInit();
        });
        it('The first column is placed left', () => {
            expect(card.columns.first.left).toBeTruthy();
            expect(card.columns.first.right).toBeFalsy();
            expect(card.columns.first.fullwidth).toBeFalsy();
        });
        it('The second column is placed right', () => {
            expect(card.columns.last.right).toBeTruthy();
            expect(card.columns.last.left).toBeFalsy();
            expect(card.columns.last.fullwidth).toBeFalsy();
        });
    });
    describe('When card contains one column', () => {
        beforeEach(() => {
            card.columns = {
                length: 1,
                first: {}
            } as QueryList<CardColumnComponent>;
            card.ngAfterContentInit();
        });
        it('The column is full-width', () => {
            expect(card.columns.first.fullwidth).toBeTruthy();
            expect(card.columns.first.right).toBeFalsy();
            expect(card.columns.first.left).toBeFalsy();
        });
    });
});
