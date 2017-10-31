import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ListColumnHeaderComponent, ColumnWidth, SortDirection } from '../../component-package/controls/list/list-column-header.component';
import { inject } from '@angular/core/testing';

describe('[DatepickerComponent]', () => {
    let component: ListColumnHeaderComponent;

    beforeEach(() => {
        component = new ListColumnHeaderComponent();
    });

    describe('When initialized with no ColumnWidth,', () => {
        it('the width is 10 pixels', () => {
            expect(component.maxCharacters).toBe(10);
        });
        it('and the class for column-width is flex-column--', () => {
            expect(component.getColumnWidthClass()).toBe('flex-column--m');
        });

        it('the sortdirection is none', () => {
            expect(component.sortDirection).toBe(SortDirection.None);
        });

        describe('and clicked', () => {
            beforeEach(() => {
                component.onClick();
            });
            it('the sortdirection is Ascending', () => {
                expect(component.sortDirection).toBe(SortDirection.Ascending);
            });
            describe('and clicked again', () => {
                beforeEach(() => {
                    component.onClick();
                });
                it('the sortdirection is Descending', () => {
                    expect(component.sortDirection).toBe(SortDirection.Descending);
                });
                describe('and clicked for the last time', () => {
                    beforeEach(() => {
                        component.onClick();
                    });
                    it('the sortdirection is Descending', () => {
                        expect(component.sortDirection).toBe(SortDirection.Ascending);
                    });
                });
            });
        });

    });

    describe('When initialized with ColumnWidth xxs and sortdirection is ascending,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.xxs
            component.sortDirection = SortDirection.Ascending
        });

        it('the isSortAscending is set to true', () => {
            expect(component.isSortAscending).toBeTruthy();
        });

        it('the isSortDescending is set to true', () => {
            expect(component.isSortDescending).toBeFalsy();
        });

        it('the width is 3 pixels', () => {
            expect(component.maxCharacters).toBe(3);
        });

        it('and the class for column-width is flex-column--', () => {
            expect(component.getColumnWidthClass()).toBe('flex-column--xxs');
        });
    });

    describe('When initialized with ColumnWidth xs,', () => {

        beforeEach(() => {
            component.width = ColumnWidth.xs

        });
        it('the width is 3 pixels', () => {
            expect(component.maxCharacters).toBe(5);
        });

        it('the width is 3 pixels', () => {
            expect(component.maxCharacters).toBe(5);
        });
    });

    describe('When initialized with ColumnWidth s,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.s
        });

        it('the width is 7 pixels', () => {
            expect(component.maxCharacters).toBe(7);
        });
    });

    describe('When initialized with ColumnWidth m,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.m
        });

        it('the width is 7 pixels', () => {
            expect(component.maxCharacters).toBe(10);
        });
    });

    describe('When initialized with ColumnWidth l,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.l
        });

        it('the width is 7 pixels', () => {
            expect(component.maxCharacters).toBe(15);
        });
    });


    describe('When initialized with ColumnWidth xl,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.xl
        });

        it('the width is 17 pixels', () => {
            expect(component.maxCharacters).toBe(17);
        });
    });

    describe('When initialized with ColumnWidth xxl,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.xxl
        });

        it('the width is 17 pixels', () => {
            expect(component.maxCharacters).toBe(20);
        });
    });

    describe('When initialized with ColumnWidth xxxl,', () => {
        beforeEach(() => {
            component.width = ColumnWidth.xxxl
        });

        it('the width is 25 pixels', () => {
            expect(component.maxCharacters).toBe(25);
        });
    });

});

