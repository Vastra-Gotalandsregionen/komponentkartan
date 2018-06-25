

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { LoginInformationComponent, HeaderMenuComponent, RingWithTextComponent } from '../..';
import { RouterTestingModule } from '@angular/router/testing';

describe('[TestTableComponent]', () => {
  let component: HeaderComponent;

  beforeEach(() => {
    component = new HeaderComponent();
  });

  describe('When username is set', () => {
    it('initials is set to first letter in first name occurance and last name occurance', () => {
      component.userName = 'Göte Borg';
      component.setInitials();
      expect(component.initials).toBe('GB');
    });
    it('initials is set to first letter in first name occurance and last name occurance, with multiple name', () => {
      component.userName = 'Göte Borg Stad';
      component.setInitials();
      expect(component.initials).toBe('GS');
    });
  });

  describe('When initials is set', () => {
    it('initials is set to string value from initials parameter', () => {
      component.initials = 'BG';
      component.setInitials();
      expect(component.initials).toBe('BG');
    });
  });
});
