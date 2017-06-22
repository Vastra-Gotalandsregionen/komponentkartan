import { Component, AfterViewInit, Input, ElementRef, ViewChild } from "@angular/core"

import { IHeaderMenu, IHeaderMenuGroup, IHeaderMenuItem } from "../../models/headerMenu.model"
import { HeaderMenuComponent } from "../headerMenu/headerMenu.component"

@Component({
    selector: "vgr-header",
    moduleId: module.id,
    templateUrl: "./header.component.html"
})

export class HeaderComponent {
    systemColor: string;
    headerMenu: IHeaderMenu;
    @Input() userName: string;

    @ViewChild(HeaderMenuComponent) headerMenuComponent: HeaderMenuComponent;

    constructor(private elementRef: ElementRef) {
        this.systemColor = "neutral";
        this.headerMenu = {
            menuItems: [
                {
                    displayName: "Min sida",
                    url: "/minsida",
                    isInternalLink: true
                },
                {
                    displayName: "Formatmall",
                    url: "/formatmall",
                    isInternalLink: true
                },
                {
                    isSeparator: true
                },
                {
                    displayName: "Krav- och kvalitetsbok",
                    menuItems: [
                        {
                            displayName: "VGPV",
                            url: `http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-vg-primarvard/krav--och-kvalitetsbok-vg-primarvard/`,
                            isInternalLink: false
                        },
                        {
                            displayName: "Rehab",
                            url: "http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-rehab/krav--och-kvalitetsbok/",
                            isInternalLink: false
                        }
                    ] as IHeaderMenuItem[]
                },
                {
                    displayName: "FAQ",
                    menuItems: [
                        {
                            displayName: "VGPV",
                            url: "http://www.vgregion.se/sv/Vastra-Gotalandsregionen/startsida/Vard-och-halsa/Forvardgivare/VG-Primarvard1/Fragor-och-svar/",
                            isInternalLink: false
                        },
                        {
                            displayName: "Rehab",
                            url: "http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-rehab/fragor-och-svar/",
                            isInternalLink: false
                        }
                    ] as IHeaderMenuItem[]
                },
                {
                    displayName: "Kontakt",
                    url: "http://www.vgregion.se/halsa-och-vard/vardgivarwebben/it/it-system/it-stod-for-vardval-rehab/kontaktpersoner/",
                    isInternalLink: false
                }
            ] as IHeaderMenuItem[]
        } as IHeaderMenu;
    }

    toggleHeaderMenu(event: Event): void {
        this.headerMenuComponent.toggleHeaderMenu(event);
    }
}

