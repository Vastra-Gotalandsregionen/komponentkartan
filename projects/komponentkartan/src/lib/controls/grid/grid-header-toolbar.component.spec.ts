import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeaderToolbarComponent } from './grid-header-toolbar.component';

describe('GridHeaderToolbarComponent', () => {
  let component: GridHeaderToolbarComponent;
  let fixture: ComponentFixture<GridHeaderToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GridHeaderToolbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridHeaderToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
