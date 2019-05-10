import { Component } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';
import { ModalService } from 'vgr-komponentkartan';

@Component({
  selector: 'app-headers',
  templateUrl: './headers.component.html',
  styleUrls: ['./headers.component.scss']
})


export class HeadersComponent {

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

  constructor(public modalService: ModalService, htmlEncoder: HtmlEncodeService) {
    this.exampleCodeSimpleMenyMarkup = htmlEncoder.prepareHighlightedSection(this.exampleCodeHeaderMenu, 'typescript');
    this.standardExampleMarkup = htmlEncoder.prepareHighlightedSection(this.standardExample, 'typescript');
    this.systemExampleMarkup = htmlEncoder.prepareHighlightedSection(this.systemExample, 'typescript');
    this.customExampleMarkup = htmlEncoder.prepareHighlightedSection(this.customExample, 'typescript');
    this.overwriteExampleMarkup = htmlEncoder.prepareHighlightedSection(this.overwriteExample, 'typescript');
  }
  showOneButtonModal(elementId: string): void {
    this.modalService.openDialog(elementId);
  }
  closeModal(elementId: string): void {
    this.modalService.closeDialog(elementId);
  }
}
