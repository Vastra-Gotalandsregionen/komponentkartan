import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LockButtonComponent } from '../../controls/lock-button/lock-button.component';
import { IconComponent } from '../icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconModule } from '../icon/icon.module';

describe('[LockButtonComponent - Angular]', () => {
  let component: LockButtonComponent;
  let fixture: ComponentFixture<LockButtonComponent>;
  let rootElement: DebugElement;
  let buttonElement: DebugElement;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [LockButtonComponent, IconComponent],
      imports: [CommonModule, FormsModule, FontAwesomeModule, IconModule]
    });

    TestBed.overrideComponent(LockButtonComponent, {
      set: {
        templateUrl: 'lock-button.component.html'
      }
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(LockButtonComponent);
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
    describe('and button is clicked', () => {
      beforeEach(() => {
        spyOn(component.lockChanged, 'emit');
        component.locked = true;
        buttonElement.nativeElement.click();
      });
      it('locked status in unchanged', () => {
        expect(component.locked).toBe(true);
      });
      it('locked status is not emitted', () => {
        expect(component.lockChanged.emit).not.toHaveBeenCalled();
      });
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

  describe('When button is locked', () => {
    beforeEach(() => {
      component.locked = true;
      fixture.detectChanges();
    });
    it('it is displayed as locked', () => {
      expect(buttonElement.classes['lock-button--unlocked']).toBe(false);
    });
    it('aria-label is "lås upp"', () => {
      expect(buttonElement.attributes['aria-label']).toBe('lås upp');
    });
    describe('and it is clicked', () => {
      beforeEach(() => {
        spyOn(component.lockChanged, 'emit');
        buttonElement.nativeElement.click();
      });
      it('it is unlocked', () => {
        expect(component.locked).toBe(false);
      });
      it('locked status is emitted', () => {
        expect(component.lockChanged.emit).toHaveBeenCalledWith(false);
      });
    });
  });

  describe('When button is unlocked', () => {
    beforeEach(() => {
      component.locked = false;
      fixture.detectChanges();
    });
    it('it is displayed as unlocked', () => {
      expect(buttonElement.classes['lock-button--unlocked']).toBe(true);
    });
    it('aria-label is "lås"', () => {
      expect(buttonElement.attributes['aria-label']).toBe('lås');
    });
    describe('and it is clicked', () => {
      beforeEach(() => {
        spyOn(component.lockChanged, 'emit');
        buttonElement.nativeElement.click();
      });
      it('it is locked', () => {
        expect(component.locked).toBe(true);
      });
      it('locked status is emitted', () => {
        expect(component.lockChanged.emit).toHaveBeenCalledWith(true);
      });
    });
  });

});
