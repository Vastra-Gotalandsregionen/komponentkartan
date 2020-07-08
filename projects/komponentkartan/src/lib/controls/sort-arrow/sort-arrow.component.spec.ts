import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortArrowComponent } from './sort-arrow.component';

describe('SortArrowComponent', () => {
  let component: SortArrowComponent;
  let fixture: ComponentFixture<SortArrowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SortArrowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
