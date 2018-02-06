import {
    Component, HostListener, HostBinding, OnInit, Input, Output, EventEmitter, ElementRef, ChangeDetectorRef, ContentChildren, ContentChild, QueryList,
    AfterContentInit, forwardRef
} from '@angular/core';
import { NotificationType } from '../../models/notificationType.model';
import { NotificationIcon } from '../../models/notificationIcon.model';
import { RowNotification } from '../../models/rowNotification.model';
import { ListItemJqeuryHelper } from './listItemJqueryHelper';
import { ListColumnComponent } from '../list/list-column.component';
import { ListColumnHeaderComponent } from '../list/list-column-header.component';
import { ListHeaderComponent } from '../list/list-header.component';
import { ListItemHeaderComponent } from '../list-item/list-item-header.component';
import { ListItemContentComponent } from '../list-item/list-item-content.component';

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
    @HostBinding('class.list-item--deleted') isDeleted: boolean;
    @HostBinding('class.list-item--notification-visible') notificationVisible: boolean;
    @HostBinding('class.list-item--not-interactable') notInteractable: boolean;
    @HostBinding('class.list-item--columns-initialized') columnsInitialized = true;

    @ContentChild(ListItemHeaderComponent) listItemHeader: ListItemHeaderComponent;
    @ContentChild(ListItemContentComponent) listContent: ListItemContentComponent;

    @Input() set expanded(expandedValue: boolean) {
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
    @Output() deleted: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnFirstRow: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnLastRow: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnPreviousRow: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnNextRow: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnPreviousRowContent: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnNextRowContent: EventEmitter<any> = new EventEmitter();

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

    @ContentChildren(forwardRef(() => ListColumnComponent), { descendants: true }) columns: QueryList<ListColumnComponent>;



    constructor(private elementRef: ElementRef, private changeDetecor: ChangeDetectorRef, private jqueryHelper: ListItemJqeuryHelper) {

    }

    ngAfterContentInit() {
        this.listItemHeader.expandedChanged.subscribe(() => this.setExpandOrCollapsed());
        this.listItemHeader.goToFirst.subscribe(() => this.setFocusOnFirstRow.emit());
        this.listItemHeader.goToLast.subscribe(() => this.setFocusOnLastRow.emit());
        this.listItemHeader.goUp.subscribe(() => this.setFocusOnPreviousRow.emit());
        this.listItemHeader.goDown.subscribe(() => this.setFocusOnNextRow.emit());
        this.listContent.goUp.subscribe(() => this.setFocusOnPreviousRowContent.emit());
        this.listContent.goDown.subscribe(() => this.setFocusOnNextRowContent.emit());
    }

    ngOnInit() {
        if (this.notification && this.notification.type === NotificationType.Permanent) {
            this.showNotification();
        }
    }

    setFocusOnRow() {
        this.listItemHeader.setFocus();
    }

    // copyPropertiesFromHeader(header: ListHeaderComponent) {
    //     this.columns.forEach((column, index) => {
    //         header.applyToColumn(column, index);
    //     });

    //     setTimeout(() => {
    //         this.columnsInitialized = true;
    //     }, 1);
    // }


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

        this.setExpandOrCollapsed();

        event.cancelBubble = true;
    }

    public setExpandOrCollapsed() {
        if (!this._expanded) {
            this.expand();
        } else {
            this.collapse();
        }
    }
    private expand() {
        if (this.isDeleted || this.notInteractable) {
            return;
        }
        this.jqueryHelper.toggleContent(this.elementRef);

        const expandedChanged = !this._expanded;
        this._expanded = true;
        this.collapsed = false;

        if (expandedChanged) {
            this.expandedChanged.emit(this._expanded);
        }
    }

    private collapse(collapsingNotification?: NotificationType) {
        this.notInteractable = true;
        const header = this.jqueryHelper.getHeader(this.elementRef);

        if (collapsingNotification) {
            this.processNotification(header, collapsingNotification, () => {

            });
        } else {
            this.jqueryHelper.collapseContent(header, () => {
                const expandedChanged = this._expanded;
                this._expanded = false;
                this.collapsed = true;
                this.notInteractable = false;
                if (expandedChanged) {
                    this.expandedChanged.emit(this._expanded);
                }
            });
        }
    }

    private processNotification(header: JQuery, notificationType: NotificationType, callback: Function): void {
        if (notificationType === NotificationType.ShowOnCollapse) {
            this.processShowOnCollapseNotification(header, callback);
        } else if (notificationType === NotificationType.ShowOnRemove) {
            this.processShowOnRemoveNotification(header, callback);
        }
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
                }, 2000);
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
                    this.isDeleted = true;
                    this.deleted.emit();
                }, 2000);
            });
        }, 1400);
    }
}
