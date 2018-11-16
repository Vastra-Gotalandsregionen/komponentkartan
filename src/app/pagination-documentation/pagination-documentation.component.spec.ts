import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationDocumentationComponent } from './pagination-documentation.component';

describe('PaginationDocumentationComponent', () => {
  let component: PaginationDocumentationComponent;
  let fixture: ComponentFixture<PaginationDocumentationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginationDocumentationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationDocumentationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
