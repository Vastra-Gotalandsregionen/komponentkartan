import { async, ComponentFixture, fakeAsync, TestBed, tick, waitForAsync } from '@angular/core/testing';

import { SortArrowComponent } from './sort-arrow.component';
import { IconComponent } from '../icon/icon.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconModule } from '../icon/icon.module';

xdescribe('SortArrowComponent', () => {
  let component: SortArrowComponent;
  let fixture: ComponentFixture<SortArrowComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ FontAwesomeModule, IconModule ],
      declarations: [ SortArrowComponent, IconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(SortArrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    tick(400);
    fixture.detectChanges();
    tick(Infinity);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
