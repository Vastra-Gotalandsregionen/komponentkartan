
import {
  ComponentFixture,
  TestBed,
  async
} from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';
import {
  By
} from '@angular/platform-browser';
import {
  FormsModule
} from '@angular/forms'
import {
  DebugElement
} from '@angular/core';
import {
  CommonModule, DecimalPipe
} from '@angular/common';

import {
  InputComponent
} from '../../component-package/controls/input/input.component';

import {
  IValidationResult, ValidationErrorState
} from '../../component-package/models/validation.model';
import { TruncatePipe } from '../../component-package/pipes/truncatePipe';

import 'intl/locale-data/jsonp/se-SE.js';


describe('[InputComponent]', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let rootElement: DebugElement;
  const validationErrorStates = ValidationErrorState;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
    TestBed.configureTestingModule({
      declarations: [InputComponent, TruncatePipe],
      imports: [CommonModule, FormsModule]
    });

    TestBed.overrideComponent(InputComponent, {
      set: {
        templateUrl: 'input.component.html'
      }
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(InputComponent);
      component = fixture.componentInstance;
      rootElement = fixture.debugElement;
      fixture.detectChanges();

      done();
    });
  });

  describe('When initialized with invalid state', () => {
    beforeEach(() => {
      component.isInvalid = true;
      component.errormessage = 'error';
      component.onBlur();
      fixture.detectChanges();
    });
    it('CSS Class validation-error--active is applied', () => {
      expect(rootElement.classes['validation-error--editing']).toEqual(false);
      expect(rootElement.classes['validation-error--active']).toEqual(true);
      expect(rootElement.classes['validation-error--fixed']).toEqual(false);
    });
    it('There is a error message section', () => {
      let element = rootElement.query(By.css('.input-validation_status__message'));
      expect(element.nativeElement.innerText).toEqual('error');
    });

    it('CSS Class validation-error--editing is applied when focused', () => {
      component.onFocus();
      fixture.detectChanges();

      let element = rootElement.query(By.css('.input-validation_status__message'));
      expect(element.nativeElement.innerText).toEqual('error');
      expect(rootElement.classes['validation-error--editing']).toEqual(true);
      expect(rootElement.classes['validation-error--active']).toEqual(false);
      expect(rootElement.classes['validation-error--fixed']).toEqual(false);
    });

    it('CSS Class validation-error--fixed is applied when valid and onblur', () => {
      component.onFocus();
      component.isInvalid = false;      
      component.onBlur();   
      fixture.detectChanges();

      expect(rootElement.classes['validation-error--editing']).toEqual(false);
      expect(rootElement.classes['validation-error--active']).toEqual(false);
      expect(rootElement.classes['validation-error--fixed']).toEqual(true);
    });

  });
});

