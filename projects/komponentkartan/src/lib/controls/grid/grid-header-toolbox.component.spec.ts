import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeaderToolboxComponent } from './grid-header-toolbox.component';

describe('GridHeaderToolboxComponent', () => {
  let component: GridHeaderToolboxComponent;
  let fixture: ComponentFixture<GridHeaderToolboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridHeaderToolboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridHeaderToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
