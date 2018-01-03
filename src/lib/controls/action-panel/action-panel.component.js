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
var actionPanelJqueryHelper_1 = require("./actionPanelJqueryHelper");
var ActionPanelComponent = (function () {
    function ActionPanelComponent(elementRef, changeDetecor, jqueryHelper) {
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
        this.pageHeaderHeight = 0;
    }
    Object.defineProperty(ActionPanelComponent.prototype, "animationDelayMs", {
        get: function () {
            return this.expansionSpeed === 'slow' ? 1000 :
                this.expansionSpeed === 'fast' ? 300 : 600;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionPanelComponent.prototype, "slow", {
        get: function () {
            return this.expansionSpeed === 'slow';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionPanelComponent.prototype, "fast", {
        get: function () {
            return this.expansionSpeed === 'fast';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ActionPanelComponent.prototype, "expanded", {
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
    Object.defineProperty(ActionPanelComponent.prototype, "notification", {
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
    ActionPanelComponent.prototype.ngAfterContentInit = function () {
        this.updateActualContentHeight();
    };
    ActionPanelComponent.prototype.updateActualContentHeight = function () {
        this.actualContentHeight = this.elementRef.nativeElement.scrollHeight + 'px';
    };
    ActionPanelComponent.prototype.setPageHeaderHeight = function (height) {
        this.pageHeaderHeight = height;
        this.elementRef.nativeElement.style.top = height + 'px';
    };
    ActionPanelComponent.prototype.ngOnInit = function () {
        if (this.notification && this.notification.type === notificationType_model_1.NotificationType.Permanent) {
            this.showNotification();
        }
    };
    ActionPanelComponent.prototype.showNotification = function () {
        this.notificationVisible = true;
    };
    ActionPanelComponent.prototype.expand = function () {
        var _this = this;
        if (this.deleted || this.notInteractable) {
            return;
        }
        this.updateActualContentHeight();
        this.elementRef.nativeElement.style.height = this.actualContentHeight;
        this._expanded = true;
        this.collapsed = false;
        this.expandedChanged.emit(this._expanded);
        setTimeout(function () {
            _this.elementRef.nativeElement.style.height = 'auto';
            _this.elementRef.nativeElement.style.overflow = 'visible';
        }, this.animationDelayMs);
    };
    ActionPanelComponent.prototype.collapse = function (collapsingNotification) {
        var _this = this;
        this.updateActualContentHeight();
        this.elementRef.nativeElement.style.height = this.actualContentHeight;
        setTimeout(function () {
            _this.elementRef.nativeElement.style.height = '0px';
            _this.elementRef.nativeElement.style.overflow = 'hidden';
            _this._expanded = false;
            _this.collapsed = true;
        }, 50);
    };
    ActionPanelComponent.prototype.processNotification = function (notificationType, callback) {
        if (notificationType === notificationType_model_1.NotificationType.ShowOnCollapse) {
            this.processShowOnCollapseNotification(callback);
        }
        else if (notificationType === notificationType_model_1.NotificationType.ShowOnRemove) {
            this.processShowOnRemoveNotification(callback);
        }
        ;
    };
    ActionPanelComponent.prototype.processShowOnCollapseNotification = function (callback) {
        this.notificationVisible = true;
    };
    ActionPanelComponent.prototype.processShowOnRemoveNotification = function (callback) {
        this.notificationVisible = true;
    };
    return ActionPanelComponent;
}());
__decorate([
    core_1.HostBinding('class.action-panel'),
    __metadata("design:type", Object)
], ActionPanelComponent.prototype, "isContainer", void 0);
__decorate([
    core_1.HostBinding('class.action-panel--collapsed'),
    __metadata("design:type", Object)
], ActionPanelComponent.prototype, "collapsed", void 0);
__decorate([
    core_1.HostBinding('class.action-panel--expanded'),
    __metadata("design:type", Boolean)
], ActionPanelComponent.prototype, "_expanded", void 0);
__decorate([
    core_1.HostBinding('class.action-panel--deleted'),
    __metadata("design:type", Boolean)
], ActionPanelComponent.prototype, "deleted", void 0);
__decorate([
    core_1.HostBinding('class.action-panel--notification-visible'),
    __metadata("design:type", Boolean)
], ActionPanelComponent.prototype, "notificationVisible", void 0);
__decorate([
    core_1.HostBinding('class.action-panel--not-interactable'),
    __metadata("design:type", Boolean)
], ActionPanelComponent.prototype, "notInteractable", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ActionPanelComponent.prototype, "title", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], ActionPanelComponent.prototype, "expansionSpeed", void 0);
__decorate([
    core_1.HostBinding('class.action-panel--slow'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ActionPanelComponent.prototype, "slow", null);
__decorate([
    core_1.HostBinding('class.action-panel--fast'),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [])
], ActionPanelComponent.prototype, "fast", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], ActionPanelComponent.prototype, "expanded", null);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ActionPanelComponent.prototype, "expandedChanged", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ActionPanelComponent.prototype, "notificationChanged", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object),
    __metadata("design:paramtypes", [Object])
], ActionPanelComponent.prototype, "notification", null);
ActionPanelComponent = __decorate([
    core_1.Component({
        templateUrl: './action-panel.component.html',
        selector: 'vgr-action-panel',
        moduleId: module.id
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, core_1.ChangeDetectorRef, actionPanelJqueryHelper_1.ActionPanelJqeuryHelper])
], ActionPanelComponent);
exports.ActionPanelComponent = ActionPanelComponent;
//# sourceMappingURL=action-panel.component.js.map