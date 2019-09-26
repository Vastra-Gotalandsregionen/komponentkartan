import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import { IconModule } from '../icon/icon.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IconComponent } from '../icon/icon.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DebugElement, Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'vgr-test',
  template: `
  <vgr-notification>Med default-klass</vgr-notification>
  <vgr-notification type="error">Med error-klass</vgr-notification>
  <vgr-notification type="success" [autoAddTypeIcons]="true">Med success-klass och ikon autoadderad</vgr-notification>
  `
})
export class TestComponent { }

describe('NotificationComponent', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let rootElement: DebugElement;
  let notifications: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestComponent, NotificationComponent, IconComponent ],
      imports: [IconModule, FontAwesomeModule, NoopAnimationsModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    rootElement = fixture.debugElement;
    notifications = rootElement.queryAll(By.directive(NotificationComponent));
  });

  describe('Notification 1', () => {
    it('should have class "default"', () => {
      expect(notifications[0].attributes['class']).toContain('default');
    });
    it('should have text "Med default-klass"', () => {
      expect(notifications[0].nativeElement.innerText).toBe('Med default-klass');
    });
    it('should not have any icon automaticly added', () => {
      const icons = notifications[0].query(By.css('vgr-icon'));
      expect(icons).toBe(null);
    });
  });

  describe('Notification 2', () => {
    it('should have class "error"', () => {
      expect(notifications[1].attributes['class']).toContain('error');
    });
    it('should have text "Med error-klass"', () => {
      expect(notifications[1].nativeElement.innerText).toBe('Med error-klass');
    });
    it('should not have any icon automaticly added', () => {
      const icons = notifications[1].query(By.css('vgr-icon'));
      expect(icons).toBe(null);
    });
  });

  describe('Notification 3', () => {
    it('should have class "success"', () => {
      expect(notifications[2].attributes['class']).toContain('success');
    });
    it('should have text "Med success-klass och ikon autoadderad"', () => {
      expect(notifications[2].nativeElement.innerText).toBe('Med success-klass och ikon autoadderad');
    });
    it('should have icon automaticly added', () => {
      const icons = notifications[2].query(By.css('vgr-icon'));
      expect(icons).toBeTruthy();
    });
  });
});
