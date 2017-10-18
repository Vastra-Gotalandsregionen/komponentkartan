import { ModalService, ModalConfiguration } from '../../component-package/services/modalService';

describe('ModalService', () => {

    let modalService: ModalService;
    let publishedModals: ModalConfiguration[]
    let dialogResult: string;
    beforeEach(() => {
        modalService = new ModalService();
        publishedModals = [];
        modalService.modalOpened$.subscribe(x => publishedModals.push(x));
    });
    describe('When a single button dialog is opened', () => {
        beforeEach(() => {
            modalService.openOneButtonDialog('DialogTitle', 'DialogMessage', 'Ok', () => dialogResult = 'Ok');
        });
        it('a modal event is published', () => {
            expect(publishedModals.length).toBe(1);
        });
        it('The published event contains one button', () => {
            expect(publishedModals[0].buttons.length).toBe(1);
        });
        it('The buttons text is OK', () => {
            expect(publishedModals[0].buttons[0].text).toBe('Ok');
        });
        describe('When the button is clicked', () => {
            it('The callback is called', () => {
                publishedModals[0].buttons[0].callback();
                expect(dialogResult).toBe('Ok');
            });

        });
    });
});
