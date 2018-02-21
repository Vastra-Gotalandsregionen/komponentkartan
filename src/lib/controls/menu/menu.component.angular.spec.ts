import { MenuComponent } from '../../index';
import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('[MenuComponent]', () => {

    let component: MenuComponent;
    let fixture: ComponentFixture<MenuComponent>;
    let rootElement: DebugElement;
    let headerTitle: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [MenuComponent],
            imports: [CommonModule]
        });

        TestBed.overrideComponent(MenuComponent, {
            set: {
                templateUrl: './menu.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(MenuComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });

    describe('When component is initialized with a title of length 10', () => {
        beforeEach(() => {
            component.title = 'Menyrubrik';
            headerTitle = rootElement.query(By.css('.menu__header__title'));
            fixture.detectChanges();
        });
        it('title should have smaller font', () => {
            expect(component.smallerFont).toBe(true);
            expect(headerTitle.classes['menu__header__title--smaller-font-size']).toBe(true);
        });
    });


    describe('When component is initialized with a title of length 6', () => {
        beforeEach(() => {
            component.title = 'Rubrik';
            fixture.detectChanges();
        });
        it('title should have smaller font', () => {
            expect(component.smallerFont).toBe(false);
            expect(rootElement.classes['menu__header__title--smaller-font-size']).toBeUndefined();
        });
    });
});
