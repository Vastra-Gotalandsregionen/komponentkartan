import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RingWithTextComponent } from './ring-with-text.component';

describe('RingWithTextComponent', () => {
  let component: RingWithTextComponent;
  let fixture: ComponentFixture<RingWithTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RingWithTextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RingWithTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
