import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BacktotopComponent } from './backtotop.component';

describe('BacktotopComponent', () => {
  let component: BacktotopComponent;
  let fixture: ComponentFixture<BacktotopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BacktotopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BacktotopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
