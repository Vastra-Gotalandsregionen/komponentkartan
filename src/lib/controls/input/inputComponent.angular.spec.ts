
// import { ComponentFixture, TestBed, async } from '@angular/core/testing';
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
// import { By } from '@angular/platform-browser';
// import { FormsModule, ReactiveFormsModule, ControlContainer } from '@angular/forms'
// import { DebugElement } from '@angular/core';
// import { CommonModule, DecimalPipe } from '@angular/common';

// import { InputComponent } from '../../controls/input/input.component';

// import { ErrorHandler } from '../../services/errorhandler';

// import { IValidationResult, ValidationErrorState } from '../../models/validation.model';
// import { TruncatePipe } from '../../pipes/truncatePipe';
// import { ErrorMessagePipe } from '../../pipes/errorMessagePipe';

// // Locale registration
// import { registerLocaleData } from '@angular/common';
// import localeSe from '@angular/common/locales/se';
// import localeSerExtra from '@angular/common/locales/extra/se';
// registerLocaleData(localeSe, 'sv-SE', localeSerExtra);

// import { combineAll } from 'rxjs/operator/combineAll';


// describe('[InputComponent]', () => {
//   let component: InputComponent;
//   let fixture: ComponentFixture<InputComponent>;
//   let rootElement: DebugElement;
//   const validationErrorStates = ValidationErrorState;

//   beforeEach((done) => {
//     TestBed.resetTestEnvironment();
//     TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//     TestBed.configureTestingModule({
//       declarations: [InputComponent, TruncatePipe, ErrorMessagePipe],
//       imports: [CommonModule, FormsModule, ReactiveFormsModule],
//       providers: [ErrorHandler]
//     });

//     TestBed.overrideComponent(InputComponent, {
//       set: {
//         templateUrl: 'input.component.html'
//       }
//     });

//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(InputComponent);
//       component = fixture.componentInstance;
//       rootElement = fixture.debugElement;
//       fixture.detectChanges();

//       done();
//     });
//   });

//   describe('When initialized with invalid state', () => {
//     beforeEach(() => {
//       component.isInvalid = true;
//       component.currentErrorMessage = 'error';
//       component.readonly = false;
//       component.ngOnInit();
//       component.onBlur();
//       fixture.detectChanges();
//     });

//     it('CSS Class validation-error--active is applied', () => {
//       expect(rootElement.classes['validation-error--editing']).toEqual(false);
//       expect(rootElement.classes['validation-error--active']).toEqual(true);
//       expect(rootElement.classes['validation-error--fixed']).toEqual(false);
//     });
//     it('There is an error message section', () => {
//       const element = rootElement.query(By.css('.input-validation_status__message'));
//       expect(element.nativeElement.innerText).toEqual('error');
//     });

//     describe('When focused', () => {
//       beforeEach(() => {
//         component.displayValue = 'test';
//         component.onFocus();
//         fixture.detectChanges();
//       });
//       it('CSS Class validation-error--editing is applied', () => {

//         const element = rootElement.query(By.css('.input-validation_status__message'));
//         expect(element.nativeElement.innerText).toEqual('error');
//         expect(rootElement.classes['validation-error--editing']).toEqual(true);
//         expect(rootElement.classes['validation-error--active']).toEqual(false);
//         expect(rootElement.classes['validation-error--fixed']).toEqual(false);
//       });

//       describe('When error is corrected and field is blurred', () => {
//         beforeEach(() => {
//           component.isInvalid = false;
//           component.onBlur();
//           fixture.detectChanges();
//         });
//         it('CSS Class validation-error--fixed is applied', () => {
//           expect(rootElement.classes['validation-error--editing']).toEqual(false);
//           expect(rootElement.classes['validation-error--active']).toEqual(false);
//           expect(rootElement.classes['validation-error--fixed']).toEqual(true);
//         });
//       });
//     });
//   });

//   describe('When initialized with invalid state and validate on init is true', () => {
//     beforeEach(() => {
//       component = fixture.componentInstance;
//       component.isInvalid = true;
//       component.validateOnInit = true;
//       component.currentErrorMessage = 'error';
//       component.small = false;
//       component.ngOnInit();
//       fixture.detectChanges();
//     });

//     it('CSS Class validation-error--active is applied', () => {
//       expect(rootElement.classes['validation-error--editing']).toEqual(false);
//       expect(rootElement.classes['validation-error--active']).toEqual(true);
//       expect(rootElement.classes['validation-error--fixed']).toEqual(false);
//     });
//     it('There is a error message section', () => {
//       const element = rootElement.query(By.css('.input-validation_status__message'));
//       expect(element.nativeElement.innerText).toEqual('error');
//     });
//   });
//   describe('When initialized with number formatting, valid state and 5 decimals', () => {
//     beforeEach(() => {
//       component = fixture.componentInstance;
//       component.formatNumber = true;
//       component.nrOfDecimals = 4;
//       component.value = '1234.567340980932848';
//       component.isInvalid = false;
//       component.readonly = false;
//       component.ngOnInit();
//       component.onBlur();
//       fixture.detectChanges();
//     });

//     it('Value and displayvalue has been formatted correctly', () => {
//       expect(component.value).toEqual(1234.5673);
//     });

//     describe('When number formatting is off', () => {
//       beforeEach(() => {
//         component = new InputComponent(null, null);
//         component.value = '1234.5673409';
//         component.formatNumber = false;
//         component.ngOnInit();
//         component.onBlur();
//         fixture.detectChanges();
//       });
//       it('Value is not formatted', () => {
//         expect(component.value).toEqual('1234.5673409');
//       });
//     });
//   });
// });

