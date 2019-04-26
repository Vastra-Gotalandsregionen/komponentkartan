import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, SimpleChanges, SimpleChange } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';

import { HeaderMenuComponent } from '../../controls/headerMenu/headerMenu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from '../icon/icon.component';
import { LoginInformationComponent } from '../../controls/loginInformation/loginInformation.component';
import { RingWithTextComponent } from '../..//controls/ring-with-text/ring-with-text.component';
import { HeaderComponent } from '../header/header.component';
import { MenuItemComponent } from '../menu/menu-item.component';
import { SubmenuComponent } from '../menu/submenu.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MenuSeparatorComponent } from '../menu/menu-separator.component';

describe('HeaderMenuComponent', () => {
  let component: HeaderMenuComponent;
  let menuItem: ComponentFixture<MenuItemComponent>;
  let fixture: ComponentFixture<HeaderMenuComponent>;
  let rootElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        HeaderMenuComponent,
        MenuItemComponent,
        SubmenuComponent,
        IconComponent,
        MenuSeparatorComponent,
        LoginInformationComponent,
        RingWithTextComponent
      ],
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        BrowserDynamicTestingModule,
        NoopAnimationsModule,
        FontAwesomeModule,
        RouterTestingModule
      ]
    });
    TestBed.overrideComponent(HeaderMenuComponent, {
      set: {
        templateUrl: 'headerMenu.component.html'
      }
    });
    TestBed.overrideComponent(MenuItemComponent, {
      set: {
        templateUrl: '../menu/menu-item.component.html'
      }
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(HeaderMenuComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      menuItem = TestBed.createComponent(MenuItemComponent);

      fixture.detectChanges();
      done();
    });
  });

  describe('', () => {
    it('userName is correct', () => {
      expect(component.userName).toBeFalsy();
    });
    it('initials is correct', () => {
      expect(component.initials).toBeFalsy();
    });
    it('textColor is correct', () => {
      expect(component.textColor).toBeFalsy();
    });
    it('circleColor is correct', () => {
      expect(component.circleColor).toBeFalsy();
    });
  });

  describe('When component is initialized', () => {
    let headerMenuElement: DebugElement;
    beforeEach(() => {
      headerMenuElement = rootElement.query(By.css('.header-menu'));


    });
    describe('and toggleHeaderMenu is called ', () => {
      let mockEvent;
      beforeEach(() => {
        mockEvent = new Event('');
        component.toggleHeaderMenu(mockEvent);
        fixture.detectChanges();

      });
      it('headerMenu should be visible', () => {
        expect(component.hideMenu).toBe(false);
      });

    });
  });

  describe('ngOnChanges', () => {
    let changes: SimpleChanges;
    describe('When initials have changed', () => {
      let initialsChange: SimpleChange;
      beforeEach(() => {
        initialsChange = {} as SimpleChange;
        changes = { 'initials': initialsChange } as SimpleChanges;
      });
      describe('from no value to some value', () => {
        beforeEach(() => {
          initialsChange.previousValue = undefined;
          initialsChange.currentValue = 'AB';
        });
        it('internal initials are set to new value', () => {
          component.ngOnChanges(changes);
          expect(component.internalInitials).toBe('AB');
        });
      });
      describe('from some value to some other value', () => {
        beforeEach(() => {
          initialsChange.previousValue = 'AB';
          initialsChange.currentValue = 'CD';
        });
        it('internal initials are set to new value', () => {
          component.ngOnChanges(changes);
          expect(component.internalInitials).toBe('CD');
        });
      });
      describe('from some value to no value', () => {
        beforeEach(() => {
          initialsChange.previousValue = 'AB';
          initialsChange.currentValue = undefined;
        });
        describe('and user name has value', () => {
          beforeEach(() => {
            component.userName = 'Test User Name';
          });
          it('internal initials are set from user name', () => {
            component.ngOnChanges(changes);
            expect(component.internalInitials).toBe('TN');
          });
        });
        describe('and user name has no value', () => {
          beforeEach(() => {
            component.userName = undefined;
          });
          it('internal initials are empty', () => {
            component.ngOnChanges(changes);
            expect(component.internalInitials).toBe('');
          });
        });
      });
    });
    describe('When initials have not changed', () => {
      describe('and user name has changed', () => {
        let userNameChange: SimpleChange;
        beforeEach(() => {
          userNameChange = {} as SimpleChange;
          changes = { 'userName': userNameChange } as SimpleChanges;
        });
        describe('and initials have no value', () => {
          beforeEach(() => {
            component.initials = undefined;
          });
          describe('and user name has value', () => {
            beforeEach(() => {
              component.userName = 'Test User Name';
            });
            it('internal initials are set from user name', () => {
              component.ngOnChanges(changes);
              expect(component.internalInitials).toBe('TN');
            });
          });
          describe('and user name has no value', () => {
            beforeEach(() => {
              component.userName = undefined;
            });
            it('internal initials are empty', () => {
              component.ngOnChanges(changes);
              expect(component.internalInitials).toBe('');
            });
          });
        });
      });
    });
  });

  describe('clickToggleHeaderMenu', () => {
    describe('When header menu exists', () => {
      let spy: jasmine.Spy;
      beforeEach(() => {
        spy = spyOn(component, 'toggleHeaderMenu');
      });
      it('header menu is toggled', () => {
        const event = {} as Event;
        component.toggleHeaderMenu(event);
        expect(spy).toHaveBeenCalledWith(event);
      });
    });
  });
  // need to fix settimeout on keyToggleHeaderMenu
  xdescribe('keyToggleHeaderMenu', () => {
    describe('When header menu exists', () => {
      let spy: jasmine.Spy;
      let event: KeyboardEvent;
      beforeEach(() => {
        spy = spyOn(component, 'toggleHeaderMenu').and.callThrough();
      });
      describe('and key is space', () => {
        beforeEach(() => {
          event = { key: ' ' } as KeyboardEvent;
        });
        it('header menu is toggled', () => {
          component.keyToggleHeaderMenu(event);
          expect(spy).toHaveBeenCalledWith(event);
        });
      });
      describe('and key is space in IE', () => {
        beforeEach(() => {
          event = { key: 'Spacebar' } as KeyboardEvent;
        });
        it('header menu is toggled', () => {
          component.keyToggleHeaderMenu(event);
          expect(spy).toHaveBeenCalledWith(event);
        });
      });

      describe('and key is enter', () => {
        beforeEach(() => {
          event = { key: 'Enter' } as KeyboardEvent;
        });
        it('header menu is toggled', () => {
          component.keyToggleHeaderMenu(event);
          expect(spy).toHaveBeenCalledWith(event);
        });
      });
      describe('and key is not space or enter', () => {
        beforeEach(() => {
          event = { key: 'x' } as KeyboardEvent;
        });
        it('header menu is not toggled', () => {
          component.keyToggleHeaderMenu(event);
          expect(spy).not.toHaveBeenCalled();
        });
      });
    });
  });
});
