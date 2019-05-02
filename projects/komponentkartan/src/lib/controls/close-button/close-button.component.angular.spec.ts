import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CloseButtonComponent } from './close-button.component';
import { IconComponent } from '../icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('[CloseButtonComponent - Angular]', () => {
  let component: CloseButtonComponent;
  let fixture: ComponentFixture<CloseButtonComponent>;
  let rootElement: DebugElement;
  let buttonElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [CloseButtonComponent, IconComponent],
      imports: [CommonModule, FormsModule, FontAwesomeModule]
    });

    TestBed.overrideComponent(CloseButtonComponent, {
      set: {
        templateUrl: 'close-button.component.html'
      }
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(CloseButtonComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      buttonElement = rootElement.query(By.css('button'));
      fixture.detectChanges();

      done();
    });
  });

  describe('When disabled is true', () => {
    beforeEach(() => {
      component.disabled = true;
      fixture.detectChanges();
    });
    it('button is displayed as disabled', () => {
      expect(buttonElement.classes['button--disabled']).toBe(true);
    });
    it('click does not bubble', () => {
      let clickBubbled = false;
      const handleClick = () => clickBubbled = true;
      rootElement.nativeElement.addEventListener('click', handleClick);
      buttonElement.nativeElement.click();
      rootElement.nativeElement.removeEventListener('click', handleClick);
      expect(clickBubbled).toBe(false);
    });
  });

  describe('When disabled is false', () => {
    beforeEach(() => {
      component.disabled = false;
      fixture.detectChanges();
    });
    it('button is displayed as enabled', () => {
      expect(buttonElement.classes['button--disabled']).toBe(false);
    });
    it('click bubbles', () => {
      let clickBubbled = false;
      const handleClick = () => clickBubbled = true;
      rootElement.nativeElement.addEventListener('click', handleClick);
      buttonElement.nativeElement.click();
      rootElement.nativeElement.removeEventListener('click', handleClick);
      expect(clickBubbled).toBe(true);
    });
  });

  describe('WCAG Tests', () => {
    it('aria-label is "stäng"', () => {
      expect(buttonElement.attributes['aria-label']).toBe('stäng');
    });
    describe('When button is enabled', () => {
      it('aria-disabled is false', () => {
        expect(buttonElement.attributes['aria-disabled']).toBe('false');
      });
    });
    describe('When button is disabled', () => {
      beforeEach(() => {
        component.disabled = true;
        fixture.detectChanges();
      });
      it('aria-disabled is set to true', () => {
        expect(buttonElement.attributes['aria-disabled']).toBe('true');
      });
    });
  });
});
