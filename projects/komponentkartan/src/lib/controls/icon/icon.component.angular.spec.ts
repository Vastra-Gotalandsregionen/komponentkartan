import { provideZoneChangeDetection, NgModule } from "@angular/core";
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { IconComponent } from './icon.component';
import { IconModule } from './icon.module';

@NgModule({ providers: [ provideZoneChangeDetection() ] })
export class ZoneChangeDetectionModule {}


describe('IconComponent', () => {
  let component: IconComponent;
  let fixture: ComponentFixture<IconComponent>;

  beforeEach((done) => {
    TestBed.resetTestEnvironment();
    TestBed.initTestEnvironment([ZoneChangeDetectionModule, BrowserDynamicTestingModule], platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false }
});
    TestBed.configureTestingModule({
      declarations: [IconComponent],
      imports: [FontAwesomeModule, IconModule]
    });

    TestBed.compileComponents().then(() => {
      fixture = TestBed.createComponent(IconComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();

      done();
    });
  });
});