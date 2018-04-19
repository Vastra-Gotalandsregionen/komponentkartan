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
    selector: 'test',
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
    let testMenuComponentFixture: ComponentFixture<TestMenuComponent>;
    let menuComponentFixture: ComponentFixture<MenuComponent>;

    let menuItemComponentFixture: ComponentFixture<MenuItemComponent>;
    let submenuItemComponentFixture: ComponentFixture<SubmenuComponent>;
    let component: MenuComponent;
    //let fixture: ComponentFixture<MenuComponent>;
    let rootElement: DebugElement;
    let headerTitle: DebugElement;


    beforeEach((done) => {
        //   TestBed.resetTestEnvironment();
        TestBed.resetTestingModule();

        TestBed.configureTestingModule({
            declarations: [TestMenuComponent, MenuComponent, MenuItemComponent, SubmenuComponent],
            imports: [CommonModule,

                BrowserAnimationsModule,
                BrowserDynamicTestingModule,
                RouterTestingModule.withRoutes([]),],
            // providers: [
            //     { provide: ElementRef },
            //     { provide: Renderer }]
        });



        TestBed.compileComponents().then(() => {
            testMenuComponentFixture = TestBed.createComponent(TestMenuComponent)
            menuComponentFixture = TestBed.createComponent(MenuComponent);
            menuItemComponentFixture = TestBed.createComponent(MenuItemComponent);
            submenuItemComponentFixture = TestBed.createComponent(SubmenuComponent);

            component = testMenuComponentFixture.debugElement.children[0].componentInstance; //debugElement.query(By.directive(MenuItemComponent)).componentInstance; // First element in list-item which is list-item-header;

            rootElement = menuComponentFixture.debugElement;


            // component.ngAfterContentInit();
            // fixture = TestBed.createComponent(MenuComponent);

            testMenuComponentFixture.detectChanges();
            menuComponentFixture.detectChanges();
            done();
        });
    });
    describe('When component is initialized with two menuitems', () => {
        it('should have the role menu', () => {
            expect(rootElement.attributes['role']).toBe('menu');
        });
        it('should contain two menuitems ', () => {
            expect(component.menuItems.length).toBe(2);
        });
        describe('with a menu title of length 10', () => {
            let headerTitle;
            beforeEach(() => {
                component.title = 'Menyrubrik'
                headerTitle = rootElement.query(By.css('.menu__header'));
                testMenuComponentFixture.detectChanges();

            });
            it('title should have smaller font', () => {
                expect(component.smallerFont).toBe(true);
            });
            fit('title should have class for smaller font', () => {
                console.log(headerTitle.nativeElement.innerHTML);
                console.log(headerTitle.nativeElement);
                expect(headerTitle.classes['menu__header__title--smaller-font-size']).toBe(true);
            });
            //     it('first menuitem is Start ', () => {
            //         expect((<MenuItemComponent>component.menuItems.first).text).toBe('Start');
            //     });
            //     it('second menuitem is Upplösning ', () => {
            //         expect((<MenuItemComponent>component.menuItems.last).text).toBe('Komponenter');
            //     });

        });

        // describe('with a title of length 10', () => {
        //     beforeEach(() => {
        //         component.title = 'Menyrubrik';
        //         headerTitle = rootElement.query(By.css('.menu__header__title'));
        //         fixture.detectChanges();
        //     });
        //     it('title should have smaller font', () => {
        //         expect(component.smallerFont).toBe(true);
        //         expect(headerTitle.classes['menu__header__title--smaller-font-size']).toBe(true);
        //     });
        // });
    });

    // describe('When component is initialized with a title of length 6', () => {
    //     beforeEach(() => {
    //         component.title = 'Rubrik';
    //         fixture.detectChanges();
    //     });
    //     it('title should have smaller font', () => {
    //         expect(component.smallerFont).toBe(false);
    //         expect(rootElement.classes['menu__header__title--smaller-font-size']).toBeUndefined();
    //     });
    // });
});
