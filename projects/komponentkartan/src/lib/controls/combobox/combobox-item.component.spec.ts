import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxItemComponent } from './combobox-item.component';

describe('ComboboxItemComponent', () => {
  let component: ComboboxItemComponent;
  let fixture: ComponentFixture<ComboboxItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComboboxItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComboboxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
