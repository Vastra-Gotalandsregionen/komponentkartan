import { SimpleChanges, SimpleChange } from '@angular/core';

import { PaginationComponent } from './pagination.component';

describe('[PaginationComponent]', () => {
    let component: PaginationComponent;
    beforeEach(() => {
        component = new PaginationComponent();
    });
    describe('Instatiate', () => {
        it('pages is correct', () => {
            expect(component.pages).toBe(1);
        });
        it('activePage is correct', () => {
            expect(component.activePage).toBe(1);
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
                component.pages = 1;
                changes = { 'pages': {} as SimpleChange };
                component.ngOnChanges(changes);
            });
            it('pages is correct', () => {
                expect(component.pages).toBe(1);
            });
            it('pageItems is correct', () => {
                expect(component.pageItems.length).toBe(3);
            });
        });
        describe('pages is changed', () => {
            describe('pages is less than or equal to 7', () => {
                describe('and active page is 1', () => {
                    beforeEach(() => {
                        component.pages = 2;
                        component.activePage = 1;
                        changes = {
                            'pages': { currentValue: 2 } as SimpleChange,
                            'activePage': { currentValue: 1 } as SimpleChange
                        };
                        component.ngOnChanges(changes);
                    });
                    it('pageItems length is correct', () => {
                        expect(component.pageItems.length).toBe(4);
                    });
                    it('pageItem labels are correct', () => {
                        const labels = component.pageItems.map(x => x.label).toString();
                        expect(labels).toBe('Föregående sida,1,2,Nästa sida');
                    });
                    it('pageItem aria-labels are correct', () => {
                        const ariaLabels = component.pageItems.map(x => x.ariaLabel).toString();
                        expect(ariaLabels).toBe(',Du är på sida 1 av 2,Gå till sista sidan, sida 2 av 2,Gå till nästa sida, sida 2 av 2');
                    });
                    it('pageItem buttonIndexes are correct', () => {
                        const buttonIndexes = component.pageItems.map(x => x.buttonIndex);
                        expect(buttonIndexes).toEqual([0, 1, 2, 3]);
                    });
                    it('pageItem active is correct', () => {
                        const activePage = component.pageItems.find(x => x.active).label;
                        expect(activePage).toBe(component.activePage.toString());
                    });
                    it('pageItem tabindexes are correct', () => {
                        const tabindexes = component.pageItems.map(x => x.tabindex);
                        expect(tabindexes).toEqual([-1, 0, -1, -1]);
                    });
                });
            });
            describe('pages is 8', () => {
                describe('and active page is less than or equal to 4', () => {
                    beforeEach(() => {
                        component.pages = 8;
                        component.activePage = 2;
                        changes = {
                            'pages': { currentValue: 8 } as SimpleChange,
                            'activePage': { currentValue: 2 } as SimpleChange
                        };
                        component.ngOnChanges(changes);
                    });
                    it('pageItems length is correct', () => {
                        expect(component.pageItems.length).toBe(9);
                    });
                    it('pageItem labels are correct', () => {
                        const labels = component.pageItems.map(x => x.label).toString();
                        expect(labels).toBe('Föregående sida,1,2,3,4,5,...,8,Nästa sida');
                    });
                    it('pageItem aria-labels are correct', () => {
                        const ariaLabels = component.pageItems.map(x => x.ariaLabel).toString();
                        expect(ariaLabels).toBe('Gå till föregående sida, sida 1 av 8,Gå till första sidan, sida 1 av 8,Du är på sida 2 av 8,Gå till sida 3 av 8,Gå till sida 4 av 8,Gå till sida 5 av 8,,Gå till sista sidan, sida 8 av 8,Gå till nästa sida, sida 3 av 8');
                    });
                    it('pageItem buttonIndexes are correct', () => {
                        const buttonIndexes = component.pageItems.map(x => x.buttonIndex);
                        expect(buttonIndexes).toEqual([0, 1, 2, 3, 4, 5, undefined, 6, 7]);
                    });
                    it('pageItem active is correct', () => {
                        const activePage = component.pageItems.find(x => x.active).label;
                        expect(activePage).toBe(component.activePage.toString());
                    });
                    it('pageItem tabindexes are correct', () => {
                        const tabindexes = component.pageItems.map(x => x.tabindex);
                        expect(tabindexes).toEqual([-1, -1, 0, -1, -1, -1, undefined, -1, -1]);
                    });
                });
                describe('and active page is greater than 4', () => {
                    beforeEach(() => {
                        component.pages = 8;
                        component.activePage = 6;
                        changes = {
                            'pages': { currentValue: 8 } as SimpleChange,
                            'activePage': { currentValue: 6 } as SimpleChange
                        };
                        component.ngOnChanges(changes);
                    });
                    it('pageItems length is correct', () => {
                        expect(component.pageItems.length).toBe(9);
                    });
                    it('pageItem labels are correct', () => {
                        const labels = component.pageItems.map(x => x.label).toString();
                        expect(labels).toBe('Föregående sida,1,...,4,5,6,7,8,Nästa sida');
                    });
                    it('pageItem aria-labels are correct', () => {
                        const ariaLabels = component.pageItems.map(x => x.ariaLabel).toString();
                        expect(ariaLabels).toBe('Gå till föregående sida, sida 5 av 8,Gå till första sidan, sida 1 av 8,,Gå till sida 4 av 8,Gå till sida 5 av 8,Du är på sida 6 av 8,Gå till sida 7 av 8,Gå till sista sidan, sida 8 av 8,Gå till nästa sida, sida 7 av 8');
                    });
                    it('pageItem buttonIndexes are correct', () => {
                        const buttonIndexes = component.pageItems.map(x => x.buttonIndex);
                        expect(buttonIndexes).toEqual([0, 1, undefined, 2, 3, 4, 5, 6, 7]);
                    });
                    it('pageItem active is correct', () => {
                        const activePage = component.pageItems.find(x => x.active).label;
                        expect(activePage).toBe(component.activePage.toString());
                    });
                    it('pageItem tabindexes are correct', () => {
                        const tabindexes = component.pageItems.map(x => x.tabindex);
                        expect(tabindexes).toEqual([-1, -1, undefined, -1, -1, 0, -1, -1, -1]);
                    });
                });
            });
            describe('pages is greater than 8', () => {
                describe('and active page is less than or equal to 4', () => {
                    beforeEach(() => {
                        component.pages = 21;
                        component.activePage = 4;
                        changes = {
                            'pages': { currentValue: 21 } as SimpleChange,
                            'activePage': { currentValue: 4 } as SimpleChange
                        };
                        component.ngOnChanges(changes);
                    });
                    it('pageItems length is correct', () => {
                        expect(component.pageItems.length).toBe(9);
                    });
                    it('pageItem labels are correct', () => {
                        const labels = component.pageItems.map(x => x.label).toString();
                        expect(labels).toBe('Föregående sida,1,2,3,4,5,...,21,Nästa sida');
                    });
                    it('pageItem aria-labels are correct', () => {
                        const ariaLabels = component.pageItems.map(x => x.ariaLabel).toString();
                        expect(ariaLabels).toBe('Gå till föregående sida, sida 3 av 21,Gå till första sidan, sida 1 av 21,Gå till sida 2 av 21,Gå till sida 3 av 21,Du är på sida 4 av 21,Gå till sida 5 av 21,,Gå till sista sidan, sida 21 av 21,Gå till nästa sida, sida 5 av 21');
                    });
                    it('pageItem buttonIndexes are correct', () => {
                        const buttonIndexes = component.pageItems.map(x => x.buttonIndex);
                        expect(buttonIndexes).toEqual([0, 1, 2, 3, 4, 5, undefined, 6, 7]);
                    });
                    it('pageItem active is correct', () => {
                        const activePage = component.pageItems.find(x => x.active).label;
                        expect(activePage).toBe(component.activePage.toString());
                    });
                    it('pageItem tabindexes are correct', () => {
                        const tabindexes = component.pageItems.map(x => x.tabindex);
                        expect(tabindexes).toEqual([-1, -1, -1, -1, 0, -1, undefined, -1, -1]);
                    });
                });
                describe('and active page is greater than pages - 3', () => {
                    beforeEach(() => {
                        component.pages = 99;
                        component.activePage = 97;
                        changes = {
                            'pages': { currentValue: 99 } as SimpleChange,
                            'activePage': { currentValue: 97 } as SimpleChange
                        };
                        component.ngOnChanges(changes);
                    });
                    it('pageItems length is correct', () => {
                        expect(component.pageItems.length).toBe(9);
                    });
                    it('pageItem labels are correct', () => {
                        const labels = component.pageItems.map(x => x.label).toString();
                        expect(labels).toBe('Föregående sida,1,...,95,96,97,98,99,Nästa sida');
                    });
                    it('pageItem aria-labels are correct', () => {
                        const ariaLabels = component.pageItems.map(x => x.ariaLabel).toString();
                        expect(ariaLabels).toBe('Gå till föregående sida, sida 96 av 99,Gå till första sidan, sida 1 av 99,,Gå till sida 95 av 99,Gå till sida 96 av 99,Du är på sida 97 av 99,Gå till sida 98 av 99,Gå till sista sidan, sida 99 av 99,Gå till nästa sida, sida 98 av 99');
                    });
                    it('pageItem buttonIndexes are correct', () => {
                        const buttonIndexes = component.pageItems.map(x => x.buttonIndex);
                        expect(buttonIndexes).toEqual([0, 1, undefined, 2, 3, 4, 5, 6, 7]);
                    });
                    it('pageItem active is correct', () => {
                        const activePage = component.pageItems.find(x => x.active).label;
                        expect(activePage).toBe(component.activePage.toString());
                    });
                    it('pageItem tabindexes are correct', () => {
                        const tabindexes = component.pageItems.map(x => x.tabindex);
                        expect(tabindexes).toEqual([-1, -1, undefined, -1, -1, 0, -1, -1, -1]);
                    });
                });
            });
            describe('and active page is between 4 and pages - 3', () => {
                beforeEach(() => {
                    component.pages = 57;
                    component.activePage = 17;
                    changes = {
                        'pages': { currentValue: 57 } as SimpleChange,
                        'activePage': { currentValue: 17 } as SimpleChange
                    };
                    component.ngOnChanges(changes);
                });
                it('pageItems length is correct', () => {
                    expect(component.pageItems.length).toBe(9);
                });
                it('pageItem labels are correct', () => {
                    const labels = component.pageItems.map(x => x.label).toString();
                    expect(labels).toBe('Föregående sida,1,...,16,17,18,...,57,Nästa sida');
                });
                it('pageItem aria-labels are correct', () => {
                    const ariaLabels = component.pageItems.map(x => x.ariaLabel).toString();
                    expect(ariaLabels).toBe('Gå till föregående sida, sida 16 av 57,Gå till första sidan, sida 1 av 57,,Gå till sida 16 av 57,Du är på sida 17 av 57,Gå till sida 18 av 57,,Gå till sista sidan, sida 57 av 57,Gå till nästa sida, sida 18 av 57');
                });
                it('pageItem buttonIndexes are correct', () => {
                    const buttonIndexes = component.pageItems.map(x => x.buttonIndex);
                    expect(buttonIndexes).toEqual([0, 1, undefined, 2, 3, 4, undefined, 5, 6]);
                });
                it('pageItem active is correct', () => {
                    const activePage = component.pageItems.find(x => x.active).label;
                    expect(activePage).toBe(component.activePage.toString());
                });
                it('pageItem tabindexes are correct', () => {
                    const tabindexes = component.pageItems.map(x => x.tabindex);
                    expect(tabindexes).toEqual([-1, -1, undefined, -1, 0, -1, undefined, -1, -1]);
                });
            });
        });
    });
    describe('onPageButtonBlur', () => {
        beforeEach(() => {
            component.focusedPageLabel = '1';
        });
        it('focusedPageLabel is cleared', () => {
            component.onPageButtonBlur({ relatedTarget: new EventTarget } as FocusEvent);
            expect(component.focusedPageLabel).toBe('');
        });
        it('focusedPageLabel is not cleard', () => {
            component.onPageButtonBlur({ relatedTarget: null } as FocusEvent);
            expect(component.focusedPageLabel).toBe('1');
        });
    });
    describe('onPageButtonFocus', () => {
        beforeEach(() => {
            component.focusedPageLabel = '';
        });
        it('focusedPageLabel is set', () => {
            component.onPageButtonFocus({ target: { textContent: '1' } as any } as FocusEvent);
            expect(component.focusedPageLabel).toBe('1');
        });
        it('focusedPageLabel is not set', () => {
            component.onPageButtonFocus({ target: null } as FocusEvent);
            expect(component.focusedPageLabel).toBe('');
        });
    });
});