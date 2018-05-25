import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RingWithTextComponent } from './ring-with-text.component';


describe('RingWithTextComponent', () => {
  let component: RingWithTextComponent;
  let fixture: ComponentFixture<RingWithTextComponent>;
  let rootElement: DebugElement;
  let circleElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RingWithTextComponent ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RingWithTextComponent);
    component = fixture.componentInstance;
    rootElement = fixture.debugElement;
    component.text = 'HE';

    fixture.detectChanges();

    circleElement = rootElement.query(By.css('.ring-with-text'));
  });

  it('circle color is set', () => {
    component.circleColor = 'red';
    fixture.detectChanges();

    expect(circleElement.nativeElement.style.backgroundColor).toBe('red');
  });
  it('size is small by default', () => {
    expect(circleElement.classes['ring-with-text--small']).toBe(true);
  });
  it('size is set to large', () => {
    component.size = 'large';
    component.ngOnInit();
    fixture.detectChanges();

    expect(circleElement.classes['ring-with-text--large']).toBe(true);
  });
  // it('not loaded if no text is provided', () => {
  //   // component.text = 'vj';
  //   // fixture.detectChanges();
  //   console.log(circleElement);

  //   expect(rootElement.query(By.css('.ring-with-text'))).toBeUndefined();
  // });
});
