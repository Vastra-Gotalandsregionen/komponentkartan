import { MenuItemComponent } from '../../index';
import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('[ExpandableDivComponent]', () => {

    class DummyComponent { }

    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;
    let rootElement: DebugElement;
    let notification: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [MenuItemComponent],
            imports: [CommonModule,
                RouterTestingModule.withRoutes([
                    { path: 'dummy', component: DummyComponent }
                ])]
        });

        TestBed.overrideComponent(MenuItemComponent, {
            set: {
                templateUrl: './menu-item.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(MenuItemComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });

    describe('When component is initialized with a text', () => {
        beforeEach(() => {
            component.text = 'Menu item 1';
            fixture.detectChanges();
            notification = rootElement.query(By.css('.menu__item--notification'));
        });
        it('no notification visible', () => {
            expect(notification).toBeNull();
        });
    });

    describe('When component is initialized with a green notification', () => {
        beforeEach(() => {
            component.text = 'Menu item 1';
            component.notification = '69';
            component.notificationColor = 'green';
            fixture.detectChanges();

        });
        it('the notification text is "69"', () => {
            expect(component.notificationText).toBe('69');
        });
        it('the notification color class is correct', () => {
            expect(component.notificationColorClass).toBe('notification--green');
        });
    });

    describe('When component is initialized with an error notification of length 3', () => {
        beforeEach(() => {
            component.text = 'Menu item 1';
            component.notification = '666';
            component.notificationColor = 'error';
            fixture.detectChanges();

        });
        it('the notification text is "!"', () => {
            expect(component.notificationText).toBe('!');
        });
        it('the notification color class is correct', () => {
            expect(component.notificationColorClass).toBe('notification--error');
        });
    });
});
