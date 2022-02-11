import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxGroupComponent } from './checkbox-group.component';

fdescribe('CheckboxGroupComponent', () => {
  let component: CheckboxGroupComponent;
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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Initial values for checkbox-group', () => {
    let setGroupDisabledSpy;
    let onChangeSpy;
    beforeEach(() => {
      setGroupDisabledSpy = spyOn(component, 'setGroupDisabledOverride').and.callThrough();
      onChangeSpy = spyOn(component, 'onChange').and.callThrough();
      component.disabled = true;
      component.ngAfterContentInit();
      fixture.detectChanges();
    });

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
  });
});
