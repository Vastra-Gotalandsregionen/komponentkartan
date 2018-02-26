import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LockbuttonComponent } from './lockbutton.component';

describe('LockbuttonComponent', () => {
  let component: LockbuttonComponent;
  let fixture: ComponentFixture<LockbuttonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LockbuttonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LockbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
