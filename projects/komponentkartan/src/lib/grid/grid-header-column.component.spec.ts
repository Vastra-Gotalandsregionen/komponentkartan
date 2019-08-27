import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeaderColumnComponent } from './grid-header-column.component';

describe('GridHeaderColumnComponent', () => {
  let component: GridHeaderColumnComponent;
  let fixture: ComponentFixture<GridHeaderColumnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridHeaderColumnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridHeaderColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
