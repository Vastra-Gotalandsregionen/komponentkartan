"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var modalService_1 = require("../../component-package/services/modalService");
describe('ModalService', function () {
    var modalService;
    var publishedModals;
    var dialogResult;
    beforeEach(function () {
        modalService = new modalService_1.ModalService();
        publishedModals = [];
        modalService.modalOpened$.subscribe(function (x) { return publishedModals.push(x); });
    });
    describe('When a single button dialog is opened', function () {
        beforeEach(function () {
            modalService.openOneButtonDialog('DialogTitle', 'DialogMessage', 'Ok', function () { return dialogResult = 'Ok'; });
        });
        it('a modal event is published', function () {
            expect(publishedModals.length).toBe(1);
        });
        it('The published event contains one button', function () {
            expect(publishedModals[0].buttons.length).toBe(1);
        });
        it('The buttons text is OK', function () {
            expect(publishedModals[0].buttons[0].text).toBe('Ok');
        });
        describe('When the button is clicked', function () {
            it('The callback is called', function () {
                publishedModals[0].buttons[0].callback();
                expect(dialogResult).toBe('Ok');
            });
        });
    });
});
//# sourceMappingURL=modalService.spec.js.map