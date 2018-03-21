import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamplesListwithlistsComponent } from './examples-listwithlists.component';

describe('ExamplesListwithcardsComponent', () => {
  let component: ExamplesListwithlistsComponent;
  let fixture: ComponentFixture<ExamplesListwithlistsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ExamplesListwithlistsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamplesListwithlistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
