import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputfieldsComponent } from './inputfields.component';

describe('InputfieldsComponent', () => {
  let component: InputfieldsComponent;
  let fixture: ComponentFixture<InputfieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputfieldsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputfieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
