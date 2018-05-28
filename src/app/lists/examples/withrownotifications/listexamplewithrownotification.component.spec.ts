import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListexamplewithrownotificationComponent } from './listexamplewithrownotification.component';

describe('ListexampleComponent', () => {
  let component: ListexamplewithrownotificationComponent;
  let fixture: ComponentFixture<ListexamplewithrownotificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListexamplewithrownotificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListexamplewithrownotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
