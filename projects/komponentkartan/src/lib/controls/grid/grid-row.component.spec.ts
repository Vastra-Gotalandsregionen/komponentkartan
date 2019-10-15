import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridRowComponent, LoaderComponent, IconComponent } from '../../index';
import { GridService } from './grid.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconModule } from '../icon/icon.module';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('GridRowComponent', () => {
  let component: GridRowComponent;
  let fixture: ComponentFixture<GridRowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GridRowComponent,
        LoaderComponent,
        IconComponent],
        imports: [CommonModule, BrowserAnimationsModule, FontAwesomeModule, IconModule],
        providers: [
          GridService
        ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
