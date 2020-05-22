import { HeaderMenuComponent, MenuItemComponent, SubmenuComponent, MenuSeparatorComponent, LoginInformationComponent, RingWithTextComponent, HeaderComponent, IconComponent } from '../../index';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement, Component, SimpleChanges, SimpleChange } from '@angular/core';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconModule } from '../icon/icon.module';

@Component({
  selector: 'vgr-test',
  template:
    `<vgr-header-menu [userName]="'Nova Audit'">
      <vgr-menu-item link="/minsida" text="Internt menyval"></vgr-menu-item>
      <vgr-submenu text="Submeny">
        <vgr-menu-item link="/backtotop" text="Submenyval : backtotop"></vgr-menu-item>
      </vgr-submenu>
    </vgr-header-menu>
  `
})
class TestHeaderMenuComponent  { }

describe('HeaderMenuComponent', () => {
  let fixture: ComponentFixture<TestHeaderMenuComponent>;
  let component: HeaderMenuComponent;
  let rootElement: HTMLElement;
  let debugElement: DebugElement;

  beforeEach((done) => {
    TestBed.configureTestingModule({
      declarations: [
        TestHeaderMenuComponent,
        HeaderComponent,
        HeaderMenuComponent,
        MenuItemComponent,
        SubmenuComponent,
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
        RouterTestingModule.withRoutes([]),
        FontAwesomeModule,
        IconModule
      ],


    });
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TestHeaderMenuComponent);
      component = fixture.debugElement.children[0].componentInstance;
      debugElement = fixture.debugElement;
      rootElement = fixture.debugElement.nativeElement;

      fixture.detectChanges();
      done();
    });
  });

  describe('Test variables', () => {
    it('userName is correct', () => {
      expect(component.userName).toBe('Nova Audit');
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
      headerMenuElement = debugElement.query(By.css('.header-menu'));
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
  describe('Toggle Header Menu', () => {
    it('and key is space', () => {
      const button = { key: ' ' } as KeyboardEvent;
      const keyEvent = new KeyboardEvent('keydown', button);

      component.keyToggleHeaderMenu(keyEvent);

      expect(component.hideMenu).toBeFalsy();
    });
    it('and key is space (IE)', () => {
      const button = { key: 'Spacebar' } as KeyboardEvent;
      const keyEvent = new KeyboardEvent('keydown', button);

      component.keyToggleHeaderMenu(keyEvent);

      expect(component.hideMenu).toBeFalsy();
    });
    it('and key is Enter', () => {
      const button = { key: 'Enter' } as KeyboardEvent;
      const keyEvent = new KeyboardEvent('keydown', button);

      component.keyToggleHeaderMenu(keyEvent);

      expect(component.hideMenu).toBeFalsy();
    });
    it('and key is not Spacebar or Enter', () => {
      const button = { key: 'x' } as KeyboardEvent;
      const keyEvent = new KeyboardEvent('keydown', button);

      component.keyToggleHeaderMenu(keyEvent);

      expect(component.hideMenu).toBeTruthy();
    });
  });
});
