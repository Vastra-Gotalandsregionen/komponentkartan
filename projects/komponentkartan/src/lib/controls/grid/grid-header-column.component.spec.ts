import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridHeaderColumnComponent, IconComponent } from '../../index';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconModule } from '../icon/icon.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GridHeaderColumnComponent', () => {
  let component: GridHeaderColumnComponent;
  let fixture: ComponentFixture<GridHeaderColumnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GridHeaderColumnComponent, IconComponent ],
      imports: [CommonModule, BrowserAnimationsModule, FontAwesomeModule, IconModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridHeaderColumnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
