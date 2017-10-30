import {
    Component, HostListener, HostBinding, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, ContentChildren, QueryList,
    AfterContentInit
} from '@angular/core';
import { NotificationType } from '../../models/notificationType.model';
import { NotificationIcon } from '../../models/notificationIcon.model';
import { RowNotification } from '../../models/rowNotification.model';
import { ListItemJqeuryHelper } from './listItemJqueryHelper';
import { ListColumnComponent } from '../list/list-column.component';
import { ListColumnHeaderComponent } from '../list/list-column-header.component';
import { ListHeaderComponent } from '../list/list-header.component';

@Component({
    templateUrl: './list-item.component.html',
    selector: 'vgr-list-item',
    moduleId: module.id
})
export class ListItemComponent implements OnInit, AfterContentInit {
    // För att kunna binda till Enum värde i markup
    public NotificationIcons = NotificationIcon;

    readonly showNotificationDurationMs = 1500;
    @HostBinding('class.list-item') isContainer = true;
    @HostBinding('class.list-item--collapsed') collapsed = true;
    @HostBinding('class.list-item--expanded') private _expanded: boolean;
    @HostBinding('class.list-item--deleted') deleted: boolean;
    @HostBinding('class.list-item--notification-visible') notificationVisible: boolean;
    @HostBinding('class.list-item--not-interactable') notInteractable: boolean;

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

    @ContentChildren(ListColumnComponent) columns: QueryList<ListColumnComponent>;

    constructor(private elementRef: ElementRef, private changeDetecor: ChangeDetectorRef, private jqueryHelper: ListItemJqeuryHelper) {

    }

    ngOnInit() {
        if (this.notification && this.notification.type === NotificationType.Permanent) {
            this.showNotification();
        }
    }

    copyPropertiesFromHeader(header: ListHeaderComponent) {
        this.columns.forEach((column, index) => {
            header.applyToColumn(column, index);
        });
    }

    ngAfterContentInit() {

    }

    showNotification() {
        this.notificationVisible = true;
    }

    @HostListener('click', ['$event'])
    toggleExpand(event: Event) {
        if (this.notInteractable) {
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
        if (this.deleted || this.notInteractable) {
            return;
        }
        this.jqueryHelper.toggleContent(this.elementRef);
        this._expanded = true;
        this.collapsed = false;

        this.expandedChanged.emit(this._expanded);
    }

    private collapse(collapsingNotification?: NotificationType) {
        this.notInteractable = true;
        const header = this.jqueryHelper.getHeader(this.elementRef);

        if (collapsingNotification) {
            this.processNotification(header, collapsingNotification, () => {

            });
        } else {
            this.jqueryHelper.collapseContent(header, () => {
                this._expanded = false;
                this.collapsed = true;
                this.notInteractable = false;
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
                this._expanded = false;
                this.collapsed = true;
                this.expandedChanged.emit(this._expanded);
                setTimeout(() => {
                    this.notification.done = true;
                    this.notificationVisible = false;
                    this.notInteractable = false;
                }, 2000)
            });
        }, 1400);

    }

    private processShowOnRemoveNotification(header: JQuery, callback: Function) {
        this.notificationVisible = true;
        setTimeout(() => {
            this.jqueryHelper.collapseContent(header, () => {
                this._expanded = false;
                this.collapsed = true;
                this.expandedChanged.emit(this._expanded);
                setTimeout(() => {
                    this.notification.done = true;
                    this.notificationVisible = false;
                    this.notInteractable = false;
                    this.deleted = true;
                }, 2000)
            });
        }, 1400);
    }
}
