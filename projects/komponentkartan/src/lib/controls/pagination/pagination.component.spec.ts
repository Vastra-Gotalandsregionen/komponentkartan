import { SimpleChanges, SimpleChange } from '@angular/core';

import { PaginationComponent } from './pagination.component';
import { PageItem } from 'dist/komponentkartan/lib/controls/pagination/page-item';

fdescribe('[PaginationComponent]', () => {
    let component: PaginationComponent;
    beforeEach(() => {
        component = new PaginationComponent();
    });
    describe('Instatiate', () => {
        it('pages is correct', () => {
            expect(component.pages).toBeFalsy();
        });
        it('activePage is correct', () => {
            expect(component.activePage).toBeFalsy();
        });
        it('pagesItems to be correct', () => {
            expect(component.pageItems).toEqual([]);
        });
        it('focusedPageLabel be correct', () => {
            expect(component.focusedPageLabel).toBeFalsy();
        });
    });

    describe('ngOnChanges', () => {
        let changes: SimpleChanges;
        describe('pages is not changed', () => {
            beforeEach(() => {
                component.pages = 0;
                changes = { 'pages': {} as SimpleChange };
                component.ngOnChanges(changes);
            });
            it('pages is correct', () => {
                expect(component.pages).toBe(0);
            });
            it('pageItems is correct', () => {
                expect(component.pageItems).toEqual([]);
            });
        });
        describe('pages is changed', () => {
            describe('pages is less than or equal to 7', () => {
                describe('and active page is 1', () => {
                    beforeEach(() => {
                        component.pages = 2;
                        component.activePage = 1;
                        changes = { 'pages': {} as SimpleChange, 'activePage': {} as SimpleChange };
                        component.ngOnChanges(changes);
                    });
                    it('pageItems length is correct', () => {
                        expect(component.pageItems.length).toBe(4);
                    });
                    it('pageItem labels are correct', () => {
                        const labels = component.pageItems.map(x => x.label).toString();
                        expect(labels).toBe('Föregående sida,1,2,Nästa sida');
                    });
                });
            });
            describe('pages is 8', () => {
                describe('and active page is less than 5', () => {
                    beforeEach(() => {
                        component.pages = 8;
                        component.activePage = 2;
                        changes = { 'pages': {} as SimpleChange, 'activePage': {} as SimpleChange };
                        component.ngOnChanges(changes);
                    });
                    it('pageItems length is correct', () => {
                        expect(component.pageItems.length).toBe(9);
                    });
                    it('pageItem labels are correct', () => {
                        const labels = component.pageItems.map(x => x.label).toString();
                        expect(labels).toBe('Föregående sida,1,2,3,4,5,...,8,Nästa sida');
                    });
                    it('pageItem buttonIndexes are correct', () => {
                        const buttonIndexes = component.pageItems.filter(x => x.buttonIndex >= 0).map(x => x.buttonIndex);
                        expect(buttonIndexes).toEqual([0, 1, 2, 3, 4, 5, 6, 7]);
                    });
                    it('pageItem active is correct', () => {
                        const activePage = component.pageItems.findIndex(x => x.active);
                        expect(activePage).toBe(component.activePage);
                    });
                    it('pageItem tabindexes are correct', () => {
                        const tabindexes = component.pageItems.filter(x => x.tabindex === 0 || x.tabindex === -1).map(x => x.tabindex);
                        expect(tabindexes).toEqual([-1, -1, 0, -1, -1, -1, -1, -1]);
                    });
                });
            });
        });
    });
});