import { Component, OnInit, ViewChild } from '@angular/core';
import { IHeaderMenu, IHeaderMenuItem, HeaderComponent } from 'vgr-komponentkartan';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})


export class HeadersComponent implements OnInit {

  headerMenu: IHeaderMenu;
  simpleHeaderMenu: IHeaderMenu;
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;
  exampleCodeHeaderMenu =  `  <vgr-header class="header--inline theme--green">
    <vgr-header-menu [userName]="'Nova Audit'">
      <vgr-menu-item link="/minsida" text="Internt menyval"></vgr-menu-item>
      <vgr-submenu text="Submeny">
        <vgr-menu-item link="/backtotop" text="Submenyval : backtotop"></vgr-menu-item>
      </vgr-submenu>
    </vgr-header-menu>
  </vgr-header>`;
  standardExample = `<vgr-header class="header--inline"></vgr-header>`;
  systemExample = `<vgr-header systemText="Development" class="header--inline"></vgr-header>`;
  customExample = `<vgr-header class="header--inline theme--red" [hideSwosh]="true"  logoClass="custom-logo"></vgr-header>`;
  overwriteExample = `<vgr-header class="header--inline" [hideSwosh]="true">
  <vgr-header-menu initials="AB" userName="Claes Göransson" textColor="red" circleColor="white"></vgr-header-menu>
</vgr-header>`;

  exampleCodeSimpleMenyMarkup: string;
  standardExampleMarkup: string;
  systemExampleMarkup: string;
  customExampleMarkup: string;
  overwriteExampleMarkup: string;

  constructor(htmlEncoder: HtmlEncodeService) {
    this.exampleCodeSimpleMenyMarkup = htmlEncoder.prepareHighlightedSection(this.exampleCodeHeaderMenu, 'typescript');
    this.standardExampleMarkup = htmlEncoder.prepareHighlightedSection(this.standardExample, 'typescript');
    this.systemExampleMarkup = htmlEncoder.prepareHighlightedSection(this.systemExample, 'typescript');
    this.customExampleMarkup = htmlEncoder.prepareHighlightedSection(this.customExample, 'typescript');
    this.overwriteExampleMarkup = htmlEncoder.prepareHighlightedSection(this.overwriteExample, 'typescript');
    this.setMenuItems();
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
