import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabButtonGroupComponent } from './tab-button-group.component';

describe('TabButtonGroupComponent', () => {
  let component: TabButtonGroupComponent;
  let fixture: ComponentFixture<TabButtonGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabButtonGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabButtonGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
