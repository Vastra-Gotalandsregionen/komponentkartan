import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { IconComponent } from '../icon/icon.component';
import { TruncatePipe } from '../../pipes/truncatePipe';
import { ErrorMessagePipe } from '../../pipes/errorMessagePipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormControl, Validators } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconModule } from '../icon/icon.module';

describe('InputComponent', () => {
  let fixture: ComponentFixture<InputComponent>;
  let component: InputComponent;
  let rootElement: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        InputComponent,
        IconComponent,
        TruncatePipe,
        ErrorMessagePipe
      ],
      imports: [
        FontAwesomeModule,
        CommonModule,
        FormsModule,
        IconModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when initiated', () => {
    it('Should get the show-validation by default', () => {
      expect(rootElement.query(By.css('.custominput')).classes['validation-error--active']).toBe(true);
    });
  });

  describe('When using a suffix', () => {
    beforeEach(() => {
      component.suffix = 'kr';
      component.ngOnInit();
      fixture.detectChanges();
    });
    it('it should be right aligned and show suffix', () => {
      const suffix = rootElement.query(By.css('.suffix'));
      const wrapper = rootElement.query(By.css('.inputwrapper'));
      expect(component.hasSuffix).toBe(true);
      expect(suffix.nativeElement.textContent).toEqual('kr');
      expect(wrapper.classes['alignRight']).toBe(true);
    });
  });

  describe('When using a prefix', () => {
    beforeEach(() => {
      component.prefix = '$';
      component.ngOnInit();
      fixture.detectChanges();
    });
    it('it should be left aligned (default) and show prefix', () => {
      const prefix = rootElement.query(By.css('.prefix'));
      const wrapper = rootElement.query(By.css('.inputwrapper'));
      expect(prefix.nativeElement.textContent).toEqual('$');
      expect(wrapper.classes['alignRight']).toBeFalsy();
    });
  });

  describe('Error messages', () => {
    beforeEach(() => {
      component.control = new FormControl('', { validators: [Validators.required], updateOn: 'change' });
      component.errorMessage = 'error';
      component.ngOnInit();
      fixture.detectChanges();
    });

    it('should show as invalid', () => {
      expect(component.control.status).toBe('INVALID');
    });

    it('should show error message', () => {
      const errorMessage = rootElement.query(By.css('.validation__status__message'));
      expect(errorMessage.nativeElement.textContent).toBe('error');
    });

    describe('Adding a value', () => {
      it('Sholud be valid', () => {
        component.control.setValue('test');
        fixture.detectChanges();
        expect(component.control.status).toBe('VALID');
      });
    });
  });

});
