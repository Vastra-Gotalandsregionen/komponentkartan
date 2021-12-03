import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadiobuttonItemComponent } from './radiobutton-item.component';

describe('RadiobuttonItemComponent', () => {
  let component: RadiobuttonItemComponent;
  let fixture: ComponentFixture<RadiobuttonItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadiobuttonItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadiobuttonItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
