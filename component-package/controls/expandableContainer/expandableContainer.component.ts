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
                this.expanded = false;
                this.changeDetecor.detectChanges();
            } else if (value.type === NotificationType.ShowOnRemove) {
                this.expanded = false;
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
        const header = this.jqueryHelper.getHeader(this.elementRef);
        this.jqueryHelper.showNotification(header);
    }

    @HostListener('click', ['$event'])
    toggleExpand(event: Event) {
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
        if (this._expanded || this.deleted) {
            return;
        }
        this.jqueryHelper.toggleContent(this.elementRef);
        this._expanded = true;
        this.collapsed = false;

        this.expandedChanged.emit(this._expanded);
    }

    private collapse() {
        if (!this._expanded) {
            return;
        }
        const header = this.jqueryHelper.getHeader(this.elementRef);

        if (!this.processNotification(header, () => {
            this._expanded = false;
            this.collapsed = true;
            this.expandedChanged.emit(this._expanded);
        })) {
            this.jqueryHelper.collapseContent(header);
            this._expanded = false;
            this.collapsed = true;
            this.expandedChanged.emit(this._expanded);
        }



    }

    private processNotification(header: JQuery, callback: Function): boolean {
        if (!this.notification || this.notification.done) {
            return false;
        }
        if (this.notification.type === NotificationType.ShowOnCollapse) {

            this.processShowOnCollapseNotification(header, callback);
            return true;
        } else if (this.notification.type === NotificationType.ShowOnRemove) {
            this.processShowOnRemoveNotification(header, callback);
            return true;
        };
    }

    private processShowOnCollapseNotification(header: JQuery, callback: Function) {
        this.jqueryHelper.slideDownNotification(header, () => {
            setTimeout(() => {
                this.jqueryHelper.collapseContent(header, () => {
                    setTimeout(() => {
                        this.jqueryHelper.collapseNotification(header);
                        this.notification.done = true;
                        callback();
                    }, 2000)
                });
            }, 1000);
        });

    }

    private processShowOnRemoveNotification(header: JQuery, callback: Function) {
        this.jqueryHelper.slideDownNotification(header, () => {
            setTimeout(() => {
                this.jqueryHelper.collapseContent(header, () => {
                    setTimeout(() => {
                        this.jqueryHelper.collapseHeader(this.elementRef);
                        this.notification.done = true;
                        this.deleted = true;
                        callback();
                    }, 2000)
                });
            }, 1000);
        });
    }
}

