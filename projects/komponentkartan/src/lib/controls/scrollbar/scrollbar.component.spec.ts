import { ScrollingModule } from '@angular/cdk/scrolling';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgScrollbarModule } from 'ngx-scrollbar';

import { ScrollbarComponent } from './scrollbar.component';

describe('ScrollbarComponent', () => {
  let component: ScrollbarComponent;
  let fixture: ComponentFixture<ScrollbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScrollbarComponent ],
      imports: [ ScrollingModule, NgScrollbarModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScrollbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
