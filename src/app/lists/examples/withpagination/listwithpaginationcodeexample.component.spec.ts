import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListwithpaginationcodeexampleComponent } from './listwithpaginationcodeexample.component';

describe('ListwithpaginationcodeexampleComponent', () => {
  let component: ListwithpaginationcodeexampleComponent;
  let fixture: ComponentFixture<ListwithpaginationcodeexampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListwithpaginationcodeexampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListwithpaginationcodeexampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
