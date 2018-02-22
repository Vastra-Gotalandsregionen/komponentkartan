import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BacktotopComponent } from './backtotop.component';

describe('BacktotopComponent', () => {
  let component: BacktotopComponent;
  let fixture: ComponentFixture<BacktotopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BacktotopComponent],
      schemas: [NO_ERRORS_SCHEMA]
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
