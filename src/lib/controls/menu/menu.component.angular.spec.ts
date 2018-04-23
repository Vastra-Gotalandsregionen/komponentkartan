import { MenuComponent, MenuItemComponent, SubmenuComponent } from '../../index';
import { MenuItemBase } from '../menu/menu-item-base';
import { ComponentFixture, TestBed, async, fakeAsync } from '@angular/core/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
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
                NoopAnimationsModule,
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
        let disabledMenuItem: HTMLElement;
        let submenuItem: HTMLElement;
        let submenucomponent: SubmenuComponent;
        beforeEach(() => {
            menuItem = rootElement.querySelector('vgr-menu-item');
            submenuItem = rootElement.querySelector('vgr-submenu');
          
            //  const focusedElement = rootElement.querySelector(':focus');
            submenucomponent = <SubmenuComponent>component.menuItems.toArray().filter(mi => mi instanceof SubmenuComponent)[0];

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
            describe('menuitem ', () => {
                it('should have the role menuitem', () => {
                    expect(menuItem.getAttribute('role')).toBe('menuitem');
                });
                // describe('menuitem is disabled ', () => {
                //     beforeEach(() => {
                //         submenucomponent.expanded = true;
                //         //(<MenuItemComponent>component.menuItems.first).disabled = true;
                //         fixture.detectChanges();
                //     });
                //     it('tabIndex = 0', () => {
                //         console.log(menuItem.querySelector('menu__item menu__item--disabled'))
                //         expect(menuItem.querySelector('menu__item menu__item--disabled').tabIndex).toBe(0);
                //     });
                // });
            });
            describe('submenu ', () => {
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
           
            describe('and first menuitem (Start) has focus', () => {
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
                it('first menuitem has focus', () => {
                    const focusedElement = rootElement.querySelector(':focus a');
                    expect(focusedElement.innerHTML).toBe('Start');
                });
                describe('Arrow down is pressed', () => {
                    beforeEach(() => {
                        const menuItemToTriggerOn = debugElement.query(By.directive(MenuItemComponent));
                        menuItemToTriggerOn.triggerEventHandler('keydown', { keyCode: 40 } as KeyboardEvent);
                        fixture.detectChanges();
                    });
                    it('godown event is emitted', () => {
                        expect(component.menuItems.first.arrowDown.emit).toHaveBeenCalled();
                    });
                    it('submenuitem has focus', () => {
                        const focusedElement = rootElement.querySelector('.menu__item:focus a');
                        expect(focusedElement.innerHTML).toBe('Komponenter');
                    });
                    it('submenu should not be expanded', () => {
                        expect(submenucomponent.expanded).toBe(false);
                    });
                    describe('Enter is pressed', () => {
                        beforeEach(() => {
                            const menuItemToTriggerOn = debugElement.query(By.directive(SubmenuComponent));
                            menuItemToTriggerOn.triggerEventHandler('keydown', { keyCode: 13 } as KeyboardEvent);

                            fixture.detectChanges();
                            jasmine.clock().tick(650);
                        });
                        it('submenu should be expanded', () => {
                            expect(submenucomponent.expanded).toBe(true);
                        });
                        it('first item in the submenuitem has focus', () => {
                            const focusedElement = rootElement.querySelector('.menu__item:focus a');
                            expect(focusedElement.innerHTML).toBe('Action panel');
                        });
                    });
                    describe('Space is pressed', () => {
                        let submenuDebugElement;
                        let actionPanelDebugElement;
                        let backToTopElement;
                        beforeEach(() => {
                            const menuItemToTriggerOn = debugElement.query(By.directive(SubmenuComponent));
                            menuItemToTriggerOn.triggerEventHandler('keydown', { keyCode: 32 } as KeyboardEvent);

                            fixture.detectChanges();
                            jasmine.clock().tick(650);
                        });
                        it('submenu should be expanded', () => {
                            expect(submenucomponent.expanded).toBe(true);
                        });
                        it('first item in the submenuitem has focus', () => {
                            const focusedElement = rootElement.querySelector('.menu__item:focus a');
                            expect(focusedElement.innerHTML).toBe('Action panel');
                        });
                        describe('arrow down is pressed', () => {
                            beforeEach(() => {
                                submenuDebugElement = debugElement.query(By.directive(SubmenuComponent));
                                actionPanelDebugElement = submenuDebugElement.queryAll(By.directive(MenuItemComponent)).filter(mi => mi.componentInstance.text === 'Action panel')[0];

                                spyOn(actionPanelDebugElement.componentInstance.arrowDown, 'emit').and.callThrough();

                                actionPanelDebugElement.triggerEventHandler('keydown', { keyCode: 40 } as KeyboardEvent);
                                fixture.detectChanges();
                            });
                            it('last item in the submenuitem has focus', () => {
                                const focusedElement = rootElement.querySelector('.menu__item:focus p');
                                expect(focusedElement.innerHTML).toBe('Back to top');
                            });
                            it('godown event is emitted', () => {
                                expect(actionPanelDebugElement.componentInstance.arrowDown.emit).toHaveBeenCalled();
                            });
                            it('submenu should be expanded', () => {
                                expect(submenucomponent.expanded).toBe(true);
                            });
                            describe('escape is pressed', () => {
                                let mySub: SubmenuComponent;
                                beforeEach(() => {
                                //    jasmine.clock().uninstall();
                                //    jasmine.clock().install();
                                    backToTopElement = submenuDebugElement.queryAll(By.directive(MenuItemComponent)).filter(mi => mi.componentInstance.text === 'Back to top')[0];

                                    mySub = <SubmenuComponent>component.menuItems.toArray()[1];
                                    spyOn(backToTopElement.componentInstance.escape, 'emit').and.callThrough();
                                    spyOn(submenuDebugElement.componentInstance, 'animationDone').and.callThrough();
                                    backToTopElement.triggerEventHandler('keydown', { keyCode: 27 } as KeyboardEvent);

                                    fixture.detectChanges();
                                    jasmine.clock().tick(1700);

                                });
                                it('escape event is emitted', () => {
                                    expect(backToTopElement.componentInstance.escape.emit).toHaveBeenCalled();
                                });
                                // it('escape event is emitted', () => {
                                //     expect(submenuDebugElement.componentInstance.animationDone).toHaveBeenCalled();
                                // });
                                it('submenu is focused', () => {
                                    const focusedElement = rootElement.querySelector('.menu__item:focus a');
                                    expect(focusedElement.innerHTML).toBe('Komponenter');
                                });
                                // it('submenu is collapsed', () => {
                                //   expect(submenucomponent.expanded).toBe(false);
                                // });
                            });
                            describe('home is pressed', () => {
                                beforeEach(() => {
                                    spyOn(actionPanelDebugElement.componentInstance.home, 'emit').and.callThrough();
                                    spyOn(submenucomponent.home, 'emit').and.callThrough();
                                    actionPanelDebugElement.triggerEventHandler('keydown', { keyCode: 36 } as KeyboardEvent);
                                    fixture.detectChanges();
                                });
                                it('first item in menu is focused', () => {
                                    const focusedElement = rootElement.querySelector('.menu__item:focus a');
                                    expect(focusedElement.innerHTML).toBe('Start');
                                });
                                it('submenu should be expanded', () => {
                                    expect(submenucomponent.expanded).toBe(true);
                                });
                                it('home event is emitted from menuitem', () => {
                                    expect(actionPanelDebugElement.componentInstance.home.emit).toHaveBeenCalled();
                                });
                                it('home event is emitted from submenuitem', () => {
                                    expect(submenucomponent.home.emit).toHaveBeenCalled();
                                });
                            });
                            describe('end is pressed', () => {
                                beforeEach(() => {
                                    spyOn(actionPanelDebugElement.componentInstance.end, 'emit').and.callThrough();
                                    spyOn(submenucomponent.end, 'emit').and.callThrough();
                                    actionPanelDebugElement.triggerEventHandler('keydown', { keyCode: 35 } as KeyboardEvent);
                                    fixture.detectChanges();
                                });
                                it('last visible item on menu is focused (submenus last item)', () => {
                                    const focusedElement = rootElement.querySelector('.menu__item:focus p');
                                    expect(focusedElement.innerHTML).toBe('Back to top');
                                });
                                it('submenu should be expanded', () => {
                                    expect(submenucomponent.expanded).toBe(true);
                                });
                                it('home event is emitted from menuitem', () => {
                                    expect(actionPanelDebugElement.componentInstance.end.emit).toHaveBeenCalled();
                                });
                                it('home event is emitted from submenuitem', () => {
                                    expect(submenucomponent.end.emit).toHaveBeenCalled();
                                });
                            });
                        });
                        describe('arrow up is pressed', () => {
                            beforeEach(() => {
                                submenuDebugElement = debugElement.query(By.directive(SubmenuComponent));
                                actionPanelDebugElement = submenuDebugElement.queryAll(By.directive(MenuItemComponent)).filter(mi => mi.componentInstance.text === 'Action panel')[0];

                                spyOn(actionPanelDebugElement.componentInstance.arrowUp, 'emit').and.callThrough();

                                actionPanelDebugElement.triggerEventHandler('keydown', { keyCode: 38 } as KeyboardEvent);
                                fixture.detectChanges();
                            });
                            it('submenuitem has focus', () => {
                                const focusedElement = rootElement.querySelector('.menu__item:focus a');
                                expect(focusedElement.innerHTML).toBe('Komponenter');
                            });
                            it('arrowUp event is emitted', () => {
                                expect(actionPanelDebugElement.componentInstance.arrowUp.emit).toHaveBeenCalled();
                            });
                        });
                    });
                });
                describe('Arrow up is pressed with closed submenu', () => {
                    beforeEach(() => {
                        const menuItemToTriggerOn = debugElement.query(By.directive(MenuItemComponent));
                        menuItemToTriggerOn.triggerEventHandler('keydown', { keyCode: 38 } as KeyboardEvent);
                        fixture.detectChanges();
                    });
                    it('submenuitem has focus', () => {
                        const focusedElement = rootElement.querySelector('.menu__item:focus a');
                        expect(focusedElement.innerHTML).toBe('Komponenter');
                    });
                });
                describe('Arrow up is pressed with opened submenu', () => {
                    beforeEach(() => {
                        submenucomponent.showExpanded = true;
                        const menuItemToTriggerOn = debugElement.query(By.directive(MenuItemComponent));
                        menuItemToTriggerOn.triggerEventHandler('keydown', { keyCode: 38 } as KeyboardEvent);
                        fixture.detectChanges();
                        jasmine.clock().tick(650);
                    });
                    it(('submenu is expanded') , () => {
                        expect(submenucomponent.expanded).toBe(true);
                    });
                    it('submenuitem has focus', () => {
                        const focusedElement = rootElement.querySelector('.menu__item:focus a');
                        expect(focusedElement.innerHTML).toBe('Back to top');
                    });
                });

            });
        });
    });
});