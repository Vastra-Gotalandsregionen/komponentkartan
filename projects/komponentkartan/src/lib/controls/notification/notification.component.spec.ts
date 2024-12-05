import { ComponentFixture, TestBed } from '@angular/core/testing';

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
  <vgr-notification>Utan klass och utan ikon</vgr-notification>
  <vgr-notification type="success">Med success-klass</vgr-notification>
  <vgr-notification type="error" [standalone]="true">Med error & standalone-klass, och ikon autoadderad</vgr-notification>
  <vgr-notification type="warning" [standalone]="true" [noIcon]="true">Med warning & standalone-klass, ingen ikon</vgr-notification>
  <vgr-notification type="info" [standalone]="true" width="100px">Med info & standalone-klass, ikon autoadderad och bredd satt</vgr-notification>
  `,
    standalone: false
})
export class TestComponent { }

describe('[NotificationComponent]', () => {
  let fixture: ComponentFixture<TestComponent>;
  let rootElement: DebugElement;
  let notifications: DebugElement[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, NotificationComponent, IconComponent],
      imports: [IconModule, FontAwesomeModule, NoopAnimationsModule]
    })
      .compileComponents();
    fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();
    rootElement = fixture.debugElement;
    notifications = rootElement.queryAll(By.directive(NotificationComponent));
  });

  describe('Notification 1', () => {
    it('should have not have any class"', () => {
      let classes: string[] = notifications[0].attributes['class'].split(' ');
      const ignoredClasses: string[] = ['ng-trigger', 'ng-trigger-toggleFadedState', 'ng-animating'];
      classes = classes.filter(cssClass => !ignoredClasses.includes(cssClass));
      expect(classes.length).toBe(0);
    });
    it('should have text "Utan klass och utan ikon"', () => {
      expect(notifications[0].nativeElement.innerText).toBe('Utan klass och utan ikon');
    });
    it('should not have any icon automaticly added', () => {
      const icons = notifications[0].query(By.css('vgr-icon'));
      expect(icons).toBe(null);
    });
  });

  describe('Notification 2', () => {
    it('should have class "success"', () => {
      expect(notifications[1].attributes['class']).toContain('success');
    });
    it('should have text "Med success-klass"', () => {
      expect(notifications[1].nativeElement.innerText).toBe('Med success-klass');
    });
    it('should have any icon automaticly added', () => {
      const icons = notifications[1].query(By.css('vgr-icon'));
      expect(icons).toBeTruthy();
    });
  });

  describe('Notification 3', () => {
    it('should have class "error"', () => {
      expect(notifications[2].attributes['class']).toContain('error');
    });
    it('should have class "standalone-notification"', () => {
      expect(notifications[2].attributes['class']).toContain('standalone-notification');
    });
    it('should have text "Med error & standalone-klass, och ikon autoadderad"', () => {
      expect(notifications[2].nativeElement.innerText).toBe('Med error & standalone-klass, och ikon autoadderad');
    });
    it('should have icon automaticly added', () => {
      const icons = notifications[2].query(By.css('vgr-icon'));
      expect(icons).toBeTruthy();
    });
  });

  describe('Notification 4', () => {
    it('should have class "warning"', () => {
      expect(notifications[3].attributes['class']).toContain('warning');
    });
    it('should have class "standalone-notification"', () => {
      expect(notifications[3].attributes['class']).toContain('standalone-notification');
    });
    it('should have text "Med warning & standalone-klass, ingen ikon"', () => {
      expect(notifications[3].nativeElement.innerText).toBe('Med warning & standalone-klass, ingen ikon');
    });
    it('should not have any icon automaticly added', () => {
      const icons = notifications[3].query(By.css('vgr-icon'));
      expect(icons).toBe(null);
    });
  });

  describe('Notification 5', () => {
    it('should have class "info"', () => {
      expect(notifications[4].attributes['class']).toContain('info');
    });
    it('should have class "standalone-notification"', () => {
      expect(notifications[4].attributes['class']).toContain('standalone-notification');
    });
    it('should have width "100px"', () => {
      expect(notifications[4].attributes['style']).toContain('width: 100px;');
    });
    it('should have text "Med info & standalone-klass, ikon autoadderad och bredd satt"', () => {
      expect(notifications[4].nativeElement.innerText).toBe('Med info & standalone-klass, ikon autoadderad och bredd satt');
    });
    it('should have icon automaticly added', () => {
      const icons = notifications[4].query(By.css('vgr-icon'));
      expect(icons).toBeTruthy();
    });
  });
});
