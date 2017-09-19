
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RowNotification } from '../../component-package/models/rowNotification.model';
import { NotificationIcon } from '../../component-package/models/notificationIcon.model';
import { NotificationType } from '../../component-package/models/notificationType.model';

import { ExpandableContainerComponent } from '../../component-package/controls/expandableContainer/expandableContainer.component';


describe('ExpandableContainerComponent', () => {
    let component: ExpandableContainerComponent;
    let fixture: ComponentFixture<ExpandableContainerComponent>;
    let rootElement: DebugElement;


    beforeEach((done) => {
        TestBed.resetTestEnvironment();
        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
        TestBed.configureTestingModule({
            declarations: [ExpandableContainerComponent],
            imports: [CommonModule]
        });

        TestBed.overrideComponent(ExpandableContainerComponent, {
            set: {
                templateUrl: './expandableContainer.component.html'
            }
        });

        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(ExpandableContainerComponent);
            component = fixture.componentInstance;
            rootElement = fixture.debugElement;
            fixture.detectChanges();
            done();
        });
    });

    describe('When initialized, ', () => {
        beforeEach(() => {
            component.ngOnInit();
        });
        it('the component has the expandable-container class', () => {
            expect(rootElement.classes['expandable-container']).toBe(true);
        });

        describe('When the component is expanding,', () => {
            beforeEach(() => {
                component.expand();
            });

            it('the components property expanded is set to true', () => {
                expect(component.expanded).toBe(true);
            });

        });
        describe('When the component is collapsing,', () => {
            beforeEach(() => {
                component.notification = { message: 'Permanent', icon: NotificationIcon.ExclamationRed, type: NotificationType.ShowOnCollapse } as RowNotification;
                component.expanded = true;
                component.notification.done = false;
                component.collapse();
            });

            it('the components property expanded is set to false', () => {
                expect(component.expanded).toBe(false);
            });

            it('and the components property collapse is set to true', () => {
                expect(component.collapsed).toBe(true);
            });
        });
    });
});
