import { TestBed, async } from '@angular/core/testing';
import { KomponentkartanApplicationComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppModule } from './app.module';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [KomponentkartanApplicationComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  });
  it('should create the app', () => {
    const fixture = TestBed.createComponent(KomponentkartanApplicationComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
