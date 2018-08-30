import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { IHeaderMenu, IHeaderMenuItem, HeaderComponent } from 'vgr-komponentkartan';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})


export class HeadersComponent implements OnInit, AfterViewInit {

  headerMenu: IHeaderMenu;
  simpleHeaderMenu: IHeaderMenu;
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;
  exampleCodeHeaderMenu = `    this.headerMenu = {
    menuItems: [
      {
        displayName: 'Internt menyval',
        url: '/minsida',
        isInternalLink: true
      },
      {
        isSeparator: true
      },
      {
        displayName: 'Externt menyval',
        menuItems: [
          {
            displayName: 'Submenyval vgregion',
            url: 'http://www.vgregion.se',
            isInternalLink: false
          }
        ] as IHeaderMenuItem[]
      }
    ] as IHeaderMenuItem[]
  } as IHeaderMenu;`;

  exampleCodeSimpleMenyMarkup: string;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.exampleCodeSimpleMenyMarkup = htmlEncoder.prepareHighlightedSection(this.exampleCodeHeaderMenu, 'typescript');
    this.setMenuItems();
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.headerComponent.clickToggleHeaderMenu(new Event(null));
    }, 200);
  }

  setMenuItems() {

    this.simpleHeaderMenu = {
      menuItems: [
        {
          displayName: 'Internt menyval',
          url: '/minsida',
          isInternalLink: true
        },
        {
          isSeparator: true
        },
        {
          displayName: 'Externt menyval',
          menuItems: [
            {
              displayName: 'Submenyval vgregion',
              url: 'http://www.vgregion.se',
              isInternalLink: false
            }
          ] as IHeaderMenuItem[]
        }
      ] as IHeaderMenuItem[]
    } as IHeaderMenu;

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
              url: `http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-vg-primarvard/krav--och-kvalitetsbok-vg-primarvard/`,
              isInternalLink: false
            },
            {
              displayName: 'Rehab',
              url: 'http://www.vgregion.se/halsa-och-vard/vardgivarwebben/uppdrag-och-avtal/vardval-rehab/krav--och-kvalitetsbok/',
              isInternalLink: false
            }
          ] as IHeaderMenuItem[]
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
          ] as IHeaderMenuItem[]
        },
        {
          displayName: 'Kontakt',
          url: 'http://www.vgregion.se/halsa-och-vard/vardgivarwebben/it/it-system/it-stod-for-vardval-rehab/kontaktpersoner/',
          isInternalLink: false
        }
      ] as IHeaderMenuItem[]
    } as IHeaderMenu;

  }


  ngOnInit() {
  }

}
