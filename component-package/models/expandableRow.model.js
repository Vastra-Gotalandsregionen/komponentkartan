"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var notificationType_model_1 = require("./notificationType.model");
var ExpandableRow = (function () {
    function ExpandableRow(previewObject) {
        this.previewObject = previewObject;
    }
    ExpandableRow.prototype.notifyOnCollapse = function (message, icon) {
        this.notification = { icon: icon, message: message, type: notificationType_model_1.NotificationType.ShowOnCollapse };
    };
    ExpandableRow.prototype.notifyOnRemove = function (message, icon) {
        this.notification = { icon: icon, message: message, type: notificationType_model_1.NotificationType.ShowOnRemove };
    };
    return ExpandableRow;
}());
exports.ExpandableRow = ExpandableRow;
//# sourceMappingURL=expandableRow.model.js.map