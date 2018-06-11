import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ToggleButtonComponent } from './toggle-button.component';

describe('[ToggleButtonComponent - Angular]', () => {
  let component: ToggleButtonComponent;
  let fixture: ComponentFixture<ToggleButtonComponent>;
  let rootElement: DebugElement;
  let buttonElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [ToggleButtonComponent]
    });

    TestBed.overrideComponent(ToggleButtonComponent, {
      set: {
        templateUrl: 'toggle-button.component.html'
      }
    });
    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ToggleButtonComponent);
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
      rootElement.nativeElement.click();
      rootElement.nativeElement.removeEventListener('click', handleClick);
      expect(clickBubbled).toBe(true);
    });
  });

  describe('When pressed is true', () => {
    it('button is dispalyed as primary', () => {
      component.pressed = true;
      fixture.detectChanges();
      expect(buttonElement.classes['button--secondary']).toBe(false);
    });
  });

  describe('When pressed is false', () => {
    it('button is dispalyed as secondary', () => {
      component.pressed = false;
      fixture.detectChanges();
      expect(buttonElement.classes['button--secondary']).toBe(true);
    });
  });
});
