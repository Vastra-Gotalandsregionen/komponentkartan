import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltertexboxComponent } from './filtertexbox.component';

describe('FiltertexboxComponent', () => {
  let component: FiltertexboxComponent;
  let fixture: ComponentFixture<FiltertexboxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltertexboxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltertexboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
