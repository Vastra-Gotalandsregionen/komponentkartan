import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SortArrowComponent } from './sort-arrow.component';
import { IconComponent } from '../icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconModule } from '../icon/icon.module';

describe('SortArrowComponent', () => {
  let component: SortArrowComponent;
  let fixture: ComponentFixture<SortArrowComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FontAwesomeModule, IconModule ],
      declarations: [ SortArrowComponent, IconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SortArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
