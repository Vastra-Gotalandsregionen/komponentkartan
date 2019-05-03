import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerItemComponent } from './datepicker-item.component';

describe('[DatepickerItemComponent - Angular]', () => {
  let component: DatepickerItemComponent;
  let fixture: ComponentFixture<DatepickerItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerItemComponent ]
    });
    fixture = TestBed.createComponent(DatepickerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
