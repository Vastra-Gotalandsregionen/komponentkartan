import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArvidComponent } from './arvid.component';

describe('ArvidComponent', () => {
  let component: ArvidComponent;
  let fixture: ComponentFixture<ArvidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArvidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArvidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
