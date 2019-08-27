import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridDocumentationComponent } from './grid-documentation.component';

describe('GridDocumentationComponent', () => {
  let component: GridDocumentationComponent;
  let fixture: ComponentFixture<GridDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
