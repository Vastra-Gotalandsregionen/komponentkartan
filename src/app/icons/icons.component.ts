import { Component, OnInit } from '@angular/core';
import { HtmlEncodeService } from '../html-encode.service';

@Component({
    selector: 'app-icons',
    templateUrl: './icons.component.html',
    styleUrls: ['./icons.component.scss'],
    standalone: false
})
export class IconsComponent implements OnInit {
  html = `<div class="vgr-icon-edit"></div>`;
  code = `row.notifyOnCollapse(row.previewObject.enhet + ' sparades', { name: 'check-circle'; color: 'success' });`;
  code2 = `this.row.notification = {
  message: 'Ett meddelande', icon: { name: 'exclamation-circle'; color: 'error', solid: true },
  type: NotificationType.Permanent
} as RowNotification;`;
  iconExamplesHTML: string;

  iconExamplesTS: string;
  iconExamplesTS2: string;

  favorite = false;
  favoriteValue = false;

  constructor(htmlEncoder: HtmlEncodeService) {

    this.iconExamplesTS = htmlEncoder.prepareHighlightedSection(this.code, 'typescript');
    this.iconExamplesTS2 = htmlEncoder.prepareHighlightedSection(this.code2, 'typescript');
    this.iconExamplesHTML = htmlEncoder.prepareHighlightedSection(this.html, 'html');
  }

  ngOnInit() {
  }

}
