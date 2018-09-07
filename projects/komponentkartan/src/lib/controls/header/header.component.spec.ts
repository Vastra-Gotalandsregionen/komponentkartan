import { SimpleChanges, SimpleChange } from '@angular/core';

import { HeaderComponent } from './header.component';
import { HeaderMenuComponent } from '../headerMenu/headerMenu.component';

describe('[HeaderComponent]', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    component = new HeaderComponent();
  });

  describe('Instatiate', () => {
    it('headerMenu is correct', () => {
      expect(component.headerMenu).toBeFalsy();
    });
    it('userName is correct', () => {
      expect(component.userName).toBeFalsy();
    });
    it('initials is correct', () => {
      expect(component.initials).toBeFalsy();
    });
    it('systemText is correct', () => {
      expect(component.systemText).toBeFalsy();
    });
    it('textColor is correct', () => {
      expect(component.textColor).toBeFalsy();
    });
    it('circleColor is correct', () => {
      expect(component.circleColor).toBeFalsy();
    });
    it('hideSwosh is correct', () => {
      expect(component.hideSwosh).toBe(false);
    });
    it('logoClass is correct', () => {
      expect(component.logoClass).toBeFalsy();
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
        component.headerMenuComponent = {
          toggleHeaderMenu: (evt) => {}
        } as HeaderMenuComponent;
        spy = spyOn(component.headerMenuComponent, 'toggleHeaderMenu');
      });
      it('header menu is toggled', () => {
        const event = {} as Event;
        component.clickToggleHeaderMenu(event);
        expect(spy).toHaveBeenCalledWith(event);
      });
    });
  });

  describe('keyToggleHeaderMenu', () => {
    describe('When header menu exists', () => {
      let spy: jasmine.Spy;
      let event: KeyboardEvent;
      beforeEach(() => {
        component.headerMenuComponent = {
          toggleHeaderMenu: (evt) => {}
        } as HeaderMenuComponent;
        spy = spyOn(component.headerMenuComponent, 'toggleHeaderMenu');
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
