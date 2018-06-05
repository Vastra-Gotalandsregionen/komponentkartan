// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { TextareaComponent } from './textarea.component';
// import {
//   FormsModule, ReactiveFormsModule, ControlContainer,
//   FormGroup, FormControl, Validators, AbstractControl, Form
// } from '@angular/forms';
// import { DebugElement } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// describe('TextareaComponent', () => {
//   let component: TextareaComponent;
//   let fixture: ComponentFixture<TextareaComponent>;
//   let rootElement: DebugElement;

//   beforeEach((done) => {
//     TestBed.resetTestEnvironment();
//     TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
//     TestBed.configureTestingModule({
//       declarations: [TextareaComponent],
//       imports: [CommonModule, FormsModule, ReactiveFormsModule],
//       providers: [ControlContainer]
//     });

//     TestBed.compileComponents().then(() => {
//       fixture = TestBed.createComponent(TextareaComponent);
//       component = fixture.componentInstance;
//       rootElement = fixture.debugElement;
//       fixture.detectChanges();
//     });
//     done();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   describe('When textarea has readonly set to true', () => {
//     beforeEach(() => {
//       component.readonly = true;
//       fixture.detectChanges();
//     });
//     it('CSS Class readonly is applied', () => {
//       expect(rootElement.classes['readonly']).toEqual(true);
//     });
//   });
//   describe('When initialized with invalid state', () => {
//     beforeEach(() => {
//       component.control = new FormControl('', { validators: [Validators.required], updateOn: 'submit' });
//       component.readonly = false;
//       fixture.detectChanges();
//     });

//     it('CSS Class validated-input has been applied', () => {
//       expect(rootElement.classes['textarea-validation-error--editing']).toEqual(false);
//       expect(rootElement.classes['textarea-validation-error--active']).toEqual(true);
//     });

//     describe('and textarea has been focused', () => {
//       beforeEach(() => {
//         component.hasFocus = true;
//         fixture.detectChanges();
//       });

//       it('CSS Class validated-input has been applied', () => {
//         expect(rootElement.classes['textarea-validation-error--editing']).toEqual(true);
//         expect(rootElement.classes['textarea-validation-error--active']).toEqual(false);
//       });
//       describe('and input has been corrected', () => {
//         beforeEach(() => {
//           component.control.setValue('Text');
//           fixture.detectChanges();
//         });

//         it('CSS Class validated-input has been applied', () => {
//           expect(rootElement.classes['textarea-validation-error--editing']).toEqual(false);
//           expect(rootElement.classes['textarea-validation-error--active']).toEqual(false);
//         });
//       });
//     });
//   });

// });
