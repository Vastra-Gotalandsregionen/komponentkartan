"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var notificationType_model_1 = require("../../models/notificationType.model");
var notificationIcon_model_1 = require("../../models/notificationIcon.model");
var listItemJqueryHelper_1 = require("./listItemJqueryHelper");
var list_column_component_1 = require("../list/list-column.component");
var ListItemComponent = (function () {
    function ListItemComponent(elementRef, changeDetecor, jqueryHelper) {
        this.elementRef = elementRef;
        this.changeDetecor = changeDetecor;
        this.jqueryHelper = jqueryHelper;
        // För att kunna binda till Enum värde i markup
        this.NotificationIcons = notificationIcon_model_1.NotificationIcon;
        this.showNotificationDurationMs = 1500;
        this.isContainer = true;
        this.collapsed = true;
        this.expandedChanged = new core_1.EventEmitter();
        this.notificationChanged = new core_1.EventEmitter();
        this.deleted = new core_1.EventEmitter();
    }
    Object.defineProperty(ListItemComponent.prototype, "expanded", {
        get: function () {
            return this._expanded;
        },
        set: function (expandedValue) {
            if (expandedValue && !this._expanded) {
                this.expand();
            }
            else if (!expandedValue && this._expanded) {
                this.collapse();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ListItemComponent.prototype, "notification", {
        get: function () {
            return this._notification;
        },
        set: function (value) {
            this._notification = value;
            if (value) {
                if (value.type === notificationType_model_1.NotificationType.ShowOnCollapse) {
                    this.collapse(value.type);
                    this.changeDetecor.detectChanges();
                }
                else if (value.type === notificationType_model_1.NotificationType.ShowOnRemove) {
                    this.collapse(value.type);
                    this.changeDetecor.detectChanges();
                }
                else if (value.type === notificationType_model_1.NotificationType.Permanent) {
                    this.showNotification();
                }
            }
            this.notificationChanged.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    ListItemComponent.prototype.ngOnInit = function () {
        if (this.notification && this.notification.type === notificationType_model_1.NotificationType.Permanent) {
            this.showNotification();
        }
    };
    ListItemComponent.prototype.copyPropertiesFromHeader = function (header) {
        var _this = this;
        this.columns.forEach(function (column, index) {
            header.applyToColumn(column, index);
        });
        setTimeout(function () {
            _this.columnsInitialized = true;
        }, 1);
    };
    ListItemComponent.prototype.showNotification = function () {
        this.notificationVisible = true;
    };
    ListItemComponent.prototype.toggleExpand = function (event) {
        if (this.notInteractable) {
            return;
        }
        if (!this.jqueryHelper.isClickEventHeader(event)) {
            return;
        }
        if (!this._expanded) {
            this.expand();
        }
        else {
            this.collapse();
        }
        event.cancelBubble = true;
    };
    ListItemComponent.prototype.expand = function () {
        if (this.isDeleted || this.notInteractable) {
            return;
        }
        this.jqueryHelper.toggleContent(this.elementRef);
        var expandedChanged = !this._expanded;
        this._expanded = true;
        this.collapsed = false;
        if (expandedChanged) {
            this.expandedChanged.emit(this._expanded);
        }
    };
    ListItemComponent.prototype.collapse = function (collapsingNotification) {
        var _this = this;
        this.notInteractable = true;
        var header = this.jqueryHelper.getHeader(this.elementRef);
        if (collapsingNotification) {
            this.processNotification(header, collapsingNotification, function () {
            });
        }
        else {
            this.jqueryHelper.collapseContent(header, function () {
                var expandedChanged = _this._expanded;
                _this._expanded = false;
                _this.collapsed = true;
                _this.notInteractable = false;
                if (expandedChanged) {
                    _this.expandedChanged.emit(_this._expanded);
                }
            });
        }
    };
    ListItemComponent.prototype.processNotification = function (header, notificationType, callback) {
        if (notificationType === notificationType_model_1.NotificationType.ShowOnCollapse) {
            this.processShowOnCollapseNotification(header, callback);
        }
        else if (notificationType === notificationType_model_1.NotificationType.ShowOnRemove) {
            this.processShowOnRemoveNotification(header, callback);
        }
        ;
    };
    ListItemComponent.prototype.processShowOnCollapseNotification = function (header, callback) {
        var _this = this;
        this.notificationVisible = true;
        setTimeout(function () {
            _this.jqueryHelper.collapseContent(header, function () {
                _this._expanded = false;
                _this.collapsed = true;
                _this.expandedChanged.emit(_this._expanded);
                setTimeout(function () {
                    _this.notification.done = true;
                    _this.notificationVisible = false;
                    _this.notInteractable = false;
                }, 2000);
            });
        }, 1400);
    };
    ListItemComponent.prototype.processShowOnRemoveNotification = function (header, callback) {
        var _this = this;
        this.notificationVisible = true;
        setTimeout(function () {
            _this.jqueryHelper.collapseContent(header, function () {
                _this._expanded = false;
                _this.collapsed = true;
                _this.expandedChanged.emit(_this._expanded);
                setTimeout(function () {
                    _this.notification.done = true;
                    _this.notificationVisible = false;
                    _this.notInteractable = false;
                    _this.isDeleted = true;
                    _this.deleted.emit();
                }, 2000);
            });
        }, 1400);
    };
    return ListItemComponent;
}());
__decorate([
    core_1.HostBinding('class.list-item'),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "isContainer", void 0);
__decorate([
    core_1.HostBinding('class.list-item--collapsed'),
    __metadata("design:type", Object)
], ListItemComponent.prototype, "collapsed", void 0);
__decorate([
    core_1.HostBinding('class.list-item--expanded'),
    __metadata("design:type", Boolean)
], ListItemComponent.prototype, "_expanded", void 0);
__decorate([
    core_1.HostBinding('class.list-item--deleted'),
    __metadata("design:type", Boolean)
], ListItemComponent.prototype, "isDeleted", void 0);
__decorate([
    core_1.HostBinding('class.list-item--notification-visible'),
    __metadata("design:type", Boolean)
], ListItemComponent.prototype, "notificationVisible", void 0);
__decorate([
    core_1.HostBinding('class.list-item--not-interactable'),
    __metadata("design:type", Boolean)
], ListItemComponent.prototype, "notInteractable", void 0);
__decorate([
    core_1.HostBinding('class.list-item--columns-initialized'),
    __metadata("design:type", Boolean)
], ListItemComponent.prototype, "columnsInitialized", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ListItemComponent.prototype, "expanded", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ListItemComponent.prototype, "expandedChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ListItemComponent.prototype, "notificationChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ListItemComponent.prototype, "deleted", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ListItemComponent.prototype, "notification", null);
__decorate([
    core_1.ContentChildren(core_1.forwardRef(function () { return list_column_component_1.ListColumnComponent; }), { descendants: true }),
    __metadata("design:type", core_1.QueryList)
], ListItemComponent.prototype, "columns", void 0);
__decorate([
    core_1.HostListener('click', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Event]),
    __metadata("design:returntype", void 0)
], ListItemComponent.prototype, "toggleExpand", null);
ListItemComponent = __decorate([
    core_1.Component({
        templateUrl: './list-item.component.html',
        selector: 'vgr-list-item',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.ChangeDetectorRef, listItemJqueryHelper_1.ListItemJqeuryHelper])
], ListItemComponent);
exports.ListItemComponent = ListItemComponent;
//# sourceMappingURL=list-item.component.js.map