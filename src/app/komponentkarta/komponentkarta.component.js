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
var modalService_1 = require("../../component-package/services/modalService");
var notificationType_model_1 = require("../../component-package/models/notificationType.model");
var notificationIcon_model_1 = require("../../component-package/models/notificationIcon.model");
var KomponentkartaComponent = (function () {
    function KomponentkartaComponent(modalService) {
        this.modalService = modalService;
        // Enum declarations
        this.NotificationTypes = notificationType_model_1.NotificationType;
        this.NotificationIcons = notificationIcon_model_1.NotificationIcon;
        this.maxDate = new Date(2018, 7, 1);
        this.isReadonlyAndDisabled = true;
        this.isReadonlyAndDisabledMulti = true;
        this.dropDownItems25 = this.getDemoItems(25);
        this.dropDownItems200 = this.getDemoItems(200);
        this.dropDownItems8 = this.getDemoItems(8);
        this.dropDownItems7 = this.getDemoItems(7);
        this.dropDownItems6 = this.getDemoItems(6);
        this.dropMultipleDownItems8 = this.getDemoItems(8);
        this.dropDownItems9 = this.getDemoItems(9);
        this.dropDownItems10 = this.getDemoItems(10);
        this.buttonDisabled = true;
        this.buttonSecondaryDisabled = true;
        this.saveCancelMessage = 'Ingen';
        this.lockMessage = 'Ingen';
        this.actionPanelMessage = '';
        this.themeOptions = [
            { id: 'neutral', displayName: 'Neutral (grå)' },
            { id: 'blue', displayName: 'BMM (blå)' },
            { id: 'red', displayName: 'VGPV (röd)' },
            { id: 'green', displayName: 'Rehab (grön)' },
        ];
        this.selectedThemeOption = this.themeOptions[0];
        this.selectedRadioOption = { displayName: 'Inget' };
        this.actionInProgress = false;
        this.headerMenu = {
            menuItems: [
                { displayName: 'Test' }
            ]
        };
        // Lägg til med fördröjning för att återskapa problem vi haft med laddning från service
        // setTimeout(() => {
        //     this.dropDownItems25All = this.getDemoItems(25);
        //     this.dropDownItems25All[1].selected = true;
        // }, 1000);
        this.dropDownItems25All = this.getDemoItems(25);
        this.dropDownItems25All[1].selected = true;
        this.lastMultipleSelection = 'Inget';
        this.lastSingleSelection = 'Inget';
        this.dropDownItems200[3].selected = true;
        this.dropMultipleDownItems8[0].selected = true;
        this.dropMultipleDownItems8[1].selected = true;
        this.dropMultipleDownItems8[2].selected = true;
        this.dropDownItems9[7].selected = true;
    }
    KomponentkartaComponent.prototype.showOneButtonModal = function () {
        var _this = this;
        this.modalService.openDialog('Detta är en dialog med en knapp', 'Här kan du bara välja ett alternativ', new modalService_1.ModalButtonConfiguration('OK', function () { return _this.lastModalAnswer = 'OK'; }));
    };
    KomponentkartaComponent.prototype.onLock1Changed = function (locked) {
        this.lockMessage = 'Lås 1 ' + (locked ? 'låst' : 'upplåst');
    };
    KomponentkartaComponent.prototype.onLock2Changed = function (locked) {
        this.lockMessage = 'Lås 2 ' + (locked ? 'låst' : 'upplåst');
    };
    KomponentkartaComponent.prototype.showTwoButtonModal = function () {
        var _this = this;
        this.modalService.openDialog('Acceptera villkor', 'Denna fil innehåller personnummer på de personer som valt er vårdcentral tom 2017-01-31. ' +
            'För nedladdning av filen gäller följande villkor' +
            '1. Innehållet i filen får inte behandlas i strid med personuppgiftslagen (PuL) och patient-datalagen (PdL). ' +
            'Informationen får därför inte användas för annat ändamål än det för vilket uppgifterna samlats in ' +
            '(9 § punkt c och d PuL och 2 kap. 4 § PdL). ' +
            'Detta innebär bland annat att uppgifterna inte får användas för massutskick eller marknadsföring. ' +
            '2. Verksamhetschefen ansvarar för att endast den senaste månadens fil används för eventuell bearbetning av informationen. ' +
            'För att acceptera båda villkoren ovan, tryck [Jag accepterar] annars tryck [Avbryt]' +
            'Notera att systemet bokför vem som accepterat villkoren och tidpunkten för detta.' +
            'Notera även att alla register i verksamheten ska vara anmälda till utsett personuppgiftsombud eller Datainspektionen.', new modalService_1.ModalButtonConfiguration('Jag accepterar', function () { return _this.lastModalAnswer = 'Jag accepterar'; }), new modalService_1.ModalButtonConfiguration('Avbryt', function () { return _this.lastModalAnswer = 'Avbryt'; }));
    };
    KomponentkartaComponent.prototype.showThreeButtonModal = function () {
        var _this = this;
        this.modalService.openDialog('Vill du spara innan du stänger?', 'Ändringarna går förlorade om du inte sparar dem', new modalService_1.ModalButtonConfiguration('Ja', function () { return _this.lastModalAnswer = 'Ja'; }), new modalService_1.ModalButtonConfiguration('Nej', function () { return _this.lastModalAnswer = 'Nej'; }), new modalService_1.ModalButtonConfiguration('Avbryt', function () { return _this.lastModalAnswer = 'Avbryt'; }));
    };
    KomponentkartaComponent.prototype.showSaveDontSaveCancelModal = function () {
        var _this = this;
        this.modalService.openSaveDontSaveCancelDialog('Vill du spara innan du stänger?', 'Ändringarna går förlorade om du inte sparar.', function () { return _this.lastModalAnswer = 'Sparade'; }, function () { return _this.lastModalAnswer = 'Sparade inte'; }, function () { return _this.lastModalAnswer = 'Avbröt'; });
    };
    KomponentkartaComponent.prototype.selectedThemeChanged = function (selectedTheme) {
        var themeClass = 'theme--' + selectedTheme.id;
        $('komponentkartan-application').removeClass('theme--blue theme--red theme--neutral theme--green');
        $('komponentkartan-application').addClass(themeClass);
    };
    KomponentkartaComponent.prototype.getDemoItems = function (numberOfItems) {
        var items = [];
        for (var i = 1; i <= numberOfItems; i++) {
            items.push({ id: i.toString(), displayName: "21 - S\u00F6dra h\u00E4lso- och sjukv\u00E5rdsn\u00E4mnd", displayNameWhenSelected: "Alt " + i });
        }
        return items;
    };
    KomponentkartaComponent.prototype.onSelectedRadioOptionChanged = function (option) {
        this.selectedRadioOption = option;
    };
    KomponentkartaComponent.prototype.consoleLog = function (logText) {
    };
    KomponentkartaComponent.prototype.ngAfterViewInit = function () {
        $('.with-classes').each(function (item, e) {
            var classes = e.classList;
            var classDescription = '';
            for (var i = 0; i < classes.length; i++) {
                if (classes[i] !== 'with-classes' && classes[i] !== 'flex-pull-right') {
                    classDescription += "." + classes[i] + " ";
                }
            }
            e.title = classDescription;
            e.innerHTML += "<div class='class-description'>" + classDescription + "</div>";
        });
    };
    KomponentkartaComponent.prototype.toggleClasses = function () {
        $('.class-description').fadeToggle();
    };
    KomponentkartaComponent.prototype.onMultipleSelectionChanged = function (selectedItems) {
        this.lastMultipleSelection = selectedItems.map(function (x) { return x.displayName; }).join(',');
    };
    KomponentkartaComponent.prototype.onSingleSelectionChanged = function (selectedItem) {
        this.lastSingleSelection = selectedItem.displayName;
    };
    return KomponentkartaComponent;
}());
KomponentkartaComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'vgr-komponentkarta',
        templateUrl: 'komponentkarta.component.html'
    }),
    __metadata("design:paramtypes", [modalService_1.ModalService])
], KomponentkartaComponent);
exports.KomponentkartaComponent = KomponentkartaComponent;
//# sourceMappingURL=komponentkarta.component.js.map