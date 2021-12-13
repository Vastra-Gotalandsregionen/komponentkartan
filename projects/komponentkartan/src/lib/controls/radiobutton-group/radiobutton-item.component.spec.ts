import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { RadiobuttonItemComponent } from './radiobutton-item.component';

fdescribe('RadiobuttonItemComponent', () => {
  let component: RadiobuttonItemComponent;
  let fixture: ComponentFixture<RadiobuttonItemComponent>;
  let rootElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiobuttonItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonItemComponent);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when item is clicked', () => {
    let itemClickedSpy;
    let focusSpy;
    let firstFocusSpy;
    beforeEach(() => {
      itemClickedSpy = spyOn(component, 'itemClicked').and.callThrough();
      focusSpy = spyOn(component, 'focus').and.callThrough();
      firstFocusSpy = spyOn(component, 'firstfocusIn').and.callThrough();
      component.selected = undefined;
      component.disabled = false;
      component.isTabEnabled = true;
      let clickedItem = rootElement.queryAll(By.css('.radio-button-container'))[0];
      clickedItem.nativeElement.click();
      fixture.detectChanges();
    });

    it('itemClicked() should have been called', () => {
      expect(itemClickedSpy).toHaveBeenCalled();
    });

    it('focus() should have been called', () => {
      expect(focusSpy).toHaveBeenCalled();
    });

    it('firstfocusIn() should have been called', () => {
      expect(firstFocusSpy).toHaveBeenCalled();
    });

    it('selected should be true', () => {
      expect(component.selected).toBe(true);
    });

    it('isTabEnabled should be false', () => {
      expect(component.isTabEnabled).toBe(false);
    });

    describe('and isTabEnabled is false', () => {
      beforeEach(() => {
        component.isTabEnabled = false;
        fixture.detectChanges();
      });

      it('isTabEnabled should be false', () => {
        expect(component.isTabEnabled).toBe(false)
      })
    });

    describe('and groupDisabledOverride is true', () => {
      beforeEach(() => {
        component.groupDisabledOverride = true;
        fixture.detectChanges();
      });

      it('disabled should be true', () => {
        expect(component.disabled).toBe(true)
      })
    });
  });
});
