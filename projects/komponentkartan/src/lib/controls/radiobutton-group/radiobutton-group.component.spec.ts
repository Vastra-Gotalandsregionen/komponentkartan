import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiobuttonGroupComponent } from './radiobutton-group.component';

describe('RadiobuttonGroupComponent', () => {
  let component: RadiobuttonGroupComponent;
  let fixture: ComponentFixture<RadiobuttonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiobuttonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
