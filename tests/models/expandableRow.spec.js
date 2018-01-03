"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var expandableRow_model_1 = require("../../component-package/models/expandableRow.model");
var notificationIcon_model_1 = require("../../component-package/models/notificationIcon.model");
var notificationType_model_1 = require("../../component-package/models/notificationType.model");
describe('[ExpandableRow]', function () {
    var wrappedObject = { name: 'Some name', value: 'Some value' };
    var expandableRow = new expandableRow_model_1.ExpandableRow(wrappedObject);
    describe('When constructed', function () {
        it('wrapped object is stored in preview object', function () {
            expect(expandableRow.previewObject).toBe(wrappedObject);
        });
        describe('When showNotificationOnCollapse is called', function () {
            beforeEach(function () {
                expandableRow.notifyOnCollapse('Collapsed', notificationIcon_model_1.NotificationIcon.Ok);
            });
            it('notification is set to notify on collapse', function () {
                expect(expandableRow.notification).toEqual({ type: notificationType_model_1.NotificationType.ShowOnCollapse, icon: notificationIcon_model_1.NotificationIcon.Ok, message: 'Collapsed' });
            });
        });
        describe('When showNotificationOnRemove is called', function () {
            beforeEach(function () {
                expandableRow.notifyOnRemove('Removed', notificationIcon_model_1.NotificationIcon.OkGreen);
            });
            it('notification is set to notify on remove', function () {
                expect(expandableRow.notification).toEqual({ type: notificationType_model_1.NotificationType.ShowOnRemove, icon: notificationIcon_model_1.NotificationIcon.OkGreen, message: 'Removed' });
            });
        });
    });
});
//# sourceMappingURL=expandableRow.spec.js.map