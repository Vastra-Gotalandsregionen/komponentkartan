import { ExampleMenuComponent } from './example-menu.component'
import { MenuComponent, MenuItemComponent, MenuSeparatorComponent, SubmenuComponent } from '../../lib/index'
import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DebugElement,Renderer, ElementRef, Component } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';

describe('ExampleMenuComponent',()=> {
    class DummyComponent { }

    let component: ExampleMenuComponent;
    let fixture: ComponentFixture<ExampleMenuComponent>;
    let rootElement: DebugElement;
    let menuNavElement: DebugElement;

    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [ExampleMenuComponent, MenuComponent, MenuItemComponent, MenuSeparatorComponent, SubmenuComponent],
            imports: [CommonModule,
                RouterTestingModule.withRoutes([
                    { path: 'dummy', component: DummyComponent }
                ])],
                providers: [
                  { provide: ElementRef },
                  { provide: Renderer }]
        });

        TestBed.overrideComponent(ExampleMenuComponent, {
            set: {
                template: `<vgr-menu title="A menu">
                <vgr-menu-item link="/" text="Menu item 1"></vgr-menu-item>
                <vgr-menu-separator></vgr-menu-separator>
                <vgr-menu-item link="/menu-example" text="Menu item vald"></vgr-menu-item>
                <vgr-menu-item link="/" text="Menu item notification green" notification="69" notificationTooltip="This is a notification tooltip"
                  notificationColor="green"></vgr-menu-item>
                <vgr-menu-item link="/" text="Menu item notification red" notification="1" notificationColor="red"></vgr-menu-item>
                <vgr-menu-item link="/" text="Menu item notification blue" notification="1" notificationColor="blue"></vgr-menu-item>
                <vgr-menu-item link="/" text="Menu item notification default" notification="1" notificationColor="default"></vgr-menu-item>
                <vgr-menu-item link="/" text="Menu item notification error" notification="1" notificationColor="error"></vgr-menu-item>
                <vgr-menu-item link="/" text="Menu item notification success" notification="1" notificationColor="success"></vgr-menu-item>
                <vgr-menu-item link="/" text="Menu item 5" disabled="true" disabledTooltip="Tooltip som visas vid disabled"></vgr-menu-item>
                <vgr-submenu text="Submenu">
                  <vgr-menu-item link="/" text="Sub menu item 1"></vgr-menu-item>
                  <vgr-menu-item link="/" text=" Sub menu item 2 "></vgr-menu-item>
                  <vgr-menu-item link="/" text="Sub menu item 3 "></vgr-menu-item>
                </vgr-submenu>
              </vgr-menu>`
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ExampleMenuComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });
    describe('When menu is created', () => {
        beforeEach(()=> {
            menuNavElement = rootElement.query(By.css('nav')); 
        });
        it('title is set', () => {
            expect(rootElement.query(By.css('.menu__header__title')).nativeElement.textContent).toBe('A menu');
        });
        describe('and has menu item', ()=> {
            it('text is set', () => {
                var menuItem1 = menuNavElement.children[0]; 
                expect(menuItem1.nativeElement.textContent.trim()).toBe('Menu item 1');
            });
        });
        describe('and menu item is a separator item', ()=> {
            it('correct class is set', () => {
                var menuItem2 = menuNavElement.children[1];                
                //expect(menuItem2.query(By.css('.menu-separator'))).toBe(true);
            });
        });
        describe('and menu item is a selected item', ()=> {
            it('correct class is set', () => {
                var menuItem3 = menuNavElement.children[2];                
                //expect(menuItem3.query(By.css('.menu__item--selected'))).toBe(true);
            });
        });
        describe('and menu item is an item with a notification', ()=> {
            let menuItem4: DebugElement;
            beforeAll(()=> {
                menuItem4 = menuNavElement.children[3];
            });
            it('correct color is set', () => {
                //expect(menuItem4.classes['.notification--green']).toBe(true);
            });
            it('tooltip is set', () => {
                //expect(menuItem4.nativeElement.title).toBe('This is a notification tooltip');
            });
            it('text is set', () => {});
        });
        describe('and menu item is a hovered item', ()=> {});
        describe('and menu item is a disabled item', ()=> {});
        describe('and menu item is a submenu', ()=> {});
        
    });
});