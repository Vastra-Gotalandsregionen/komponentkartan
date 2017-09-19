import { Component, HostListener, HostBinding, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NotificationType } from '../../models/notificationType.model';
import { NotificationIcon } from '../../models/notificationIcon.model';
import { RowNotification } from '../../models/rowNotification.model';



@Component({
    templateUrl: './expandableContainer.component.html',
    selector: 'vgr-expandable-container',
    moduleId: module.id
})
export class ExpandableContainerComponent implements OnInit {
    // För att kunna binda till Enum värde i markup
    public NotificationIcons = NotificationIcon;

    @HostBinding('class.expandable-container') isContainer = true;
    @HostBinding('class.expandable-container--collapsed') collapsed = true;
    @HostBinding('class.expandable-container--expanded') private _expanded: boolean;
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

    }

    ngOnInit() {
        if (this.notification && this.notification.type === NotificationType.Permanent) {
            this.showNotification();
        }
    }

    showNotification() {
        const header = this.getHeader();
        header.siblings('.expandable-container__notification-wrapper').show();
    }

    @HostListener('click', ['$event'])
    toggleExpand(event: Event) {
        if (!this.isClickEventHeader(event)) {
            return;
        }
        if (!this._expanded) {
            this.expand();
        } else {
            this.collapse();
        }
        event.cancelBubble = true;
    }

    expand() {
        if (this._expanded) {
            return;
        }
        const header = this.getHeader();
        header.siblings('.expandable-container__content').slideToggle(400);
        this._expanded = true;
        this.collapsed = false;

        this.expandedChanged.emit(this._expanded);
    }

    collapse() {
        if (!this._expanded) {
            return;
        }
        const header = this.getHeader();
        const showNotificationOnCollapse = this.notification && this.notification.type === NotificationType.ShowOnCollapse && !this.notification.done;
        if (showNotificationOnCollapse) {
            header.siblings('.expandable-container__notification-wrapper').fadeIn();
        }
        header.siblings('.expandable-container__content').slideUp(400, () => {
            if (showNotificationOnCollapse && !this.notification.done) {
                setTimeout(() => {
                    header.siblings('.expandable-container__notification-wrapper').slideUp(400);
                    this.notification.done = true;
                }, 1500);
            }
        });
        this._expanded = false;
        this.collapsed = true;
        this.expandedChanged.emit(this._expanded);
    }



    private getHeader(): JQuery {
        return $(this.elementRef.nativeElement).children('.expandable-container__header');
    }

    private isClickEventHeader(event: Event): boolean {
        const target = event.target || event.srcElement || event.currentTarget;
        const clickedElement = $(target);

        if (clickedElement.hasClass('expandable-container__header')) {
            return true;
        }
        if (clickedElement.hasClass('expandable-container__notification')) {
            return true;
        }
        if (clickedElement.parent('.expandable-container__header').length > 0) {
            return true;
        }
        if (clickedElement.parent('.expandable-container__notification').length > 0) {
            return true;
        }
        return false;
    }
}
