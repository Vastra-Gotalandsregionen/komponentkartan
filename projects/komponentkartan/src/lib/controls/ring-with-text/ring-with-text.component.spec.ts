import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { RingWithTextComponent } from './ring-with-text.component';


describe('RingWithTextComponent', () => {
  let component: RingWithTextComponent;
  let fixture: ComponentFixture<RingWithTextComponent>;
  let rootElement: DebugElement;
  let circleElement: DebugElement;

  beforeEach((done) => {
    TestBed.configureTestingModule({
      declarations: [ RingWithTextComponent ]
    }).compileComponents();
    done();
  });

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

  it('text color is set', () => {
    component.textColor = 'blue';
    fixture.detectChanges();
    expect(circleElement.nativeElement.style.color).toBe('blue');
  });

  it('size is small by default', () => {
    expect(circleElement.classes['ring-with-text--small']).toBe(true);
  });

  it('size is set to large', () => {
    component.size = 'large';
    component.ngOnChanges();
    fixture.detectChanges();

    expect(circleElement.classes['ring-with-text--large']).toBe(true);
  });

  it('size is set to small', () => {
    component.size = 'small';
    component.ngOnChanges();
    fixture.detectChanges();

    expect(circleElement.classes['ring-with-text--small']).toBe(true);
  });

  it('not visible if no text provided', () => {
    component.text = '';
    component.ngOnChanges();
    fixture.detectChanges();
    expect(rootElement.children.length).toBe(0);
  });

  it('text should be max two characters long', () => {
    component.text = 'kompontentkartan';
    component.ngOnChanges();
    fixture.detectChanges();
    const localCircle = rootElement.query(By.css('.ring-with-text'));
    expect(localCircle.nativeElement.textContent).toBe('ko');
  });
});
