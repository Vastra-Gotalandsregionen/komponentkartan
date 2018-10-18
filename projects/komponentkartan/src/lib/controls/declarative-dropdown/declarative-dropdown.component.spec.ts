import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeclarativeDropdownComponent } from './declarative-dropdown.component';

describe('DeclarativeDropdownComponent', () => {
  let component: DeclarativeDropdownComponent;
  let fixture: ComponentFixture<DeclarativeDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeclarativeDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeclarativeDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
