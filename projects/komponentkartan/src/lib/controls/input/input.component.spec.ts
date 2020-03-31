import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { InputComponent } from './input.component';
import { IconComponent } from '../icon/icon.component';
import { TruncatePipe } from '../../pipes/truncatePipe';
import { ErrorMessagePipe } from '../../pipes/errorMessagePipe';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Component, DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { IconModule } from '../icon/icon.module';

@Component({
  selector: 'vgr-input-test',
  template: `
    <vgr-input [(ngModel)]="values[0]"></vgr-input><br>
    <vgr-input [(ngModel)]="values[1]" textAlign="right"></vgr-input><br>
    <vgr-input [(ngModel)]="values[2]" required="true" pattern="[a-z]{2,5}"></vgr-input><br>
    <vgr-input [(ngModel)]="values[3]" prefix="$"></vgr-input><br>
    <vgr-input [(ngModel)]="values[4]" suffix="kr"></vgr-input>
  `
})
export class VgrInputTestComponent {
  values = [ 1, 2, 'he', 455, 5];

  constructor() {
  }
}



fdescribe('InputComponent', () => {
  let fixture: ComponentFixture<VgrInputTestComponent>;
  let testComponent: VgrInputTestComponent;
  let components: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        VgrInputTestComponent,
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VgrInputTestComponent);
    testComponent = fixture.componentInstance;
    components = Array.from(fixture.debugElement.queryAll(By.css('vgr-input')));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testComponent).toBeTruthy();
  });

  describe('First input', () => {
    it('Should get the right classes', () => {
      expect(components[0].classes['vgr-input--show-validation']).toBe(true);
      expect(components[0].classes['vgr-input--focused']).toBe(false);
      expect(components[0].classes['vgr-input--readonly']).toBe(false);
      expect(components[0].classes['vgr-input--disabled']).toBe(false);
      expect(components[0].classes['vgr-input--suffix']).toBe(false);
    });
    xdescribe('Focusing on the input', () => {
      beforeEach(() => {
        components[0].componentInstance.focus();
        fixture.detectChanges();
        console.log(components[0].classes);
      });
      it('should change the focus class', () => {
        expect(components[0].classes['vgr-input--focused']).toBe(true);
      });
    });
  });

  describe('second input', () => {
    it('Should be the right aligned', () => {
      const wrapper = components[1].query(By.css('.inputwrapper'));
      expect(wrapper.classes['alignRight']).toBe(true);
    });
  });

  describe('third input', () => {
    let input;
    it('Should show validation error', () => {
      input = components[2];
      expect(input.classes['ng-invalid']).toBe(true);
    });

    describe('changing to a valid value', () => {
      it('should be valid', fakeAsync(() => {
        testComponent.values[2] = 'hej';
        console.log(testComponent.values);
        tick();
        fixture.detectChanges();
        console.log(components[2].nativeElement.outerHTML);
        expect(input.classes['ng-invalid']).toBe(false);
      }));
    });
  });

});
