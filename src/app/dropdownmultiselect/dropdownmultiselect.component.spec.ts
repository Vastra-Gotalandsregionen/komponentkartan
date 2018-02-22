import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DropdownmultiselectComponent } from './dropdownmultiselect.component';

describe('DropdownmultiselectComponent', () => {
  let component: DropdownmultiselectComponent;
  let fixture: ComponentFixture<DropdownmultiselectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DropdownmultiselectComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownmultiselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
