import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ColoursComponent } from './colours.component';

describe('ColoursComponent', () => {
  let component: ColoursComponent;
  let fixture: ComponentFixture<ColoursComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColoursComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
