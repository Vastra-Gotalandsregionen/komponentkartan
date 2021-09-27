import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TabButtonComponent } from './tab-button.component';

describe('TabButtonComponent', () => {
  let component: TabButtonComponent;
  let fixture: ComponentFixture<TabButtonComponent>;
  let rootElement: DebugElement;

  beforeEach((done) => {
    TestBed.configureTestingModule({
      declarations: [ TabButtonComponent ]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(TabButtonComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      fixture.detectChanges();
      done();
    });
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('When button is disabled', () => {
    let buttonElement;
    beforeEach(() => {
      buttonElement = rootElement.query(By.css('button'));
      component.disabled = true;
      fixture.detectChanges();
    });

    it('button is shown as disabled', () => {
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
    let buttonElement;
    beforeEach(() => {
      buttonElement = rootElement.query(By.css('button'));
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
      rootElement.nativeElement.click();
      rootElement.nativeElement.removeEventListener('click', handleClick);
      expect(clickBubbled).toBe(true);
    });
  });

  describe('When button is already active and pressed again', () => {
    let buttonElement;
    let spy;
    beforeEach(() => {
      buttonElement = rootElement.query(By.css('button'));
      component.active = true;

      fixture.detectChanges();
      let clickBubbled = false;
      const handleClick = () => clickBubbled = true;
      rootElement.nativeElement.addEventListener('click', handleClick);
      rootElement.nativeElement.click();
      rootElement.nativeElement.removeEventListener('click', handleClick);

      fixture.detectChanges();
      spy = spyOn(component.selectedChanged, 'emit').and.callThrough();
    });

    it('button event is not propogated', () => {
      expect(spy).not.toHaveBeenCalled();
    });
  });
  describe('WCAG Tests', () => {
    let buttonElement;
    beforeEach(() => {
      buttonElement = rootElement.query(By.css('button'));
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
      it('aria-disabled is true', () => {
        expect(buttonElement.attributes['aria-disabled']).toBe('true');
      });
    });
  });
});
