import { DebugElement } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CheckboxGroupComponent } from './checkbox-group.component';

function pickRandom(values: any[]): any {
  const index = Math.ceil(Math.random() * values.length) - 1;
  return values[index];
}

describe('CheckboxGroupComponent', () => {
  let component: CheckboxGroupComponent;
  let rootElement: DebugElement;
  let fixture: ComponentFixture<CheckboxGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CheckboxGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckboxGroupComponent);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial values for checkbox-group', () => {
    let setGroupDisabledSpy;
    let onChangeSpy;
    beforeEach(fakeAsync(() => {
      setGroupDisabledSpy = spyOn(component, 'setGroupDisabledOverride').and.callThrough();
      onChangeSpy = spyOn(component, 'onChange').and.callThrough();
      component.disabled = true;
      component.ngAfterContentInit();
      tick(400);
      fixture.detectChanges();
      tick(Infinity);
      fixture.detectChanges();
    }));

    it('setGroupDisabledOverride() should be called 2 times', () => {
      expect(setGroupDisabledSpy).toHaveBeenCalledTimes(2);
    });

    it('onChange() should be called', () => {
      expect(onChangeSpy).toHaveBeenCalled();
    });

    it('required should be false', () => {
      expect(component.required).toBe(false);
    });

    it('showValidation should be true', () => {
      expect(component.showValidation).toBe(true);
    });

    it('vertical should be false', () => {
      expect(component.vertical).toBe(false);
    });

    it('_disabled should be true', () => {
      expect(component._disabled).toBe(true);
    });

    it('_value.length should be 0', () => {
      expect(component._value.length).toBe(0);
    });

    it('validationErrorMessage should be "Obligatoriskt"', () => {
      expect(component.validationErrorMessage).toBe('Obligatoriskt');
    });

    describe('onKeyDown', () => {
      let checkboxElement;
      let keyDownSpy;
      let event;
      beforeEach(() => {
        const key = pickRandom(['Spacebar', 'Enter']);
        event = { key: key } as KeyboardEvent;
        keyDownSpy = spyOn(component, 'keyDown').and.callThrough();
        checkboxElement = rootElement.query(By.css('#checkboxlist'));
        checkboxElement.triggerEventHandler('keydown', event);
        fixture.detectChanges();
      });

      it('keyDown() should be called', () => {
        expect(keyDownSpy).toHaveBeenCalled();
      });
    });

    describe('on focusout', () => {
      let checkboxElement;
      let focusoutSpy;
      let event;
      beforeEach(() => {
        const key = pickRandom(['Spacebar', 'Enter']);
        event = { key: key } as KeyboardEvent;
        focusoutSpy = spyOn(component, 'onLeave').and.callThrough();
        checkboxElement = rootElement.query(By.css('#checkboxlist'));
        checkboxElement.triggerEventHandler('focusout', event);
        fixture.detectChanges();
      });

      it('onLeave() should be called', () => {
        expect(focusoutSpy).toHaveBeenCalled();
      });
    });
  });
});
