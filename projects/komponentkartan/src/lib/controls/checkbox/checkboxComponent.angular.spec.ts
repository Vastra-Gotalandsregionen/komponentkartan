
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxComponent } from './checkbox.component';
import { IconComponent } from '../icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconModule } from '../icon/icon.module';


describe('CheckboxComponent', () => {
  let component: CheckboxComponent;
  let fixture: ComponentFixture<CheckboxComponent>;
  let rootElement: DebugElement;
  let checkbox: DebugElement;
  let checkedChangedSpy: jasmine.Spy;


  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [CheckboxComponent, IconComponent],
      imports: [CommonModule, FontAwesomeModule, IconModule]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(CheckboxComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      checkbox = rootElement.query(By.css('.checkbox__input'));
      checkedChangedSpy = spyOn(component.checkedChanged, 'emit');
      fixture.detectChanges();

      done();
    });
  });
  describe('When initialized', () => {
    it('checkbox is not checked', () => {
      expect(checkbox.context['checked']).not.toBe(true);
    });
    it('checkbox is enabled', () => {
      expect(checkbox.context['disabled']).not.toBe(true);
    });
  });

  describe('When initialized as checked', () => {
    beforeEach(() => {
      component.checked = true;
      fixture.detectChanges();
    });
    it('checkbox is not checked', () => {
      expect(checkbox.context['checked']).toBe(true);
    });
    it('checkbox is enabled', () => {
      expect(checkbox.context['disabled']).not.toBe(true);
    });
  });

  describe('When initialized as disabled', () => {
    beforeEach(() => {
      component.disabled = true;
      fixture.detectChanges();
    });
    it('checkbox is not checked', () => {
      expect(checkbox.context['checked']).not.toBe(true);
    });
    it('checkbox is disabled', () => {
      expect(checkbox.context['disabled']).toBe(true);
    });

    describe('and checked', () => {
      beforeEach(() => {
        component.checked = true;
        fixture.detectChanges();
      });
      it('checkbox is checked', () => {
        expect(checkbox.context['checked']).toBe(true);
      });
      it('checkbox is disabled', () => {
        expect(checkbox.context['disabled']).toBe(true);
      });
    });
  });

  describe('When checkbox is clicked ', () => {
    beforeEach(() => {
      checkbox.nativeElement.click();
      fixture.detectChanges();
    });
    it('checkbox is checked', () => {
      expect(component.checked).toBe(true);
      expect(checkbox.context['checked']).toBe(true);
    });
    it('checked event is emitted', () => {
      expect(component.checkedChanged.emit).toHaveBeenCalledWith(
        {
          id: component.elementId,
          checked: component.checked,
          label: component.label
        });
    });

    describe('And checkbox is clicked again', () => {
      beforeEach(() => {
        checkedChangedSpy.calls.reset();
        checkbox.nativeElement.click();
        fixture.detectChanges();
      });
      it('checkbox is unchecked', () => {
        expect(component.checked).toBe(false);
        expect(checkbox.context['checked']).not.toBe(true);
      });
      it('checked event is emitted', () => {
        expect(component.checkedChanged.emit).toHaveBeenCalledWith(
          {
            id: component.elementId,
            checked: component.checked,
            label: component.label
          });
      });
    });
  });

  describe('When checkbox is triggered with the SPACE key ', () => {
    beforeEach(() => {
      checkbox.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Spacebar'}));
      fixture.detectChanges();
    });
    it('checkbox is checked', () => {
      expect(component.checked).toBe(true);
      expect(checkbox.context['checked']).toBe(true);
    });
    it('checked event is emitted', () => {
      expect(component.checkedChanged.emit).toHaveBeenCalledWith(
        {
          id: component.elementId,
          checked: component.checked,
          label: component.label
        });
    });
  });

  describe('When checkbox is triggered with the ENTER key ', () => {
    beforeEach(() => {
      checkbox.nativeElement.dispatchEvent(new KeyboardEvent('keydown', {key: 'Enter'}));
      fixture.detectChanges();
    });
    it('checkbox is checked', () => {
      expect(component.checked).toBe(true);
      expect(checkbox.context['checked']).toBe(true);
    });
    it('checked event is emitted', () => {
      expect(component.checkedChanged.emit).toHaveBeenCalledWith(
        {
          id: component.elementId,
          checked: component.checked,
          label: component.label
        });
    });
  });

  describe('WCAG compatibility', () => {
    let checkboximage: DebugElement;

    beforeEach(() => {
      component.label = 'Ettikett';
      checkboximage = rootElement.query(By.css('.checkbox__control'));
      fixture.detectChanges();
    });
    it('The checkbox has role checkbox.', () => {
      expect(checkboximage.attributes['role']).toBe('checkbox');
    });

    describe('The checkbox has an accessible label, preferably provided by a visible label associated using aria-labelledby', () => {
      let labelElement: DebugElement;
      beforeEach(() => {
        labelElement = rootElement.query(By.css('.checkbox__label'));
      });

      it('checkbox is associated with the label', () => {
        expect(labelElement.nativeElement.htmlFor).toBe(component.labelledbyid);
      });
      it('checkbox has a label with an id', () => {
        checkbox = rootElement.query(By.css('.checkbox'));
        expect(checkboximage.attributes['aria-labelledby']).toBe(labelElement.nativeElement.htmlFor);
      });
    });

    it('When checked, the checkbox element has state aria-checked set to true', () => {
      component.checked = true;
      fixture.detectChanges();
      expect(checkboximage.attributes['aria-checked']).toBe('true');
    });

    it('When not checked, it has state aria-checked set to false', () => {
      component.checked = false;
      fixture.detectChanges();
      expect(checkboximage.attributes['aria-checked']).toBe('false');
    });

  });
});
