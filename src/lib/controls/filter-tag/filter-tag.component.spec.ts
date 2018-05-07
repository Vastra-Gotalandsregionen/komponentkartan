import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterTagComponent } from './filter-tag.component';

describe('FilterTagComponent', () => {
  let component: FilterTagComponent;
  let fixture: ComponentFixture<FilterTagComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterTagComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
