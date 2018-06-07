import { Component, HostListener, HostBinding, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, AfterContentInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { NotificationType } from '../../models/notificationType.model';
import { RowNotification } from '../../models/rowNotification.model';

@Component({
    templateUrl: './action-panel.component.html',
    selector: 'vgr-action-panel',
    animations: [
        trigger(
            'enterAnimation', [
                transition(':enter', [
                    style({ opacity: 0 }),
                    animate('400ms', style({ opacity: 1 }))
                ]),
                transition(':leave', [
                    style({ opacity: 1 }),
                    animate('400ms', style({ opacity: 0 }))
                ])
            ]
        )
    ]
})
export class ActionPanelComponent implements OnInit, AfterContentInit {

    readonly showNotificationDurationMs = 1500;
    private actualContentHeight: string;
    private pageHeaderHeight: number;

    @HostBinding('class.action-panel') isContainer = true;
    @HostBinding('class.action-panel--collapsed') collapsed = true;
    @HostBinding('class.action-panel--expanded') _expanded: boolean;
    @HostBinding('class.action-panel--deleted') deleted: boolean;
    @HostBinding('class.action-panel--notification-visible') notificationVisible: boolean;
    @HostBinding('class.action-panel--not-interactable') notInteractable: boolean;

    @Input() showCloseButton: boolean;

    @Input() title: string;
    @Input() expansionSpeed: 'slow' | 'normal' | 'fast' | 'noanimation';
    get animationDelayMs(): number {
        if (this.expansionSpeed === 'slow') {
            return 1000;
        } else if (this.expansionSpeed === 'fast') {
            return 300;
        } else if (this.expansionSpeed === 'noanimation') {
            return 0;
        } else {
            return 600;
        }
    }
    @HostBinding('class.action-panel--slow') get slow() {
        return this.expansionSpeed === 'slow';
    }
    @HostBinding('class.action-panel--fast') get fast() {
        return this.expansionSpeed === 'fast';
    }
    @HostBinding('class.action-panel--noanimation') get noanimation() {
        return this.expansionSpeed === 'noanimation';
    }

    @Input() set expanded(expandedValue: boolean) {
        // this.elementRef.nativeElement.style.opacity = 0;

        if (expandedValue && !this._expanded) {
            this.expand();
        } else if (!expandedValue && this._expanded) {
            this.collapse();
        }
    }
    get expanded(): boolean {
        return this._expanded;
    }
    @Output() expandedChanged: EventEmitter<boolean> = new EventEmitter<boolean>();
    @Output() notificationChanged: EventEmitter<RowNotification> = new EventEmitter<RowNotification>();

    private _notification: RowNotification;
    @Input() set notification(value: RowNotification) {
        this._notification = value;
        if (value) {
            if (value.type === NotificationType.ShowOnCollapse) {
                this.collapse(value.type);
                this.changeDetecor.detectChanges();
            } else if (value.type === NotificationType.ShowOnRemove) {
                this.collapse(value.type);
                this.changeDetecor.detectChanges();
            } else if (value.type === NotificationType.Permanent) {
                this.showNotification();
            }
        }
        this.notificationChanged.emit(value);
    }
    get notification(): RowNotification {
        return this._notification;
    }

    constructor(private elementRef: ElementRef, private changeDetecor: ChangeDetectorRef) {
        this.pageHeaderHeight = 0;
    }

    ngAfterContentInit() {
        this.updateActualContentHeight();
    }

    private updateActualContentHeight() {
        this.actualContentHeight = this.elementRef.nativeElement.scrollHeight + 'px';
    }

    public setPageHeaderHeight(height: number) {
        this.pageHeaderHeight = height;
        this.elementRef.nativeElement.style.top = height + 'px';
    }

    ngOnInit() {
        if (this.notification && this.notification.type === NotificationType.Permanent) {
            this.showNotification();
        }
    }

    showNotification() {
        this.notificationVisible = true;
    }

    private expand() {
        if (this.deleted || this.notInteractable) {
            return;
        }
        this.updateActualContentHeight();
        this.elementRef.nativeElement.style.height = this.actualContentHeight;
        this._expanded = true;
        this.collapsed = false;
        this.expandedChanged.emit(this._expanded);
        setTimeout(() => {
            this.elementRef.nativeElement.style.height = 'auto';
            this.elementRef.nativeElement.style.overflow = 'visible';
        }, this.animationDelayMs);
    }

    private collapse(collapsingNotification?: NotificationType) {
        this.updateActualContentHeight();
        this.elementRef.nativeElement.style.height = this.actualContentHeight;
        this._expanded = false;
        this.collapsed = true;
        this.expandedChanged.emit(false);
        setTimeout(() => {
            this.elementRef.nativeElement.style.height = '0px';
            this.elementRef.nativeElement.style.overflow = 'hidden';
        }, 50);
    }

    private processNotification(notificationType: NotificationType, callback: Function): void {
        if (notificationType === NotificationType.ShowOnCollapse) {
            this.processShowOnCollapseNotification(callback);
        } else if (notificationType === NotificationType.ShowOnRemove) {
            this.processShowOnRemoveNotification(callback);
        }
    }

    private processShowOnCollapseNotification(callback: Function) {
        this.notificationVisible = true;
    }

    private processShowOnRemoveNotification(callback: Function) {
        this.notificationVisible = true;
    }
}
