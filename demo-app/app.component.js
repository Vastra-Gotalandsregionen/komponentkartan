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
var sidebarMenu_component_1 = require("../component-package/controls/sidebar-menu/sidebarMenu.component");
var KomponentkartanApplicationComponent = (function () {
    function KomponentkartanApplicationComponent() {
        this.largeMenu = [{
                'title': 'Portal',
                'groups': [{
                        'order': '1',
                        'menuItems': [{
                                'title': 'Startsida',
                                'url': '/dashboard',
                                'favourite': true,
                                'order': '1.1',
                                'menuItems': null
                            },
                            {
                                'title': 'Användare',
                                'url': '/anvandare',
                                'favourite': true,
                                'order': '1.2',
                                'menuItems': [{
                                        'title': 'Enhetsanvändare',
                                        'url': '/enhetsanvandare',
                                        'favourite': true,
                                        'order': '1.2.1',
                                        'menuItems': null
                                    },
                                    {
                                        'title': 'Sjukhusanvändare',
                                        'url': 'sjukhusanvandare',
                                        'favourite': false,
                                        'order': '1.2.2',
                                        'menuItems': null
                                    },
                                    {
                                        'title': 'Övriga användare',
                                        'url': '/ovrigaAnvandare',
                                        'favourite': false,
                                        'order': '1.2.3',
                                        'menuItems': null
                                    }
                                ]
                            }
                        ]
                    }]
            },
            {
                'title': 'VGPV',
                'theme': 'Red',
                'groups': [{
                        'order': '1',
                        'menuItems': [{
                                'title': 'Tidplan',
                                'url': '/externalContent/vgpv/Tidplan',
                                'favourite': true,
                                'order': '1.1',
                                'menuItems': null
                            }]
                    },
                    {
                        'order': '2',
                        'menuItems': [{
                                'title': 'Vårdcentraler',
                                'url': '/externalContent/vgpv/Avtal',
                                'favourite': false,
                                'order': '2.1',
                                'menuItems': null
                            },
                            {
                                'title': 'Jourcentraler',
                                'url': '/externalContent/vgpv/JourcentralAvtal',
                                'favourite': false,
                                'order': '2.2',
                                'menuItems': null
                            },
                            {
                                'title': 'Användare',
                                'url': '/externalContent/vgpv/Användarlista',
                                'favourite': false,
                                'order': '2.3',
                                'menuItems': null
                            }
                        ]
                    },
                    {
                        'order': '3',
                        'menuItems': [{
                                'title': 'Vårdval',
                                'url': '/externalContent/vgpv/Vårdval',
                                'favourite': false,
                                'order': '3.4',
                                'menuItems': null
                            },
                            {
                                'title': 'Uppföljningsunderlag',
                                'url': '',
                                'favourite': false,
                                'order': '3.5',
                                'menuItems': [{
                                        'title': 'Uppföljning',
                                        'url': '/externalContent/vgpv/UppföljningPage',
                                        'favourite': false,
                                        'order': '3.5.1',
                                        'menuItems': null
                                    },
                                    {
                                        'title': 'Graf dag för dag',
                                        'url': '/externalContent/vgpv/VårdvalspoängGraf',
                                        'favourite': false,
                                        'order': '3.5.2',
                                        'menuItems': null
                                    },
                                    {
                                        'title': 'Månatliga rapporter',
                                        'url': '/externalContent/vgpv/Månatligarapporter',
                                        'favourite': false,
                                        'order': '3.5.3',
                                        'menuItems': null
                                    },
                                    {
                                        'title': 'Sammanställningar',
                                        'url': '/externalContent/vgpv/Sammanställningar',
                                        'favourite': false,
                                        'order': '3.5.4',
                                        'menuItems': null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        'order': '4',
                        'menuItems': [{
                                'title': 'Webbformulär',
                                'url': '',
                                'favourite': false,
                                'order': '4.1',
                                'menuItems': [{
                                        'title': 'Inmatning',
                                        'url': '/externalContent/vgpv/KvalitetsmålInmatning',
                                        'favourite': false,
                                        'order': '4.1.1',
                                        'menuItems': null
                                    },
                                    {
                                        'title': 'Historik',
                                        'url': '/externalContent/vgpv/KvalitetsmålHistorik',
                                        'favourite': false,
                                        'order': '4.1.2',
                                        'menuItems': null
                                    }
                                ]
                            },
                            {
                                'title': 'Förhandsgranska',
                                'url': '/externalContent/vgpv/SökUtbetalningsunderlagFörhandsgranska',
                                'favourite': false,
                                'order': '4.1',
                                'menuItems': null
                            },
                            {
                                'title': 'Utbetalningsunderlag',
                                'url': '/externalContent/vgpv/Utbetalningsunderlag',
                                'favourite': true,
                                'order': '4.2',
                                'menuItems': null
                            }
                        ]
                    },
                    {
                        'order': '5',
                        'menuItems': [{
                                'title': 'Filuppladdning',
                                'url': '',
                                'favourite': false,
                                'order': '5.6',
                                'menuItems': [{
                                        'title': 'Uppladdning',
                                        'url': '/externalContent/vgpv/Filuppladdning',
                                        'favourite': true,
                                        'order': '5.6.1',
                                        'menuItems': null
                                    },
                                    {
                                        'title': 'Övervakning',
                                        'url': '/externalContent/vgpv/Övervakning',
                                        'favourite': false,
                                        'order': '5.6.2',
                                        'menuItems': null
                                    },
                                    {
                                        'title': 'Registervård',
                                        'url': '/externalContent/vgpv/Registervård',
                                        'favourite': false,
                                        'order': '5.6.3',
                                        'menuItems': null
                                    },
                                    {
                                        'title': 'Undantag',
                                        'url': '/externalContent/vgpv/Undantag',
                                        'favourite': false,
                                        'order': '5.6.4',
                                        'menuItems': null
                                    }
                                ]
                            }]
                    }
                ]
            },
            {
                'title': 'BMM',
                'theme': 'Blue',
                'groups': [{
                        'order': '1',
                        'menuItems': [{
                                'title': 'Enhet',
                                'url': '/bmmEnhet',
                                'favourite': true,
                                'order': '1.1',
                                'menuItems': null
                            },
                            {
                                'title': 'Utbetalningsunderlag',
                                'url': '/bmmUtbetalningsunderlag',
                                'favourite': true,
                                'order': '1.2',
                                'menuItems': null
                            },
                            {
                                'title': 'Konfiguration',
                                'url': '/bmmKonfiguration',
                                'favourite': true,
                                'order': '1.3',
                                'menuItems': null
                            },
                            {
                                'title': 'Månatliga rapporter',
                                'url': '/bmmManatligaRapporter',
                                'favourite': false,
                                'order': '1.4',
                                'menuItems': null
                            },
                            {
                                'title': 'Registervård',
                                'url': '/bmmRegistervard',
                                'favourite': false,
                                'order': '1.5',
                                'menuItems': null
                            }
                        ]
                    }]
            },
            {
                'title': 'Rehab',
                'theme': 'Green',
                'groups': [{
                        'order': '1',
                        'menuItems': [{
                                'title': 'Enhet',
                                'url': '/externalContent/rehab/enhet',
                                'favourite': true,
                                'order': '2.1',
                                'menuItems': null
                            },
                            {
                                'title': 'Utbetalningsunderlag',
                                'url': '/externalContent/rehab/utbetalningsunderlag',
                                'favourite': true,
                                'order': '2.2',
                                'menuItems': null
                            },
                            {
                                'title': 'Konfiguration',
                                'url': '/externalContent/rehab/konfiguration',
                                'favourite': false,
                                'order': '2.3',
                                'menuItems': null
                            },
                            {
                                'title': 'Konfiguration Godkänn',
                                'url': '/externalContent/rehab/konfigurationGodkann',
                                'favourite': false,
                                'order': '2.4',
                                'menuItems': null
                            },
                            {
                                'title': 'Behörighet',
                                'url': '/externalContent/rehab/behorighet',
                                'favourite': false,
                                'order': '2.5',
                                'menuItems': null
                            },
                            {
                                'title': 'Filuppladdning',
                                'url': '/externalContent/rehab/filuppladdning',
                                'favourite': true,
                                'order': '2.6',
                                'menuItems': null
                            },
                            {
                                'title': 'Testuppladdning',
                                'url': '/externalContent/rehab/temporarTestuppladdning',
                                'favourite': false,
                                'order': '2.7',
                                'menuItems': null
                            },
                            {
                                'title': 'Öppna testuppladdning',
                                'url': '/externalContent/rehab/temporarTestuppladdningsperiod',
                                'favourite': false,
                                'order': '2.8',
                                'menuItems': null
                            },
                            {
                                'title': 'Rapporter',
                                'url': '/externalContent/rehab/report',
                                'favourite': false,
                                'order': '2.9',
                                'menuItems': null
                            },
                            {
                                'title': 'Enhetlig registering',
                                'url': '/externalContent/rehab/engangsbeloppEnhetligRegistrering',
                                'favourite': false,
                                'order': '2.10',
                                'menuItems': null
                            }
                        ]
                    }]
            }
        ];
        this.singleMenu = [
            {
                title: 'Innehåll',
                groups: [
                    {
                        order: '0',
                        menuItems: [
                            { title: 'Formatmall', url: '/formatmall' },
                            { title: 'Färgkarta', url: '/fargkarta' },
                            { title: 'Listor', url: '/lists' },
                            { title: 'Kalender', url: '/calendars' },
                            { title: 'Inputfält', url: '/inputFields' },
                            { title: 'Loader', url: '/loader' },
                            { title: 'Komponenter', url: '/komponentkartan' },
                            { title: 'Formulär', url: '/formexample' },
                            { title: 'Snygg Layout', url: '/example-layout' },
                            { title: 'List kolumner', url: '/list-columns' },
                        ]
                    }
                ]
            },
        ];
        this.menus = this.singleMenu;
        this.headerMenu = {
            menuItems: [
                {
                    displayName: 'Min sida',
                    url: '/minsida',
                    isInternalLink: true
                },
                {
                    isSeparator: true
                },
                {
                    displayName: 'Krav- och kvalitetsbok',
                    menuItems: [
                        {
                            displayName: 'VGPV',
                            url: "http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-vg-primarvard/krav--och-kvalitetsbok-vg-primarvard/",
                            isInternalLink: false
                        },
                        {
                            displayName: 'Rehab',
                            url: 'http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-rehab/krav--och-kvalitetsbok/',
                            isInternalLink: false
                        }
                    ]
                },
                {
                    displayName: 'FAQ',
                    menuItems: [
                        {
                            displayName: 'VGPV',
                            url: 'http://www.vgregion.se/sv/Vastra-Gotalandsregionen/startsida/Vard-och-halsa/Forvardgivare/VG-Primarvard1/Fragor-och-svar/',
                            isInternalLink: false
                        },
                        {
                            displayName: 'Rehab',
                            url: 'http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-rehab/fragor-och-svar/',
                            isInternalLink: false
                        }
                    ]
                },
                {
                    displayName: 'Kontakt',
                    url: 'http://www.vgregion.se/halsa-och-vard/vardgivarwebben/it/it-system/it-stod-for-vardval-rehab/kontaktpersoner/',
                    isInternalLink: false
                }
            ]
        };
    }
    KomponentkartanApplicationComponent.prototype.onSelectedMenuChanged = function (newMenu) {
    };
    KomponentkartanApplicationComponent.prototype.setSelectedMenu = function (menuSize) {
        if (menuSize > 1) {
            this.menus = this.largeMenu;
        }
        else {
            this.menus = this.singleMenu;
        }
        this.sidebarMenu.ngAfterViewInit();
    };
    KomponentkartanApplicationComponent.prototype.onActivate = function (e) {
        window.scrollTo(0, 0);
    };
    return KomponentkartanApplicationComponent;
}());
__decorate([
    core_1.ViewChild(sidebarMenu_component_1.SidebarMenuComponent),
    __metadata("design:type", sidebarMenu_component_1.SidebarMenuComponent)
], KomponentkartanApplicationComponent.prototype, "sidebarMenu", void 0);
KomponentkartanApplicationComponent = __decorate([
    core_1.Component({
        selector: 'komponentkartan-application',
        templateUrl: '/demo-app/app.component.html'
    }),
    __metadata("design:paramtypes", [])
], KomponentkartanApplicationComponent);
exports.KomponentkartanApplicationComponent = KomponentkartanApplicationComponent;
//# sourceMappingURL=app.component.js.map