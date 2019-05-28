import { MenuItemComponent } from '../../index';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('[MenuItemComponent]', () => {

    class DummyComponent { }

    let component: MenuItemComponent;
    let fixture: ComponentFixture<MenuItemComponent>;
    let rootElement: DebugElement;
    let notification: DebugElement;
    let menuItemLink: DebugElement;
    let disabledMenuItem: DebugElement;

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
        it('menuitem has role menuitem', () => {

            expect(rootElement.attributes['role']).toBe('menuitem');
        });
    });

    describe('When component is initialized with a green notification', () => {
        beforeEach(() => {
            component.text = 'Menu item 1';
            component.notification = '69';
            component.notificationColor = 'green';
            component.notificationTooltip = 'Tooltip text for menu item 1';
            fixture.detectChanges();
            notification = rootElement.query(By.css('.menu__item--notification'));
            menuItemLink = rootElement.queryAll(By.css('a'))[0];
        });
        it('the notification text is "69"', () => {
            expect(component.notificationText).toBe('69');
        });
        it('the notification color class is correct', () => {
            expect(component.notificationColorClass).toBe('notification--green');
        });
        it('the notification color class is set', () => {
            expect(notification.classes['notification--green']).toBe(true);
        });

        it('the menu item title is set', () => {
            expect(menuItemLink.nativeElement.textContent).toBe('Menu item 1');
        });
    });

    describe('When component is initialized with menu item is disabled', () => {
        beforeEach(() => {
            component.disabled = true;
            component.disabledTooltip = 'Tooltip for disabled menu item';
            component.text = 'Menu item 1';
            fixture.detectChanges();
            menuItemLink = rootElement.queryAll(By.css('p'))[0];
            notification = rootElement.query(By.css('.menu__item--notification'));
            disabledMenuItem = rootElement.query(By.css('.menu__item--disabled'));
        });
        it('disabled class is set', () => {
            expect(disabledMenuItem).toBeDefined();
        });
        it('disabled tooltip is set', () => {
            expect(menuItemLink.nativeElement.title).toBe('Tooltip for disabled menu item');
        });
        it('the menu item title is set', () => {
            expect(menuItemLink.nativeElement.textContent).toBe('Menu item 1');
        });
        describe('and green notification', () => {
            beforeEach(() => {
                component.notification = '69';
                component.notificationColor = 'green';
                component.notificationTooltip = 'Tooltip text for menu item 1';
                fixture.detectChanges();
                notification = rootElement.query(By.css('.menu__item--notification'));
            });
            it('the notification text is "69"', () => {
                expect(component.notificationText).toBe('69');
            });
            it('the notification color class is correct', () => {
                expect(component.notificationColorClass).toBe('notification--green');
            });
            it('the notification color class is set', () => {
                expect(notification.classes['notification--green']).toBe(true);
            });
            it('the notification tooltip text is correct', () => {
                expect(notification.nativeElement.title).toBe('Tooltip text for menu item 1');
            });
        });
    });

    describe('When component is initialized with a red notification', () => {
        beforeEach(() => {
            component.text = 'Menu item 2';
            component.notification = '2';
            component.notificationColor = 'red';
            component.notificationTooltip = 'Tooltip text for menu item 2';
            fixture.detectChanges();
            notification = rootElement.query(By.css('.menu__item--notification'));
            menuItemLink = rootElement.queryAll(By.css('a'))[0];
        });
        it('the notification text is "2"', () => {
            expect(component.notificationText).toBe('2');
        });
        it('the notification color class is correct', () => {
            expect(component.notificationColorClass).toBe('notification--red');
        });
        it('the notification color class is set', () => {
            expect(notification.classes['notification--red']).toBe(true);
        });
        it('the notification tooltip text is correct', () => {
            expect(component.notificationTooltip).toBe('Tooltip text for menu item 2');
        });
        it('the menu item title is set', () => {
            expect(menuItemLink.nativeElement.textContent).toBe('Menu item 2');
        });
    });

    describe('When component is initialized with a blue notification', () => {
        beforeEach(() => {
            component.text = 'Menu item 2';
            component.notification = '2';
            component.notificationColor = 'blue';
            fixture.detectChanges();
            notification = rootElement.query(By.css('.menu__item--notification'));
        });
        it('the notification color class is correct', () => {
            expect(component.notificationColorClass).toBe('notification--blue');
        });
        it('the notification color class is set', () => {
            expect(notification.classes['notification--blue']).toBe(true);
        });
    });

    describe('When component is initialized with a default notification', () => {
        beforeEach(() => {
            component.text = 'Menu item 2';
            component.notification = '2';
            component.notificationColor = 'default';
            fixture.detectChanges();
            notification = rootElement.query(By.css('.menu__item--notification'));
        });
        it('the notification color class is correct', () => {
            expect(component.notificationColorClass).toBe('notification--default');
        });
        it('the notification color class is set', () => {
            expect(notification.classes['notification--default']).toBe(true);
        });
    });

    describe('When component is initialized with a success notification', () => {
        beforeEach(() => {
            component.text = 'Menu item 3';
            component.notification = '3';
            component.notificationColor = 'success';
            fixture.detectChanges();
            notification = rootElement.query(By.css('.menu__item--notification'));
        });
        it('the notification color class is correct', () => {
            expect(component.notificationColorClass).toBe('notification--success');
        });
        it('the notification color class is set', () => {
            expect(notification.classes['notification--success']).toBe(true);
        });
    });

    describe('When component is initialized with an error notification of length 3', () => {
        beforeEach(() => {
            component.text = 'Menu item 1';
            component.notification = '666';
            component.notificationColor = 'error';
            fixture.detectChanges();
            notification = rootElement.query(By.css('.menu__item--notification'));
        });
        it('the notification text is "!"', () => {
            expect(component.notificationText).toBe('!');
        });
        it('the notification color class is correct', () => {
            expect(component.notificationColorClass).toBe('notification--error');
        });
        it('the notification color class is set', () => {
            expect(notification.classes['notification--error']).toBe(true);
        });
    });
});
