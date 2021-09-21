import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComboboxItemComponent } from './combobox-item.component';

describe('[ComboboxItemComponent - Angular]', () => {
  let component: ComboboxItemComponent;
  let fixture: ComponentFixture<ComboboxItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ComboboxItemComponent ]
    });
    fixture = TestBed.createComponent(ComboboxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
