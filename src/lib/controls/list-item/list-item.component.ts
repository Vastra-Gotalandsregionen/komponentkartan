import {
    Component, HostListener, HostBinding, OnInit, Input, Output, EventEmitter,
    ElementRef, ChangeDetectorRef, ContentChildren, ContentChild, QueryList,
    AfterContentInit, forwardRef, ChangeDetectionStrategy
} from '@angular/core';
import { trigger, style, transition, animate, group, state, query } from '@angular/animations';

import { NotificationType } from '../../models/notificationType.model';
import { RowNotification } from '../../models/rowNotification.model';
import { ListColumnComponent } from '../list/list-column.component';
import { ListColumnHeaderComponent } from '../list/list-column-header.component';
import { ListHeaderComponent } from '../list/list-header.component';
import { ListItemHeaderComponent } from '../list-item/list-item-header.component';
import { ListItemContentComponent } from '../list-item/list-item-content.component';

@Component({
    templateUrl: './list-item.component.html',
    selector: 'vgr-list-item',
    moduleId: module.id,
    animations: [
        trigger('slideListContent', [
            state('collapsed', style({
                overflow: 'hidden',
                height: '0'
            })),
            state('expanded', style({
                overflow: 'hidden',
                height: '*'
            })),
            transition('expanded => collapsed',
                animate('400ms ease-out')
            ),
            transition('collapsed => expanded',
                animate('400ms ease-in')
            ),
        ])
    ]
})

export class ListItemComponent implements AfterContentInit {
    readonly showNotificationDurationMs = 1500;
    get stateName() {
        return this.expanded ? 'expanded' : 'collapsed';
    }
    private _expanded: boolean = false;
    @HostBinding('class.list-item') isContainer = true;
    @HostBinding('class.list-item--collapsed') collapsed = true;
    @HostBinding('class.list-item--expanded') get collapsedClass() { return !this.collapsed; }
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

    @Output() expandedChanged: EventEmitter<any> = new EventEmitter();
    @Output() notificationChanged: EventEmitter<RowNotification> = new EventEmitter<RowNotification>();
    @Output() deleted: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnFirstRow: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnLastRow: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnPreviousRow: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnNextRow: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnPreviousRowContent: EventEmitter<any> = new EventEmitter();
    @Output() setFocusOnNextRowContent: EventEmitter<any> = new EventEmitter();

    private isPermanent: boolean;
    private _notification: RowNotification;

    private eventNotification: RowNotification;
    private permanentNotification: RowNotification;

    @Input() set notification(value: RowNotification) {
        if (value) {

            if (value.type === NotificationType.ShowOnCollapse) {
                this.eventNotification = value;
                this.collapse(value.type);
                this.changeDetector.detectChanges();
            } else if (value.type === NotificationType.ShowOnRemove) {
                this.eventNotification = value;
                this.collapse(value.type);
                this.changeDetector.detectChanges();
            } else if (value.type === NotificationType.Permanent) {
                this.permanentNotification = value;
                this.showNotification();
            }
        }

        this.notificationChanged.emit(value);
    }
    get notification(): RowNotification {
        return this._notification;
    }

    @ContentChildren(forwardRef(() => ListColumnComponent), { descendants: true }) columns: QueryList<ListColumnComponent>;

    constructor(private elementRef: ElementRef, private changeDetector: ChangeDetectorRef) {
    }

    ngAfterContentInit() {
        this.listItemHeader.expandedChanged.subscribe(() => this.setExpandOrCollapsed());
        // this.listItemHeader.goToFirst.subscribe(() => this.setFocusOnFirstRow.emit());
        // this.listItemHeader.goToLast.subscribe(() => this.setFocusOnLastRow.emit());
        // this.listItemHeader.goUp.subscribe(() => this.setFocusOnPreviousRow.emit());
        // this.listItemHeader.goDown.subscribe(() => this.setFocusOnNextRow.emit());
        // this.listContent.goUp.subscribe(() => this.setFocusOnPreviousRowContent.emit());
        // this.listContent.goDown.subscribe(() => this.setFocusOnNextRowContent.emit());
    }

    toggleExpand(event: Event) {
        event.cancelBubble = true;
        this.expanded = !this.expanded;

    }

    setFocusOnRow() {
        this.listItemHeader.setFocus();
    }

    showNotification() {
        this._notification = this.permanentNotification;
        this.notificationVisible = true;
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

        const expandedChanged = !this._expanded;
        this._expanded = true;
        this.collapsed = false;

        if (expandedChanged) {
            this.expandedChanged.emit(this._expanded);
        }
    }

    private collapse(collapsingNotification?: NotificationType) {
        this.notInteractable = true;
        if (collapsingNotification) {
            this.processNotification(collapsingNotification);
        } else {
            const expandedChanged = this._expanded;
            this._expanded = false;
            setTimeout(() => {
                this.collapsed = true;
                this.notInteractable = false;
                if (expandedChanged) {
                    this.expandedChanged.emit(this._expanded);
                }
            }, 400);
        }
    }

    private processNotification(notificationType: NotificationType): void {
        if (notificationType === NotificationType.ShowOnCollapse) {
            this.processShowOnCollapseNotification();
        } else if (notificationType === NotificationType.ShowOnRemove) {
            this.processShowOnRemoveNotification();
        }
    }

    private processShowOnCollapseNotification() {

        if (!this.eventNotification) {
            return;
        }

        this.notificationVisible = true;

        if (this.eventNotification.done) {
            this.notificationVisible = false;
        }
        this._notification = this.eventNotification;
        setTimeout(() => {
            this._expanded = false;
            this.collapsed = true;
            this.expandedChanged.emit(this.expanded);
            setTimeout(() => {

                this.notInteractable = false;
                this.notification.done = true;

                if (!this.permanentNotification)
                    this.notificationVisible = false;

                if (this.eventNotification.removeWhenDone) {
                    this._notification = null;
                    this.permanentNotification = null;
                }
                else
                    this._notification = this.permanentNotification;
                return;


            }, 2000);
        }, 1400);


    }

    private processShowOnRemoveNotification() {
        this.notificationVisible = true;
        if (this.eventNotification.done) {
            this.notificationVisible = false;
        }
        this._notification = this.eventNotification;
        setTimeout(() => {
            this._expanded = false;
            this.collapsed = true;
            this.expandedChanged.emit(this.expanded);
            setTimeout(() => {
                this.notification.done = true;
                this.isDeleted = true;
                this.notInteractable = false;
                this.notificationVisible = false;
                this.deleted.emit();
            }, 2000);
        }, 1400);
    }
}