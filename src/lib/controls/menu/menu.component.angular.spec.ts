import { MenuComponent, MenuItemComponent, SubmenuComponent } from '../../index';
import { MenuItemBase } from '../menu/menu-item-base';
import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement, Component } from '@angular/core';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

@Component({
    selector: 'vgr-test',
    template: `
        <vgr-menu title="Menyrubrik">
          <vgr-menu-item link="/sizes" text="Start"></vgr-menu-item>
          <vgr-submenu text="Komponenter">
            <vgr-menu-item link="/actionPanels" text="Action panel"></vgr-menu-item>
            <vgr-menu-item link="/backtotop" text="Back to top" disabled="true"></vgr-menu-item>
          </vgr-submenu>
        </vgr-menu>
    `
})
class TestMenuComponent { }

describe('[MenuComponent]', () => {
    let fixture: ComponentFixture<TestMenuComponent>;
    let component: MenuComponent;
    let rootElement: HTMLElement;
    let debugElement: DebugElement;

    beforeEach((done) => {
        TestBed.configureTestingModule({
            declarations: [TestMenuComponent, MenuComponent, MenuItemComponent, SubmenuComponent],
            imports: [CommonModule,
                BrowserAnimationsModule,
                BrowserDynamicTestingModule,
                RouterTestingModule.withRoutes([])]
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TestMenuComponent);
            component = fixture.debugElement.children[0].componentInstance;
            debugElement = fixture.debugElement;
            rootElement = fixture.debugElement.nativeElement;
            //      component.ngAfterContentInit();

            fixture.detectChanges();
            done();
        });
    });
    describe('When component is initialized with two menuitems', () => {
        let headerTitle: HTMLElement;
        it('should contain two menuitems ', () => {
            expect(component.menuItems.length).toBe(2);
        });
        describe('with a menu title longer than 9 characters', () => {
            beforeEach(() => {
                component.title = 'Menyrubrik';
                headerTitle = rootElement.querySelector('.menu__header__title');
                fixture.detectChanges();
            });
            it('title should have smaller font', () => {
                expect(component.smallerFont).toBe(true);
            });
            it('title should be Menyrubrik', () => {
                expect(headerTitle.innerHTML).toBe('Menyrubrik');
            });

            it('title should have class for smaller font', () => {
                expect(headerTitle.classList).toContain('menu__header__title--smaller-font-size');
            });
        });
        describe('When component is initialized with a title of length 6', () => {
            beforeEach(() => {
                component.title = 'Rubrik';
                headerTitle = rootElement.querySelector('.menu__header__title');
                fixture.detectChanges();
            });
            it('title should have smaller font', () => {
                expect(component.smallerFont).toBe(false);
            });
            it('title should be Rubrik', () => {
                expect(headerTitle.innerHTML).toBe('Rubrik');
            });
            it('title should have class for smaller font', () => {
                expect(headerTitle.classList).not.toContain('menu__header__title--smaller-font-size');
            });
        });

    });

    describe('WCAG Tests', () => {
        const menu: HTMLElement = null;
        let menuItem: HTMLElement;
        let submenuItem: HTMLElement;
        beforeEach(() => {
            menuItem = rootElement.querySelector('vgr-menu-item');
            submenuItem = rootElement.querySelector('vgr-submenu');
            const focusedElement = rootElement.querySelector(':focus');
            console.log(focusedElement);
        });
        describe('When menu is initialized with two menuitems', () => {
            it('should have the role menu', () => {
                expect(rootElement.querySelector('vgr-menu').getAttribute('role')).toBe('menu');
            });
            it('first menuitem is Start ', () => {
                expect(menuItem.querySelector('a').innerHTML).toBe('Start');
            });
            it('second menuitem is Komponenter ', () => {
                expect(submenuItem.querySelector('.menu__item a').innerHTML).toBe('Komponenter');
            });
            describe('menuitem should have ', () => {
                it('should have the role menuitem', () => {
                    expect(menuItem.getAttribute('role')).toBe('menuitem');
                });
                describe('menuitem is disabled ', () => {
                    beforeEach(() => {
                        (<MenuItemComponent>component.menuItems.first).disabled = true;
                        fixture.detectChanges();
                    });
                    // it('tabIndex = 0', () => {
                    //     console.log(menuItem.querySelector('menu__item menu__item--disabled'))
                    //     expect(menuItem.querySelector('menu__item menu__item--disabled').tabIndex).toBe(0);
                    // });
                });
            });
            describe('submenu should have ', () => {
                let submenuMenuItem: HTMLElement;
                beforeEach(() => {
                    submenuMenuItem = submenuItem.querySelector('.menu__item');
                });
                it('aria-haspopup true ', () => {
                    expect(submenuItem.getAttribute('aria-haspopup')).toBe('true');
                });
                it('tabIndex = 0', () => {
                    expect(submenuMenuItem.tabIndex).toBe(0);
                });
                it('should have the role menuitem', () => {
                    expect(submenuItem.getAttribute('role')).toBe('menuitem');
                });
            });

        });
        describe('and first menuitem has focus', () => {
            beforeAll(() => {
                jasmine.clock().uninstall();
                jasmine.clock().install();
            });
            afterAll(() => {
                jasmine.clock().uninstall();
            });
            beforeEach(() => {
                spyOn(component.menuItems.first.arrowDown, 'emit').and.callThrough();
                (<MenuItemComponent>component.menuItems.first).setFocus();
                fixture.detectChanges();
            });
            it('menuitem has focus', () => {
                const focusedElement = rootElement.querySelector(':focus');
                expect(focusedElement.querySelector('a').innerHTML).toBe('Start');
            });
            describe('Keydown is pressed', () => {
                beforeEach(() => {
                    const menuItemToTriggerOn = debugElement.query(By.directive(MenuItemComponent));
                    menuItemToTriggerOn.triggerEventHandler('keydown', { keyCode: 40 } as KeyboardEvent);
                    fixture.detectChanges();
                });
                it('godown event is emitted', () => {
                    expect(component.menuItems.first.arrowDown.emit).toHaveBeenCalled();
                });
                it('submenuitem has focus', () => {
                    const focusedElement = rootElement.querySelector(':focus');
                    expect(focusedElement.querySelector('.menu__item a').innerHTML).toBe('Komponenter');
                });
                describe('Enter is pressed', () => {
                    beforeEach(() => {
                        const menuItemToTriggerOn = debugElement.query(By.directive(SubmenuComponent));
                        menuItemToTriggerOn.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);
                        jasmine.clock().tick(651);
                        fixture.detectChanges();
                    });
                    // Kommer till setfocus i basklassen....
                    it('first item in the submenuitem has focus', () => {
                        const focusedElement = rootElement.querySelector(':focus');
                        expect(focusedElement.querySelector('.menu__item a').innerHTML).toBe('Action panel');
                    });
                });
            });
        });
    });
});