import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabStartComponent } from './tab-start.component';

describe('TabStartComponent', () => {
  let component: TabStartComponent;
  let fixture: ComponentFixture<TabStartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabStartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TabStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
