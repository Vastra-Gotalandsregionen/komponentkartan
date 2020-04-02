import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './button.component';

describe('[ButtonComponent - Angular]', () => {
  let component: ButtonComponent;
  let fixture: ComponentFixture<ButtonComponent>;
  let rootElement: DebugElement;
  let buttonElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [ButtonComponent],
      imports: [CommonModule, FormsModule]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(ButtonComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      buttonElement = rootElement.query(By.css('button'));
      fixture.detectChanges();

      done();
    });
  });

  describe('When type is omitted', () => {
    it('button type is button', () => {
      expect(buttonElement.nativeElement.type).toBe('button');
    });
  });

  describe('When type is button', () => {
    beforeEach(() => {
      component.type = 'button';
      fixture.detectChanges();
    });
    it('button type is button', () => {
      expect(buttonElement.nativeElement.type).toBe('button');
    });
  });

  describe('When type is submit', () => {
    beforeEach(() => {
      component.type = 'submit';
      fixture.detectChanges();
    });
    it('button type is submit', () => {
      expect(buttonElement.nativeElement.type).toBe('submit');
    });
  });

  describe('When disabled is true', () => {
    beforeEach(() => {
      component.disabled = true;
      component.ngOnChanges();
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
    describe('and disabled is changed to false', () => {
      beforeEach(() => {
        component.disabled = false;
        component.ngOnChanges();
        fixture.detectChanges();
      });
      it('button is displayed as enabling', () => {
        expect(buttonElement.classes['button--enabling']).toBe(true);
      });
    });
  });

  describe('When disabled is false', () => {
    beforeEach(() => {
      component.disabled = false;
      fixture.detectChanges();
    });
    it('button is displayed as enabled', () => {
      expect(buttonElement.classes['button--disabled']).not.toBe(true);
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
      it('aria-disabled is true', () => {
        expect(buttonElement.attributes['aria-disabled']).toBe('true');
      });
    });
  });
});
