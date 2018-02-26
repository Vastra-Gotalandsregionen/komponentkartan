import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListexampleComponent } from './listexample.component';

describe('ListexampleComponent', () => {
  let component: ListexampleComponent;
  let fixture: ComponentFixture<ListexampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListexampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
