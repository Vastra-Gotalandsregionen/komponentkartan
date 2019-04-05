import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatepickerItemComponent } from './datepicker-item.component';

describe('DatepickerItemComponent', () => {
  let component: DatepickerItemComponent;
  let fixture: ComponentFixture<DatepickerItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatepickerItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatepickerItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
