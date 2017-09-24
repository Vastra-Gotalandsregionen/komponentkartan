import { Component, HostListener, HostBinding, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NotificationType } from '../../models/notificationType.model';
import { NotificationIcon } from '../../models/notificationIcon.model';
import { RowNotification } from '../../models/rowNotification.model';
import { ExpandableContainerJqeuryHelper } from './expandableContainerJqueryHelper';

@Component({
    templateUrl: './expandableContainer.component.html',
    selector: 'vgr-expandable-container',
    moduleId: module.id
})
export class ExpandableContainerComponent implements OnInit {
    // För att kunna binda till Enum värde i markup
    public NotificationIcons = NotificationIcon;

    readonly showNotificationDurationMs = 1500;
    @HostBinding('class.expandable-container') isContainer = true;
    @HostBinding('class.expandable-container--collapsed') collapsed = true;
    @HostBinding('class.expandable-container--expanded') private _expanded: boolean;
    @HostBinding('class.expandable-container--deleted') deleted: boolean;
    @HostBinding('class.expandable-container--notification-visible') notificationVisible: boolean;
    @HostBinding('class.expandable-container--collapsing') collapsing: boolean;

    @Input() set expanded(expandedValue: boolean) {
        if (expandedValue) {
            this.expand();
        } else {
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

    constructor(private elementRef: ElementRef, private changeDetecor: ChangeDetectorRef, private jqueryHelper: ExpandableContainerJqeuryHelper) {

    }

    ngOnInit() {
        if (this.notification && this.notification.type === NotificationType.Permanent) {
            this.showNotification();
        }
    }

    showNotification() {
        this.notificationVisible = true;
    }

    @HostListener('click', ['$event'])
    toggleExpand(event: Event) {
        if (this.collapsing) {
            return;
        }

        if (!this.jqueryHelper.isClickEventHeader(event)) {
            return;
        }

        if (!this._expanded) {
            this.expand();
        } else {
            this.collapse();
        }
        event.cancelBubble = true;
    }

    private expand() {
        if (this.deleted || this.collapsing) {
            return;
        }
        this.jqueryHelper.toggleContent(this.elementRef);
        this._expanded = true;
        this.collapsed = false;

        this.expandedChanged.emit(this._expanded);
    }

    private collapse(notificationToShow?: NotificationType) {
        this.collapsing = true;
        const header = this.jqueryHelper.getHeader(this.elementRef);

        if (notificationToShow) {
            this.processNotification(header, notificationToShow, () => {
                this._expanded = false;
                this.collapsed = true;
                this.expandedChanged.emit(this._expanded);
                this.collapsing = false;
            });
        } else {
            this.jqueryHelper.collapseContent(header, () => {
                this._expanded = false;
                this.collapsed = true;
                this.collapsing = false;
                this.expandedChanged.emit(this._expanded);
            });
        }
    }


    private processNotification(header: JQuery, notificationType: NotificationType, callback: Function): void {
        if (notificationType === NotificationType.ShowOnCollapse) {
            this.processShowOnCollapseNotification(header, callback);
        } else if (notificationType === NotificationType.ShowOnRemove) {
            this.processShowOnRemoveNotification(header, callback);
        };
    }

    private processShowOnCollapseNotification(header: JQuery, callback: Function) {
        this.notificationVisible = true;
        setTimeout(() => {
            this.jqueryHelper.collapseContent(header, () => {
                setTimeout(() => {
                    this.notification.done = true;
                    this.notificationVisible = false;
                    callback();
                }, 2000)
            });
        }, 1400);

    }

    private processShowOnRemoveNotification(header: JQuery, callback: Function) {
        this.notificationVisible = true;
        setTimeout(() => {
            this.jqueryHelper.collapseContent(header, () => {
                setTimeout(() => {
                    this.notification.done = true;
                    this.notificationVisible = false;
                    this.deleted = true;
                    callback();
                }, 2000)
            });
        }, 1400);
    }
}
