import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownItemComponent } from './dropdown-item.component';

describe('DropdownItemComponent', () => {
  let component: DropdownItemComponent;
  let fixture: ComponentFixture<DropdownItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
